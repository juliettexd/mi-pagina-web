document.addEventListener('DOMContentLoaded', () => {

    // === FUNCIONES AUXILIARES NECESARIAS PARA LA NAVEGACIÓN ===
    
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

    const secciones = {
        '#inicio': document.getElementById('inicio'),
        '#peliculas': document.getElementById('peliculas'),
        '#documentales': document.getElementById('documentales'),
    };
    
    function cambiarVista(idVistaAMostrar) {
        
        const contentRows = document.querySelectorAll('.content-row'); 

        // 1. Ocultar todas las secciones principales
        for (const id in secciones) {
            const seccion = secciones[id];
            if (seccion) {
                seccion.style.display = 'none';
            }
        }

        // 2. Ocultar todas las filas de contenido por defecto
        contentRows.forEach(row => row.style.display = 'none');
        
        // 3. Control de visibilidad
        
        if (idVistaAMostrar === '#inicio') {
            document.getElementById('inicio').style.display = 'block';
            contentRows.forEach(row => row.style.display = 'block');
            
        } else if (idVistaAMostrar === '#series') {
            const seriesRow = findRowByTitle('Series épicas');
            if (seriesRow) {
                seriesRow.style.display = 'block';
            }
            
        } else if (idVistaAMostrar === '#peliculas') {
            
            document.getElementById('peliculas').style.display = 'block'; 
            
            const tendenciasRow = findRowByTitle('Tendencias ahora');
            if (tendenciasRow) {
                 tendenciasRow.style.display = 'block'; 
            }
            
        } else if (idVistaAMostrar === '#documentales') {
            
            document.getElementById('documentales').style.display = 'block'; 
            
        } else {
            // Caso de búsqueda
            document.getElementById('peliculas').style.display = 'block'; 
            contentRows.forEach(row => row.style.display = 'block');
        }

        // Restaura todas las tarjetas a 'block' para que el filtro de búsqueda no persista
        document.querySelectorAll('.movie-card').forEach(tarjeta => tarjeta.style.display = 'block');
    }

    cambiarVista('#inicio');


    // 1.3 Asignar Eventos a los Enlaces de Navegación
    const enlacesNavegacion = document.querySelectorAll('.navbar ul li a');
    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const idObjetivo = enlace.getAttribute('href');

            if (idObjetivo && idObjetivo.startsWith('#')) {
                e.preventDefault(); 
                cambiarVista(idObjetivo);
                document.getElementById('search-input').value = '';
            }
        });
    });
    
    // 1.4 Asignar Eventos a los botones de acción del Banner Hero
    const btnPlayBanner = document.querySelector('.banner-content .btn-play');
    const btnInfo = document.querySelector('.btn-info');
    
    if (btnPlayBanner) {
        btnPlayBanner.addEventListener('click', () => {
            window.open('peliculas/moana.mp4', '_blank'); 
        });
    }
    
    if (btnInfo) {
        btnInfo.addEventListener('click', () => {
            alert('Agregado a tu lista.');
        });
    }

    // === 1.5 Lógica de Reproducción de Tarjetas (CRÍTICO) ===
    document.querySelectorAll('.movie-card').forEach(card => {
        // Obtenemos la URL del atributo data-video-url
        const videoURL = card.getAttribute('data-video-url');
        // Seleccionamos los botones que tienen data-action="play"
        const playButtons = card.querySelectorAll('[data-action="play"]'); 
        
        // ASIGNAMOS EL EVENTO DE CLIC A CADA BOTÓN DE REPRODUCCIÓN
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); 
                
                if (videoURL) {
                    // ¡Aquí se abre el video!
                    window.open(videoURL, '_blank'); 
                } else {
                    alert('Error: La URL del video no está definida para esta película. Revisa el atributo data-video-url.');
                }
            });
        });
        
        // Manejo del botón 'Mi lista'
        const addToListButton = card.querySelector('.btn:not([data-action="play"])');
        if (addToListButton && addToListButton.textContent.includes('Mi lista')) {
            addToListButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const titleElement = card.querySelector('h3, h4');
                const title = titleElement ? titleElement.textContent : "Contenido Desconocido";
                alert(`"${title}" agregado a tu lista.`);
            });
        }
    });


    // === 2. Lógica de Búsqueda ===

    const inputBusqueda = document.getElementById('search-input'); 
    const todasLasTarjetas = document.querySelectorAll('.movie-card'); 
    const searchButton = document.getElementById('search-button');

    function filtrarPeliculas() {
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

        if (textoBusqueda.length > 0) {
            
            // Prepara la vista para la búsqueda
            cambiarVista('BUSQUEDA'); 
            
            // Filtrar las tarjetas
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
            cambiarVista('#inicio');
        }
    }

    inputBusqueda.addEventListener('input', filtrarPeliculas);
    
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
             e.preventDefault(); 
             filtrarPeliculas();
        });
    }
});
