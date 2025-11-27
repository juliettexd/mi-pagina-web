document.addEventListener('DOMContentLoaded', () => {

    const inputBusqueda = document.getElementById('search-input'); 
    const contenedorPeliculas = document.getElementById('movies');

    if (!inputBusqueda || !contenedorPeliculas) {
        console.error("Error: No se encontraron los elementos de búsqueda. Verifica los IDs 'search-input' o 'movies'.");
        return;
    }


    const tarjetasPeliculas = contenedorPeliculas.querySelectorAll('.movie-card');


    function filtrarPeliculas() {
   
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();
        // Iterar sobre cada tarjeta de película
        tarjetasPeliculas.forEach(tarjeta => {
            // Obtener el título de la película (h3 dentro de .movie-info)
            const tituloElemento = tarjeta.querySelector('.movie-info h3');
            
            if (!tituloElemento) return; 

            const tituloPelicula = tituloElemento.textContent.toLowerCase();

         
            if (tituloPelicula.includes(textoBusqueda)) {
                // Muestra la tarjeta 
                tarjeta.style.display = ''; 
            } else {
                // Oculta la tarjeta
                tarjeta.style.display = 'none';
            }
        });
    }

   
    inputBusqueda.addEventListener('input', filtrarPeliculas);
});
