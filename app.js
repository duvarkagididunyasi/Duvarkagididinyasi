// Basit statik galeri + arama + "daha fazla" yüklemesi
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search');
const loadMoreBtn = document.getElementById('loadMore');

const ITEMS = [
  {id:'wall1',title:'Sisli Orman',author:'Unsplash',tags:['doğa'],src:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80'},
  {id:'wall2',title:'Neon Şehir',author:'Unsplash',tags:['neon','minimal'],src:'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1600&q=80'},
  {id:'wall3',title:'Minimal Soyut',author:'Unsplash',tags:['minimal'],src:'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?w=1600&q=80'},
  {id:'wall4',title:'Dağ Gölü',author:'Unsplash',tags:['doğa'],src:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80'},
  {id:'wall5',title:'Siyah AMOLED',author:'Unsplash',tags:['amoled'],src:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&q=80'},
  {id:'wall6',title:'Retro Oyun',author:'Unsplash',tags:['anime','oyun'],src:'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80'},
  {id:'wall7',title:'Gün Batımı',author:'Unsplash',tags:['doğa'],src:'https://images.unsplash.com/photo-1501973801540-537f08ccae7a?w=1600&q=80'},
  {id:'wall8',title:'Mavi Soyut',author:'Unsplash',tags:['minimal'],src:'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1600&q=80'}
];

let shown = 0;
function renderItems(list){
  const fragment = document.createDocumentFragment();
  list.forEach(item=>{
    const a = document.createElement('a');
    a.href = 'detail_'+item.id+'.html';
    a.className='card';
    a.innerHTML = `<img loading="lazy" src="${item.src}" alt="${item.title}"><div class="meta"><h4>${item.title}</h4><p>${item.author}</p></div>`;
    fragment.appendChild(a);
  });
  gallery.appendChild(fragment);
}

function loadMore(){
  const next = ITEMS.slice(shown, shown+4);
  renderItems(next);
  shown += next.length;
  if(shown >= ITEMS.length) loadMoreBtn.style.display='none';
}

loadMoreBtn.onclick = loadMore;
loadMore(); // ilk yükleme

// arama
searchInput.addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  gallery.innerHTML='';
  shown=0;
  if(!q){ loadMoreBtn.style.display='block'; loadMore(); return; }
  const filtered = ITEMS.filter(it => it.title.toLowerCase().includes(q) || (it.tags && it.tags.join(' ').includes(q)));
  renderItems(filtered);
  loadMoreBtn.style.display='none';
});
