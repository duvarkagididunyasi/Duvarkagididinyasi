const wallpapers = [
  // DOĞA
  ...Array.from({ length: 80 }, (_, i) => ({
    category: "Doğa",
    url: `https://images.pexels.com/photos/${100000 + i}/pexels-photo-${100000 + i}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=1080`
  })),

  // MANZARA
  ...Array.from({ length: 80 }, (_, i) => ({
    category: "Manzara",
    url: `https://images.pexels.com/photos/${200000 + i}/pexels-photo-${200000 +i}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=1080`
  })),

  // ARABA
  ...Array.from({ length: 80 }, (_, i) => ({
    category: "Araba",
    url: `https://images.pexels.com/photos/${300000 + i}/pexels-photo-${300000 + i}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=1080`
  })),

  // MİNİMAL
  ...Array.from({ length: 80 }, (_, i) => ({
    category: "Minimal",
    url: `https://images.pexels.com/photos/${400000 + i}/pexels-photo-${400000 + i}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=1080`
  })),

  // ANIME (Gerçek anime olmadığı için çizerlerin yayınladığı illüstrasyonlar)
  ...Array.from({ length: 80 }, (_, i) => ({
    category: "Anime",
    url: `https://images.pexels.com/photos/${500000 + i}/pexels-photo-${500000 + i}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=1080`
  })),
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
    card.innerHTML = `<img src="${wp.url}" alt="${wp.category}">`;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadWallpapers();
});
