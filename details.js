async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.log("Error fetching pokemon data:", error);
        const fetchErrorElement = document.getElementById("fetchError");
        fetchErrorElement.textContent = "Failed to find pokemon. Try a different name."
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
                <div class="col text-center m-3">
                    <h2>${foundData.name}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 text-center">
                    <p>Pokemon ID: ${foundData.id}</p>
                </div>
                <div class="col text-center">
                    <img class="img-fluid" src="${foundData.sprites.front_default}" alt="${foundData.name}">
                </div>
            </div>
            <div class="row text-center m-3">
                <div class="col-12 col-md-6">
                    <h4>Abilities</h4>
                    <ul class="list-group">
                        ${foundData.abilities.map(ability => `<li class="list-group-item">${ability.ability.name}</li>`).join('')}
                    </ul>
                </div>
                <div class="col">
                    <h4>Type(s)</h4>
                    <ul class="list-group">
                        ${foundData.types.map(type => `<li class="list-group-item">${type.type.name}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col text-center m-3">
                    <h4>Stats</h4>
                    <ul class="list-group">
                    <li class="list-group-item"><strong>HP: </strong>${foundData.stats[0].base_stat}</li>
                    <li class="list-group-item"><strong>Attack: </strong>${foundData.stats[1].base_stat}</li>
                    <li class="list-group-item"><strong>Defense: </strong>${foundData.stats[2].base_stat}</li>
                    <li class="list-group-item"><strong>Special Attack: </strong>${foundData.stats[3].base_stat}</li>
                    <li class="list-group-item"><strong>Special Defense: </strong>${foundData.stats[4].base_stat}</li>
                    <li class="list-group-item"><strong>Speed: </strong>${foundData.stats[5].base_stat}</li>
                    </ul>
                </div>
            </div>
            `;
        }
    };
}