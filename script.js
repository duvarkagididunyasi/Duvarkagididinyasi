const wallpapers = [
  { category: "Doğa", url: "doga1.jpg" },
  { category: "Doğa", url: "doga2.jpg" },
  { category: "Doğa", url: "doga3.jpg" },
  { category: "Doğa", url: "doga4.jpg" },

  { category: "Manzara", url: "manzara1.jpg" },
  { category: "Manzara", url: "manzara2.jpg" },
  { category: "Manzara", url: "manzara3.jpg" },
  { category: "Manzara", url: "manzara4.jpg" },

  { category: "Araba", url: "araba1.jpg" },
  { category: "Araba", url: "araba2.jpg" },
  { category: "Araba", url: "araba3.jpg" },
  { category: "Araba", url: "araba4.jpg" },

  { category: "Anime", url: "anime1.jpg" },
  { category: "Anime", url: "anime2.jpg" },
  { category: "Anime", url: "anime3.jpg" },
  { category: "Anime", url: "anime4.jpg" },

  { category: "Minimal", url: "minimal1.jpg" },
  { category: "Minimal", url: "minimal2.jpg" },
  { category: "Minimal", url: "minimal3.jpg" },
  { category: "Minimal", url: "minimal4.jpg" }
];

function loadWallpapers(filter = "") {
  const container = document.getElementById("wallpaperContainer");
  container.innerHTML = "";

  const filtered = wallpapers.filter(wp =>
    wp.category.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(wp => {
    const card = document.createElement("div");
    card.className = "wallpaper-card";
    card.innerHTML = `
      <img src="${wp.url}" alt="${wp.category}">
      <button class="download-btn" onclick="downloadImage('${wp.url}')">İndir</button>
    `;
    container.appendChild(card);
  });
}

function downloadImage(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = url;
  link.click();
}

document.addEventListener("DOMContentLoaded", () => {
  loadWallpapers();
});
