const baseURL = new URL ('https://pokeapi.co/api/v2/');
const $listaPokemones = document.querySelector('#lista-pokemones');
const $fichaPokemon = document.querySelector('#ficha-pokemon');
const $listaSiguiente = document.querySelector('#siguiente');
const $listaPrevia = document.querySelector('#previo');
const $numerosPaginas = document.querySelector('#select-pagina');
const $botonSeleccionar = document.querySelector('#seleccionar');
const $navegador = document.querySelector('#navegador');
let pokemonesIniciales = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
let pokemonesPrevios = '';
let pokemonesSiguientes = '';
let cantidadPaginas = 0;

obtenerPokemones(pokemonesIniciales);

$listaSiguiente.onclick = function(event) {
    borrarPokemones()
    obtenerPokemones(pokemonesSiguientes);

    event.preventDefault();
}

$listaPrevia.onclick = function(event) {
    borrarPokemones();
    obtenerPokemones(pokemonesPrevios);
    
    event.preventDefault();
}

$botonSeleccionar.onclick = function(event) {
    borrarPokemones();
    obtenerPokemones(`${baseURL}pokemon/?offset=${($numerosPaginas.value-1)*20}&limit=20`);

    event.preventDefault();
}

function obtenerPokemones(listaPokemones) {
    fetch(`${listaPokemones}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        pokemonesPrevios = respuesta.previous === null ? pokemonesIniciales : respuesta.previous;
        pokemonesSiguientes = respuesta.next;
        cantidadPaginas = Math.round(respuesta.count/20);
        
        borrarPaginacion();
        cargarPaginacion(cantidadPaginas);

        Object.keys(respuesta.results).forEach(pokemon => {
            const $imgPokemon = document.createElement('img');
            const $namePokemon = document.createElement('a');
            const $container = document.createElement('div');
            const $nameContainer = document.createElement('p');
            
            $container.classList = 'container col-3';
            $imgPokemon.classList = 'pokemon-imagen image-center';
            $namePokemon.classList = 'pokemon-nombre';
            $nameContainer.classList = 'container-nombre';
        
            $imgPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${respuesta.results[pokemon].url.slice(30).match(/(\d+)/g)}.png`;
            $imgPokemon.onclick = (e) => {
                ocultarPokemones();
                ocultarPaginacion();
                obtenerPokemon(respuesta.results[pokemon].url);
                
                e.preventDefault();
            };

            $namePokemon.textContent = (respuesta.results[pokemon].name).charAt(0).toUpperCase() + (respuesta.results[pokemon].name).slice(1);
            $namePokemon.onclick = (e) => {
                ocultarPokemones();
                ocultarPaginacion();
                obtenerPokemon(respuesta.results[pokemon].url);
                
                e.preventDefault();
            };

            $nameContainer.appendChild($namePokemon);
            $container.appendChild($imgPokemon);
            $container.appendChild($nameContainer)
            $listaPokemones.appendChild($container);
        });
    })
    .catch(error => console.log('No se obtuvieron resultados', error));
};

function borrarPokemones() {
    const $pokemonContainer = document.querySelectorAll('.container', 'col-4');
    const $pokemonImg = document.querySelectorAll('.pokemon-imagen');
    const $pokemonName = document.querySelectorAll('.pokemon-nombre');
    const $nameContainer = document.querySelectorAll('.container-nombre');

    $pokemonContainer.forEach(container => {
        container.remove();
    });

    $pokemonImg.forEach(imagen => {
        imagen.remove();
    });

    $pokemonName.forEach(name => {
        name.remove();
    });

    $nameContainer.forEach(element => {
        element.remove();
    });
};

function obtenerPokemon(url) {
    mostrarFichaPokemon();
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        const $container = document.createElement('div');
        const $imgPokemon = document.createElement('img');

        $container.classList = 'container col-3';
        $imgPokemon.classList = 'pokemon-imagen image-center';
        $imgPokemon.src = respuesta.sprites.front_default;
       
        $container.appendChild($imgPokemon);
        $fichaPokemon.appendChild($container);

    })

}

function cargarPaginacion(cantidadPaginas) {
    for (let i = 1; i <= cantidadPaginas; i++) {
        const $pagina = document.createElement('option');
        $pagina.textContent = i;
        $pagina.value = i;
        $numerosPaginas.appendChild($pagina);
    };
};

function borrarPaginacion() {
    const $paginas = document.querySelectorAll('option');
    $paginas.forEach(pagina => {
        pagina.remove();
    });
};

function ocultarPokemones() {
    $listaPokemones.classList = 'oculto';
}

function ocultarPaginacion() {
    $navegador.classList = 'oculto';
    document.querySelector('#navegador-individual').classList = 'row justify-content-center';
}

function mostrarFichaPokemon() {
    $fichaPokemon.classList = 'row row-cols-2 text-center'
}