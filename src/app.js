const baseURL = new URL ('https://pokeapi.co/api/v2/');
const $listaPokemones = document.querySelector('#lista-pokemones');
const $fichaPokemon = document.querySelector('#ficha-pokemon');
const $listaSiguiente = document.querySelector('#siguiente');
const $listaPrevia = document.querySelector('#previo');
const $numerosPaginas = document.querySelector('#select-pagina');
const $botonSeleccionar = document.querySelector('#seleccionar');
const $navegador = document.querySelector('#navegador');
const $navIndividual = document.querySelector('#navegador-individual');
const $botonVolver = document.querySelector("#volver");
let pokemonesIniciales = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
let pokemonesPrevios = '';
let pokemonesSiguientes = '';
let cantidadPaginas = 0;
let paginaActual = 1;

obtenerPokemones(pokemonesIniciales);
obtenerPaginacion(pokemonesIniciales);

$listaSiguiente.onclick = function(event) {
    setearPaginaActual('siguiente');
    borrarPokemones()
    obtenerPokemones(pokemonesSiguientes);

    event.preventDefault();
}

$listaPrevia.onclick = function(event) {
    setearPaginaActual('previa');
    borrarPokemones();
    obtenerPokemones(pokemonesPrevios);
    
    event.preventDefault();
}

$botonSeleccionar.onclick = function(event) {
    setearPaginaActual();
    borrarPokemones();
    obtenerPokemones(`${baseURL}pokemon/?offset=${($numerosPaginas.value-1)*20}&limit=20`);

    event.preventDefault();
}

$botonVolver.onclick = function(event) {
    borrarFichaPokemon();
    ocultarFichaPokemon();
    ocultarNavegadorIndividual();
    mostrarPokemones();
    mostrarPaginacion();

    event.preventDefault();
}

function obtenerPokemones(listaPokemones) {
    fetch(`${listaPokemones}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        pokemonesPrevios = respuesta.previous === null ? pokemonesIniciales : respuesta.previous;
        pokemonesSiguientes = respuesta.next;

        Object.keys(respuesta.results).forEach(pokemon => {
            const $imgPokemon = document.createElement('img');
            const $namePokemon = document.createElement('p');
            const $container = document.createElement('div');
            const $nameContainer = document.createElement('div');
            const $imgContainer = document.createElement('div');
            const $fichaContenedor = document.createElement('div');
            
            $container.classList = 'container col-3';
            $imgPokemon.classList = 'pokemon-imagen image-center';
            $namePokemon.classList = 'pokemon-nombre';
            $nameContainer.classList = 'container-nombre';
            $imgContainer.classList = 'container-imagen';
            $fichaContenedor.classList = 'container-ficha';
        
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
            $imgContainer.appendChild($imgPokemon);
            $fichaContenedor.appendChild($imgContainer);
            $fichaContenedor.appendChild($nameContainer);
            $container.appendChild($fichaContenedor);
            $listaPokemones.appendChild($container);
        });
    })
    .catch(error => console.log('No se obtuvieron resultados', error));
};

function obtenerPaginacion(listaPokemones) {
    fetch(`${listaPokemones}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        cantidadPaginas = Math.round(respuesta.count/20);
        cargarPaginacion(cantidadPaginas);
    });
};

function borrarPokemones() {
    const $pokemonContainers = document.querySelectorAll('.container', 'col-4');
    const $pokemonImgs = document.querySelectorAll('.pokemon-imagen');
    const $pokemonNames = document.querySelectorAll('.pokemon-nombre');
    const $nameContainers = document.querySelectorAll('.container-nombre');
    const $imgContainers = document.querySelectorAll('.container-imagen');
    const $fichaContainers = document.querySelectorAll('.container-ficha');

    $pokemonContainers.forEach(container => {
        container.remove();
    });

    $pokemonImgs.forEach(imagen => {
        imagen.remove();
    });

    $pokemonNames.forEach(name => {
        name.remove();
    });

    $nameContainers.forEach(element => {
        element.remove();
    });

    $imgContainers.forEach(element => {
        element.remove();
    });

    $fichaContainers.forEach(element => {
        element.remove();
    });
};

function obtenerPokemon(url) {
    mostrarFichaPokemon();
    mostrarNavegadorIndividual();
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        const $container = document.createElement('div');
        const $imgPokemon = document.createElement('img');
        const $textContainer = document.createElement('div');
        const $imgContainer = document.createElement('div');
        const $fichaContainer = document.createElement('div');
        const $namePokemon = document.createElement('p');  
        const $pokemonNumber = document.createElement('p');
        const $pokemonType = document.createElement('p');
        const $pokemonHeight = document.createElement('p');
        const $pokemonWeight = document.createElement('p');

        $imgPokemon.src = respuesta.sprites.front_default;
        $namePokemon.textContent = `Name: ${(respuesta.name).charAt(0).toUpperCase() + (respuesta.name).slice(1)}`;
        $pokemonNumber.textContent = `Order: #${respuesta.id}`;
        $pokemonType.textContent = `Type: ${(respuesta.types[0].type.name).charAt(0).toUpperCase() + (respuesta.types[0].type.name).slice(1)}`;
        $pokemonHeight.textContent = `Height: ${respuesta.height/10} M.`;
        $pokemonWeight.textContent = `Weight: ${respuesta.weight/10} Kg.`;

        $container.classList = 'container col-3 ficha-individual';
        $imgPokemon.classList = 'pokemon-img image-center';
        $textContainer.classList = 'text-container';
        $imgContainer.classList = 'img-container';
        $fichaContainer.classList = 'ficha-container';
        $namePokemon.classList = 'data-pokemon';
        $pokemonNumber.classList = 'data-pokemon';
        $pokemonType.classList = 'data-pokemon';
        $pokemonHeight.classList = 'data-pokemon';
        $pokemonWeight.classList = 'data-pokemon';


        $imgContainer.appendChild($imgPokemon);
        $textContainer.appendChild($namePokemon);
        $textContainer.appendChild($pokemonNumber);
        $textContainer.appendChild($pokemonType);
        $textContainer.appendChild($pokemonHeight);
        $textContainer.appendChild($pokemonWeight);
        $fichaContainer.appendChild($imgContainer);
        $fichaContainer.appendChild($textContainer);
        $container.appendChild($fichaContainer);
        $fichaPokemon.appendChild($container);
    });
};

function borrarFichaPokemon() {
    $pokemonContainer = document.querySelectorAll('.ficha-individual');
    $imgsPokemon = document.querySelectorAll('.pokemon-img');
    $textsContainer = document.querySelectorAll('.text-container');
    $imgsContainer = document.querySelectorAll('.img-container');
    $fichaContainer = document.querySelectorAll('.ficha-container');
    $dataPokemon = document.querySelectorAll('.data-pokemon');
    
    $pokemonContainer.forEach(container => {
        container.remove();
    });

    $imgsPokemon.forEach(imagen => {
        imagen.remove();
    });

    $textsContainer.forEach(container => {
        container.remove();
    });

    $imgsContainer.forEach(container => {
        container.remove();
    });

    $fichaContainer.forEach(container => {
        container.remove();
    });

    $dataPokemon.forEach(data => {
        data.remove();
    });
};

function setearPaginaActual(filter) {
    if (filter === 'siguiente') {
        paginaActual += 1;
        $numerosPaginas.value = paginaActual;
    } else if (filter === 'previa') {
        if (paginaActual > 1) {
            paginaActual -= 1;
            $numerosPaginas.value = paginaActual;
        } else {return}
    } else {
        paginaActual = Number($numerosPaginas.value);
    }
};

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
};

function mostrarPokemones() {
    $listaPokemones.classList = 'row row-cols-2 text-center';
};

function ocultarPaginacion() {
    $navegador.classList = 'oculto';
};

function mostrarPaginacion() {
    $navegador.classList = 'row justify-content-center';
};

function ocultarNavegadorIndividual() {
    $navIndividual.classList = 'oculto';
};

function mostrarNavegadorIndividual() {
    $navIndividual.classList = 'row justify-content-center';
};

function ocultarFichaPokemon() {
    $fichaPokemon.classList = 'oculto';
};

function mostrarFichaPokemon() {
    $fichaPokemon.classList = 'row row-cols-2 text-center'
};
