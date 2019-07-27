const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

// Cargar grid al cargar la pagina
window.addEventListener('load', () => {
    // Refrescar el layout
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            enlaces.forEach(enlace => enlace.classList.remove('activo'));
            // Enlace que se le dipo click
            e.target.classList.add('activo');
            const categoria = e.target.innerHTML.toLowerCase();
            // Filtar or categoria
            categoria === 'todo' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);

        });
    });
});

//BARRA DE FILTRADO
// Evento que se jecuta cada vez ue se ejecute un input en la barra de busqueda
document.querySelector('#barra-busqueda').addEventListener('input', (e) => {
    const busqueda = e.target.value;
    // el dataset es data- del html
    grid.filter(item => item.getElement().dataset.etiquetas.includes(busqueda));
});


// OVERLAY

const overlay = document.getElementById('overlay');
document.querySelectorAll('.grid .item img').forEach(elem => {
    elem.addEventListener('click', () => {
        const ruta = elem.getAttribute('src');
        const desc = elem.parentNode.parentNode.dataset.descripcion;
        overlay.classList.add('activo');
        document.querySelector('#overlay img').src = ruta;
        document.querySelector('#overlay .descripcion').innerHTML = desc;

    });

    // Boton cerrar imagen
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    // Cerrar al dar click en overlay
    overlay.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });


});