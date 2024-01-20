// Número máximo del rango: 1 al numMax
const numMax = 10;
let numeroSecreto;
let intentos = 1;
let listaNumerosSorteados = [];

// Establecer en el input el número máximo
let inputMax = document.getElementById('valorUsuario');
inputMax.max = numMax;

numUsuario = inputMax.value;

iniciarJuego();

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

function intentoUsuario() {
  let numeroUsuario = parseInt(inputMax.value);

  if (isNaN(numeroUsuario)) {
    asignarTextoElemento('p', `Digita un número del 1 al ${numMax}`);
    document.querySelector('p').style.backgroundColor = 'red'; // bg rojo

  } else {
    document.querySelector('p').style.backgroundColor = ''; // sin bg

    if (numeroUsuario === numeroSecreto) {
      asignarTextoElemento('p',`¡Adivinaste en ${intentos} ${intentos > 1 ? 'intentos' : 'solo intento'}!`);
      // Habilitar botón nuevo juego
      document.getElementById('reiniciar').removeAttribute('disabled');
      document.getElementById('intentar').setAttribute('disabled', true);
      inputMax.setAttribute('disabled', true);
      document.querySelector('p').style.backgroundColor = 'green'; // bg verde
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
  inputMax.focus();
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
  document.querySelector('p').style.backgroundColor = ''; // sin bg 
  document.getElementById('intentar').removeAttribute('disabled');     // Activado
  document.querySelector('#reiniciar').setAttribute('disabled', true); // Desactivado
  inputMax.removeAttribute('disabled'); // Activado
  inputMax.focus();
  }
