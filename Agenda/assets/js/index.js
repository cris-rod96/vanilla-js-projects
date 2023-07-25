addEventListener("DOMContentLoaded", () => {
  dataAgenda =
    localStorage.getItem("agenda-app") != null
      ? JSON.parse(localStorage.getItem("agenda-app"))
      : null;
  if (dataAgenda) {
    let { currentSession } = dataAgenda;
    if (currentSession["id_usuario_current"] === null) {
      alert("Acceso denegado");
      location.href = "../../login.html";
    }
  } else {
    alert("Acceso denegado");
    location.href = "../../login.html";
  }
});
