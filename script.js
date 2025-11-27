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
                    // Solo mostramos si no son las filas de contenido (content-row)
                    // Las filas deben permanecer visibles en la vista de inicio
                    if (id === '#inicio' || id === '#peliculas' || id === '#series' || id === '#documentales') {
                        seccion.style.display = 'block';
                    }
                    vistaEncontrada = true;
                } else {
                    // Oculta las demás secciones
                    // Ocultar solo las secciones principales de navegación
                    if (id === '#peliculas' || id === '#series' || id === '#documentales') {
                         seccion.style.display = 'none';
                    }
                }
            }
        }
        
        // Manejo especial para la búsqueda
        if (idVistaAMostrar === '#peliculas' && !vistaEncontrada && secciones['#peliculas']) {
             secciones['#peliculas'].style.display = 'block';
        }
        // Asegurar que las filas de contenido estén visibles en Inicio
        if (idVistaAMostrar === '#inicio') {
            document.querySelectorAll('.content-row').forEach(row => row.style.display = 'block');
        } else {
            // Ocultar las filas de contenido si navegamos a una vista que no es 'Inicio'
            document.querySelectorAll('.content-row').forEach(row => row.style.display = 'none');
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
    
    // 1.4 Asignar Eventos a los botones de acción del Banner Hero
    const btnPlayBanner = document.querySelector('.banner-content .btn-play');
    const btnInfo = document.querySelector('.btn-info');
    
    if (btnPlayBanner) {
        btnPlayBanner.addEventListener('click', () => {
            // El botón principal reproduce el video de fondo (Moana.mp4)
            window.open('peliculas/moana.mp4', '_blank'); 
        });
    }
    
    if (btnInfo) {
        btnInfo.addEventListener('click', () => {
            alert('Agregado a tu lista.');
        });
    }

    // === 1.5 Lógica de Reproducción de Tarjetas (SOLUCIÓN) ===
    document.querySelectorAll('.movie-card').forEach(card => {
        // Lee la URL del video del atributo data-video-url
        const videoURL = card.getAttribute('data-video-url');
        
        // Selecciona todos los botones dentro de la tarjeta que tengan data-action="play"
        const playButtons = card.querySelectorAll('[data-action="play"]'); 
        
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que el clic afecte al contenedor de la tarjeta
                
                if (videoURL) {
                    // Abre el video en una nueva pestaña/ventana
                    window.open(videoURL, '_blank'); 
                } else {
                    alert('Error: La URL del video no está definida para esta película.');
                }
            });
        });
        
        // Manejo del botón 'Mi lista' si existe dentro del overlay de la tarjeta
        const addToListButton = card.querySelector('.btn:not([data-action="play"])');
        if (addToListButton && addToListButton.textContent.includes('Mi lista')) {
            addToListButton.addEventListener('click', (e) => {
                e.stopPropagation();
                alert(`"${card.querySelector('h3, h4').textContent}" agregado a tu lista.`);
            });
        }
    });


    // === 2. Lógica de Búsqueda ===

    const inputBusqueda = document.getElementById('search-input'); 
    const contenedorPeliculas = secciones['#peliculas']; // La sección donde se mostrarán los resultados

    if (!inputBusqueda || !contenedorPeliculas) {
        console.error("Error: No se encontraron elementos de búsqueda.");
        return; 
    }

    // Recopila todas las tarjetas de película de todas las filas y la cuadrícula
    const todasLasTarjetas = document.querySelectorAll('.movie-card');

    function filtrarPeliculas() {
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

        if (textoBusqueda.length > 0) {
            // Mostrar la sección de Películas (la cuadrícula) para la búsqueda
            cambiarVista('#peliculas'); 
            
            // Ocultar las filas horizontales temporalmente si se está buscando
            document.querySelectorAll('.content-row').forEach(row => row.style.display = 'none');
            
            // Asegurar que el contenedor de la cuadrícula de #peliculas esté en modo grid
            const moviesGrid = contenedorPeliculas.querySelector('.movies-grid');
            if (moviesGrid) moviesGrid.style.display = 'grid'; 

            todasLasTarjetas.forEach(tarjeta => {
                const tituloElemento = tarjeta.querySelector('h3, h4'); 
                if (!tituloElemento) return; 

                const tituloPelicula = tituloElemento.textContent.toLowerCase();

                if (tituloPelicula.includes(textoBusqueda)) {
                    tarjeta.style.display = 'block'; 
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        } else {
            // Si el campo de búsqueda está vacío, volvemos a la vista de inicio
            cambiarVista('#inicio');
            
            // Restaurar la visualización normal de las tarjetas
            todasLasTarjetas.forEach(tarjeta => tarjeta.style.display = 'block');
        }
    }

    // Asignamos el evento al input
    inputBusqueda.addEventListener('input', filtrarPeliculas);
    
    // Prevenimos que el botón de búsqueda recargue la página
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
             e.preventDefault(); // Detener el submit
             filtrarPeliculas();
        });
    }
});
