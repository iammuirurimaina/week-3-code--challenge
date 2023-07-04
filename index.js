// Fetch the details of the first movie and display them on page load
fetch('http://localhost:3000/films/1')
  .then(response => response.json())
  .then(movie => {
    // Display movie details on the page
    displayMovieDetails(movie);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Fetch all movies and create a menu for the movies
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(movies => {
    // Create a menu of movies on the page
    createMovieMenu(movies);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Function to display movie details on the page
function displayMovieDetails(movie) {
  // Get the elements from the DOM
  const moviePoster = document.getElementById('movie-poster');
  const movieTitle = document.getElementById('movie-title');
  const movieRuntime = document.getElementById('movie-runtime');
  const movieShowtime = document.getElementById('movie-showtime');
  const movieAvailableTickets = document.getElementById('movie-available-tickets');

  // display the movie details to the page
  moviePoster.src = movie.poster;
  movieTitle.textContent = movie.title;
  movieRuntime.textContent = `Runtime: ${movie.runtime} mins`;
  movieShowtime.textContent = `Showtime: ${movie.showtime}`;
  const ticketsSold = movie.tickets_sold;
  const availableTickets = movie.capacity - ticketsSold;
  movieAvailableTickets.textContent = `Available Tickets: ${availableTickets}`;
}

// Create a menu of the movies 
function createMovieMenu(movies) {
  const filmList = document.getElementById('films');

  // Remove the placeholder li element
  const placeholderElement = document.getElementById('placeholder');
  filmList.removeChild(placeholderElement);

  // Create li elements for each movie and add them to the menu
  movies.forEach(movie => {
    const li = document.createElement('li');
    li.textContent = movie.title;
    li.classList.add('film', 'item');

    // Add event listener to display movie details when a movie is clicked
    li.addEventListener('click', () => {
      displayMovieDetails(movie);
    });

    filmList.appendChild(li);
  });
}

// Event listener for the "Buy Ticket" button
const buyTicketButton = document.getElementById('buy-ticket');
buyTicketButton.addEventListener('click', () => {
  // Get the current movie details
  const movieTitle = document.getElementById('movie-title').textContent;
  const availableTicketsText = document.getElementById('movie-available-tickets').textContent;
  const availableTickets = parseInt(availableTicketsText.split(' ')[2]);

  // Check if there are available tickets
  if (availableTickets > 0) {
    // Update the available tickets on the page
    const updatedAvailableTicketsText = availableTicketsText.replace(availableTickets, availableTickets - 1);
    document.getElementById('movie-available-tickets').textContent = updatedAvailableTicketsText;
  } else {
    // If the tickets are Zero display an alert to show that the movie is sold out
    alert('This movie is sold out!');
  }
});
