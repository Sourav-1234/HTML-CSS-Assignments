const generateBtn = document.getElementById("generate");
const cardsContainer = document.getElementById("cards");

generateBtn.addEventListener("click", async () => {
  const count = document.getElementById("count").value;
  const type = document.getElementById("type").value;

  if (!count || !type) {
    alert("Please enter count and select category");
    return;
  }

  cardsContainer.innerHTML = "Loading...";

  try {
    
    const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeData = await typeRes.json();

    const pokemonList = typeData.pokemon.slice(0, count);

    cardsContainer.innerHTML = "";

    for (const p of pokemonList) {
      const pokemonRes = await fetch(p.pokemon.url);
      const pokemonData = await pokemonRes.json();

      createCard(pokemonData);
    }

  } catch (err) {
    cardsContainer.innerHTML = "Error loading Pokémon";
  }
});

function createCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" />
    <h3>${pokemon.name}</h3>
    <div class="type">${pokemon.types.map(t => t.type.name).join(", ")}</div>
  `;

  cardsContainer.appendChild(card);
}