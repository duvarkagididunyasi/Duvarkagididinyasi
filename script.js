let wallpapers = [];
let loaded = 0;
const perLoad = 20;

async function loadData() {
    const json = await fetch("data/wallpapers.json").then(r => r.json());
    wallpapers = json.wallpapers;
    loadMore();
}

function loadMore() {
    const gallery = document.getElementById("gallery");

    for (let i = loaded; i < loaded + perLoad && i < wallpapers.length; i++) {
        const img = document.createElement("img");
        img.src = wallpapers[i].url;
        gallery.appendChild(img);
    }

    loaded += perLoad;
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
    }
});

loadData();
