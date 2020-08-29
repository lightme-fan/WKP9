const movieEndpoint = 'https://ghibliapi.herokuapp.com/films';
const movieContainer = document.querySelector('.movies');

// Fetching the movies
async function fetchMovies() {
    const response = await fetch(`${movieEndpoint}`, {
        headers: {
            Accept: 'application/json',
        }
    });
    const data = await response.json();
    return data;
}

// Display movie
async function displayMovies() {
    const movies = await fetchMovies();
    // Sort the movie by the rt_score and the map it.
    const html = movies
        .sort((a, b) => {
            return b.rt_score - a.rt_score;
        })
        .map(movie => `
            <li class="aMovie">
                <div class="description">
                    <h2>${movie.title} <small><b>Release date</b>: ${movie.release_date}</small></h2>
                    <p>${movie.description}</p>
                    <ul class="dir">
                        <li class="director"><b>Director</b>: ${movie.director}</li>
                        <li><b>Producer</b>: ${movie.producer}</li>
                    </ul>
                </div>
                <div class="score"><b>rt-score</b>: ${movie.rt_score}</div>
            </li>
            `
        );
    movieContainer.innerHTML = html.join('');

}
displayMovies();
