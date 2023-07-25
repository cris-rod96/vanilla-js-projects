const emailExist = (email) => {
  let { usuarios } = dataAgenda;

  return (
    usuarios.find((currentUsuario) => currentUsuario.email === email) !==
    undefined
  );
};

const usuarioExist = (username) => {
  let { usuarios } = dataAgenda;

  return (
    usuarios.find((currentUsuario) => currentUsuario.username === username) !==
    undefined
  );
};

const saveData = (usuarioData) => {
  let id_usuario = new Date().getTime();
  usuarioData["id_usuario"] = id_usuario;
  usuarioData["id_rol"] = dataAgenda["roles"][0].id_rol;
  dataAgenda["usuarios"].push(usuarioData);

  dataAgenda["contactos"][id_usuario] = [];

  localStorage.setItem("agenda-app", JSON.stringify(dataAgenda));
};

const dataIsValid = () => {
  return (
    !errorNombre.textContent &&
    !errorApellido.textContent &&
    !errorEmail.textContent &&
    !errorTelefono.textContent &&
    !errorUsuario.textContent &&
    !errorPassword.textContent
  );
};

const printMessageError = (currentField, message) => {
  let field = document.getElementById(`error-${currentField}`);
  field.textContent = message;
  field.previousElementSibling.value = "";
};

document
  .getElementById("formulario-registro")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    //Obtener campos
    let entradaNombre = document.getElementById("input-nombre").value;
    let entradaApellido = document.getElementById("input-apellido").value;
    let entradaEmail = document.getElementById("input-email").value;
    let entradaTelefono = document.getElementById("input-tel").value;
    let entradaUsuario = document.getElementById("input-usuario").value;
    let entradaPassword = document.getElementById("input-pass").value;

    errorNombre = document.getElementById("error-nombre");
    errorApellido = document.getElementById("error-apellido");
    errorEmail = document.getElementById("error-email");
    errorTelefono = document.getElementById("error-tel");
    errorUsuario = document.getElementById("error-user");
    errorPassword = document.getElementById("error-pass");

    // Validar errores en campos ingresados

    errorNombre.textContent = !entradaNombre ? "Ingresa un nombre" : "";
    errorApellido.textContent = !entradaApellido ? "Ingresa un apellido" : "";
    errorEmail.textContent = !entradaEmail ? "Ingresa un email" : "";
    errorTelefono.textContent = !entradaTelefono ? "Ingresa un telefono" : "";
    errorUsuario.textContent = !entradaUsuario ? "Ingresa un usuario" : "";
    errorPassword.textContent = !entradaPassword
      ? "Ingresa una contraseña"
      : "";

    if (dataIsValid()) {
      // Verificamos si existe un usuario con el mismo email
      if (emailExist(entradaEmail))
        printMessageError("email", "E-mail no disponible");
      if (usuarioExist(entradaUsuario))
        printMessageError("user", "Usuario no disponible");

      if (dataIsValid()) {
        saveData({
          nombre: entradaNombre,
          apellido: entradaApellido,
          email: entradaEmail,
          telefono: entradaTelefono,
          username: entradaUsuario,
          password: entradaPassword,
        });
        e.target.reset();
        alert(
          "Registro correcto. Lo redirigiremos a la pagina de login para que pueda iniciar sesión"
        );

        location.href = "../../login.html";
      }
    }
  });

addEventListener("DOMContentLoaded", async () => {
  dataAgenda =
    localStorage.getItem("agenda-app") != null
      ? JSON.parse(localStorage.getItem("agenda-app"))
      : null;

  if (dataAgenda) {
    let { currentSession } = dataAgenda;

    if (currentSession["id_usuario_current"] !== null) {
      location.href = "../../index.html";
    }
  } else {
    localStorage.setItem(
      "agenda-app",
      JSON.stringify(await fetch("../../aux.json").then((res) => res.json()))
    );
    location.reload();
  }
});
