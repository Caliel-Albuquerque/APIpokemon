const pokeApi = {}

//CONVERTENDO OS POKEMONS EM UMA CLASSE
function convertPokemonDetail(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.pokemonNumber = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type  

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


//PEGANDO OS DETALHES DO POKEMON
pokeApi.getPokemonDatail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokemonDetail)
}

//PUXANDO A API
pokeApi.getPokemons = (offset= 0 , limit=5 ) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((responseBody) => responseBody.results)
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDatail)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetais) => pokemonDetais)
        .catch((err) => {
            console.error(err);
        })
}

