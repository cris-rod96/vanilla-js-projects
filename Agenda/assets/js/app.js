const login = async (usuarioEntrada, passwordEntrada) => {
  let dataAgenda =
    localStorage.getItem("agenda-app") != null
      ? JSON.parse(localStorage.getItem("agenda-app"))
      : null;

  if (dataAgenda) {
    let { usuarios } = dataAgenda;
    let findUsuario = usuarios.find((currentUsuario) => {
      let { username, password } = currentUsuario;

      if (username === usuarioEntrada && password === passwordEntrada) {
        return currentUsuario;
      }
    });

    console.log(findUsuario);

    if (findUsuario) {
      dataAgenda["currentSession"]["id_usuario_current"] =
        findUsuario.id_usuario;
      dataAgenda["currentSession"]["dateLogin"] = new Date().getTime();
      localStorage.setItem("agenda-app", JSON.stringify(dataAgenda));
      document.getElementById("formulario-login").reset();
      alert("Bienvenido");
      location.href = "../../index.html";
    }
  } else {
    localStorage.setItem(
      "agenda-app",
      JSON.stringify(await fetch("../../aux.json").then((res) => res.json()))
    );
    alert(
      "Al parecer aún no estas registrado. Haz click en el link de registro."
    );
  }
};

document.querySelector("#formulario-login").addEventListener("submit", (e) => {
  e.preventDefault();

  //Obtener campos
  let usuario = document.querySelector("#input-usuario").value;
  let password = document.querySelector("#input-pass").value;

  let errorUsuario = document.querySelector("#error-user");
  let errorPassword = document.querySelector("#error-password");

  errorUsuario.textContent = !usuario.trim()
    ? "Por favor, ingrese un usuario"
    : "";
  errorPassword.textContent = !password.trim() ? "Ingrese la contraseña" : "";

  if (!errorUsuario.textContent && !errorPassword.textContent) {
    login(usuario, password);
  }
});
