function catch_inputs(excercise, quantity) {
    let results = []
    for (let i = 1; i <= quantity; i++) {
        results.push(document.getElementById(excercise + "-i" + i).value - 0);
    }
    return results;
}

function gOverflow360(grades) {
    (grades >= 360) ? grades %= 360 : true;
    return grades;
}

function nViewFormat(val) { 
    return parseFloat(Math.round(val * 100000) / 100000);
}

function g2rad(val) {
    let grades = val * Math.PI / 180;
    grades = nViewFormat(gOverflow360(grades));
    return grades;
}
function g2gms(val) { 
    val = gOverflow360(val);
    let grades = Math.trunc(val);
    let minutes = Math.trunc((val - grades) * 60);
    let seconds = Math.round((((val - grades) * 60) - minutes) * 60);
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    } 
    if (minutes == 60) {
        minutes = 0;
        hours++;
    }
    return [grades, minutes, seconds];
}
function g2hms(val) {
    val = gOverflow360(val);
    let hours = Math.trunc(val * 12 / 180); 
    let minutes = Math.trunc(((val * 12 / 180) - hours) * 60); 
    let seconds = Math.round(((((val * 12 / 180) - hours) * 60) - minutes) * 60);
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    } 
    if (minutes == 60) {
        minutes = 0;
        hours++;
    }
    return [hours, minutes, seconds];
}

function gms2g(val1, val2, val3) {
    val1 = gOverflow360(val1);
    let grades = nViewFormat(val1 + (val2 / 60) + (val3 / 3600));
    return grades;
}
function gms2rad(val1, val2, val3) {
    let grades = gms2g(val1, val2, val3);
    let radians = nViewFormat(grades * Math.PI / 180);
    return radians;
}
function gms2hms(val1, val2, val3) {
    let grades = gms2g(val1, val2, val3);
    return g2hms(grades);
}

function rad2g(val) {
    let grades = val * 180 / Math.PI;
    grades = nViewFormat(gOverflow360(grades));
    return grades;
}
function rad2gms(val) {
    let grades = rad2g(val);
    grades = gOverflow360(grades);
    return g2gms(grades);
}
function rad2hms(val) {
    let grades = rad2g(val);
    grades = gOverflow360(grades);
    return g2hms(grades);
}

function hms2g(val1, val2, val3) {
    let grades = ((val1 + (val2 / 60) + (val3 / 3600)) * 180 / 12);
    grades = nViewFormat(gOverflow360(grades));
    return grades;
}
function hms2rad(val1, val2, val3) {
    let grades = hms2g(val1, val2, val3);
    let radians = nViewFormat(grades * Math.PI / 180);
    return radians;
}
function hms2gms(val1, val2, val3) {
    let grades = hms2g(val1, val2, val3);
    return g2gms(grades);
}

function gCuadrante(grad) {
    grad = nViewFormat(grad);
    if (grad > 0 && grad < 90) {
        return "Primero"
    } else if (grad > 90 && grad < 180) {
        return "Segundo"
    } else if (grad > 180 && grad < 270) {
        return "Tercero"
    } else if (grad > 270 && grad < 360) {
        return "Cuarto"
    } else {
        switch (grad) {
            case 0:
            case 360: return "Primero y cuarto";
            case 90: return "Primero y segundo";
            case 180: return "Segundo y tercero";
            case 270: return "Tercero y cuarto";
        }
    }
}

function rad2arco(r) {
    return rad2g(r) * (Math.PI / 180);
}

function rad2cuerda(r) {
    return 2 * Math.sin(r/2);
}

function gTrigonometricas(rad) {
    let opt = document.getElementById("p1-2-select").value;
    let grades;
    (opt == "p1-x5-1") ? grades = document.getElementById('p1-x5-i1').value : grades = rad2g(rad);
    let results = [];
    results.push(nViewFormat(Math.sin(rad)));
    results.push(nViewFormat(Math.cos(rad)));
    (grades == 90 || grades == 270) ? results.push("∉ ℝ") : results.push(nViewFormat(Math.tan(rad)));
    (grades == 0 || grades == 180 || grades == 360) ? results.push("∉ ℝ") : results.push(nViewFormat(1/Math.sin(rad)));
    (grades == 90 || grades == 270) ? results.push("∉ ℝ") : results.push(nViewFormat(1/Math.cos(rad)));
    (grades == 0 || grades == 180 || grades == 360) ? results.push("∉ ℝ") : results.push(nViewFormat(1/Math.tan(rad)));
    results.push(nViewFormat(rad2arco(rad)));
    results.push(nViewFormat(rad2cuerda(rad)));
    return results;
}