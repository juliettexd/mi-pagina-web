// Función que maneja la búsqueda
document.getElementById('search-input').addEventListener('input', function(event) {
    // Obtener el valor de búsqueda
    const searchTerm = event.target.value.toLowerCase();
    
    // Obtener todas las tarjetas de películas
    const movies = document.querySelectorAll('.movie-card');
    
    // Iterar a través de las tarjetas de películas
    movies.forEach(function(movie) {
        const movieTitle = movie.querySelector('h3').textContent.toLowerCase(); // Obtener el título de la película
        
        // Si el título contiene el texto de búsqueda, mostramos la película, de lo contrario, la ocultamos
        if (movieTitle.includes(searchTerm)) {
            movie.style.display = 'block';
        } else {
            movie.style.display = 'none';
        }
    });
});
