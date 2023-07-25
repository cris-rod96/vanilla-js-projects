import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCt6p31EeI_UBvo-be4HsYP6nwHz8Lauqw",
  authDomain: "datos-formulario-firebase-js.firebaseapp.com",
  projectId: "datos-formulario-firebase-js",
  storageBucket: "datos-formulario-firebase-js.appspot.com",
  messagingSenderId: "253476488985",
  appId: "1:253476488985:web:21570ef0bfbb37fe282788",
  measurementId: "G-M67TQNTGKB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  //Obtener todos los campos
  let nombre = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let pass = document.querySelector("#password").value;

  let errorNombre = document.querySelector("#nameError");
  let errorEmail = document.querySelector("#emailError");
  let errorPass = document.querySelector("#passError");

  errorNombre.textContent =
    nombre.trim() === "" ? "Por favor, ingrese su nombre" : "";

  errorEmail.textContent =
    email.trim() === "" ? "Por favor, ingrese un email" : "";

  errorPass.textContent = pass.trim() === "" ? "Ingrese una contraseña" : "";

  if (
    !errorNombre.textContent &&
    !errorEmail.textContent &&
    !errorPass.textContent
  ) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        nombre,
        email,
        pass,
      });

      console.log("Listo");
    } catch (e) {
      console.error(e);
    }
  } else {
    alert("No se puede enviar el formulario. Algunos datos son erroneos");
  }
});
