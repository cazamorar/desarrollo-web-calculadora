//const pantalla = document.querySelector(".pantalla");
//const botones = document.querySelectorAll(".btn");

//Tú código va acá
//hint: Busca sobre la función eval


document.addEventListener('DOMContentLoaded', function() {
    const pantalla = document.querySelector('.pantalla');
    const botones = document.querySelectorAll('.btn');

    let operacionActual = '';
    let error = false;

    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const valor = boton.textContent;

            if (error) {
                limpiarPantalla();
                error = false;
            }

            if (valor === 'C') {
                limpiarPantalla();
            } else if (valor === '←') {
                borrarUltimo();
            } else if (valor === '=') {
                calcularResultado();
            } else {
                agregarValor(valor);
            }
        });
    });

    function limpiarPantalla() {
        pantalla.textContent = '0';
        operacionActual = '';
        error = false;
    }

    function borrarUltimo() {
        operacionActual = operacionActual.slice(0, -1);
        if (operacionActual === '') {
            pantalla.textContent = '0';
        } else {
            pantalla.textContent = operacionActual;
        }
    }

    function calcularResultado() {
        if (!esOperacionValida(operacionActual)) {
            mostrarError();
            return;
        }
        try {
            const resultado = eval(operacionActual);
            pantalla.textContent = resultado;
            operacionActual = resultado.toString();
        } catch (e) {
            mostrarError();
        }
    }

    function esOperacionValida(operacion) {
        // Verifica si la operación termina con un operador
        const regex = /[\+\-\*\/]$/;
        return !regex.test(operacion);
    }

    function agregarValor(valor) {
        if (pantalla.textContent === '0' && valor !== '.') {
            pantalla.textContent = '';
        }

        operacionActual += valor;
        pantalla.textContent = operacionActual;
    }

    function mostrarError() {
        pantalla.textContent = 'Error';
        operacionActual = '';
        error = true;
    }
});