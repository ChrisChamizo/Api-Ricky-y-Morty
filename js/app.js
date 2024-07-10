/*Apuntes Api*/

/*El metodo .json te transforma de json a objeto literal*/

/*Cuando es una API dinamica, las peticiones son limitadas */

/*Hay que sincronizar las funciones para eso usamos async await*/

/*El await se usa en lugares donde quiero hacer conversiones*/
/*Try catch: 
Try:captura error
Catch(error) */

/*Con el fetch obtenemos datos*/  /*GET*/


/*La funcion fetchPersonajes() se encarga de obtener los personajes desde la API y de 
mostrar los personajes iniciales*/ 

async function fetchPersonajes() {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character`);
        const data = await response.json();
        return data.results; // Retornar los personajes
    } catch (error) {
        console.error('Error al obtener los datos', error);
        return []; // Retornar un array vacío en caso de error
    }
}

/*La funcion mostrarPersonajes() se encarga de mostrar los personajes con su estado, y su imagen*/

function mostrarPersonajes(personajes) {
    const contenedor = document.querySelector('#contenedor-personajes');
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de mostrar los personajes
    for (let personaje of personajes) { /*Recorro los personajes*/
        let estado = personaje.status === 'unknown' ? 'Desconocido' : personaje.status;
        contenedor.innerHTML += `
            <div class="characters-card">
                <img src="${personaje.image}">
                <h2>${personaje.name}</h2>
                <p><b>Estado:</b> ${estado}</p>
                
            </div>`;
    }
}
/*Aplica los filtros de nombre y estado a los personajes obtenidos y luego los muestra.*/ 
function filtrarPersonajes(personajes) {
    const nameFilter = document.querySelector('#name-filter').value.toLowerCase();
    const statusFilter = document.querySelector('#status-filter').value;

    const personajesFiltrados = personajes.filter(personaje => {
        const matchName = personaje.name.toLowerCase().includes(nameFilter);
        const matchStatus = statusFilter ? personaje.status.toLowerCase() === statusFilter : true;
        return matchName && matchStatus;
    });

    mostrarPersonajes(personajesFiltrados);
}

/*La funcion init() Inicializa el proyecto, obteniendo los personajes
 y configurando los event listeners para los filtros.*/

 async function init() {
    const personajes = await fetchPersonajes();
    mostrarPersonajes(personajes); // Mostrar personajes iniciales

    const nameFilter = document.querySelector('#name-filter');
    const statusFilter = document.querySelector('#status-filter');

    nameFilter.addEventListener('input', () => filtrarPersonajes(personajes));
    statusFilter.addEventListener('change', () => filtrarPersonajes(personajes));
 }

init();

 /*Al pasar el mouse por un personaje especifico, me aparezca informacion de ese personaje*/

 
 










