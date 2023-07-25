const btnComprobar = document.querySelector("#btn-comprobar");
const messageJugar = document.querySelector("#mensaje-jugar");
const inputNumero = document.querySelector("#numero");
const intentos = document.querySelector("#intentos");
let numeroAleatorio = Math.floor(Math.random() * 100);
let numero = null;

const reset = () => {
  inputNumero.value = "";
  intentos.innerText = "0";
  numeroAleatorio = Math.floor(Math.random() * 100);
};

const setMessage = (message, classCss) => {
  messageJugar.innerText = message;
  messageJugar.classList.add(classCss);
};

btnComprobar.addEventListener("click", () => {
  numero = Number(inputNumero.value);
  if (numero) {
    if (numero > 0 && numero <= 100) {
      intentos.innerText = Number(intentos.innerText) + 1;
      if (numero === numeroAleatorio) {
        alert(`Felicidades. Ganaste en ${intentos.innerText} intentos`);
        reset();
      } else if (numero < numeroAleatorio) {
        setMessage("Intento fallido. El número a adivinar es mayor", "lost");
      } else {
        setMessage("Intento fallido. El número a adivinar es menor", "lost");
      }
    } else {
      setMessage("Debes ingresar un número entre 1 y 100", "lost");
    }
  } else {
    setMessage("Debes ingresar un número", "lost");
  }
});

inputNumero.addEventListener("focus", () => {
  messageJugar.innerText = "¡Juguemos!";
  messageJugar.classList.remove("lost", "win");
  inputNumero.value = "";
});
