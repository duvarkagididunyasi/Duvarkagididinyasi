/* ---------- 1) Temel resim verisi (örnek Unsplash linkleri) ---------- */
const defaultSources = {
  doga: [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    "https://images.unsplash.com/photo-1521295121783-8a321d551ad2"
  ],
  araba: [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    "https://images.unsplash.com/photo-1523987355523-c7b5b48ad57e"
  ],
  manzara: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  ],
  minimal: [
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
  ],
  anime: [
    "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee"
  ],
  "4k": [
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
  ],
  hayvan: [
    "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8"
  ],
  insan: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  ],
  soyut: [
    "https://images.unsplash.com/photo-1541233349642-6e425fe6190e"
  ],
  oyun: [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e"
  ]
};

/* ---------- 2) Admin tarafından eklenen resimler (localStorage) ---------- */
function getCustomSources() {
  try {
    const raw = localStorage.getItem('dkd_custom_images');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}
function saveCustomSources(obj) {
  localStorage.setItem('dkd_custom_images', JSON.stringify(obj));
}

/* merge default + custom (custom first) */
function buildSources() {
  const custom = getCustomSources();
  const merged = {};
  const keys = new Set([...Object.keys(defaultSources), ...Object.keys(custom)]);
  keys.forEach(k => {
    const defArr = defaultSources[k] || [];
    const cusArr = custom[k] || [];
    merged[k] = [...cusArr, ...defArr]; // admin-added first
  });
  // "hepsi" for search/all
  merged.hepsi = Object.values(merged).flat();
  return merged;
}

/* ---------- 3) DOM & state ---------- */
const gallery = document.getElementById('gallery');
const loadingEl = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const themeBtn = document.getElementById('themeBtn');

let sources = buildSources();
let currentCategory = 'hepsi';
let filteredList = [...sources.hepsi];
let cursor = 0;
const PAGE_SIZE = 20; // her yüklemede kaç resim gelsin

/* ---------- 4) Tema yönetimi ---------- */
if (localStorage.getItem('dkd_theme') === 'light') document.body.classList.add('light');
themeBtn.onclick = () => {
  document.body.classList.toggle('light');
  localStorage.setItem('dkd_theme', document.body.classList.contains('light') ? 'light' : 'dark');
};

/* ---------- 5) Kategori butonları ---------- */
document.querySelectorAll('nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    updateSourcesAndReset();
  });
});

/* ---------- 6) Arama ---------- */
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) {
    // boşsa kategoriye göre göster
    filteredList = currentCategory === 'hepsi' ? [...sources.hepsi] : [...sources[currentCategory] || []];
  } else {
    filteredList = sources.hepsi.filter(u => u.toLowerCase().includes(q));
  }
  cursor = 0;
  gallery.innerHTML = '';
  loadMore(); // yeni sonuçları yükle
});

/* ---------- 7) Load / render fonksiyonları ---------- */
function makeCard(url) {
  const a = document.createElement('a');
  a.href = `detail.html?img=${encodeURIComponent(url)}`;
  a.className = 'card';
  a.innerHTML = `<img loading="lazy" src="${url}" alt="wallpaper"><div class="meta"><h4>Duvar Kağıdı</h4><p>Kaynak: Unsplash</p></div>`;
  return a;
}

function loadMore() {
  if (cursor >= filteredList.length) {
    loadingEl.style.display = 'none';
    return;
  }
  loadingEl.style.display = 'block';
  // simulate small delay for UX
  setTimeout(() => {
    const next = filteredList.slice(cursor, cursor + PAGE_SIZE);
    next.forEach(url => {
      const card = makeCard(url);
      gallery.appendChild(card);
    });
    cursor += next.length;
    loadingEl.style.display = 'none';
  }, 250);
}

/* ---------- 8) Infinite scroll ---------- */
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 800);
    if (nearBottom) loadMore();
    ticking = false;
  });
});

/* ---------- 9) update sources (ör. admin değiştiğinde çağır) ---------- */
function updateSourcesAndReset() {
  sources = buildSources();
  filteredList = currentCategory === 'hepsi' ? [...sources.hepsi] : [...sources[currentCategory] || []];
  cursor = 0;
  gallery.innerHTML = '';
  loadMore();
}

/* ---------- 10) sayfa ilk yükleme ---------- */
updateSourcesAndReset();

/* ---------- 11) expose small API (admin sayfasının update çağırabilmesi için) ---------- */
window.DKD = {
  notifyDataChanged: updateSourcesAndReset,
  getCustomSources,
  saveCustomSources
};
