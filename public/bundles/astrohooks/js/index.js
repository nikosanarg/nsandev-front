p1_1_open = true;
resumen_open = false;



function change_practicas_status() {
    let sidebar_submenu = document.getElementById("practicas-opciones");
    practicas_open ^= true; //alternate true/false on each click
    sidebar_submenu.style.display = practicas_open ? 'block' : 'none'
}

function show_resume() {
    let resumen = document.getElementById("resume-p");
    let r_button = document.getElementById("resume-button");
    if (resumen_open) {
        resumen.classList.remove('resume-expand');
        resumen.classList.add('resume-contract');
        r_button.style.transform = "rotate(0deg)";
    } else {
        resumen.classList.remove('resume-contract');
        resumen.classList.add('resume-expand');
        r_button.style.transform = "rotate(180deg)";
    }    
    resumen_open ^= true;
}

function show_p1_1() {
	let p1 = document.getElementById("p1-1");
	let r_button = document.getElementById("p1-1-button");
	if (p1_1_open) {
        p1.classList.remove('visible');
        p1.classList.add('invisible');
        r_button.style.transform = "rotate(0deg)";
    } else {
        p1.classList.remove('invisible');
        p1.classList.add('visible');
        r_button.style.transform = "rotate(0deg)";
    }    
	p1_1_open ^= true;
}

horizontal_h = true;

function p4_update_z() {
	let h = document.getElementById("p4-x1-i3").value;
	document.getElementById("p4-x1-i4").value = 90 - h;
	horizontal_h = true;
}

function p4_update_h() {
	let z = document.getElementById("p4-x1-i4").value;
	document.getElementById("p4-x1-i3").value = 90 - z;
	horizontal_h = false;
}

/*======================= VUE.js =========================*/

var app = new Vue({
    el:'#app',
    data:{
        page_title: 'Astronomía para gente apurada',
        resume_description: 'Este pequeño sitio es un trabajo heurístico para uso pura y exclusivamente académico, en el contexto del proceso de aprendizaje de la carrera de Licenciatura en Astronomía en la Universidad Nacional de La Plata. Pueden encontrar información de contacto al final del documento. Soy un estudiante avanzado de Ingeniería en Sistemas (UTN) y comenzando la Licenciatura en Astronomía (UNLP), por lo que este sitio es una conjunción entre ambas disciplinas. Se ofrecen diversas herramientas de cálculos simples y repetitivos, relacionadas con el cálculo de equivalencias, ángulos, entre otros conocimientos básicos de trigonometría. Para ejercicios de mayor nivel de razonamiento es fundamental que el alumno sepa plantear y resolver problemas por su cuenta y use esta web de forma meramente de apoyo.',
    },
});

p3_x1_calc();
p4_x1_calc();