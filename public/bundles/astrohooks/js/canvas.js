function p3_x1_calc() {
    let [i1, i2, i3] = catch_inputs('p3-x1', 3);
    let cp2 = document.getElementById('canvas-p3');
    let ctx = cp2.getContext('2d');
    ctx.clearRect(0, 0, 500, 300);
    let centerX = 155, centerY = 150, radius = 120, amplitud = 45;
    let radians = gms2rad(i1, i2, i3);
    let posX = radius * Math.cos(radians);
    let posY = radius * Math.abs(Math.sin(radians));
    let PCsuperior, PCinferior, pCardinalDerecha, pCardinalIzquierda, pCardinalSuperior, pCardinalInferior, gName;
	(Math.abs(radians) > 0.5) ? gName = "Ø" : gName = "";
	let canvas3_references = [true, true, true, true, true, true];
	if (document.getElementById("p3-trayectorias-switch").checked) {
		(Math.abs(radians) < 1.2) ? canvas3_references[3] = true : canvas3_references[3] = false;
		(Math.abs(radians) > 0.35) ? canvas3_references[4] = true : canvas3_references[4] = false;
		(Math.abs(radians) > 0.35) ? canvas3_references[5] = true : canvas3_references[5] = false;
	} else {
		canvas3_references[3] = false;
		canvas3_references[4] = false;
		canvas3_references[5] = false;
	}
    if (radians > 0) {
        PCsuperior = "PCN";
        PCinferior = "PCS";
        pCardinalIzquierda = "HN";
        pCardinalDerecha = "HS";
        pCardinalSuperior = "E";
        pCardinalInferior = "W";
    } else if (radians < 0) {
        PCsuperior = "PCS";
        PCinferior = "PCN";
        pCardinalIzquierda = "HS";
        pCardinalDerecha = "HN";
        pCardinalSuperior = "W";
        pCardinalInferior = "E";
    } else {
        PCsuperior = "";
        PCinferior = "";
        pCardinalIzquierda = "";
        pCardinalDerecha = "";
        pCardinalSuperior = "";
        pCardinalInferior = "";
    }

 	// curva punteada trasera del horizonte
	ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, amplitud, Math.PI, 0, Math.PI);
    ctx.setLineDash([10, 10]); ctx.lineWidth = 1; ctx.strokeStyle="dodgerblue"; ctx.stroke();

	// curva punteada trasera de la trayectoria diurna
	if (canvas3_references[3]) {
		ctx.beginPath();
		ctx.ellipse(centerX - posX*0.35, centerY - posY*0.35, radius*0.92, amplitud*0.8, Math.abs(radians) + Math.PI/2, 0, Math.PI);
		ctx.setLineDash([3, 3]); ctx.lineWidth = 1.5; ctx.strokeStyle="#48ad5e"; ctx.stroke();
	}

	// curva punteada trasera de la trayectoria inferior
	if (canvas3_references[3]) {
		ctx.beginPath();
		ctx.ellipse(centerX + posX*0.35, centerY + posY*0.35, radius*0.92, amplitud*0.8, Math.abs(radians) + Math.PI/2, 0, Math.PI);
		ctx.setLineDash([3, 3]); ctx.lineWidth = 1.5; ctx.strokeStyle = "#48ad5e"; ctx.stroke();
}

	// curva punteada trasera del astro circumpolar (en el polo visible)
	if (canvas3_references[4]) {
		ctx.beginPath();
		ctx.ellipse(centerX - posX*0.92, centerY - posY*0.92, radius*0.35, amplitud/8, Math.abs(radians) + Math.PI/2, 0, Math.PI);
		ctx.setLineDash([3, 3]); ctx.lineWidth = 1.5; ctx.strokeStyle="darkviolet"; ctx.stroke();
	}

	// curva punteada trasera del astro no visible
	if (canvas3_references[5]) {
		ctx.beginPath();
		ctx.ellipse(centerX + posX*0.92, centerY + posY*0.92, radius*0.35, amplitud/8, Math.abs(radians) + Math.PI/2, 0, Math.PI);
		ctx.setLineDash([3, 3]); ctx.lineWidth = 1.5; ctx.strokeStyle="violet"; ctx.stroke();
	}

    // línea punteada central del horizonte
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.setLineDash([5, 5]); ctx.lineWidth = 1; ctx.strokeStyle="dodgerblue"; ctx.stroke();

    // línea punteada central del ecuador
    ctx.beginPath();
    ctx.moveTo(centerX - posY, centerY + posX);
    ctx.lineTo(centerX + posY, centerY - posX);
    ctx.setLineDash([5, 5]); ctx.lineWidth = 1; ctx.strokeStyle="orange"; ctx.stroke();

    // recta complementaria del ángulo -> punto PC inferior
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + posX, centerY + posY);
    ctx.setLineDash([5, 5]); ctx.lineWidth = 1; ctx.strokeStyle="grey"; ctx.stroke();

    // curva punteada trasera del ecuador
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, amplitud, Math.abs(radians) + Math.PI/2, 0, Math.PI);
    ctx.setLineDash([10, 10]); ctx.lineWidth = 1; ctx.strokeStyle="orange"; ctx.stroke();

    // línea punteada cenit-nadir
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    ctx.setLineDash([13, 5]); ctx.lineWidth = 1; ctx.strokeStyle="violet"; ctx.stroke();

    // curva del ángulo
    ctx.beginPath();
    ctx.arc(centerX, centerY, 35, Math.PI, Math.abs(radians) - Math.PI + 0.001);
    ctx.setLineDash([]); ctx.lineWidth = 3; ctx.strokeStyle="green"; ctx.stroke();

    // recta del ángulo -> punto PC superior
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - posX, centerY - posY);
    ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="black"; ctx.stroke();

    // circunferencia principal & meridiano del lugar
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="red"; ctx.stroke();
    
    // curva frontal del ecuador
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, amplitud, Math.abs(radians) - Math.PI/2, 0, Math.PI);
    ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="orange"; ctx.stroke();
    
	// curva frontal de la trayectoria diurna superior
	if (canvas3_references[3]) {
		ctx.beginPath();
		ctx.ellipse(centerX - posX*0.35, centerY - posY*0.35, radius*0.93, amplitud*0.8, Math.abs(radians) - Math.PI/2, 0, Math.PI);
		ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="#48ad5e"; ctx.stroke();
	}

	// curva frontal de la trayectoria diurna inferior
	if (canvas3_references[3]) {
		ctx.beginPath();
		ctx.ellipse(centerX + posX*0.35, centerY + posY*0.35, radius*0.93, amplitud*0.8, Math.abs(radians) - Math.PI/2, 0, Math.PI);
		ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="#48ad5e"; ctx.stroke();
	}

	// curva frontal del astro circumpolar (en el polo visible)
	if (canvas3_references[4]) {
		ctx.beginPath();
		ctx.ellipse(centerX - posX*0.92, centerY - posY*0.92, radius*0.35, amplitud/8, Math.abs(radians) - Math.PI/2, 0, Math.PI);
		ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="darkviolet"; ctx.stroke();
	}

	// curva frontal del astro no visible
	if (canvas3_references[5]) {
		ctx.beginPath();
		ctx.ellipse(centerX + posX*0.92, centerY + posY*0.92, radius*0.35, amplitud/8, Math.abs(radians) - Math.PI/2, 0, Math.PI);
		ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="violet"; ctx.stroke();
	}

    // curva frontal del horizonte
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, amplitud, 0, 0, Math.PI);
    ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="dodgerblue"; ctx.stroke();
    
	// textos
	ctx.font = "bold 16px Arial";
    ctx.fillStyle = "dodgerblue"; 	ctx.fillText(pCardinalDerecha, centerX+radius+5, centerY+7);
    ctx.fillStyle = "dodgerblue"; 	ctx.fillText(pCardinalIzquierda, centerX-radius-27, centerY+7);
    ctx.fillStyle = "blue";			ctx.fillText(pCardinalSuperior, centerX-35, centerY-35);
    ctx.fillStyle = "blue";			ctx.fillText(pCardinalInferior, centerX+25, centerY+50);
    ctx.fillStyle = "purple"; 		ctx.fillText("cenit", centerX-17, centerY-radius-5);
    ctx.fillStyle = "purple"; 		ctx.fillText("nadir", centerX-17, centerY+radius+17);
    ctx.fillStyle = "purple"; 		ctx.fillText("O", centerX+3, centerY-3);
    ctx.fillStyle = "black";  		ctx.fillText(PCsuperior, centerX-posX-35, centerY-posY-10);
    ctx.fillStyle = "black";  		ctx.fillText(PCinferior, centerX+posX+2, centerY+posY+20);
    ctx.fillStyle = "green";  		ctx.fillText(gName, centerX-50, centerY-5);

	let margin_left = 332;
	let margin_top = 10;
	let top_step = 35;
	ctx.beginPath(); ctx.rect(margin_left-10, margin_top = margin_top+top_step, 100, 30); 
	canvas3_references[0] ? ctx.fillStyle="#d0febb" : ctx.fillStyle="lightgrey" ; ctx.fill();
	ctx.beginPath(); ctx.rect(margin_left-10, margin_top = margin_top+top_step, 100, 30); 
	canvas3_references[1] ? ctx.fillStyle="#d0febb" : ctx.fillStyle="lightgrey" ; ctx.fill();
	ctx.beginPath(); ctx.rect(margin_left-10, margin_top = margin_top+top_step, 100, 30);
	canvas3_references[2] ? ctx.fillStyle="#d0febb" : ctx.fillStyle="lightgrey" ; ctx.fill();
	ctx.beginPath(); ctx.rect(margin_left-10, margin_top = margin_top+top_step, 100, 30);
	canvas3_references[3] ? ctx.fillStyle="#d0febb" : ctx.fillStyle="lightgrey" ; ctx.fill();
	ctx.beginPath(); ctx.rect(margin_left-10, margin_top = margin_top+top_step, 100, 30);
	canvas3_references[4] ? ctx.fillStyle="#d0febb" : ctx.fillStyle="lightgrey" ; ctx.fill();
	ctx.beginPath(); ctx.rect(margin_left-10, margin_top = margin_top+top_step, 100, 30);
	canvas3_references[5] ? ctx.fillStyle="#d0febb" : ctx.fillStyle="lightgrey" ; ctx.fill();
	
	margin_top = 30;
	ctx.font = "bold 14px Arial";
	ctx.fillStyle = "red"; 
	ctx.fillText("Meridiano", margin_left+8, margin_top = margin_top+top_step);
	ctx.fillStyle = "dodgerblue"; 
	ctx.fillText("Horizonte", margin_left+8, margin_top = margin_top+top_step);
	ctx.fillStyle = "orange"; 
	ctx.fillText("Ecuador", margin_left+12, margin_top = margin_top+top_step);
	(canvas3_references[3]) ? ctx.fillStyle = "#48ad5e" : ctx.fillStyle = "white"; 
	ctx.fillText("Tray. diurna", margin_left+2, margin_top = margin_top+top_step);
	(canvas3_references[4]) ? ctx.fillStyle = "darkviolet" : ctx.fillStyle = "white"; 
	ctx.fillText("Circumpolar", margin_left, margin_top = margin_top+top_step);
	(canvas3_references[5]) ? ctx.fillStyle = "violet" : ctx.fillStyle = "white"; 
	ctx.fillText("Inortiva", margin_left+16, margin_top = margin_top+top_step);
}
























let astro = new Image();   // Create new img element
astro.src = './assets/estrella_amarilla.png';

function p4_x1_calc() {
    let [acimut, latitud, altura, distancia] = catch_inputs('p4-x1', 4);
    let cp4 = document.getElementById('canvas-p4');
    let ctx = cp4.getContext('2d');
	let astro = new Image();   // Create new img element
	astro.src = './assets/estrella_amarilla.png';

    ctx.clearRect(0, 0, 425, 425);
    let centerX = 215, centerY = 215, radius = 180, amplitud = 45;
    let radacimut = g2rad(acimut);
	let radlatitud = g2rad(latitud);
	let radaltura = g2rad(altura);
    let posX = radius * Math.cos(radacimut);
    let posY = radius * Math.abs(Math.sin(radacimut));
	let posXlatitud = radius * Math.cos(radlatitud);
    let posYlatitud = radius * Math.abs(Math.sin(radlatitud));
    let PCsuperior, PCinferior, pCardinalDerecha, pCardinalIzquierda, pCardinalSuperior, pCardinalInferior;

	if (acimut <= 180) {
		pCardinalIzquierda = "HN";
        pCardinalDerecha = "HS";
        pCardinalSuperior = "E";
        pCardinalInferior = "W";
	} else {
		pCardinalIzquierda = "HS";
        pCardinalDerecha = "HN";
        pCardinalSuperior = "W";
        pCardinalInferior = "E";
	}

	if (latitud == 0) {
		PCsuperior = "";
        PCinferior = "";
        pCardinalIzquierda = "";
        pCardinalDerecha = "";
        pCardinalSuperior = "";
        pCardinalInferior = "";
	} else if (latitud > 0) {
		PCsuperior = "PN";
        PCinferior = "PS";
	} else {
		PCsuperior = "PS";
        PCinferior = "PN";
	}

	let lat_rotation = false, rot;
    // recta que representa la latitud y une los polos celestes
	if (latitud != 0) {
		ctx.font = "bold 16px Arial";
		if ((latitud > 0 && acimut < 180) || (latitud < 0 && acimut > 180)) {
			ctx.beginPath();
			ctx.moveTo(centerX - posXlatitud, centerY - posYlatitud);
			ctx.lineTo(centerX + posXlatitud, centerY + posYlatitud);
			ctx.setLineDash([5, 5]); ctx.lineWidth = 1; ctx.strokeStyle="lightgray"; ctx.stroke();
			ctx.fillStyle = "black";  		ctx.fillText(PCsuperior, centerX-posXlatitud-35, centerY-posYlatitud-10);
			ctx.fillStyle = "black";  		ctx.fillText(PCinferior, centerX+posXlatitud+2, centerY+posYlatitud+20);
			lat_rotation = true;
		} else {
			ctx.beginPath();
			ctx.moveTo(centerX - posXlatitud, centerY + posYlatitud);
			ctx.lineTo(centerX + posXlatitud, centerY - posYlatitud);
			ctx.setLineDash([5, 5]); ctx.lineWidth = 1; ctx.strokeStyle="lightgray"; ctx.stroke();
			ctx.fillStyle = "black";  		ctx.fillText(PCsuperior, centerX+posXlatitud+2, centerY-posYlatitud-10);
			ctx.fillStyle = "black";  		ctx.fillText(PCinferior, centerX-posXlatitud-35, centerY+posYlatitud+20);
		}		
	}

 	// curva punteada trasera del horizonte
	ctx.beginPath();
	ctx.ellipse(centerX, centerY, radius, amplitud, Math.PI, 0, Math.PI);
	ctx.setLineDash([10, 10]); ctx.lineWidth = 1; ctx.strokeStyle="#48ad5e"; ctx.stroke();
 
	// curva punteada trasera del ecuador
	ctx.beginPath();
	rot = Math.abs(radlatitud) - 3*Math.PI/2;
	if (!lat_rotation) rot *= -1;
	ctx.ellipse(centerX, centerY, radius, amplitud, rot, 0, Math.PI);
	ctx.setLineDash([10, 8]); ctx.lineWidth = 1; ctx.strokeStyle="lightgray"; ctx.stroke();

    // línea cenit-nadir
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    ctx.setLineDash([]); ctx.lineWidth = 3; ctx.strokeStyle="rgba(200,50,200,0.2)"; ctx.stroke();

	// referencia de la altura y distancia cenital
	ctx.beginPath();
	ctx.ellipse(centerX, centerY, radius, Math.abs(Math.cos(g2rad(acimut))*180), 3*Math.PI/2, 0, 2*Math.PI);
	ctx.setLineDash([5, 5]); ctx.lineWidth = 1; ctx.strokeStyle="lightgreen"; ctx.stroke();

    // línea punteada central del horizonte
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.setLineDash([5, 5]); ctx.lineWidth = 1; ctx.strokeStyle="#48ad5e"; ctx.stroke();

	// superficie verde del horizonte
	ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, amplitud, Math.PI, 0, 2*Math.PI);
    ctx.fillStyle="rgba(72,173,94,0.12)"; ctx.fill();

    // circunferencia principal & meridiano del lugar
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="darkgrey"; ctx.stroke();

	// curva frontal del ecuador
	ctx.beginPath();
	rot = Math.abs(radlatitud) - Math.PI/2;
	if (!lat_rotation) rot *= -1;
	ctx.ellipse(centerX, centerY, radius, amplitud, rot, 0, Math.PI);
	ctx.setLineDash([]); ctx.lineWidth = 1.5; ctx.strokeStyle="lightgray"; ctx.stroke();

    // curva frontal del horizonte
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, amplitud, 0, 0, Math.PI);
    ctx.setLineDash([]); ctx.lineWidth = 2; ctx.strokeStyle="#48ad5e"; ctx.stroke();

	if (acimut <= 180) {
		// curva del acimut solo en la cara inicial
		ctx.beginPath();
		ctx.ellipse(centerX, centerY, radius, amplitud, 0, 0, radacimut);
		ctx.setLineDash([]); ctx.lineWidth = 3; ctx.strokeStyle="red"; ctx.stroke();
	} else {
		// curvas del acimut, primeros 180° de detrás
		ctx.beginPath();
		ctx.ellipse(centerX, centerY, radius, amplitud, Math.PI, 0, Math.PI);
		ctx.setLineDash([5, 3]); ctx.lineWidth = 2; ctx.strokeStyle="red"; ctx.stroke();
		// curvas del acimut, acimut faltante en la nueva cara frontal
		ctx.beginPath();
		ctx.ellipse(centerX, centerY, radius, amplitud, 0, 0, radacimut-Math.PI);
		ctx.setLineDash([]); ctx.lineWidth = 4; ctx.strokeStyle="red"; ctx.stroke();
	}

	let escala = Math.abs(0.26*Math.sin(g2rad(acimut % 180)));
	let pInicio, pFinal, recorrido, c_recorrido;
	recorrido = (90-Math.abs(altura))/90;

	// Opción 1: SISTEMA HORIZONTAL (NACE EN EL HORIZONTE)
	if (horizontal_h) { 
		if (altura == 0 || acimut%90 == 0) {
			pInicio = pFinal = 0
		} else if ((acimut > 90 && acimut < 180) || (acimut > 270 && acimut < 360)) { 
			pInicio = 3*Math.PI/2 - escala;
			if (altura >= 0) {
				pFinal = -recorrido*(pInicio - Math.PI) - 2*recorrido*escala;
			} else {
				pFinal = recorrido*(pInicio- Math.PI) + Math.PI;
			}
		} else { 
			pInicio = Math.PI/2 + escala;
			if (altura >= 0) {
				pFinal = recorrido*pInicio;
			} else {
				pFinal = -recorrido*pInicio + Math.PI + 2*recorrido*escala;
			}
		}
		
		let h_clockwise; // sentido horario
		if ((acimut<90 && acimut>0 && altura<0) || 
			(acimut<180 && acimut>90 && altura>0) || 
			(acimut<270 && acimut>180 && altura<0) || 
			(acimut<360 && acimut>270 && altura>0)) {
			h_clockwise = false;
		} else {
			h_clockwise = true;
		}

		ctx.beginPath();
		ctx.ellipse(centerX, centerY, radius,
			Math.abs(Math.cos(g2rad(acimut))*radius), // amplitud
			3*Math.PI/2, // rotación
			pInicio, // inicio
			pFinal,// fin
			h_clockwise 
		);
		ctx.setLineDash([]); ctx.lineWidth = 4; ctx.strokeStyle="blue"; ctx.stroke();

	// Opción 2: DIRECCION CENITAL (NACE EN EL CENIT)
	} else if (distancia != 0 && distancia != 180) { 
		c_recorrido = (180-distancia)/180;
		if (distancia < 90) {
			pFinal = 2*((Math.PI/2)+escala)*(1-c_recorrido);
		} else {
			pFinal = (2*(Math.PI/2)*escala) + 2*((Math.PI/2)-escala)*(1-c_recorrido) - escala;
		}

		let c_clockwise;
		if ((acimut > 0 && acimut < 90) || (acimut > 180 && acimut < 270)) {
			c_clockwise = false;
		} else {
			c_clockwise = true;
			pFinal *= -1;
		}

		ctx.beginPath();
		ctx.ellipse(centerX, centerY, radius, 
			Math.abs(Math.cos(g2rad(acimut))*radius), // amplitud
			3*Math.PI/2, // rotación
			0, // inicio
			pFinal, // fin
			c_clockwise
		);
		ctx.setLineDash([]); ctx.lineWidth = 4; ctx.strokeStyle="blue"; ctx.stroke();
		
	} // SI NO ES HORIZONTAL NI CENITAL, NO SE DIBUJAN LAS CURVAS RESULTANTES

	// RENDERIZADO DE LA ESTRELLA
	if (acimut != 0 && (altura != 0 || distancia != 0)) {

		let astroX = radius * Math.cos(radacimut) * Math.cos(radaltura);
		(altura >= 0) ? astroX *= 1 : astroX *= 0.99;
		if (acimut > 180) astroX *= -1;

		let astroY = 0;
		if (altura > 0) { // hemisferio norte
			astroY = radius * recorrido**2 + (recorrido)*60*Math.abs(Math.sin(radacimut)) - 200;
		} else { // hemisferio sur
			astroY = -radius * recorrido**1.5 + (recorrido)*30*Math.abs(Math.sin(radacimut)) + 175 - 12*(1-recorrido);
		}

		ctx.drawImage(astro, centerX-15+astroX, centerY+escala+astroY, 30, 30);
	}
	
    
	// textos
	ctx.font = "bold 16px Arial";
    ctx.fillStyle = "dodgerblue"; 	ctx.fillText(pCardinalDerecha, centerX+radius+5, centerY+7);
    ctx.fillStyle = "dodgerblue"; 	ctx.fillText(pCardinalIzquierda, centerX-radius-27, centerY+7);
    ctx.fillStyle = "blue";			ctx.fillText(pCardinalSuperior, centerX-40, centerY-52);
    ctx.fillStyle = "blue";			ctx.fillText(pCardinalInferior, centerX+20, centerY+62);
    ctx.fillStyle = "purple"; 		ctx.fillText("Cenit", centerX-20, centerY-radius-5);
    ctx.fillStyle = "purple"; 		ctx.fillText("Nadir", centerX-20, centerY+radius+17);
}