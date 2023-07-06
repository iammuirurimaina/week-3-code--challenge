fetch(' http://localhost:3000/films')
  .then(response => response.json())
  .then(movies => {

    createMovieMenu(movies);
  })
  // menu of movies 
function createMovieMenu(movies) {
  const filmList = document.getElementById('films');

 movies.forEach(movie => {
    const li = document.createElement('li');
    li.textContent = movie.title;
    li.addEventListener('click', () => {
      displayMovieDetails(movie);
    });

    filmList.appendChild(li);
    console.log(createMovieMenu)
  });
  

// display movie details on the page
function displayMovieDetails(movie) {
 
  const moviePoster = document.getElementById('movie-poster');
  const movieTitle = document.getElementById('movie-title');
  const movieRuntime = document.getElementById('movie-runtime');
  const movieShowtime = document.getElementById('movie-showtime');
  const movieAvailableTickets = document.getElementById('movie-available-tickets');

  // display the movie details on the page
  moviePoster.src = movie.poster;
  movieTitle.textContent = movie.title;
  movieRuntime.textContent = `Runtime: ${movie.runtime} mins`;
  movieShowtime.textContent = `Showtime: ${movie.showtime}`;
  const ticketsSold = movie.tickets_sold;
  const availableTickets = movie.capacity - ticketsSold;//calculate available tickets
  movieAvailableTickets.textContent = `Available Tickets: ${availableTickets}`;
}


  //operations for when the buy ticket button is clicked
const buyTicketButton = document.getElementById('buy-ticket');
buyTicketButton.addEventListener('click', () => {
  const availableTicketsText = document.getElementById('movie-available-tickets').textContent;
  const availableTickets = parseInt(availableTicketsText.split(' ')[2]);
  console.log(availableTickets)
  

  // confirm that there are still available tickets
  if (availableTickets > 0) {
    // subtract 1 ticket and update the number of available tickets
    const updatedAvailableTicketsText = availableTicketsText.replace(availableTickets, availableTickets - 1);
    document.getElementById('movie-available-tickets').textContent = updatedAvailableTicketsText;
  } else {
    // create an alert to show that the show is sold out if there are no available tickets
    alert('This show is sold out!');
  }
});
}

