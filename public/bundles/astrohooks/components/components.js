Vue.component('v-header', {
    template: '\
        <div id="header">\
            <a href="/">Astronomía para gente apurada</a>\
            <a style="color: #55acee;" href="https://twitter.com/nsandobal_" target="_blank" id="fontawesome-button" role="button"><i class="fab fa-twitter fa-sm"></i></a>\
            <a style="color: #ac2bac;" href="https://instagram.com/sandobyte" target="_blank" id="fontawesome-button" role="button"><i class="fab fa-instagram fa-sm"></i></a>\
        </div>',
});

Vue.component('v-sidebar', {
    template: '\
        <div class="flexbox" id="sidebar">\
            <ul>\
                <a href="#resume"><li>Resumen</li></a>\
                <a id="menu-practicas" v-on:click="change_practicas_status()"><li>Prácticas</li></a>\
                <div id="practicas-opciones">\
                    <a id="sidebar-practica" href="#practica1"><li>Práctica 1</li></a>\
                    <a id="sidebar-practica" href="#practica3"><li>Práctica 2</li></a>\
                    <a id="sidebar-practica" href="#practica3"><li>Práctica 3</li></a>\
                    <a id="sidebar-practica" href="#practica4"><li>Práctica 4</li></a>\
                    <a id="sidebar-practica" href="#practica5"><li>Práctica 5</li></a>\
                    <a id="sidebar-practica" href="#practica6"><li>Práctica 6</li></a>\
                    <a id="sidebar-practica" href="#practica7"><li>Práctica 7</li></a>\
                </div>\
                <a><img id="sidebar-img" src="./assets/rotating-galaxy.gif" alt=""></a>\
            </ul>\
        </div>',
});

Vue.component('v-footer', {
    template: '\
        <div id="footer">\
            <div class="flexbox" id="footer-container">\
                <div>\
                    <a style="color: #cacaca;" href="https://github.com/nikosanarg" target="_blank" id="fontawesome-button-footer" role="button"><i class="fab fa-github fa-2x"></i></a>\
                    <a style="color: #00589b;" href="https://www.linkedin.com/in/nicolás-sandobal-988b82133/" target="_blank" id="fontawesome-button-footer" role="button"><i class="fab fa-linkedin fa-2x"></i></a>\
                    <a style="color: #55acee;" href="https://twitter.com/nsandobal_" target="_blank" id="fontawesome-button-footer" role="button"><i class="fab fa-twitter fa-2x"></i></a>\
                </div>\
                <div>\
                    <a style="color: #ac2bac;" href="https://instagram.com/sandobyte" target="_blank" id="fontawesome-button-footer" role="button"><i class="fab fa-instagram fa-2x"></i></a>\
                    <a style="color: #72ee67;" href="https://instagram.com/nsandobal" target="_blank" id="fontawesome-button-footer" role="button"><i class="fab fa-instagram fa-2x"></i></a>\
                    <a style="color: #79c5ff;" href="https://t.me/Arlistan" target="_blank" id="fontawesome-button-footer" role="button"><i class="fab fa-telegram-plane fa-2x"></i></a>\
                </div>\
            </div>\
            <div class="flexbox" id="footer-container">\
                <div>\
                    <div id="f-email"><a>nicsandobal@gmail.com</a></div>\
                    <a style="color: #ff7777;" href="https://google.com.ar/" target="_blank" id="fontawesome-button-footer" role="button"><i class="fas fa-envelope fa-2x"></i></a>\
                </div>\
                <img src="./assets/unlp-logo.png"></img>\
            </div>\
        </div>',
});

const titles = [
    'Repaso de trigonometría plana',
    'Esfera celeste',
    'Movimiento diurno de los astros',
    'Sistemas de coordenadas locales',
    'Transformaciones de coordenadas locales',
    'Movimiento anual aparente del sol',
    'Sistema de coordenadas absoluto',
];

const practicas_description = [
    'La trigonometría es una parte de la matemática que se ocupa de la medición de triángulos. Conocer las medidas de los triángulos implica saber cuáles son sus ángulos y sus lados. En el caso de la trigonometría plana, se estudian triángulos en el plano.',
    'Una esfera es una superficie definida por todos los puntos equidistantes a un punto llamado centro. La distancia al centro es el radio de la esfera. En nuestro caso estudiaremos al firmamento como una esfera que rodea a nuestro planeta.',
    'Viéndolo desde la perspectiva del observador, el cielo se mueve. Pero, en realidad, lo que realmente se mueve es el mismo observador. ¿Por qué? La tierra rota. El observador sobre la Tierra no percibe este movimiento, sino que ve el reflejo de su propio movimiento en la esfera celeste.',
    'El sistema horizontal, es, tal vez, el sistema de coordenadas celeste más intuitivo y conectado con el observador. Tiene como plano fundamental el horizonte, y como eje perpendicular la línea cenit-nadir. Las coordenadas de este sistema son: acimut y altura (o distancia cenital).',
    'Habíamos definido dos sistemas de coordenadas, el horizontal y el ecuatorial local. Estos sistemas son locales, ya que dependen de la ubicación del observador. Nos interesa ahora averiguar cómo calcular las coordenadas de un sistema conociendo sabiendo las del otro.',
    'Interpretamos su movimiento en otros fenómenos que conocemos actualmente como la rotación de la Tierra, la eclíptica, el eje de rotación, las estaciones, y tonterías como el "horóscopo", etc.',
    'Vamos a definir dos sistemas de coordenadas absolutos: el sistema ecuatorial celeste y el ecliptical. Las coordenadas absolutas son prácticamente las mismas para cualquier observador en cualquier momento.',
];

Vue.component('pdf-resource', {
    props: {
        index: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    methods: {
        getTitle() {
            return titles[this.index-1];
        },
        getDescription() {
            return practicas_description[this.index-1];
        },
    },
    template: `\
        <div class="titulo-pdf">\
            <p><h1>Práctica {{ this.index }} </h1><h3>( </h3><h5>\
                <a :href="'./practica/practica0' + (this.index) + '.pdf'" target="_blank">PDF Práctica</a> | \
                <a :href="'./practica/practica0' + (this.index) + '-exp.pdf'" target="_blank">PDF teórico</a>\
            </h5><h3> )</h3></p>\
            <h3>{{ getTitle() }}</h3>\
            <p>{{ getDescription() }}</p>\
        </div>`,
});

Vue.component('flecha-resultado', {
    template: `<a><img src="./assets/right-arrow.png" id="flecha-resultados" title="Click para limpiar los datos"></a>`,
});