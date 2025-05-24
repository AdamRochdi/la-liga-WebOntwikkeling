async function haalSpelersOp() {
    const filter = document.getElementById("filterInput").value;
    const url = filter ? `/spelers?filter=${encodeURIComponent(filter)}` : "/spelers";
    const res = await fetch(url);
    const data = await res.json();
    return data.spelers;  
}

function toonSpelers(spelers) {
    const container = document.getElementById("spelersContainer");
    container.innerHTML = "";

    if (!spelers || spelers.length === 0) {
        container.innerHTML = "<p>Geen spelers gevonden.</p>";
        return;
    }

    spelers.forEach(speler => {
        const div = document.createElement("div");
        div.className = "speler";
        div.innerHTML = `
          <img src="${speler.imageUrl}" alt="${speler.name}" />
          <div>
            <h2>${speler.name}</h2>
            <p>Leeftijd: ${speler.age}</p>
            <p>Positie: ${speler.position}</p>
            <p>Team: ${speler.team.name}</p>
          </div>
        `;
        container.appendChild(div);
    });
}

async function updateSpelers() {
    try {
        const spelers = await haalSpelersOp();
        toonSpelers(spelers);
    } catch (error) {
        const container = document.getElementById("spelersContainer");
        container.innerHTML = "<p>Er is iets misgegaan bij het laden van spelers.</p>";
        console.error(error);
    }
}

document.getElementById("filterInput").addEventListener("input", updateSpelers);


updateSpelers();
