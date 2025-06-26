const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsSection = document.getElementById("results");
const clearBtn = document.getElementById("clearBtn");
const loader = document.getElementById("loader");

// Search button click
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    fetchCarData(query);
  }
});

// Pressing Enter in search input
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query !== "") {
      fetchCarData(query);
    }
  }
});

// Clear button
clearBtn.addEventListener("click", () => {
  resultsSection.innerHTML = "";
  searchInput.value = "";
});

// Loader functions
function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

// Fetch cars by query
async function fetchCarData(query) {
  showLoader();
  resultsSection.innerHTML = "";

  try {
    const res = await fetch(`https://api.api-ninjas.com/v1/cars?model=${query}`, {
      method: "GET",
      headers: {
        "X-Api-Key": "u5FfzGHDXMP3pItwVGn4og==GpM37jsM"
      }
    });

    const data = await res.json();
    displayResults(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    resultsSection.innerHTML = "<p>Failed to load car data. Try again later.</p>";
  } finally {
    hideLoader();
  }
}

// Show cars on page load
async function fetchRandomCars() {
  showLoader();
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
  } finally {
    hideLoader();
  }
}

window.addEventListener("DOMContentLoaded", fetchRandomCars);

// Display car results
function displayResults(cars) {
  resultsSection.innerHTML = "";

  if (!cars || cars.length === 0) {
    resultsSection.innerHTML = "<p>No results found.</p>";
    return;
  }

  cars.forEach(car => {
    const card = document.createElement("div");
    card.className = "result-card";

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
}
