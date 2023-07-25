const calculadora = document.getElementById("calculadora");
const resultado = document.getElementById("resultado");
let total = 0;
let operacionFinalizada = false;
const botones = [
  "7",
  "8",
  "9",
  "+",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "*",
  "0",
  ".",
  "/",
  "=",
  "C",
];

const operaciones = ["*", "+", "-", "/", "="];

const operar = (valores) => {
  total = eval(valores);
  resultado.innerText = `Resultado: ${total}`;
};

const printInPantalla = (valor) => {
  if (!operacionFinalizada) {
    if (valor !== "=") {
      if (valor !== "C") {
        if (resultado.innerText === "0" && !operaciones.includes(valor)) {
          resultado.innerText = valor;
        } else {
          resultado.innerHTML += valor;
        }
      } else {
        resultado.innerText = "0";
      }
    } else {
      operar(resultado.innerText);
      operacionFinalizada = true;
    }
  } else {
    operacionFinalizada = false;
    resultado.innerText = valor;
  }
};

const addListeners = () => {
  document.querySelectorAll(".boton").forEach((boton) => {
    boton.addEventListener("click", () => {
      printInPantalla(boton.innerText);
    });
  });
};

const printBotones = () => {
  calculadora.innerHTML = "";
  botones.forEach((boton) => {
    calculadora.innerHTML += `<div class="boton">
        ${boton}
        </div>`;
  });
  addListeners();
};

addEventListener("DOMContentLoaded", () => {
  printBotones();
});
