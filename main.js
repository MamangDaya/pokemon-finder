console.log("JS loaded");

const input = document.getElementById("pokemonInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  const pokemonName = input.value.trim().toLowerCase();

  if (pokemonName === "") {
    result.textContent = "Please enter a pokemon name.";
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      return response.json();
    })
    .then(data => {
      const types = data.types.map(t => t.type.name).join(", ");

      result.innerHTML = `
        <p id="border">
            <img src="${data.sprites.front_default}"><br>
            <strong>Name:</strong> ${data.name}<br>
            <strong>ID:</strong> ${data.id}<br>
            <strong>Types:</strong> ${types}<br>
            <strong>Height:</strong> ${data.height}<br>
            <strong>Weight:</strong> ${data.weight}
        </p>
      `;
    })
    .catch(error => {
      result.textContent = "Pokemon not found. Try again.";
    });
});

input.addEventListener("keydown", e => {
  if (e.key === "Enter") button.click();
});
