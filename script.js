const games = [
  {name:'Armagetron Advanced',cat:'acao',icon:'⚡',className:'',version:'0.2.9.3.0',size:'3.1–3.5 MB',desc:'Clássico arcade 3D inspirado em Tron, com partidas online e locais.',url:'https://armagetronad.itch.io/armagetronad'},
  {name:'Neverball',cat:'puzzle',icon:'🟢',className:'two',version:'1.6.0',size:'~14 MB',desc:'Controle uma bola em pistas cheias de obstáculos. Também pode ser jogado direto no navegador.',url:'https://neverball.org/',play:'https://play.neverball.org/'},
  {name:'OpenTTD',cat:'estrategia',icon:'🚂',className:'three',version:'15.3',size:'22 MiB no Linux',desc:'Construa e administre uma rede de transportes em um jogo clássico de estratégia.',url:'https://www.openttd.org/downloads/openttd-releases/latest'},
  {name:'SuperTux',cat:'acao',icon:'🐧',className:'two',version:'0.7.0',size:'leve',desc:'Plataforma de código aberto com aventuras do Tux em vários mundos.',url:'https://www.supertux.org/download'},
  {name:'Freeciv',cat:'estrategia',icon:'🏛️',className:'three',version:'3.2.6',size:'leve/moderado',desc:'Construa uma civilização, pesquise tecnologias e dispute territórios.',url:'https://play.freeciv.org/download.html'},
  {name:'Luanti',cat:'sandbox',icon:'⛏️',className:'',version:'5.17.0',size:'leve/moderado',desc:'Plataforma voxel open source com jogos de sobrevivência, construção e multiplayer.',url:'https://www.luanti.org/pt-BR/downloads/'}
];

const grid = document.querySelector('#grid');
const search = document.querySelector('#search');
const filter = document.querySelector('#filter');
const empty = document.querySelector('#empty');
document.querySelector('#gameCount').textContent = games.length;

function label(cat){
  return ({acao:'Ação',corrida:'Corrida',estrategia:'Estratégia',puzzle:'Puzzle',sandbox:'Sandbox'})[cat] || cat;
}

function render(){
  const q = search.value.trim().toLowerCase();
  const selected = filter.value;
  const list = games.filter(g => {
    const matchesText = !q || `${g.name} ${g.desc} ${label(g.cat)}`.toLowerCase().includes(q);
    const matchesCat = selected === 'todos' || g.cat === selected;
    return matchesText && matchesCat;
  });

  grid.innerHTML = list.map(g => `
    <article class="card">
      <div class="cover ${g.className}">${g.icon}</div>
      <div class="card-body">
        <span class="tag">${label(g.cat)}</span>
        <h3>${g.name}</h3>
        <p>${g.desc}</p>
        <div class="meta"><span class="pill">${g.version}</span><span class="pill">${g.size}</span><span class="pill">Grátis</span></div>
        <div class="card-actions">
          <a class="download" href="${g.url}" target="_blank" rel="noopener noreferrer">Baixar ↗</a>
          ${g.play ? `<a class="play" href="${g.play}" target="_blank" rel="noopener noreferrer">Jogar online</a>` : ''}
        </div>
      </div>
    </article>
  `).join('');
  empty.hidden = list.length !== 0;
}

search.addEventListener('input', render);
filter.addEventListener('change', render);
document.querySelectorAll('.cat').forEach(btn => btn.addEventListener('click', () => {
  filter.value = btn.dataset.cat;
  document.querySelector('#jogos').scrollIntoView({behavior:'smooth', block:'start'});
  render();
}));
render();
