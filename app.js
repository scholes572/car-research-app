const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsSectionn= document.getElementById("results");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    fetchCarData(query);
  }
});

async function fetchCarData(query) {
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
  }
}
function displayResults(cars) {
    resultsSection.innerHTML = "";

    if (!cars || cars.length === 0) {
        resultsSection.innerHTML = "<P>No results found.</p>";
        return;
    }
}
cars.forEach(car => {
    const card = document.createElement("div");
    card.className = "result-card"    
});