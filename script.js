// 10 kategori, 600+ HD Wallpaper
const imageSources = {

    doga: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
        "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    ],

    araba: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        "https://images.unsplash.com/photo-1523987355523-c7b5b48ad57e",
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023"
    ],

    manzara: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    ],

    minimal: [
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        "https://images.unsplash.com/photo-1485163819542-13adeb5e0061"
    ],

    anime: [
        "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee",
        "https://images.unsplash.com/photo-1606111819111-93d08c6f9a02"
    ],

    "4k": [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
    ],

    hayvan: [
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
        "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0"
    ],

    insan: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
    ],

    soyut: [
        "https://images.unsplash.com/photo-1541233349642-6e425fe6190e",
        "https://images.unsplash.com/photo-1526401485004-2fda9f6d6c37"
    ],

    oyun: [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e",
        "https://images.unsplash.com/photo-1580128637420-e08a1af0f23d"
    ]
};

// TÜM RESİMLERİ BİRLEŞTİR
imageSources.hepsi = Object.values(imageSources).flat();

// SEÇİM
const gallery = document.getElementById("gallery");

// TEMA YÜKLE
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}

// TEMA BUTONU
document.getElementById("themeBtn").onclick = () => {
    document.body.classList.toggle("light");

    localStorage.setItem("theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );
};

// KATEGORİ YÜKLE
document.querySelectorAll("nav button").forEach(btn => {
    btn.addEventListener("click", () => {
        loadCategory(btn.dataset.category);
    });
});

// KATEGORİ FONKSİYON
function loadCategory(cat) {
    gallery.innerHTML = "";
    imageSources[cat].forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.onclick = () => {
            window.location.href = `detail.html?img=${src}`;
        };
        gallery.appendChild(img);
    });
}

// ARAMA
document.getElementById("searchInput").addEventListener("input", e => {
    const text = e.target.value.toLowerCase();
    gallery.innerHTML = "";

    imageSources.hepsi.forEach(src => {
        if (src.toLowerCase().includes(text)) {
            const img = document.createElement("img");
            img.src = src;
            img.onclick = () => {
                window.location.href = `detail.html?img=${src}`;
            };
            gallery.appendChild(img);
        }
    });
});

// varsayılan tüm resimler yüklensin
loadCategory("hepsi");
