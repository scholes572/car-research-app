const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsSectionn= document.getElementById("results");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    fetchCarData(query);
  }
});