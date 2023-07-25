const apiKey = "70d933772cce96d97867fd7142255b7b";
const endPoint = "https://api.openweathermap.org/data/2.5/weather";
const endPointImage = "https://openweathermap.org/img/wn";
const containerCard = document.querySelector("#container-card");

containerCard.classList.add("hidden");

const getWeather = async (city) => {
  let res = await fetch(
    `${endPoint}?q=${city}&appid=${apiKey}&units=metric`
  ).then((res) => res.json());

  return res;
};

const printCard = (data) => {
  containerCard.innerHTML = `
          <div class="card">
        <p class="city">${data.name}</p>
        <div class="clima">
          <p class="temps tempe">
            Temperatura <span class="temp" id="temp">${data.temp}</span>
          </p>
          <p class="temps max">
            Maxima <span class="temp" id="temp-max">${data.temp_max}</span>
          </p>
          <p class="temps min">
            Minima <span class="temp" id="temp-min">${data.temp_min}</span>
          </p>
        </div>
        <div class="box-weather">
          <img src="${data.iconURL}" alt="" />
          <p class="weather">${data.description}</p>
        </div>
      </div>
      `;

  !containerCard.classList.contains("show")
    ? containerCard.classList.add("show")
    : "";
};

document.querySelector("#btn-search").addEventListener("click", async () => {
  let city = document.querySelector("#input-city").value;

  if (city) {
    let weatherResp = await getWeather(city);
    let { cod } = weatherResp;

    if (cod === 200) {
      console.log(weatherResp);
      let { name } = weatherResp;
      let { temp, temp_min, temp_max } = weatherResp.main;
      let { icon, description } = weatherResp.weather[0];
      let iconURL = `${endPointImage}/${icon}@2x.png`;
      printCard({
        name,
        temp,
        temp_min,
        temp_max,
        iconURL,
        description,
      });
    } else {
      alert(weatherResp.message);
    }
  } else {
    alert("Ingresa el nombre de una ciudad");
  }
});
