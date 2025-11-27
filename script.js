document.addEventListener('DOMContentLoaded', () => {
    // === 1. Lógica de Navegación y Vistas ===

    // 1.1 Obtener todos los enlaces de navegación por su atributo href
    const enlacesNavegacion = document.querySelectorAll('.navbar ul li a');

    // 1.2 Obtener todas las secciones principales
    const secciones = {
        '#inicio': document.getElementById('inicio'),
        '#peliculas': document.getElementById('peliculas'),
        '#series': document.getElementById('series'),
        '#documentales': document.getElementById('documentales'),
        // Añadir más secciones aquí si es necesario
    };
    
    // Función para cambiar de vista (muestra la sección solicitada y oculta las demás)
    function cambiarVista(idVistaAMostrar) {
        let vistaEncontrada = false;
        
        // Iterar sobre todas las secciones
        for (const id in secciones) {
            const seccion = secciones[id];
            
            if (seccion) {
                // Si el ID coincide con la vista a mostrar
                if (id === idVistaAMostrar) {
                    seccion.style.display = 'block';
                    vistaEncontrada = true;
                } else {
                    // Oculta las demás secciones
                    seccion.style.display = 'none';
                }
            }
        }
        
        // Si no se encontró la vista, al menos intenta mostrar #peliculas para la búsqueda
        if (idVistaAMostrar === '#peliculas' && !vistaEncontrada && secciones['#peliculas']) {
             secciones['#peliculas'].style.display = 'block';
        }
    }

    // Ocultar todas las secciones al inicio, excepto #inicio (el banner hero)
    cambiarVista('#inicio');


    // 1.3 Asignar Eventos a los Enlaces de Navegación
    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const idObjetivo = enlace.getAttribute('href');

            if (idObjetivo && idObjetivo.startsWith('#')) {
                e.preventDefault(); // Evita el comportamiento por defecto de la navegación
                cambiarVista(idObjetivo);
            }
        });
    });
    
    // 1.4 Asignar Eventos a los botones de acción del Banner Hero (opcional)
    const btnPlay = document.querySelector('.btn-play');
    const btnInfo = document.querySelector('.btn-info');
    
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            alert('Reproduciendo: MYTHOS QUESTS');
        });
    }
    
    if (btnInfo) {
        btnInfo.addEventListener('click', () => {
            alert('Agregado a tu lista.');
        });
    }


    // === 2. Lógica de Búsqueda ===

    const inputBusqueda = document.getElementById('search-input'); 
    const contenedorPeliculas = secciones['#peliculas'];

    if (!inputBusqueda || !contenedorPeliculas) {
        console.error("Error: No se encontraron elementos de búsqueda.");
        // Continuamos, pero sin la funcionalidad de búsqueda
        return; 
    }

    // Nota: El contenedor de películas en tu HTML es .peliculas-populares,
    // pero las tarjetas están dentro del div.movies-grid que está dentro de esa sección.
    const tarjetasPeliculas = contenedorPeliculas.querySelectorAll('.movie-card');

    function filtrarPeliculas() {
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

        // Muestra la sección de películas para ver el resultado de la búsqueda
        if (textoBusqueda.length > 0) {
            cambiarVista('#peliculas');
        } else {
            // Si el campo de búsqueda está vacío, volvemos a la vista de inicio
             cambiarVista('#inicio');
        }

        tarjetasPeliculas.forEach(tarjeta => {
            // Buscamos el h3 o el h4 dentro de la tarjeta
            const tituloElemento = tarjeta.querySelector('h3, h4'); 
            if (!tituloElemento) return; 

            const tituloPelicula = tituloElemento.textContent.toLowerCase();

            if (tituloPelicula.includes(textoBusqueda)) {
                tarjeta.style.display = 'block'; 
            } else {
                tarjeta.style.display = 'none';
            }
        });
    }

    // Asignamos el evento al input
    inputBusqueda.addEventListener('input', filtrarPeliculas);
    
    // Prevenimos que el botón de búsqueda recargue la página (en tu HTML es un botón de submit)
    const searchForm = document.querySelector('.search-container').closest('form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => e.preventDefault());
    }
});
