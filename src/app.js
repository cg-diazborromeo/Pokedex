const baseURL = new URL ('https://pokeapi.co/api/v2');
const $listaPokemones = document.querySelector('#lista-pokemones');
let arrayPokemones = [];

obtenerPokemones();

function obtenerPokemones() {
    for (let i = 1; i <= 18; i++) {
        fetch(`${baseURL}/pokemon-form/${i}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            const $imgPokemon = document.createElement('img');
            const $namePokemon = document.createElement('p');
            const $Container = document.createElement('div');

            $Container.classList = "container text-center";
            $imgPokemon.classList = 'col';
            $namePokemon.classList = 'col';
            $imgPokemon.src = respuesta.sprites.front_default;
            $namePokemon.textContent = respuesta.pokemon.name;

            $Container.appendChild($imgPokemon);
            $Container.appendChild($namePokemon);
            $listaPokemones.appendChild($Container);
        })
        .catch(error => console.log('No se obtuvieron resultados', error));
    }
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
