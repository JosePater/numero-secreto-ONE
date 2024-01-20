// Número máximo del rango: 1 al numMax
const numMax = 10;
let numeroSecreto;
let intentos = 1;
let listaNumerosSorteados = [];

// Establecer en el input el número máximo
let inputMax = document.getElementById('valorUsuario');
inputMax.max = numMax;

iniciarJuego();

numUsuario = inputMax.value;

function asignarTextoElemento(elemento, texto, val) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

function intentoUsuario() {
  let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);

  if (numeroUsuario === numeroSecreto) {
    asignarTextoElemento('p',`Adivinaste en ${intentos} ${intentos > 1 ? 'intentos' : 'intento'}`);
    // Habilitar botón nuevo juego
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    // Cuando el usuario no acierta
    if (numeroSecreto > numeroUsuario) {
      asignarTextoElemento('p', 'El número secreto es mayor');
    } else {
      asignarTextoElemento('p', 'El número secreto es menor');
    }
    intentos++;
    limpiarCaja();
  }
}

function generarNumeroSecreto() {
  if (listaNumerosSorteados.length == numMax) {
    asignarTextoElemento('p',`Se hizo uso de todos los números del rango (1 - ${numMax})`);
    return;
  } else {
    // Si no se han alistado todos los número del rango
    let numeroGenerado =  Math.floor(Math.random() * numMax) + 1;

    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();

    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function limpiarCaja() {
  document.querySelector('#valorUsuario').value = '';
}

function iniciarJuego() {
  limpiarCaja();
  intentos = 1;
  asignarTextoElemento('h1', 'Juego de número secreto');
  asignarTextoElemento('p', `Digita un número del 1 al ${numMax}`);
  numeroSecreto = generarNumeroSecreto();
  // Desactivar botón nuevo juego
  document.querySelector('#reiniciar').setAttribute('disabled', true);
}
