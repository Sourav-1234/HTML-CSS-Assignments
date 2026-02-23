const API_KEY = "2f6c01c6d36dc79f805137114e9fffce";
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

let moviesData = [];

async function fetchMovies() {
    const genre = document.getElementById("genre").value;
    const count = document.getElementById("count").value;
    const status = document.getElementById("status");
    const moviesContainer = document.getElementById("movies");

    if (!count || count < 1) {
        alert("Enter valid number of movies");
        return;
    }

    status.innerText = "Loading movies...";
    moviesContainer.innerHTML = "";

    try {
        const res = await fetch(
            `${BASE_URL}?api_key=${API_KEY}&with_genres=${genre}`
        );

        const data = await res.json();
        moviesData = data.results.slice(0, count);

        renderMovies(moviesData);

        status.innerText = "";
    } catch (error) {
        status.innerText = "❌ Failed to load movies";
    }
}

function renderMovies(movies) {
    const container = document.getElementById("movies");

    container.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${IMG_URL + movie.poster_path}">
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-rating">⭐ ${movie.vote_average}</div>
                <div class="movie-overview">${movie.overview}</div>
            </div>
        </div>
    `).join("");
}

function sortMovies() {
    const sortEnabled = document.getElementById("sortRating").checked;

    if (sortEnabled) {
        moviesData.sort((a, b) => b.vote_average - a.vote_average);
    }

    renderMovies(moviesData);
}