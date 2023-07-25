const cardsContainer = document.querySelector("#cards-container");
const entradaCantidad = document.querySelector("#cantidad-cards");
let limite = 0;
let contador = 0;
let data = null;
const printData = () => {
  console.log(data);
  cardsContainer.innerHTML = "";
  for (let card of data) {
    if (contador === limite) break;

    cardsContainer.innerHTML += `<div class="card">
          <img
            src="${card.card_images[0].image_url}"
            alt=""
          />

          <p class="card-title">${card.name}</p>
        </div>`;

    contador++;
  }
};

entradaCantidad.addEventListener("change", (e) => {
  limite = e.target.value;
  printData();
});

addEventListener("DOMContentLoaded", async () => {
  let resp = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php").then(
    (res) => res.json()
  );
  data = resp.data;
});
