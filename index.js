// Fetch the details of the first movie and display them on page load
fetch(' http://localhost:3000/films/1')
  .then(response => response.json())
  .then(movie => {
    // Display movie details on the page
    displayMovieDetails(movie);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Fetch all movies and create a menu on the left side of the page
fetch(' http://localhost:3000/films')
  .then(response => response.json())
  .then(movies => {
    // Create a menu of movies on the page
    createMovieMenu(movies);
  })

// Function to display movie details on the page
function displayMovieDetails(movie) {
  // Get the necessary elements from the DOM
  const moviePoster = document.getElementById('movie-poster');
  const movieTitle = document.getElementById('movie-title');
  const movieRuntime = document.getElementById('movie-runtime');
  const movieShowtime = document.getElementById('movie-showtime');
  const movieAvailableTickets = document.getElementById('movie-available-tickets');

  // Set the movie details on the page
  moviePoster.src = movie.poster;
  movieTitle.textContent = movie.title;
  movieRuntime.textContent = `Runtime: ${movie.runtime} mins`;
  movieShowtime.textContent = `Showtime: ${movie.showtime}`;
  const ticketsSold = movie.tickets_sold;
  const availableTickets = movie.capacity - ticketsSold;
  movieAvailableTickets.textContent = `Available Tickets: ${availableTickets}`;
}

// Function to create a menu of movies on the page
function createMovieMenu(movies) {
  const filmList = document.getElementById('films');



  // Create li elements for each movie and add them to the menu
  movies.forEach(movie => {
    const li = document.createElement('li');
    li.textContent = movie.title;
    li.classList.add('film', 'item');

    // display movie details when a movie is clicked
    li.addEventListener('click', () => {
      displayMovieDetails(movie);
    });

    filmList.appendChild(li);
  });
}

