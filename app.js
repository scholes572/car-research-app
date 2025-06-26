const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const resultsSection = document.getElementById("results");
const loader = document.getElementById("loader");

const API_URL = "http://localhost:3000/cars";

let allCars = [];

function showLoader() {
  loader.classList.remove("hidden");
}
function hideLoader() {
  loader.classList.add("hidden");
}

function getImagePath(car) {
  const name = `${car.make}-${car.model}`.toLowerCase().replace(/\s+/g, "-");
  return `images/${name}.jpg`;
}

function displayResults(cars) {
  resultsSection.innerHTML = "";

  cars.forEach((car) => {
    const card = document.createElement("div");
    card.className = "result-card";

    const image = document.createElement("img");
    image.src = getImagePath(car);
    image.alt = `${car.make} ${car.model}`;
    image.onerror = function () {
      this.src = "images/placeholder.jpg";
    };

    const title = document.createElement("h3");
    title.textContent = `${car.make} ${car.model}`;

    const details = document.createElement("p");
    details.innerHTML = `
      <strong>Build:</strong> ${car.build}<br>
      <strong>Price:</strong> $${car.price.toLocaleString()}<br>
      <strong>Manufactured:</strong> ${car.dateOfManufacture}
    `;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(details);
    resultsSection.appendChild(card);
  });
}

function fetchCars(query = "") {
  showLoader();
  let url = `${API_URL}`;
  if (query) {
    url += `?make_like=${query}&model_like=${query}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      hideLoader();
      allCars = data;
      displayResults(allCars);
    })
    .catch((err) => {
      console.error("Error fetching car data:", err);
      hideLoader();
      resultsSection.innerHTML = "<p>Failed to load car data.</p>";
    });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  fetchCars(query);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  fetchCars();
});

window.addEventListener("DOMContentLoaded", () => {
  fetchCars();
});
