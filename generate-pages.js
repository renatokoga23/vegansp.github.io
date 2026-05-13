const fs = require("fs");
const path = require("path");

const places = require("./data/places.json");

const template = fs.readFileSync(
  path.join(__dirname, "templates", "local-template.html"),
  "utf-8"
);

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTags(tags = []) {
  return tags
    .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("\n");
}

function renderHighlights(highlights = []) {
  return highlights
    .map(item => `<li>${escapeHtml(item)}</li>`)
    .join("\n");
}

function renderTemplate(place) {
  const replacements = {
    name: escapeHtml(place.name),
    shortDescription: escapeHtml(place.shortDescription),
    description: escapeHtml(place.description),
    image: escapeHtml(place.image),
    category: escapeHtml(place.category),
    neighborhood: escapeHtml(place.neighborhood),
    region: escapeHtml(place.region),
    rating: escapeHtml(place.rating),
    maps: escapeHtml(place.maps),
    instagram: escapeHtml(place.instagram),
    whatsapp: escapeHtml(place.whatsapp),
    address: escapeHtml(place.address),
    openingHours: escapeHtml(place.openingHours),
    price: escapeHtml(place.price),
    tags: renderTags(place.tags),
    highlights: renderHighlights(place.highlights)
  };

  let html = template;

  Object.entries(replacements).forEach(([key, value]) => {
    html = html.replaceAll(`{{${key}}}`, value);
  });

  return html;
}

function generatePages() {
  places.forEach(place => {
    const categorySlug = place.categorySlug || "locais";
    const outputDir = path.join(__dirname, categorySlug, place.slug);

    fs.mkdirSync(outputDir, { recursive: true });

    const html = renderTemplate(place);

    fs.writeFileSync(
      path.join(outputDir, "index.html"),
      html,
      "utf-8"
    );

    console.log(`Página criada: /${categorySlug}/${place.slug}/`);
  });
}

generatePages();
