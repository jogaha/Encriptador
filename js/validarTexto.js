function validarTexto(texto) {
  var regExp = new RegExp("^[a-z ]+$");
  if (texto.match(regExp)) {
    return true;
  } else {
    return false;
  }
}
