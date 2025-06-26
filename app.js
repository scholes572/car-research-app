const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const resultsSection = document.getElementById("results");
const loader = document.getElementById("loader");
const modal = document.getElementById("carModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let currentIndex = 0;
const carsPerPage = 3;
let allCars = [];


function openModal(car) {
  modalBody.innerHTML = `
    <img src="https://source.unsplash.com/500x250/?${car.make}-${car.model}-car" />
    <h2>${car.make} ${car.model}</h2>
    <p><strong>Build:</strong> ${car.build}</p>
    <p><strong>Price:</strong> $${car.price.toLocaleString()}</p>
    <p><strong>Date of Manufacture:</strong> ${car.dateOfManufacture}</p>
  `;
  modal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
});

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}
function displayResults(cars) {
  resultsSection.innerHTML = "";

  if (cars.length === 0) {
    resultsSection.innerHTML = "<p>No cars found.</p>";
    return;
  }

  cars.forEach(car => {
    const card = document.createElement("div");
    card.className = "result-card";

    const image = document.createElement("img");
    image.src = `https://source.unsplash.com/400x200/?${car.make}-${car.model}-car`;
    image.alt = `${car.make} ${car.model}`;

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

    card.addEventListener("click", function () {
      openModal(car);
    });

    resultsSection.appendChild(card);
  });
}

function fetchCars(query = "") {
  showLoader();
  let url = API_URL;

  if (query) {
    url += `?q=${query}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      allCars = data;
      currentIndex = 0;
      resultsSection.innerHTML = "";
      loadMoreBtn.style.display = "block";
      showNextCars();
    });
}
function loadRandomCars() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
    allCars = data.sort(() => 0.5 - Math.random());
    currentIndex = 0;
    resultsSection.innerHTML = "";
    loadMoreBtn.style.display = "block";
    showNextCars();
  })

}
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    fetchCars(query);
  }
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  resultsSection.innerHTML = "";
  loadRandomCars();
});
window.addEventListener("DOMContentLoaded", () => {
  loadRandomCars();
});
function showNextCars() {
  const nextCars = allCars.slice(currentIndex, currentIndex + carsPerPage);
  displayResults(nextCars, true); 
  currentIndex += carsPerPage;

  if (currentIndex >= allCars.length) {
    loadMoreBtn.style.display = "none";
  }
}
loadMoreBtn.addEventListener("click", showNextCars);

