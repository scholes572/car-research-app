const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const resultsSection = document.getElementById("results");
const loader = document.getElementById("loader");
const sortSelect = document.getElementById("sortSelect");

// Add form inputs
const addForm = document.getElementById("addCarForm");
const makeInput = document.getElementById("carMake");
const modelInput = document.getElementById("carModel");
const buildInput = document.getElementById("carBuild");
const priceInput = document.getElementById("carPrice");
const dateInput = document.getElementById("carDate");

const API_URL = "http://localhost:3000/cars";
let allCars = [];

function showLoader() {
  loader.classList.remove("hidden");
}
function hideLoader() {
  loader.classList.add("hidden");
}

// Build image path based on make and model
function getImagePath(car) {
  const name = `${car.make}-${car.model}`.toLowerCase().replace(/\s+/g, "-");
  return `image/${name}.jpg`;
}

// Display cards
function displayResults(cars) {
  resultsSection.innerHTML = "";

  cars.forEach((car) => {
    const card = document.createElement("div");
    card.className = "result-card";

    const image = document.createElement("img");
    image.src = getImagePath(car);
    image.alt = `${car.make} ${car.model}`;
    image.onerror = function () {
      this.src = "image/placeholder.jpg";
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

// Fetch cars (with optional search)
function fetchCars(query = "") {
  showLoader();
  let url = API_URL;
  if (query) {
    url += `?make_like=${query}&model_like=${query}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allCars = data;
      displayResults(allCars);
      hideLoader();
    })
    .catch((err) => {
      console.error("Error fetching car data:", err);
      resultsSection.innerHTML = "<p>Failed to load data.</p>";
      hideLoader();
    });
}

// Sort cars by price
function sortCarsByPrice(order) {
  if (order === "low") {
    allCars.sort((a, b) => a.price - b.price);
  } else if (order === "high") {
    allCars.sort((a, b) => b.price - a.price);
  }
  displayResults(allCars);
}

// Add new car
function addNewCar(e) {
  e.preventDefault();

  const newCar = {
    make: makeInput.value.trim(),
    model: modelInput.value.trim(),
    build: buildInput.value.trim(),
    price: parseFloat(priceInput.value),
    dateOfManufacture: dateInput.value,
  };

  if (
    !newCar.make ||
    !newCar.model ||
    !newCar.build ||
    isNaN(newCar.price) ||
    !newCar.dateOfManufacture
  ) {
    alert("Please fill in all fields.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCar),
  })
    .then((res) => res.json())
    .then((data) => {
      allCars.push(data);
      displayResults(allCars);
      addForm.reset();
    })
    .catch((err) => {
      console.error("Error adding car:", err);
      alert("Failed to add car.");
    });
}

// Event Listeners
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  fetchCars(query);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  fetchCars();
});

sortSelect.addEventListener("change", (e) => {
  sortCarsByPrice(e.target.value);
});

addForm.addEventListener("submit", addNewCar);

// Load on start
window.addEventListener("DOMContentLoaded", () => {
  fetchCars();
});
