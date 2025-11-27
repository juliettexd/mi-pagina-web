document.addEventListener('DOMContentLoaded', () => {

    // === FUNCIONES AUXILIARES NECESARIAS PARA LA NAVEGACIÓN ===
    
    // Función auxiliar para buscar la fila por el título H2 (necesario para la navegación a 'Series')
    function findRowByTitle(title) {
        const rows = document.querySelectorAll('.content-row');
        for (const row of rows) {
            const h2 = row.querySelector('h2');
            if (h2 && h2.textContent.trim() === title) {
                return row;
            }
        }
        return null;
    }

    // 1.2 Obtener todas las secciones principales
    const secciones = {
        '#inicio': document.getElementById('inicio'),
        '#peliculas': document.getElementById('peliculas'),
        '#series': document.getElementById('series'),
        '#documentales': document.getElementById('documentales'),
    };
    
    // Función para cambiar de vista (muestra la sección solicitada y oculta las demás)
    function cambiarVista(idVistaAMostrar) {
        let vistaEncontrada = false;
        const contentRows = document.querySelectorAll('.content-row'); // Todas las filas horizontales

        // 1. Ocultar todas las secciones de navegación y restaurar filas si es necesario
        for (const id in secciones) {
            const seccion = secciones[id];
            
            if (seccion) {
                if (id === idVistaAMostrar) {
                    seccion.style.display = 'block';
                    vistaEncontrada = true;
                } else {
                    // Ocultar solo las secciones de cuadrícula que no son la actual
                    if (id === '#peliculas' || id === '#series' || id === '#documentales') {
                         seccion.style.display = 'none';
                    }
                }
            }
        }
        
        // 2. Lógica para mostrar/ocultar Filas de Contenido
        if (idVistaAMostrar === '#inicio') {
            // En Inicio, mostramos todas las filas
            contentRows.forEach(row => row.style.display = 'block');
        } else if (idVistaAMostrar === '#series') {
            // En Series, ocultamos todas las filas...
            contentRows.forEach(row => row.style.display = 'none');
            
            // ... excepto la fila específica de series
            const seriesRow = findRowByTitle('Series épicas');
            if (seriesRow) {
                seriesRow.style.display = 'block';
            }
        } else if (idVistaAMostrar === '#peliculas') {
            // En Películas, ocultamos todas las filas
            contentRows.forEach(row => row.style.display = 'none');
            
            // Pero mostramos la fila de 'Tendencias' para un diseño más rico (opcional)
            const tendenciasRow = findRowByTitle('Tendencias ahora');
             if (tendenciasRow) {
                tendenciasRow.style.display = 'block';
            }
        } else {
            // Para Documentales o Búsqueda
            contentRows.forEach(row => row.style.display = 'none');
        }
    }

    // Ocultar todas las secciones al inicio, excepto #inicio (el banner hero)
    cambiarVista('#inicio');


    // 1.3 Asignar Eventos a los Enlaces de Navegación
    const enlacesNavegacion = document.querySelectorAll('.navbar ul li a');
    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const idObjetivo = enlace.getAttribute('href');

            if (idObjetivo && idObjetivo.startsWith('#')) {
                e.preventDefault(); 
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

    // === 1.5 Lógica de Reproducción de Tarjetas (SOLUCIÓN FINAL) ===
    document.querySelectorAll('.movie-card').forEach(card => {
        // Lee la URL del video del atributo data-video-url
        const videoURL = card.getAttribute('data-video-url');
        
        // Selecciona todos los botones que tengan data-action="play"
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
        
        // Manejo del botón 'Mi lista'
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
    const contenedorPeliculas = secciones['#peliculas']; 
    const todasLasTarjetas = document.querySelectorAll('.movie-card');
    const searchButton = document.getElementById('search-button');

    function filtrarPeliculas() {
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

        if (textoBusqueda.length > 0) {
            // 1. Mostrar la sección de Películas (la cuadrícula)
            cambiarVista('#peliculas'); 
            
            // 2. Ocultar filas horizontales (excepto la fila de tendencias si la cambiamos)
            document.querySelectorAll('.content-row').forEach(row => row.style.display = 'none');
            
            // 3. Asegurar que el contenedor de la cuadrícula de #peliculas esté en modo grid
            const moviesGrid = contenedorPeliculas.querySelector('.movies-grid');
            if (moviesGrid) moviesGrid.style.display = 'grid'; 

            // 4. Filtrar las tarjetas
            let resultadosEncontrados = false;
            todasLasTarjetas.forEach(tarjeta => {
                const tituloElemento = tarjeta.querySelector('h3, h4'); 
                if (!tituloElemento) return; 

                const tituloPelicula = tituloElemento.textContent.toLowerCase();

                if (tituloPelicula.includes(textoBusqueda)) {
                    tarjeta.style.display = 'block'; 
                    // Asegurarse de que la tarjeta esté visible en su contenedor (movies-grid o row-cards-container)
                    if(tarjeta.closest('.row-cards-container')) {
                        tarjeta.closest('.content-row').style
