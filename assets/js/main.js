
var listaPokemons = document.getElementById('listaPokemons');
var loadMoreBtn = document.getElementById('loadMoreButton');
const limit = 5;
let offset = 0;

function convertPokemonToHtml(pokemon) {
    return `
    
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.pokemonNumber}</span>
        <span class="namePokemon">${pokemon.name}</span>
        <div class="detail">
            <ol class="typesPokemon">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(" ")}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>

    
    
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((resultsBody = []) => {
        //debugger//cria breakpoint no google


        listaPokemons.innerHTML += resultsBody.map(convertPokemonToHtml).join(" ");


    })
}

loadPokemonItens(offset, limit)

loadMoreBtn.addEventListener("click", () => {
    offset += limit
    loadPokemonItens(offset, limit)
})