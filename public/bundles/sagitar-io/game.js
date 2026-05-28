const LOCAL_SETTINGS = {
  MAX_STARS: 15,
  MAX_SPAWNS: 16,
};

const LOCAL_STATE = {
  startTime: Date.now(),
  players: {},
  stars: [],
};

function createLocalSocket() {
  const listeners = {};

  const trigger = (event, ...args) => {
    (listeners[event] ?? []).forEach((callback) => callback(...args));
  };

  const socketRef = {
    id: `local-${Math.random().toString(36).slice(2, 10)}`,
    on(event, callback) {
      listeners[event] = listeners[event] ?? [];
      listeners[event].push(callback);
      return socketRef;
    },
    emit(event, ...args) {
      if (event === 'updateVectors') {
        const [position, velocity] = args;
        const localPlayer = LOCAL_STATE.players[socketRef.id];
        if (localPlayer) {
          localPlayer.position = { ...position };
          localPlayer.velocity = { x: velocity.x, y: velocity.y };
        }
      }

      if (event === 'playersCrashed') {
        console.log('[LOCAL] playersCrashed', ...args);
      }

      if (event === 'playerDisconnect') {
        delete LOCAL_STATE.players[socketRef.id];
      }

      return socketRef;
    },
    _trigger: trigger,
  };

  setTimeout(() => trigger('connect'), 0);
  return socketRef;
}

const socket = createLocalSocket();

let PLAYERS;
let STARS;
let loading = true;
const VERSION = 'v0.5'

const GAME_OPTS = {
  MAP: {
    WIDTH: 5000,
    HEIGHT: 5000,
    CENTER: { x: 2500, y: 2500 }
  },
  CAM: {
    WIDTH: 1920,
    HEIGHT: 1080,
    MINZOOM: 1,
    MAXZOOM: 2,
    PARALAX: 0.05,
    PARALAX_OFFSET: 1000,
  },
  PLAYER: {
    RADIUS: 12,
    ID: null,
    MAX_ACCELERATION: 500,
    MAX_SPEED: 360,
    DECELERATION_FACTOR: 2
  },
  BLACK_HOLE: {
    MASS: 700
  },
  MINIMAP: {
    REFRESH_TIME: 30
  },
  DAMAGE: {
    CRASH: 10,
    STAR_CRASH: 12,
    STAR_RADIATION: 1,
    BH_RADIATION: 3
  },
  BEGIN: false,
  Q_MID_STARS: 1200,
  Q_NEAR_STARS: 500,
  STAR_DENSITY: 0.0025,
  GRAVITATIONAL_CONSTANT: 200,
  SERVER_TIME: 0,
  EXPERIMENTAL_DISABLE_GRAVITY: false,
  EXPERIMENTAL_FORCE_ARROWS: false,
  TRAIL_TRANSPARENCY: 15
}

function getStarColor(size) {
  if (size > 36) return 0xffffff;
  if (size > 20) return 0x7db8e6;
  return 0xff4500;
}

function isPositionFarEnough(position, positions, minDistance) {
  for (const pos of positions) {
    const distance = Math.sqrt((pos.x - position.x) ** 2 + (pos.y - position.y) ** 2);
    if (distance < minDistance) {
      return false;
    }
  }

  return true;
}

function generateLocalStars() {
  const stars = [];

  for (let i = 0; i < LOCAL_SETTINGS.MAX_STARS; i++) {
    const radius = Math.round(500 + (1800 / LOCAL_SETTINGS.MAX_STARS * (i + 1)));
    const angle = Math.random() * 2 * Math.PI;
    const size = Math.round(12 + Math.random() * 38);

    stars.push({
      size,
      position: {
        x: GAME_OPTS.MAP.CENTER.x + radius * Math.cos(angle),
        y: GAME_OPTS.MAP.CENTER.y + radius * Math.sin(angle),
      },
      color: getStarColor(size),
    });
  }

  return stars;
}

function generateLocalSpawnPositions(stars, count = LOCAL_SETTINGS.MAX_SPAWNS) {
  const spawnPositions = [];
  let attempts = 0;

  while (spawnPositions.length < count && attempts < 8000) {
    attempts += 1;

    const position = {
      x: Math.random() * 4600 + 200,
      y: Math.random() * 4600 + 200,
    };

    const isFarFromStars = isPositionFarEnough(
      position,
      stars.map((star) => star.position),
      500,
    );

    const isFarFromBlackHole = isPositionFarEnough(
      position,
      [{ x: GAME_OPTS.MAP.CENTER.x, y: GAME_OPTS.MAP.CENTER.y }],
      700,
    );

    const isFarFromOtherSpawns = isPositionFarEnough(position, spawnPositions, 300);

    if (isFarFromStars && isFarFromBlackHole && isFarFromOtherSpawns) {
      spawnPositions.push(position);
    }
  }

  while (spawnPositions.length < count) {
    const fallbackAngle = (2 * Math.PI * spawnPositions.length) / count;
    spawnPositions.push({
      x: GAME_OPTS.MAP.CENTER.x + 1000 * Math.cos(fallbackAngle),
      y: GAME_OPTS.MAP.CENTER.y + 1000 * Math.sin(fallbackAngle),
    });
  }

  return spawnPositions;
}

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }
  preload() {
    PLAYERS = {};
    const COLORS = [
      0x2979FF, 0xFF1744, 0x00E676, 0xFFEA00,
      0x00B8D4, 0xD500F9, 0x9E9E9E, 0xFF6D00
    ];

    COLORS.forEach((color) => {
      let circle = this.add.graphics();
      circle.fillStyle(color, 1);
      circle.fillCircle(GAME_OPTS.PLAYER.RADIUS, GAME_OPTS.PLAYER.RADIUS, GAME_OPTS.PLAYER.RADIUS);
      circle.generateTexture(`circle-${color}`, GAME_OPTS.PLAYER.RADIUS * 2, GAME_OPTS.PLAYER.RADIUS * 2, true);
      circle.destroy();
    });

    WebFont.load({
      google: { families: ['Open Sans'] },
      custom: { families: ['Aldrich', 'Kanit'] },
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#070707');
    this.group = this.add.group();
    this.awayStarsGroup = this.add.group();
    this.midStarsGroup = this.add.group();
    this.nearStarsGroup = this.add.group();
    this.generateBackgroundStars();
    this.generateMinimap();
    this.minimapRefreshTime = 0;
    this.generatePlayerObject();
    this.generateBlackHole();
    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(GAME_OPTS.MAP.CENTER.x, GAME_OPTS.MAP.CENTER.y);
    this.cameras.main.setDeadzone(100, 100);
    this.cameras.main.setBounds(0, 0, GAME_OPTS.MAP.WIDTH, GAME_OPTS.MAP.HEIGHT);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      f: Phaser.Input.Keyboard.KeyCodes.F,
      r: Phaser.Input.Keyboard.KeyCodes.R,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
    for (const key in this.cursors) this.cursors[key].enabled = false;

    this.guiComponents = [];
    this.gui = { x: 0, y: 0 };
    this.gui.enabled = false;
    this.gui.arrow = this.add.graphics();
    this.input.on('wheel', this.handleZoom, this);

    this.gui.updateRate = 60;
    this.gui.lastUpdateTime = 0;

    setTimeout(() => this.generateGUI(), 1000);

    socket.on('gift-playerFirstData', (data) => {
      this.player.x = data.position.x;
      this.player.y = data.position.y;
      this.player.id = data.id;
      this.player.number = data.number;
      this.player.color = data.color;
      this.player.visual.clear();
      this.player.visual.fillStyle(this.player.color, 1);
      this.player.visual.fillCircle(GAME_OPTS.PLAYER.RADIUS, GAME_OPTS.PLAYER.RADIUS, GAME_OPTS.PLAYER.RADIUS);
      this.player.visual.generateTexture('circle', 24, 24, true);
      this.player.setTexture('circle');
      socket.emit('updateVectors', { x: this.player.x, y: this.player.y }, this.player.body.velocity);
      this.player.health = data.health ?? 100;
      this.player.energy = data.energy ?? 100;
      this.isShooting = false;
      this.outsideBlackHole = true;
      this.expForceArrowsPressed = false;

      PLAYERS[socket.id] = {
        id: socket.id,
        position: { x: this.player.x, y: this.player.y },
        velocity: { x: this.player.body.velocity.x, y: this.player.body.velocity.y },
        color: this.player.color,
        health: this.player.health,
        energy: this.player.energy,
        sprite: this.player,
      };
    });

    socket.on('gift-playersList', (playersList) => {
      for (let i = 1; i <= 8; i++) {
        const player = Object.entries(playersList).find(p => p[1].number === i);
        if (!player) {
          PLAYERS[i].id = null;
          PLAYERS[i].position.x = GAME_OPTS.MAP.CENTER.x;
          PLAYERS[i].position.y = GAME_OPTS.MAP.CENTER.y;
          PLAYERS[i].sprite.x = GAME_OPTS.MAP.CENTER.x;
          PLAYERS[i].sprite.y = GAME_OPTS.MAP.CENTER.y;
          PLAYERS[i].velocity.x = 0;
          PLAYERS[i].velocity.y = 0;
          PLAYERS[i].sprite.visible = false;
        } else {
          PLAYERS[i].id = player[0];
          PLAYERS[i].position.x = player[1].position.x;
          PLAYERS[i].position.y = player[1].position.y;
          PLAYERS[i].sprite.x = player[1].position.x;
          PLAYERS[i].sprite.y = player[1].position.y;
          PLAYERS[i].velocity.x = player[1].velocity.x;
          PLAYERS[i].velocity.y = player[1].velocity.y;
          PLAYERS[i].sprite.visible = player[0] !== socket.id;
          if (socket.id === player[0]) {
            this.player.body.velocity.x = player[1].velocity.x;
            this.player.body.velocity.y = player[1].velocity.y;
          }
        }
      };
    });

    socket.on('gift-playersUpdate', (players) => {
      players.forEach(({ id, position, velocity, color, health, energy }) => {
        if (!PLAYERS[id]) {
          const textureKey = `circle-${color}`;
          if (!this.textures.exists(textureKey)) {
            const graphics = this.add.graphics();
            graphics.fillStyle(color, 1);
            graphics.fillCircle(GAME_OPTS.PLAYER.RADIUS, GAME_OPTS.PLAYER.RADIUS, GAME_OPTS.PLAYER.RADIUS);
            graphics.generateTexture(textureKey, GAME_OPTS.PLAYER.RADIUS * 2, GAME_OPTS.PLAYER.RADIUS * 2);
            graphics.destroy();
          }
          PLAYERS[id] = {
            position: { x: position.x, y: position.y },
            velocity: { x: velocity.x, y: velocity.y },
            color,
            health,
            energy,
            sprite: this.physics.add.sprite(position.x, position.y, textureKey),
          };
          PLAYERS[id].sprite.setCollideWorldBounds(true);
        }

        PLAYERS[id].position = position;
        PLAYERS[id].velocity = velocity;
        PLAYERS[id].health = health;
        PLAYERS[id].energy = energy;
        PLAYERS[id].sprite.x = position.x;
        PLAYERS[id].sprite.y = position.y;

        if (PLAYERS[id].sprite.body) {
          PLAYERS[id].sprite.body.setVelocity(velocity.x, velocity.y);
        }

        PLAYERS[id].sprite.visible = id !== socket.id;
      });
    });

    socket.on('gift-playersHealthEnergyUpdate', (updates) => {
      updates.forEach(({ id, health, energy }) => {
        PLAYERS[id].health = health;
        PLAYERS[id].energy = energy;
        // Actualizar barra de salud/energía si corresponde
        // updateHealthBar(id, health);
        // updateEnergyBar(id, energy);
      });
    });

    socket.on('gift-serverTime', (liveTime) => {
      GAME_OPTS.SERVER_TIME = liveTime;
    });

    socket.on('gift-starsList', (stars) => {
      STARS = stars;
      STARS.forEach(s => {
        const starX = s.position.x * 320 / GAME_OPTS.MAP.WIDTH + GAME_OPTS.CAM.WIDTH - 320;
        const starY = s.position.y * 180 / GAME_OPTS.MAP.HEIGHT + GAME_OPTS.CAM.HEIGHT - 180;
        this.generateCollisionableStar(s.position.x, s.position.y, s.size, s.color)
        this.miniMap.fillStyle(0xFFFFFF, 0.3);
        const miniMapRect = new Phaser.Geom.Rectangle(starX - 2 / 2, starY - 2 / 2, 10, 10);
        this.miniMap.fillRectShape(miniMapRect);
      })
    });

    socket.on('playerShoot', (data) => {
      this.generateShootEffect(data.shootPosition, data.shootColor)
    });

    this.bootstrapSinglePlayerSession();
  }

  bootstrapSinglePlayerSession = () => {
    const stars = generateLocalStars();
    const spawnPositions = generateLocalSpawnPositions(stars);
    const spawnPosition = spawnPositions[0] ?? {
      x: GAME_OPTS.MAP.CENTER.x + 800,
      y: GAME_OPTS.MAP.CENTER.y,
    };

    const playerFirstData = {
      id: socket.id,
      number: 1,
      color: 0x2979FF,
      position: { ...spawnPosition },
      velocity: { x: 0, y: 0 },
      health: 100,
      energy: 100,
    };

    LOCAL_STATE.players[socket.id] = {
      ...playerFirstData,
      position: { ...spawnPosition },
      velocity: { x: 0, y: 0 },
    };
    LOCAL_STATE.stars = stars;

    socket._trigger('gift-playerFirstData', playerFirstData);
    socket._trigger('gift-starsList', stars);
    socket._trigger('gift-serverTime', 0);
  }

  update(time, delta) {
    if (loading) return;
    if (!STARS) return;

    GAME_OPTS.SERVER_TIME = Math.ceil((Date.now() - LOCAL_STATE.startTime) / 1000);

    // UPDATE MINIMAP
    this.minimapRefreshTime++ % GAME_OPTS.MINIMAP.REFRESH_TIME === 0 && this.updateMinimap();

    // UPDATE GUI
    if (this.gui && this.gui.accelerationArrow) this.gui.accelerationArrow.clear();
    this.gui.enabled && this.updateGUI();
    if (this.player.health <= 0) {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.r)) {
        this.respawnPlayer();
      }
      this.player.body.velocity = new Phaser.Math.Vector2(0, 0);
      this.player.body.acceleration = new Phaser.Math.Vector2(0, 0);
      this.updateCameras();
      return;
    }

    // UPDATE KEY PRESSES
    let keyAccelerationX = 0;
    let keyAccelerationY = 0;
    this.input.keyboard.update();
    if (this.cursors.left.isDown) keyAccelerationX -= 1;
    if (this.cursors.right.isDown) keyAccelerationX += 1;
    if (this.cursors.up.isDown) keyAccelerationY -= 1;
    if (this.cursors.down.isDown) keyAccelerationY += 1;
    if (keyAccelerationX !== 0 && keyAccelerationY !== 0) {
      keyAccelerationX *= Math.sin(0.25 * Math.PI) + 0.000001;
      keyAccelerationY *= Math.sin(0.25 * Math.PI) + 0.000001;
    }
    if (keyAccelerationX !== 0 || keyAccelerationY !== 0)
      GAME_OPTS.EXPERIMENTAL_FORCE_ARROWS && this.outsideBlackHole && this.renderArrow({ x: 50 * keyAccelerationX, y: 50 * keyAccelerationY }, 0xDFFF00, 0.2);

    // UPDATE GRAVITY
    let starsAccelerationX = 0;
    let starsAccelerationY = 0;
    let blackHoleAccelerationX = 0;
    let blackHoleAccelerationY = 0;
    if (this.minimapRefreshTime > 300) {
      STARS.forEach((s, index) => {
        const dx = this.player.x - s.position.x + s.size / 5;
        const dy = this.player.y - s.position.y + s.size / 5;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const gravitationalForce = Math.min(1, GAME_OPTS.GRAVITATIONAL_CONSTANT * 3 * (s.size + 10) / (distance * distance));
        if (distance < s.size) this.player.health = Math.max(0, this.player.health - 1);
        const uniqueStarAccelerationX = -gravitationalForce * dx / distance;
        const uniqueStarAccelerationY = -gravitationalForce * dy / distance;
        starsAccelerationX += uniqueStarAccelerationX;
        starsAccelerationY += uniqueStarAccelerationY;

        GAME_OPTS.EXPERIMENTAL_FORCE_ARROWS && this.outsideBlackHole && Math.abs(Math.sqrt(uniqueStarAccelerationX ** 2 + uniqueStarAccelerationY ** 2)) > 0.15 &&
          this.renderArrow({ x: uniqueStarAccelerationX * 120, y: uniqueStarAccelerationY * 120 }, 0xFF00FF, 0.2);
      });

      const dx = this.player.x - GAME_OPTS.MAP.CENTER.x;
      const dy = this.player.y - GAME_OPTS.MAP.CENTER.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      let gravitationalForce = Math.min(1.5, GAME_OPTS.GRAVITATIONAL_CONSTANT * GAME_OPTS.BLACK_HOLE.MASS / (distance * distance));
      if (distance < 75) {
        this.outsideBlackHole = false;
        this.player.health = Math.max(0, this.player.health - 1);
        gravitationalForce *= 8;
      } else {
        this.outsideBlackHole = true;
      }
      blackHoleAccelerationX += -gravitationalForce * dx / distance;
      blackHoleAccelerationY += -gravitationalForce * dy / distance;
      GAME_OPTS.EXPERIMENTAL_FORCE_ARROWS && this.outsideBlackHole && Math.abs(Math.sqrt(blackHoleAccelerationX ** 2 + blackHoleAccelerationY ** 2)) > 0.15 &&
        this.renderArrow({ x: blackHoleAccelerationX * 120, y: blackHoleAccelerationY * 120 }, 0x000000, 0.3);
    }

    // UPDATE MOVEMENT
    let accelerationX = keyAccelerationX + starsAccelerationX + blackHoleAccelerationX;
    let accelerationY = keyAccelerationY + starsAccelerationY + blackHoleAccelerationY;
    const accelerationMagnitude = Math.sqrt(accelerationX * accelerationX + accelerationY * accelerationY);
    if (accelerationMagnitude > 0) {
      accelerationX += accelerationX * GAME_OPTS.PLAYER.MAX_ACCELERATION;
      accelerationY += accelerationY * GAME_OPTS.PLAYER.MAX_ACCELERATION;
      GAME_OPTS.EXPERIMENTAL_FORCE_ARROWS && this.outsideBlackHole && this.renderArrow({ x: this.player.body.acceleration.x / 3.5, y: this.player.body.acceleration.y / 3.5 }, 0xffffff, 0.15);
    }
    this.player.body.acceleration.x = accelerationX;
    this.player.body.acceleration.y = accelerationY;
    const currentSpeed = Phaser.Math.Distance.Between(0, 0, this.player.body.velocity.x, this.player.body.velocity.y);
    if (currentSpeed > GAME_OPTS.PLAYER.MAX_SPEED) this.player.body.velocity.normalize().scale(GAME_OPTS.PLAYER.MAX_SPEED);
    if (currentSpeed > 0) {
      if (accelerationMagnitude === 0) {
        const deceleration = Math.min(currentSpeed, GAME_OPTS.PLAYER.DECELERATION_FACTOR);
        this.player.body.velocity.normalize().scale(currentSpeed - deceleration);
      }
      GAME_OPTS.EXPERIMENTAL_FORCE_ARROWS && this.outsideBlackHole && this.renderArrow({ x: this.player.body.velocity.x / 2, y: this.player.body.velocity.y / 2 }, Math.round(Math.sqrt(this.player.body.velocity.x ** 2 + this.player.body.velocity.y ** 2)) > 330 ? 0xff0000 : 0x00ff00, 0.15);
      socket.emit('updateVectors', { x: this.player.x, y: this.player.y }, this.player.body.velocity);
    }
    const playerVelocityModule = Math.sqrt((this.player.body.velocity.x ** 2) + (this.player.body.velocity.y ** 2))
    if (this.gui.playerVelocity) {
      this.gui.playerVelocity.text = playerVelocityModule.toFixed(1)
      this.generatePlayerTrail(this.player.x, this.player.y, playerVelocityModule)
    }

    // UPDATE SHOOTING
    if (!this.isShooting && this.player.energy >= 25 && this.cursors.space.isDown) {
      socket.emit('shoot', { x: this.player.x, y: this.player.y }, this.player.color);
      this.generateShootEffect({ x: this.player.x, y: this.player.y }, this.player.color);
      this.player.energy -= 25;
      this.isShooting = !this.isShooting;
    }
    if (this.isShooting && this.cursors.space.isUp) {
      this.isShooting = !this.isShooting;
    }
    if (this.player.energy < 100) this.player.energy += 1 / 3;

    if (this.player.id && PLAYERS[this.player.id]) {
      PLAYERS[this.player.id].position = { x: this.player.x, y: this.player.y };
      PLAYERS[this.player.id].velocity = {
        x: this.player.body.velocity.x,
        y: this.player.body.velocity.y,
      };
      PLAYERS[this.player.id].health = this.player.health;
      PLAYERS[this.player.id].energy = this.player.energy;
    }

    if (LOCAL_STATE.players[socket.id]) {
      LOCAL_STATE.players[socket.id].position = { x: this.player.x, y: this.player.y };
      LOCAL_STATE.players[socket.id].velocity = {
        x: this.player.body.velocity.x,
        y: this.player.body.velocity.y,
      };
      LOCAL_STATE.players[socket.id].health = this.player.health;
      LOCAL_STATE.players[socket.id].energy = this.player.energy;
    }

    // UPDATE GUI FORCE ARROWS
    if (this.gui && this.gui.accelerationArrow) {
      if (!this.expForceArrowsPressed && this.cursors.f.isDown) {
        GAME_OPTS.EXPERIMENTAL_FORCE_ARROWS = !GAME_OPTS.EXPERIMENTAL_FORCE_ARROWS;
        this.expForceArrowsPressed = true;
      }
      if (this.expForceArrowsPressed && this.cursors.f.isUp) {
        this.expForceArrowsPressed = false;
      }
    }

    // UPDATE CAMERAS AND TIME
    this.updateCameras();
    this.updateGameData(time);
  }

  setUpdateRate(fps) {
    this.gui.updateRate = fps;
  }

  updateGameData(deltaTime) {
    if (deltaTime - this.gui.lastUpdateTime >= 1000 / this.gui.updateRate) {
      this.gui.lastUpdateTime = deltaTime;
      // Object.keys(PLAYERS).forEach((playerId) => {
      //   const player = PLAYERS[playerId];
      //   if (player.sprite.visible) {
      //     // Interpolación opcional para suavizar movimientos
      //     player.sprite.x = Phaser.Math.Interpolation.Linear([player.sprite.x, player.position.x], 0.5);
      //     player.sprite.y = Phaser.Math.Interpolation.Linear([player.sprite.y, player.position.y], 0.5);
      //   }
      // });
    }
  }

  generateCollisionableStar = (x, y, size, color) => {
    const starColor = color;
    const starTargets = [];
    const starGraphics = this.add.graphics({ x: x, y: y });
    starGraphics.fillStyle(starColor, 1);
    starGraphics.fillCircle(0, 0, size);
    starGraphics.setDepth(1);
    starTargets.push(starGraphics);
    for (let i = 0; i < 10; i++) {
      const radius = size + (Math.sqrt(size) * 2 * i);
      let glow = this.add.graphics({ x: x, y: y });
      let alpha = 0.04;
      glow.fillStyle(0xffffff, alpha - (i * 0.0036));
      glow.fillCircle(0, 0, radius);
      glow.setDepth(110);
      i % 2 === 0 && starTargets.push(glow);
    }
    this.tweens.add({ targets: starTargets, duration: 1200, repeat: -1, ease: 'Linear', scaleX: 1.15, scaleY: 1.1, yoyo: true });
  }

  generateGUI = () => {
    function createTextWithFadeIn(scene, x, y, text, options) {
      const defaultOptions = { fontSize: "24px", fill: "#ffffff", fontFamily: 'Arial' };
      const config = { ...defaultOptions, ...options };
      const newText = scene.add.text(x, y, text, config);
      newText.setDepth(102);
      newText.setScrollFactor(0);
      newText.alpha = 0;
      return newText;
    }
    this.gui = new Object();
    this.gui.title = createTextWithFadeIn(this, GAME_OPTS.CAM.WIDTH / 2 - 120, 20, "Sagitario", {
      fontSize: "48px",
      fill: "#772277",
      fontFamily: 'Aldrich'
    });
    this.guiComponents.push(this.gui.title);
    this.gui.titleVersion = createTextWithFadeIn(this, GAME_OPTS.CAM.WIDTH / 2 + 108, 50, VERSION, {
      fontSize: "16px",
      fill: "#dddddd",
      fontFamily: 'Kanit'
    });
    this.guiComponents.push(this.gui.titleVersion);
    this.gui.elapsedTime = createTextWithFadeIn(this, GAME_OPTS.CAM.WIDTH - 260, GAME_OPTS.CAM.HEIGHT - 276, `Creating universe...`, {
      fontSize: "20px",
      fill: "#ffffff",
      fontFamily: 'Aldrich'
    });
    this.guiComponents.push(this.gui.elapsedTime);
    const velocityModule = Math.sqrt(this.player.body.velocity.x ^ 2 + this.player.body.velocity.y ^ 2)
    this.gui.playerVelocity = createTextWithFadeIn(this, GAME_OPTS.CAM.WIDTH - 260, GAME_OPTS.CAM.HEIGHT - 248, `${velocityModule}`, {
      fontSize: "24px",
      fill: "#ffffff",
      fontFamily: 'Aldrich'
    });
    this.guiComponents.push(this.gui.playerVelocity);
    this.gui.playerVelocityLabel = createTextWithFadeIn(this, GAME_OPTS.CAM.WIDTH - 180, GAME_OPTS.CAM.HEIGHT - 248, `m/s`, {
      fontSize: "24px",
      fill: "#ffffff",
      fontFamily: 'Aldrich'
    });
    this.guiComponents.push(this.gui.playerVelocityLabel);
    this.gui.x = createTextWithFadeIn(this, GAME_OPTS.CAM.WIDTH - 260, GAME_OPTS.CAM.HEIGHT - 220, `x: ${Math.round(this.player.x)}`, {
      fontSize: "24px",
      fill: "#ffffff",
      fontFamily: 'Aldrich'
    });
    this.guiComponents.push(this.gui.x);
    this.gui.y = createTextWithFadeIn(this, GAME_OPTS.CAM.WIDTH - 140, GAME_OPTS.CAM.HEIGHT - 220, `y: ${Math.round(this.player.y)}`, {
      fontSize: "24px",
      fill: "#ffffff",
      fontFamily: 'Aldrich'
    });
    this.guiComponents.push(this.gui.y);
    this.gui.healthBarTag = createTextWithFadeIn(this, 105, GAME_OPTS.CAM.HEIGHT - 130, `LIFE`, {
      fontSize: "26px",
      fill: "#ffffff",
      fontFamily: 'Aldrich'
    });
    this.guiComponents.push(this.gui.healthBarTag);
    this.gui.energyBarTag = createTextWithFadeIn(this, 50, GAME_OPTS.CAM.HEIGHT - 70, `ENERGY`, {
      fontSize: "26px",
      fill: "#ffffff",
      fontFamily: 'Aldrich'
    });
    this.guiComponents.push(this.gui.energyBarTag);
    this.tweens.add({
      alpha: 1, duration: 50, ease: "Power3", targets: this.guiComponents, repeat: 7, yoyo: true,
      onComplete: () => {
        this.guiComponents.forEach(gcp => gcp.alpha = 1);
        for (const key in this.cursors) this.cursors[key].enabled = true;
        this.gui.healthBar = this.add.graphics();
        this.gui.energyBar = this.add.graphics();
        this.gui.healthBar.fillStyle(0xff0000, 0.5);
        this.gui.healthBar.fillRect(180, GAME_OPTS.CAM.HEIGHT - 130, 250, 30);
        this.gui.healthBar.setScrollFactor(0);
        this.gui.healthBar.setDepth(101);
        this.gui.energyBar.fillStyle(0x0000ff, 0.5);
        this.gui.energyBar.fillRect(180, GAME_OPTS.CAM.HEIGHT - 70, 250, 30);
        this.gui.energyBar.setScrollFactor(0);
        this.gui.energyBar.setDepth(101);
        this.gui.enabled = true;
      }
    });
    this.gui.accelerationArrow = this.add.graphics();
    this.gui.accelerationArrow.setDepth(1);

    // this.gui.fpsOffers = [30, 60]
    // this.gui.fpsOffers.forEach(fps => {
    //   const button = this.add.text(50, 50 + this.gui.fpsOffers.indexOf(fps) * 30, `${fps} FPS`, { fontSize: '16px', fill: '#FFF' });
    //   button.setInteractive();
    //   button.on('pointerdown', () => this.setUpdateRate(fps));
    // });
  }

  updateGUI = () => {
    function guiChangeVisibility(game, bool) {
      game.gui.title.visible = bool;
      game.gui.titleVersion.visible = bool;
      game.gui.healthBar.visible = bool;
      game.gui.energyBar.visible = bool;
      game.gui.healthBarTag.visible = bool;
      game.gui.energyBarTag.visible = bool;
      game.gui.x.visible = bool;
      game.gui.y.visible = bool;
    }
    if (this.cameras.main.zoom === 1) {
      this.gui.healthBar.clear();
      this.gui.healthBar.fillStyle(0xff0000, 0.5);
      this.gui.healthBar.fillRect(180, GAME_OPTS.CAM.HEIGHT - 130, 250 * this.player.health / 100, 30);
      this.gui.energyBar.clear();
      this.gui.energyBar.fillStyle(0x0000ff, 0.5);
      this.gui.energyBar.fillRect(180, GAME_OPTS.CAM.HEIGHT - 70, 250 * this.player.energy / 100, 30);
      this.gui.x.text = `x: ${Math.round(this.player.x)}`;
      this.gui.y.text = `y: ${Math.round(this.player.y)}`;
      this.gui.elapsedTime.text = `${GAME_OPTS.SERVER_TIME} years`
      this.gui.playerVelocity.text = '0.00'
      this.gui.playerVelocityLabel.text = 'm/s'
      guiChangeVisibility(this, true);
    } else guiChangeVisibility(this, false);
  }

  generateMinimap = () => {
    this.miniMap = this.add.graphics();
    this.miniMap.setDepth(101);
    Object.keys(PLAYERS).forEach(pNum => {
      const player = PLAYERS[pNum];
      const playerX = player.position.x * 320 / GAME_OPTS.MAP.WIDTH + GAME_OPTS.CAM.WIDTH - 320;
      const playerY = player.position.y * 180 / GAME_OPTS.MAP.HEIGHT + GAME_OPTS.CAM.HEIGHT - 180;
      this.miniMap.fillStyle(player.color, player.id ? 0.8 : 0);
      const miniMapRect = new Phaser.Geom.Rectangle(playerX - 2 / 2, playerY - 2 / 2, 6, 6);
      this.miniMap.fillRectShape(miniMapRect);
    });
  }

  updateMinimap = () => {
    function convertToMiniMapCoordinates(x, y) {
      return {
        x: x * 320 / GAME_OPTS.MAP.WIDTH + GAME_OPTS.CAM.WIDTH - 320,
        y: y * 180 / GAME_OPTS.MAP.HEIGHT + GAME_OPTS.CAM.HEIGHT - 180
      };
    }
    if (this.cameras.main.zoom === 1) {
      this.miniMap.clear();
      this.miniMap.fillStyle(0x000000, 0.9);
      this.miniMap.fillRect(GAME_OPTS.CAM.WIDTH - 320, GAME_OPTS.CAM.HEIGHT - 180, 320, 180);
      this.miniMap.setScrollFactor(0);
      this.miniMap.visible = this.cameras.main.zoom === 1;
      if (PLAYERS) {
        Object.keys(PLAYERS).forEach(playerId => {
          const player = PLAYERS[playerId];
          const playerCoordinates = convertToMiniMapCoordinates(player.position.x, player.position.y);
          this.miniMap.fillStyle(player.color, 0.8);
          const miniMapRect = new Phaser.Geom.Rectangle(playerCoordinates.x - 2 / 2, playerCoordinates.y - 2 / 2, 6, 6);
          this.miniMap.fillRectShape(miniMapRect);
        });
      }
      this.miniMap.visible = true;
      if (this.miniMapStars) this.miniMapStars.visible = true;
    } else {
      this.miniMap.visible = false;
      if (this.miniMapStars) this.miniMapStars.visible = false;
    }
    if (!this.miniMapStars && STARS) {
      this.miniMapStars = this.add.graphics();
      this.miniMapStars.setDepth(101);
      this.miniMapStars.setScrollFactor(0);
      STARS.forEach(s => {
        const starCoordinates = convertToMiniMapCoordinates(s.position.x, s.position.y);
        this.miniMapStars.fillStyle(0xFFFFFF, 0.2);
        this.miniMapStars.fillCircle(starCoordinates.x + s.size / 5 / 2, starCoordinates.y + s.size / 5 / 2, s.size / 5);
        this.miniMapStars.fillStyle(s.color, 0.5);
        this.miniMapStars.fillCircle(starCoordinates.x + s.size / 5 / 2, starCoordinates.y + s.size / 5 / 2, s.size / 10);
      })
      const blackHoleCoordinates = convertToMiniMapCoordinates(GAME_OPTS.MAP.CENTER.x, GAME_OPTS.MAP.CENTER.y);
      this.miniMapStars.fillStyle(0xaa7700, 1);
      this.miniMapStars.fillCircle(blackHoleCoordinates.x + 2, blackHoleCoordinates.y + 2, 6);
      this.miniMapStars.fillStyle(0x000000, 1);
      this.miniMapStars.fillCircle(blackHoleCoordinates.x + 2, blackHoleCoordinates.y + 2, 4);
    }
  }

  updateCameras = () => {
    const cam = this.cameras.main;
    const relX = cam.worldView.x + this.player.x * GAME_OPTS.CAM.PARALAX;
    const relY = cam.worldView.y + this.player.y * GAME_OPTS.CAM.PARALAX;
    this.midStarsGroup.setX(relX * -0.12);
    this.midStarsGroup.setY(relY * -0.12);
    this.nearStarsGroup.setX(relX * -0.25);
    this.nearStarsGroup.setY(relY * -0.25);
    this.outsideBlackHole ? this.cameras.main.centerOn(this.player.x, this.player.y) : this.cameras.main.centerOn(GAME_OPTS.MAP.CENTER.x, GAME_OPTS.MAP.CENTER.y);
  }

  generateBlackHole = () => {
    this.blackHole = this.add.circle(GAME_OPTS.MAP.CENTER.x, GAME_OPTS.MAP.CENTER.y, 75, 0x000000, 1);
    this.blackHole.setDepth(105);
    const CIRCLE_COUNT = 16;
    const RADIUS_START = 90;
    const RADIUS_END = 850;
    const RADIUS_INCREMENT = (RADIUS_END - RADIUS_START) / (CIRCLE_COUNT - 1);
    const blackHoleRedGlows = [];
    for (let i = 0; i < CIRCLE_COUNT; i++) {
      const radius = RADIUS_START + i * RADIUS_INCREMENT;
      let circle = this.add.graphics();
      let alpha = 0.0175;
      circle.fillStyle(0xe01100, alpha);
      circle.fillCircle(GAME_OPTS.MAP.CENTER.x - 50, GAME_OPTS.MAP.CENTER.y, radius);
      blackHoleRedGlows.push(circle);
    }
    const accretionDisks = [];
    accretionDisks.push(this.add.graphics({ lineStyle: { width: 40, color: 0xff7700, alpha: 0.3 }, x: GAME_OPTS.MAP.CENTER.x, y: GAME_OPTS.MAP.CENTER.y, depth: 0 }).strokeCircle(-1, -3, 60));
    accretionDisks.push(this.add.graphics({ lineStyle: { width: 40, color: 0xff0000, alpha: 0.25 }, x: GAME_OPTS.MAP.CENTER.x, y: GAME_OPTS.MAP.CENTER.y, depth: 0 }).strokeCircle(3, 0, 60));
    accretionDisks.push(this.add.graphics({ lineStyle: { width: 40, color: 0xffff00, alpha: 0.2 }, x: GAME_OPTS.MAP.CENTER.x, y: GAME_OPTS.MAP.CENTER.y, depth: 0 }).strokeCircle(-3, 2, 60));
    this.add.graphics({ lineStyle: { width: 3, color: 0xffff00, alpha: 1 }, depth: 1 }).strokeCircle(GAME_OPTS.MAP.CENTER.x, GAME_OPTS.MAP.CENTER.y, 75);
    const accretionDiskWhite = this.add.graphics({ lineStyle: { width: 18, color: 0xffffff, alpha: 0.8 }, x: GAME_OPTS.MAP.CENTER.x, y: GAME_OPTS.MAP.CENTER.y, depth: 0 }).strokeCircle(4, 3, 65);
    this.tweens.add({ targets: [...accretionDisks], duration: 2000, repeat: -1, ease: 'Linear', angle: 360, yoyo: false });
    this.tweens.add({ targets: accretionDisks, duration: 450, repeat: -1, ease: 'Linear', scaleX: 1.08, scaleY: 1.02, yoyo: true });
    this.tweens.add({ targets: blackHoleRedGlows, duration: 950, repeat: -1, ease: 'Linear', scaleX: 1.04, yoyo: true });
    this.tweens.add({ targets: accretionDiskWhite, duration: 240, repeat: -1, ease: 'Linear', angle: 360, yoyo: false });
  }

  generatePlayerObject = () => {
    let circle = this.add.graphics();
    circle.fillStyle(0x000000, 1);
    circle.fillCircle(GAME_OPTS.PLAYER.RADIUS, GAME_OPTS.PLAYER.RADIUS, GAME_OPTS.PLAYER.RADIUS);
    circle.generateTexture('circle', 24, 24, true);
    const radius = circle.width / 2;
    this.player = this.physics.add.sprite(GAME_OPTS.CAM.WIDTH / 2, GAME_OPTS.CAM.HEIGHT / 2, 'circle');
    this.player.body.velocity = new Phaser.Math.Vector2(0, 0);
    this.player.setOrigin(0.5);
    this.player.setCircle(radius);
    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, 0, GAME_OPTS.MAP.WIDTH, GAME_OPTS.MAP.HEIGHT);
    this.cameras.main.startFollow(this.player, true, 0, 0);
    this.player.setDepth(100);
    this.group.add(this.player);
    this.player.visual = circle;
    loading = false;
    circle.setVisible(false);
  }

  generateBackgroundStars = () => {
    const starColors = [0xffffff, 0x00ffff, 0xffff99, 0xffcc99, 0xffff66];
    const awayStarPoints = [];
    let qStars = 0;
    for (let r = 1000; r < GAME_OPTS.MAP.CENTER.x; r += r ** (0.6)) {
      const numStars = Math.floor(Math.pow(r, 1.42) * GAME_OPTS.STAR_DENSITY);
      for (let i = 0; i < numStars; i++) {
        const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
        const distance = Phaser.Math.FloatBetween(80, r);
        const starColor = Phaser.Utils.Array.GetRandom(starColors);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const awayStarGraphics = this.add.graphics(GAME_OPTS.MAP.CENTER).setDepth(5);
        awayStarGraphics.fillStyle(starColor, 0.65);
        awayStarGraphics.fillRect(x, y, 2, 2);
        this.awayStarsGroup.add(awayStarGraphics);
        awayStarPoints.push(awayStarGraphics);
        qStars++;
      }
    }
    for (let i = 0; i < GAME_OPTS.Q_MID_STARS; i++) {
      const starColor = Phaser.Utils.Array.GetRandom(starColors);
      const x = Phaser.Math.Between(-GAME_OPTS.CAM.PARALAX_OFFSET, GAME_OPTS.MAP.WIDTH + GAME_OPTS.CAM.PARALAX_OFFSET);
      const y = Phaser.Math.Between(-GAME_OPTS.CAM.PARALAX_OFFSET, GAME_OPTS.MAP.HEIGHT + GAME_OPTS.CAM.PARALAX_OFFSET);
      const midStarGraphics = this.add.graphics().setDepth(5);
      midStarGraphics.fillStyle(starColor, 0.8);
      midStarGraphics.fillRect(x, y, 3, 3);
      this.midStarsGroup.add(midStarGraphics);
      qStars++;
    }
    for (let i = 0; i < GAME_OPTS.Q_NEAR_STARS; i++) {
      const starColor = 0xFFFFFF;
      const x = Phaser.Math.Between(-GAME_OPTS.CAM.PARALAX_OFFSET, GAME_OPTS.MAP.WIDTH + GAME_OPTS.CAM.PARALAX_OFFSET);
      const y = Phaser.Math.Between(-GAME_OPTS.CAM.PARALAX_OFFSET, GAME_OPTS.MAP.HEIGHT + GAME_OPTS.CAM.PARALAX_OFFSET);
      const nearStarGraphics = this.add.graphics().setDepth(5);
      nearStarGraphics.fillStyle(starColor, 0.7);
      nearStarGraphics.fillRect(x, y, 5, 5);
      this.nearStarsGroup.add(nearStarGraphics);
      qStars++;
    }
    console.log(`[CLIENT] ${qStars} stars generated`)
    this.tweens.add({ targets: awayStarPoints, duration: 800000, repeat: -1, ease: 'Linear', angle: 360, yoyo: false });
  }

  generateShootEffect = (shootPosition, shootColor) => {
    const playerShoot = this.add.graphics({ lineStyle: { width: 1, color: shootColor, alpha: 0.5 }, x: shootPosition.x, y: shootPosition.y, depth: 0 }).strokeCircle(0, 0, 5);
    this.tweens.add({ targets: playerShoot, duration: 200, repeat: 0, ease: 'Linear', scaleX: 50, scaleY: 50, alpha: 0, yoyo: false });
    setTimeout(() => {
      playerShoot.destroy();
    }, 400)
  }

  generatePlayerTrail = (x, y, vel) => {
    const trail = this.add.graphics({ lineStyle: { width: 1, color: this.player.color, alpha: GAME_OPTS.TRAIL_TRANSPARENCY * .01 * (vel / 360) }, x, y, depth: 0 }).strokeCircle(0, 0, 10);
    this.tweens.add({ targets: trail, duration: 2000, repeat: 0, ease: 'Linear', scaleX: 0, scaleY: 0, alpha: 0, yoyo: false });
    setTimeout(() => {
      trail.destroy();
    }, 300)
  };

  respawnPlayer = () => {
    const spawnPositions = generateLocalSpawnPositions(STARS ?? []);
    const spawnPosition = spawnPositions[0] ?? {
      x: GAME_OPTS.MAP.CENTER.x + 800,
      y: GAME_OPTS.MAP.CENTER.y,
    };

    this.player.setPosition(spawnPosition.x, spawnPosition.y);
    this.player.body.setVelocity(0, 0);
    this.player.body.setAcceleration(0, 0);
    this.player.health = 100;
    this.player.energy = 100;
    this.isShooting = false;
    this.outsideBlackHole = true;

    if (this.player.id && PLAYERS[this.player.id]) {
      PLAYERS[this.player.id].position = { ...spawnPosition };
      PLAYERS[this.player.id].velocity = { x: 0, y: 0 };
      PLAYERS[this.player.id].health = 100;
      PLAYERS[this.player.id].energy = 100;
    }
  }

  handleZoom = (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
    const zoomAmount = deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Phaser.Math.Clamp(this.cameras.main.zoom + zoomAmount, GAME_OPTS.CAM.MINZOOM, GAME_OPTS.CAM.MAXZOOM);
    if (newZoom !== this.cameras.main.zoom) {
      this.cameras.main.zoom = newZoom;
      this.cameras.main.centerOn(this.player.x, this.player.y);
      this.cameras.main.setBounds(0, 0, GAME_OPTS.MAP.WIDTH, GAME_OPTS.MAP.HEIGHT);
    }
  }

  handlePlayerCollisionWithPlayer = (player1, player2) => {
    this.player.health = Math.max(this.player.health - GAME_OPTS.DAMAGE.CRASH, 0);
    this.player.energy = 0;
    const playerCrashedAgainst = Object.values(PLAYERS).find(player => player.sprite == player2);
    console.log(player2.x, player2.y, playerCrashedAgainst.id)
    socket.emit('playersCrashed', { x: this.player.x, y: this.player.y }, { x: player2.x, y: player2.y }, this.player.id, playerCrashedAgainst.id);
  }

  renderArrow = (vector, color, alpha) => {
    const dx = vector.x;
    const dy = vector.y;
    const arrowAngle = Math.atan2(dy, dx);
    this.gui.accelerationArrow.lineStyle(8, color, alpha); // Línea principal

    this.gui.accelerationArrow.beginPath();
    this.gui.accelerationArrow.moveTo(this.player.x, this.player.y);
    this.gui.accelerationArrow.lineTo(this.player.x + dx, this.player.y + dy);
    this.gui.accelerationArrow.strokePath();

    this.gui.accelerationArrow.lineStyle(6, color, alpha); // Segmentos de la punta
    const tipLength = 20; // Ajusta la longitud de la punta de la flecha

    this.gui.accelerationArrow.beginPath();
    this.gui.accelerationArrow.moveTo(this.player.x + dx, this.player.y + dy);
    this.gui.accelerationArrow.lineTo(this.player.x + dx - tipLength * Math.cos(arrowAngle - Math.PI / 6), this.player.y + dy - tipLength * Math.sin(arrowAngle - Math.PI / 6));
    this.gui.accelerationArrow.strokePath();

    this.gui.accelerationArrow.beginPath();
    this.gui.accelerationArrow.moveTo(this.player.x + dx, this.player.y + dy);
    this.gui.accelerationArrow.lineTo(this.player.x + dx - tipLength * Math.cos(arrowAngle + Math.PI / 6), this.player.y + dy - tipLength * Math.sin(arrowAngle + Math.PI / 6));
    this.gui.accelerationArrow.strokePath();
  }
}

socket.on('connect', () => {
  console.log(`[CLIENT] Connected | ID: ${socket.id}`);
});

// socket.on('gift-playerId', (socketID) => {
//   this.player.id = socketID;
// });

socket.on('gift-log', (message) => {
  console.log(`[LOG] ${message}`);
});

socket.on('disconnect', () => {
  socket.emit('playerDisconnect', socket.id);
  delete PLAYERS[socket.id];
  console.log('[CLIENT] Local session disconnected');
});

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: GAME_OPTS.CAM.WIDTH,
  height: GAME_OPTS.CAM.HEIGHT,
  scene: [Game],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_OPTS.CAM.WIDTH,
    height: GAME_OPTS.CAM.HEIGHT,
  },
});