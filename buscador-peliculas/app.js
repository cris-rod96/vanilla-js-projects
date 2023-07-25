let dataContainer = document.querySelector("#data-container");
let api_key = "abc5f8639c3356e8dc013b9b35cc14c1";
let endPoint = "https://api.themoviedb.org/3/search/movie";

let posterDefault = "./img/movie-default.jpg";

const printData = (data) => {
  dataContainer.innerHTML = "";
  const { results } = data;

  for (let movie of results) {
    console.log(movie);
    dataContainer.innerHTML += `
            <div class="movie-card">
          <div class="movie-cardPoster">
            <img
              src="${
                movie.poster_path !== null
                  ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                  : posterDefault
              }"
              alt="${movie.original_title}"
            />
          </div>
          <div class="movie-data">
            <h3 class="movie-dataTitle">${movie.original_title}</h3>

            <p class="title-description">
              Idioma original: <span class="content-description">${
                movie.original_language
              }</span>
            </p>
            <p class="title-description">
              Título original:
              <span class="content-description">${movie.original_title}</span>
            </p>
            <p class="title-description">Descripción</p>
            <p class="overview">
            ${movie.overview}
            </p>

            <p class="title-description">
              Fecha de Estreno:
              <span class="content-description">${movie.release_date}</span>
            </p>
          </div>
        </div>
    `;
  }
};

document.querySelector("#btn-search").addEventListener("click", async () => {
  let inputMovie = document.querySelector("#input-movie").value;

  if (inputMovie) {
    const resp = await fetch(
      `${endPoint}?query=${inputMovie}&api_key=${api_key}`
    ).then((res) => res.json());

    printData(resp);
  } else {
    alert("Escribe algo tonto");
  }
});
