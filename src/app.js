const baseURL = new URL ('https://pokeapi.co/api/v2/');
const $listaPokemones = document.querySelector('#lista-pokemones');
const $listaSiguiente = document.querySelector('#siguiente');
const $listaPrevia = document.querySelector('#previo');
pokemonesIniciales = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
pokemonesPrevios = '';
pokemonesSiguientes = '';

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


function obtenerPokemones(listaPokemones) {
    fetch(`${listaPokemones}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        pokemonesPrevios = respuesta.previous === null ? pokemonesIniciales : respuesta.previous;
        pokemonesSiguientes = respuesta.next;

        Object.keys(respuesta.results).forEach(pokemon => {
            const $imgPokemon = document.createElement('img');
            const $namePokemon = document.createElement('a');
            const $container = document.createElement('div');
            const $nameContainer = document.createElement('p');

            $container.classList = 'container col-4';
            $imgPokemon.classList = 'pokemon-imagen image-center';
            $namePokemon.classList = 'pokemon-nombre';
            $nameContainer.classList = 'container-nombre';
        
            $imgPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${respuesta.results[pokemon].url.slice(30).match(/(\d+)/g)}.png`;
            $namePokemon.textContent = (respuesta.results[pokemon].name).charAt(0).toUpperCase() + (respuesta.results[pokemon].name).slice(1);
            $namePokemon.href = respuesta.results[pokemon].url;

            $nameContainer.appendChild($namePokemon);
            $container.appendChild($imgPokemon);
            $container.appendChild($nameContainer)
            $listaPokemones.appendChild($container);
        })
    })
    .catch(error => console.log('No se obtuvieron resultados', error));
}

function borrarPokemones() {
    const $pokemonContainer = document.querySelectorAll('.container', 'col-4');
    const $pokemonImg = document.querySelectorAll('.pokemon-imagen');
    const $pokemonName = document.querySelectorAll('.pokemon-nombre');
    const $nameContainer = document.querySelectorAll('.container-nombre');

    $pokemonContainer.forEach(container => {
        container.remove();
    })

    $pokemonImg.forEach(imagen => {
        imagen.remove();
    })

    $pokemonName.forEach(name => {
        name.remove();
    })

    $nameContainer.forEach(element => {
        element.remove();
    })
}
