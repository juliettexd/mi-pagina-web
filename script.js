document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elementos clave del DOM usando sus IDs en inglés
    const inputBusqueda = document.getElementById('search-input'); 
    const contenedorPeliculas = document.getElementById('movies');

    // Validación de seguridad para asegurar que los elementos existen antes de intentar usarlos
    if (!inputBusqueda || !contenedorPeliculas) {
        console.error("Error: No se encontraron los elementos de búsqueda. Verifica que los IDs 'search-input' y 'movies' sean correctos en tu HTML.");
        return; // Detiene la ejecución del script si faltan elementos
    }

    // Selecciona todas las tarjetas de películas que están dentro del contenedor #movies
    const tarjetasPeliculas = contenedorPeliculas.querySelectorAll('.movie-card');

    /**
     * Función principal para filtrar las tarjetas de películas
     * basándose en el texto introducido en la barra de búsqueda.
     */
    function filtrarPeliculas() {
        // Obtener el texto del input, convertirlo a minúsculas y eliminar espacios extra
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

        // Iterar sobre cada tarjeta de película
        tarjetasPeliculas.forEach(tarjeta => {
            // Obtener el elemento del título (h3) dentro de la tarjeta
            const tituloElemento = tarjeta.querySelector('.movie-info h3');
            
            // Si por alguna razón no hay título, saltamos esta tarjeta
            if (!tituloElemento) return; 

            const tituloPelicula = tituloElemento.textContent.toLowerCase();

            // Lógica de Filtrado:
            // Si el título de la película INCLUYE el texto de búsqueda:
            if (tituloPelicula.includes(textoBusqueda)) {
                // Muestra la tarjeta (usamos cadena vacía para que herede el estilo de display original)
                tarjeta.style.display = ''; 
            } else {
                // Oculta la tarjeta
                tarjeta.style.display = 'none';
            }
        });
    }

    // Asignar el evento 'input' (se dispara cada vez que cambia el valor del campo)
    inputBusqueda.addEventListener('input', filtrarPeliculas);
});
