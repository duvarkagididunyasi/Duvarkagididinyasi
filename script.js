const categories = [
  { name: "Doğa", query: "nature" },
  { name: "Manzara", query: "landscape" },
  { name: "Araba", query: "car" },
  { name: "Minimal", query: "minimal" },
  { name: "Anime", query: "anime" }
];

let wallpapers = [];

// Her kategori için 80 resim (Toplam 400)
categories.forEach(cat => {
  for (let i = 1; i <= 80; i++) {
    wallpapers.push({
      category: cat.name,
      url: `https://source.unsplash.com/1080x1920/?${cat.query}&sig=${cat.query}${i}`
    });
  }
});

function loadWallpapers(filter = "") {
  const container = document.getElementById("wallpaperContainer");
  container.innerHTML = "";

  const filtered = wallpapers.filter(wp =>
    wp.category.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(wp => {
    const card = document.createElement("div");
    card.className = "wallpaper-card";
    card.innerHTML = `<img src="${wp.url}" alt="${wp.category}">`;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadWallpapers();
});
