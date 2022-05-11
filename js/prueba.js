//Obteniendo los elementos necesarios del html para agregar las funcionalidades
var textArea = document.querySelector(".textArea");
var btnEncriptar = document.querySelector(".btnEncriptar");
var btnDesencriptar = document.querySelector(".btnDesencriptar");
var resultado = document.querySelector(".resultado");
var btnCopiar = document.querySelector(".copiar");
var divNoTexto = document.querySelector(".avisoNoTexto");
var soloMin = document.querySelector(".botones div");

/* Una lista para las vocales y otra lista para las vocales
encriptadas, importante el orden de los elementos que
coincidan los indices de la vocal normal y encriptrada */
var vocales = ["a", "e", "i", "o", "u"];
var vocalesEncriptadas = ["ai", "enter", "imes", "ober", "ufat"];

//variable auxiliar
var texto = "";

//Evento click para el boton de encriptar
btnEncriptar.addEventListener("click", function () {
  /* Le asigno el valor a la variable "texto" dentro de la funcion
  ya que si lo hacía fuera el evento el valor de textArea 
  se consideraba vacio */
  texto = textArea.value;

  /* Pregunto si el textArea tiene contenido, si tiene desaparece 
  la imagen y los textos de la caja de resultados, 
  sino continua mostrandose  */
  if (!texto.length == 0) {
    var encriptado = "";
    texte = texto.toLowerCase();
    if (validarTexto(texto)) {
      //Llamo a la funcion para encriptar cada caracter del textArea
      for (let i = 0; i < texto.length; i++) {
        encriptado += encriptarLetra(texto[i]);
      }
      resultado.textContent = encriptado;
      resultado.classList.remove("aparecer");
      btnCopiar.classList.remove("aparecer");
      divNoTexto.classList.add("aparecer");
      soloMin.classList.remove("validacion");
    } else {
      soloMin.classList.add("validacion");
      resultado.classList.add("aparecer");
      btnCopiar.classList.add("aparecer");
      divNoTexto.classList.remove("aparecer");
    }
  } else {
    resultado.classList.add("aparecer");
    btnCopiar.classList.add("aparecer");
    divNoTexto.classList.remove("aparecer");
    soloMin.classList.remove("validacion");
  }
});

/* Mismo caso que el evento click del boton encriptar 
para esconder o mostrar el resultado */
btnDesencriptar.addEventListener("click", function () {
  texto = textArea.value;

  if (!texto.length == 0) {
    //valido que el texto solo tenga letras minúsculas y espacios
    if (validarTexto(texto)) {
      /* Llamo a la funcion para desencriptar recibiendo 
      como parametro el contenido del textArea */
      texto = desEncriptado(texto);
      resultado.textContent = texto.toLowerCase();
      resultado.classList.remove("aparecer");
      btnCopiar.classList.remove("aparecer");
      divNoTexto.classList.add("aparecer");
      soloMin.classList.remove("validacion");
    } else {
      soloMin.classList.add("validacion");
      resultado.classList.add("aparecer");
      btnCopiar.classList.add("aparecer");
      divNoTexto.classList.remove("aparecer");
    }
  } else {
    resultado.classList.add("aparecer");
    btnCopiar.classList.add("aparecer");
    divNoTexto.classList.remove("aparecer");
    soloMin.classList.remove("validacion");
  }
});
/* Evento click para el boton copiar de la caja de resultados, 
llama la funcion "copiar" */
document.querySelector(".copiar").addEventListener("click", copiar);

/* La funcion compara la lista de vocales con un caracter recibido
si coinciden cambia el valor del caracter por la vocal encriptada
utilizando el mismo indice, retorna el caracter este encriptado 
o no*/
function encriptarLetra(caracter) {
  for (let i = 0; i < vocales.length; i++) {
    if (caracter == vocales[i]) {
      caracter = vocalesEncriptadas[i];
    }
  }
  return caracter;
}

/* La funcion recibe todo un string */
function desEncriptado(encriptado) {
  for (let i = 0; i < vocalesEncriptadas.length; i++) {
    /*
      El metodo includes sirve para buscar una subcadena 
      dentro de una cadena, retorna true si la encuentra.
      El metodo replaceAll remplaza todas la coincidencias de
      una subcadena por otro valor. */
    if (encriptado.includes(vocalesEncriptadas[i])) {
      encriptado = encriptado.replaceAll(
        vocalesEncriptadas[i],
        vocales[i],
        "gi"
      );
    }
  }
  return encriptado;
}

//Funcion para copiar el texto del text area usando execCommand("copy")
function copiar() {
  let textoCopiado = document.querySelector(".resultado");

  textoCopiado.select();
  document.execCommand("copy");
}

/* Reglas de encriptado. 
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat" */
