let apiKey = "BURAYA_API_KEY_YAZ"; 

let currentCategory = "nature";
let page = 1;
let loading = false;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const gallery = document.getElementById("gallery");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const downloadBtn = document.getElementById("downloadBtn");
const favBtn = document.getElementById("favBtn");

let currentImageUrl = "";

async function loadWallpapers() {
    if (loading) return;
    loading = true;

    const url = `https://api.unsplash.com/search/photos/?query=${currentCategory}&page=${page}&per_page=30&client_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    data.results.forEach(img => {
        const image = document.createElement("img");
        image.src = img.urls.small;
        image.dataset.full = img.urls.full;
        image.dataset.download = img.urls.raw;

        image.onclick = () => openModal(image);

        gallery.appendChild(image);
    });

    page++;
    loading = false;
}

function changeCategory(cat) {
    currentCategory = cat;
    page = 1;
    gallery.innerHTML = "";
    loadWallpapers();
}

function searchImages() {
    const q = document.getElementById("searchInput").value;
    if (q.trim().length === 0) return;

    currentCategory = q;
    page = 1;
    gallery.innerHTML = "";
    loadWallpapers();
}

/* --- DETAY MODAL --- */

function openModal(img) {
    modal.style.display = "block";
    modalImg.src = img.dataset.full;
    downloadBtn.href = img.dataset.download;

    currentImageUrl = img.dataset.full;

    favBtn.innerText = favorites.includes(currentImageUrl)
        ? "❤️ Favorilerde"
        : "❤️ Favorilere Ekle";
}

function closeModal() {
    modal.style.display = "none";
}

function toggleFavorite() {
    if (favorites.includes(currentImageUrl)) {
        favorites = favorites.filter(f => f !== currentImageUrl);
        favBtn.innerText = "❤️ Favorilere Ekle";
    } else {
        favorites.push(currentImageUrl);
        favBtn.innerText = "❤️ Favorilerde";
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}

/* Sonsuz kaydırma */
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        loadWallpapers();
    }
});

loadWallpapers();
