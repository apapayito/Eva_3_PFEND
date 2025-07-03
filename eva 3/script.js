document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const btnGuardar = document.getElementById("btnGuardar");

  const campos = {
    nombre: document.getElementById("nombre"),
    rut: document.getElementById("rut"),
    fecha: document.getElementById("fecha"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    repetir: document.getElementById("repetir")
  };

  function validarNombre(nombre) {
    return /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(nombre.trim());
  }

  function validarRut(rut) {
    rut = rut.replace(/[.-]/g, "").toUpperCase();
    if (!/^\d{7,8}[0-9K]$/.test(rut)) return false;
    

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplicador;
      multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
    }

    const digitoEsperado = 11 - (suma % 11);
    let dvCalculado = digitoEsperado === 11 ? '0' : digitoEsperado === 10 ? 'K' : digitoEsperado.toString();

    return dv === dvCalculado;
  }

  function validarFormulario() {
    let valido = true;

    if (!validarNombre(campos.nombre.value)) {
      campos.nombre.classList.add("Invalido");
      valido = false;
    } else {
      campos.nombre.classList.remove("Invalido");
    }

    if (!validarRut(campos.rut.value)) {
      campos.rut.classList.add("Invalido");
      valido = false;
    } else {
      campos.rut.classList.remove("Invalido");
    }

    if (!campos.email.checkValidity()) {
      campos.email.classList.add("Invalido");
      valido = false;
    } else {
      campos.email.classList.remove("Invalido");
    }

    if (campos.fecha.value.trim() === "") {
      campos.fecha.classList.add("Invalido");
      valido = false;
    } else {
      campos.fecha.classList.remove("Invalido");
    }

    if (
      campos.password.value.trim() === "" ||
      campos.repetir.value.trim() === "" ||
      campos.password.value !== campos.repetir.value
    ) {
      campos.password.classList.add("Invalido");
      campos.repetir.classList.add("Invalido");
      valido = false;
    } else {
      campos.password.classList.remove("Invalido");
      campos.repetir.classList.remove("Invalido");
    }

    if (valido) {
      btnGuardar.disabled = false;
      btnGuardar.classList.remove("btn-secondary");
      btnGuardar.classList.add("btn-primary");
    } else {
      btnGuardar.disabled = true;
      btnGuardar.classList.remove("btn-primary");
      btnGuardar.classList.add("btn-secondary");
    }
  }

  Object.values(campos).forEach((input) => {
    input.addEventListener("input", validarFormulario);
  });

  formulario.addEventListener("submit", function (e) {
    validarFormulario();
    if (btnGuardar.disabled) e.preventDefault();
  });
});
