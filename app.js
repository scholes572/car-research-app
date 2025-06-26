const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const resultsSection = document.getElementById("results");
const loader = document.getElementById("loader");

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
      hideLoader();
      displayResults(data);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      hideLoader();
      resultsSection.innerHTML = "<p>Failed to load data. Try again later.</p>";
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
      hideLoader();
      displayResults(data);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      hideLoader();
      resultsSection.innerHTML = "<p>Failed to load data. Try again later.</p>";
    });
}
function loadRandomCars() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const randomCars = data.sort(() => 0.5 - Math.random()).slice(0, 3);
      displayResults(randomCars);
    })
    .catch(err => {
      console.error("Error loading random cars:", err);
    });
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
