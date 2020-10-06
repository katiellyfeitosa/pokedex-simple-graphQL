const listPokemons = document.querySelector("#pokemons");
const details = document.querySelector("#details");

function main(limit = 5) {
  const pokemons = `{ 
    pokemons(limit: ${limit}, offset: 1) {
    results {
      url,
      name,
      image,
    }
  }}`

  requestApi(pokemons).then(res => showPokemons(res.pokemons));
}

function showPokemons(pokemons) {
  let template = "";
  pokemons.results.forEach(
    pokemon =>
      (template += `
      <li class="media">
        <img class="mr-3" width="100" height="100"  src="${pokemon.image}">
        <div class="media-body">
          <h3>${pokemon.name}</h3>
          <a href= "https://www.pokemon.com/br/pokedex/${pokemon.name}"  target="blank" class="btn btn-warning btn-block">Ver detalhes</a>
        </div>
      </li>
    `)
  );
  listPokemons.innerHTML = `
    <ul class="list-unstyled">
        ${template}
    </ul>
    <button class="btn btn-warning btn-block" onclick="main(${pokemons.results.length + 5})">Mais...</button>
  `;
}

async function requestApi(query) {
    let response = await fetch(`https://mazipan-gql-pokeapi.herokuapp.com/graphql/?query=${query}`);

    response = await response.json();

    return response.data
}

main();