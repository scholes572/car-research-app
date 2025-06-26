const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsSection= document.getElementById("results");
const clearBtn = document.getElementById("clearBtn");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    fetchCarData(query);
  }
});
  searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query !== "") {
      fetchCarData(query);
    }
  }
});
async function fetchCarData(query) {
    resultsSection.innerHTML = "<p>Loading...</p>"
  try {
    const res = await fetch(`https://api.api-ninjas.com/v1/cars?model=${query}`, {
      method: "GET",
      headers: {
        "X-Api-Key": "u5FfzGHDXMP3pItwVGn4og==GpM37jsM"
      }
    });

    const data = await res.json();
    displayResults(data);
    searchInput.value = "";
  } catch (error) {
    console.error("Failed to fetch data:", error);
    resultsSection.innerHTML = "<p>Failed to load car data. Try again later.</p>";
  }
}
function displayResults(cars) {
    resultsSection.innerHTML = "";

    if (!cars || cars.length === 0) {
        resultsSection.innerHTML = "<P>No results found.</p>";
        return;
    }
cars.forEach(car => {
    const card = document.createElement("div");
    card.className = "result-card"    

    card.innerHTML = `
      <img src="https://via.placeholder.com/300x200?text=${car.make}" alt="${car.make}" />
      <h3>${car.make} ${car.model}</h3>
      <p><strong>Year:</strong> ${car.year || "N/A"}</p>
      <p><strong>Class:</strong> ${car.class || "N/A"}</p>
      <p><strong>Transmission:</strong> ${car.transmission || "N/A"}</p>
      <p><strong>Fuel Type:</strong> ${car.fuel_type || "N/A"}</p>
    `;
    resultsSection.appendChild(card);

  });
clearBtn.addEventListener("click", () => {
  resultsSection.innerHTML = "";
});
async function fetchRandomCars() {
  try {
    const res = await fetch("https://api.api-ninjas.com/v1/cars?limit=6", {
      method: "GET",
      headers: {
        "X-Api-Key": "u5FfzGHDXMP3pItwVGn4og==GpM37jsM"
      }
    });

    const data = await res.json();
    displayResults(data);
  } catch (error) {
    console.error("Failed to fetch random cars:", error);
    resultsSection.innerHTML = "<p>Unable to load featured cars. Try again later.</p>";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchRandomCars();
});

}