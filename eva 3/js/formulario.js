$(document).ready(function () {
  const $form = $("#formularioUsuario");

  const campos = {
    nombre: $("#nombre"),
    usuario: $("#usuario"),
    fechaIngreso: $("#fechaIngreso"),
    email: $("#email"),
    genero: $("#genero"),
    sitioWeb: $("#sitioWeb")
  };

  function mostrarError($input, mensaje) {
    $input.addClass("is-invalid");

    let $feedback = $input.siblings(".invalid-feedback");
    if ($feedback.length === 0) {
      $feedback = $("<div>").addClass("invalid-feedback");
      $input.after($feedback);
    }

    $feedback.text(mensaje);
  }

  function limpiarError($input) {
    $input.removeClass("is-invalid");
    $input.siblings(".invalid-feedback").remove();
  }

  $("#btnCancelar").click(function () {
    $form[0].reset();
    Object.values(campos).forEach(input => limpiarError(input));
  });

  $form.submit(function (e) {
    e.preventDefault();
    let valido = true;

    Object.values(campos).forEach(input => limpiarError(input));

    if (!campos.nombre.val().trim()) {
      mostrarError(campos.nombre, "El nombre es requerido.");
      valido = false;
    }

    if (!campos.usuario.val().trim()) {
      mostrarError(campos.usuario, "El usuario es requerido.");
      valido = false;
    }

    if (!campos.fechaIngreso.val()) {
    mostrarError(campos.fechaIngreso, "La fecha de ingreso es requerida.");
    valido = false;
    }

    const regexEmail = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(campos.email.val().trim())) {
      mostrarError(campos.email, "Correo inválido. Ej: nombre@dominio.com");
      valido = false;
    }

    const sitio = campos.sitioWeb.val().trim();
    if (sitio && !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(sitio)) {
      mostrarError(campos.sitioWeb, "URL inválida. Use https://ejemplo.com");
      valido = false;
    }

    if (valido) {
      alert("Datos enviados");
      $form[0].reset();
    }
  });
});
