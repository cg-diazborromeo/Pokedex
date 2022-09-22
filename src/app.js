const baseURL = new URL ('https://pokeapi.co/api/v2');
const $listaPokemones = document.querySelector('#lista-pokemones');
const $listaSiguiente = document.querySelector('#siguiente');
const $listaPrevia = document.querySelector('#previo');
let pokemonInicio = 1;
let pokemonFinal = 18;
let arrayPokemones = [];

obtenerPokemones(pokemonInicio, pokemonFinal);

$listaSiguiente.onclick = function(event) {
    resetearPokemones();
    pokemonInicio += 18;
    pokemonFinal += 18;
    obtenerPokemones();

    event.preventDefault(pokemonInicio, pokemonFinal);
}

$listaPrevia.onclick = function(event) {
    resetearPokemones();
    pokemonInicio -= 18;
    pokemonFinal -= 18;
    obtenerPokemones(pokemonInicio, pokemonFinal);
    
    event.preventDefault();
}


function obtenerPokemones() {
    for (let i = pokemonInicio; i <= pokemonFinal; i++) {
        fetch(`${baseURL}/pokemon-form/${i}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            const $imgPokemon = document.createElement('img');
            const $namePokemon = document.createElement('a');
            const $container = document.createElement('div');
            const $nameContainer = document.createElement('p');

            $container.classList = "container text-center";
            $imgPokemon.classList = 'col';
            $namePokemon.classList = 'col';

            $imgPokemon.src = respuesta.sprites.front_default;
            $namePokemon.textContent = (respuesta.pokemon.name).charAt(0).toUpperCase() + (respuesta.pokemon.name).slice(1);
            $namePokemon.href = respuesta.pokemon.url;
            $container.id = 'pokemon-container';

            $nameContainer.appendChild($namePokemon);
            $container.appendChild($imgPokemon);
            $container.appendChild($nameContainer)
            $listaPokemones.appendChild($container);
        })
        .catch(error => console.log('No se obtuvieron resultados', error));
    }
}

function resetearPokemones() {
    const $imagenesSeleccionadas = document.querySelectorAll('#pokemon-container img');
    $imagenesSeleccionadas.forEach(imagen => {
        $listaCambios.removeChild(imagen);
    });
}

// function obtenerNombres() {
//     fetch(`${baseURL}/pokemon/?limit=20`)
//     .then(respuesta => respuesta.json())
//     .then(respuesta => {
//         Object.keys(respuesta.results).forEach(pokemon => {
//             const $pokemon = document.createElement('label');
//             const $pokemonContainer = document.createElement('div');
//             arrayPokemones.push(respuesta.results[pokemon].name);

//             $pokemon.textContent = respuesta.results[pokemon].name;
//             $pokemonContainer.id = respuesta.results[pokemon].name;
//             $pokemonContainer.appendChild($pokemon);
//             $listaPokemones.appendChild($pokemonContainer);
//         })
//     })
//     .catch(error => window.alert('No se obtuvieron resultados', error));
// }
