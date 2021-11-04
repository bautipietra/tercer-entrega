const botonNumeros = document.getElementsByName('data-number');
const botonOpera = document.getElementsByName('data-opera');
const botonIgual = document.getElementsByName('data-igual')[0];
const botonDelete = document.getElementsByName('data-delete')[0];
var result = document.getElementById('result');
var opeActual = '';
var opeAnterior = '';
var operacion = undefined;

// Calculadora

botonNumeros.forEach(function(boton){
    boton.addEventListener('click', function(){
        agregarNumero(boton.innerText);
    })
});

botonOpera.forEach(function(boton){
    boton.addEventListener('click', function(){
        selectOperacion(boton.innerText);
    })
});

botonIgual.addEventListener('click', function(){
    calcular();
    actualizarDisplay();
});

botonDelete.addEventListener('click', function(){
    clear();
    actualizarDisplay();
});

function selectOperacion(op){
    if(opeActual === '') return;
    if (opeAnterior !== ''){
        calcular()
    }
    operacion = op.toString();
    opeAnterior = opeActual;
    opeActual = '';
}

function calcular(){
    var calculo;
    const anterior = parseFloat(opeAnterior);
    const actual = parseFloat(opeActual);
    if(isNaN(anterior) || isNaN(actual)) return;
    switch(operacion){
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case 'x':
            calculo = anterior * actual;
            break;
        case '/':
            calculo = anterior / actual;
            break;
        default:
            return
    }
    opeActual = calculo;
    operacion = undefined;
    opeAnterior = ''
}

function agregarNumero(num){
    opeActual = opeActual.toString() + num.toString();
    actualizarDisplay();
}

function clear(){
    opeActual = '';
    opeAnterior = '';
    operacion = undefined;
}

function actualizarDisplay(){
    result.value = opeActual
}

clear()

// Funciones Varias

$(document).ready(function(){
    console.log('La calculadora cargo, ya puedes hacer tus calculos :)')
    $('.display').attr('placeholder','813NV3N1D0');
})

$('.display').on('click', function(){
    $('.display').attr('placeholder','Empieza a calcular!');
})

// Dark Mode y Colores

$('.color-celeste').on('click', function(){
    $(".calculadora").css("filter", "invert(0)")
})

$('.color-rosa').on('click', function(){
    $(".calculadora").css("filter", "invert(100%)")
})

$('.dark-mode').on('click', function(){
    $("body").toggleClass("darkmode");
})

// Modal

if(document.getElementById("btnModal")){
    var modal = document.getElementById("tvesModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];

    btn.onclick = function() {
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    }

    span.onclick = function() {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }
}

// Formulario

$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault()

        var nombre = document.getElementById('nombre').value
        var email = document.getElementById('email').value
        var mensaje = document.getElementById('mensaje').value
        var alerta = document.getElementById('respa')

        $.post("process.php",{nombre: nombre, email: email, mensaje: mensaje }, function(data){
            alerta.innerHTML = `Gracias por enviar tu mensaje ${nombre}`
        })
    })
})

