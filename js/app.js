
let places = [];

const grid = document.getElementById("placesGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const regionFilter = document.getElementById("regionFilter");
const clearFilters = document.getElementById("clearFilters");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");

async function loadPlaces() {
  try {
    const response = await fetch("data/places.json");
    places = await response.json();
    filterPlaces();
  } catch (error) {
    grid.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger rounded-4">
          Erro ao carregar data/places.json. Rode o projeto em um servidor local.
        </div>
      </div>
    `;
  }
}

function renderStars(rating) {
  const fullStars = Math.round(rating);
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
}

function placeCard(place) {
  const tags = place.tags
    .map(tag => `<span class="badge rounded-pill text-bg-light me-1">${tag}</span>`)
    .join("");

  return `
    <div class="col-md-6 col-lg-4">
      <article class="card place-card h-100 shadow-sm">
        <img src="${place.image}" class="card-img-top place-img" alt="Imagem de ${place.name}">

        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <span class="badge badge-category rounded-pill">${place.category}</span>
            <span class="fw-bold text-success">${place.price}</span>
          </div>

          <h5 class="card-title fw-bold mb-1">${place.name}</h5>

          <p class="text-muted small mb-2">
            <i class="bi bi-geo-alt-fill text-success"></i>
            ${place.neighborhood} · ${place.region}
          </p>

          <p class="rating small mb-2">
            ${renderStars(place.rating)}
            <span class="text-muted">${place.rating}</span>
          </p>

          <p class="card-text text-muted">${place.shortDescription}</p>

          <div class="mb-3">${tags}</div>

          <a href="./${place.categorySlug}/${place.slug}/" class="btn btn-success w-100">
            Ver página do local
          </a>
        </div>
      </article>
    </div>
  `;
}

function filterPlaces() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedRegion = regionFilter.value;

  const filtered = places.filter(place => {
    const searchableContent = [
      place.name,
      place.category,
      place.region,
      place.neighborhood,
      place.address,
      place.shortDescription,
      place.description,
      place.tags.join(" ")
    ].join(" ").toLowerCase();

    const matchesSearch = searchableContent.includes(searchTerm);
    const matchesCategory = selectedCategory === "todos" || place.category === selectedCategory;
    const matchesRegion = selectedRegion === "todos" || place.region === selectedRegion;

    return matchesSearch && matchesCategory && matchesRegion;
  });

  grid.innerHTML = filtered.map(placeCard).join("");
  resultCount.textContent = `${filtered.length} lugar(es)`;
  emptyState.classList.toggle("d-none", filtered.length > 0);
}

searchInput.addEventListener("input", filterPlaces);
categoryFilter.addEventListener("change", filterPlaces);
regionFilter.addEventListener("change", filterPlaces);

clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "todos";
  regionFilter.value = "todos";
  filterPlaces();
});

loadPlaces();
