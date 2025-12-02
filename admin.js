async function addWallpaper() {
    const url = document.getElementById("imageURL").value.trim();
    const category = document.getElementById("category").value;

    if (!url) {
        alert("Lütfen resim URL'si girin!");
        return;
    }

    const json = await fetch("data/wallpapers.json").then(r => r.json());

    json.wallpapers.push({
        url: url,
        category: category
    });

    const newJson = JSON.stringify(json, null, 4);

    const blob = new Blob([newJson], {type: "application/json"});
    const temp = document.createElement("a");

    temp.href = URL.createObjectURL(blob);
    temp.download = "wallpapers.json";
    temp.click();

    alert("RESİM EKLENDİ!\nYeni wallpapers.json dosyan indirildi.\nGitHub'daki dosya ile değiştir.");
}
