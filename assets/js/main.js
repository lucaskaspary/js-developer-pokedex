const pokemonList = document.getElementById('pokemonList')
const pokemonSpecs = document.getElementById('pokemonSpecs')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="openSpecs('${encodeURIComponent(JSON.stringify(pokemon))}');">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToModal(pokemon) {
    return `<div id="fade"></div>

        <div id="modal" class="modal ${pokemon.type}">
            <div class="modal-header">
                <div id="button">
                    <button id="close-modal" type="button" onclick='closeModal()'>←</button>
                </div>

                <span class="name">${pokemon.name}</span>

                <div class="modal-types">
                    <div class="types">
                        ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="modal-body">

            <spawn class="specs">
                <span class="weight">Weight</span>
                <ol class="modal-list">
                    <li>${pokemon.weight/10} kg</li>
                </ol>
                <span class="height">Height</span>
                <ol class="modal-list">
                    <li>${pokemon.height*10} cm</li>
                </ol>
                <span class="exp">Base experienece</span>
                <ol class="modal-list">
                    <li>${pokemon.base_exp} xp</li>
                </ol>
                <span class="modal-abilities-title">Abilities</span>
                <ol class="modal-list">
                    ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability.name}</li>`).join('')}
                </ol>
            </spawn>
                <img class="big-image" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)
    }
})
function openSpecs(pokemon) {

    pokemon = JSON.parse(decodeURIComponent(pokemon));

    const newHtml = convertPokemonToModal(pokemon);
    pokemonSpecs.innerHTML += newHtml
}

function closeModal() {
    pokemonSpecs.innerHTML = ''
}