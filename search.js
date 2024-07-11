async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.log("Error fetching pokemon data:", error);
        const fetchErrorElement = document.getElementById("fetchError");
        fetchErrorElement.textContent = "Failed to find pokemon. Try a different name.";
    }
    
}

async function searchPokemon() {
    //Validate pokemon name
    const pokeName = document.getElementById("searchName").value;
    if (pokeName == "") {
        alert("Please enter a valid pokemon name")
    } else {
        const foundData = await fetchPokemonData(pokeName);
        if (foundData != undefined) {
            document.getElementById("fetchError").textContent = "" //Clear error text if pokemon is found
            console.log(foundData)
            const pokemonInfoElement = document.getElementById("displayInformation")
            //Build out document
            pokemonInfoElement.innerHTML = `
            <div class="row">
                <div class="col text-center">
                    <h2 class="display-5">${foundData.name}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <p class="text-center align-content-center">Pokemon ID: ${foundData.id}</p>
                </div>
                <div class="col text-center">
                    <img class="img-fluid" src="${foundData.sprites.front_default}" alt="${foundData.name}">
                </div>
            </div>
            `;
        }
    };
}