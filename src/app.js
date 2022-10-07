const baseURL = new URL ('https://pokeapi.co/api/v2');
const $listaPokemones = document.querySelector('#lista-pokemones');
const $listaSiguiente = document.querySelector('#siguiente');
const $listaPrevia = document.querySelector('#previo');
let pokemonInicio = 1;
let pokemonFinal = 18;

obtenerPokemones(pokemonInicio, pokemonFinal);

$listaSiguiente.onclick = function(event) {
    borrarPokemones()
    pokemonesSiguientes();
    console.log(pokemonInicio, pokemonFinal);
    obtenerPokemones(pokemonInicio, pokemonFinal);

    event.preventDefault();
}

$listaPrevia.onclick = function(event) {
    borrarPokemones();
    if (pokemonInicio > 18) {
        pokemonesPrevios();
    } else {
        return
    }
    obtenerPokemones(pokemonInicio, pokemonFinal);
    
    event.preventDefault();
}


function obtenerPokemones(pokemonInicio, pokemonFinal) {
    for (let i = pokemonInicio; i <= pokemonFinal; i++) {
        fetch(`${baseURL}/pokemon-form/${i}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            const $imgPokemon = document.createElement('img');
            const $namePokemon = document.createElement('a');
            const $container = document.createElement('div');
            const $nameContainer = document.createElement('p');

            $container.classList = 'container col-4';
            $imgPokemon.classList = 'pokemon-imagen image-center';
            $namePokemon.classList = 'pokemon-nombre';
            $nameContainer.classList = 'container-nombre';

            $imgPokemon.src = respuesta.sprites.front_default;
            $namePokemon.textContent = (respuesta.pokemon.name).charAt(0).toUpperCase() + (respuesta.pokemon.name).slice(1);
            $namePokemon.href = respuesta.pokemon.url;

            $nameContainer.appendChild($namePokemon);
            $container.appendChild($imgPokemon);
            $container.appendChild($nameContainer)
            $listaPokemones.appendChild($container);
        })
        .catch(error => console.log('No se obtuvieron resultados', error));
    }
}

function pokemonesSiguientes() {
    pokemonInicio += 18;
    pokemonFinal += 18;
}

function pokemonesPrevios() {
    pokemonInicio -= 18;
    pokemonFinal -= 18;
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

// obtenerNombres();

// function obtenerNombres() {
//     fetch(`${baseURL}/pokemon/?limit=20`)
//     .then(respuesta => respuesta.json())
//     .then(respuesta => {
//         Object.keys(respuesta.results).forEach(pokemon => {
//             const $pokemonName = document.createElement('a');
//             const $nameContainer = document.createElement('p');
//             const $container = document.createElement('div');
            
//             $container.classList = 'container text-center';
//             $pokemonName.classList = 'col', 'pokemon-nombre';
//             $nameContainer.classList = 'container-nombre';
//             $pokemonName.textContent = (respuesta.results[pokemon].name).charAt(0).toUpperCase() + (respuesta.results[pokemon].name).slice(1);
//             $pokemonName.src = respuesta.results[pokemon].url;

//             $nameContainer.appendChild($pokemonName);
//             $container.appendChild($nameContainer);
//             $listaPokemones.appendChild($container);
//         })
//     })
//     .then(respuesta => {
//         console.log(respuesta)
//     })
//     .catch(error => console.log('No se obtuvieron resultados', error));
// }
