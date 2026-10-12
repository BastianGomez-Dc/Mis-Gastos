/* No permitir que otra página muestre la app dentro de un iframe (clickjacking). */
if(window.top!==window.self){
  document.documentElement.innerHTML='';
  throw new Error('Mis Gastos no puede abrirse dentro de otra página');
}

/* ---------- Íconos ---------- */
const P={
  comida:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  transporte:'<path d="M8 6v6M15 6v6M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  super:'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  cafe:'<path d="M10 2v2M14 2v2M6 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
  ocio:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
  salud:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
  hogar:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  servicios:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  ropa:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
  otros:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.7 4.73a2 2 0 0 0 2 0L20.7 7"/>',
  trash:'<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  auto:'<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
  trend:'<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
  timer:'<path d="M10 2h4M12 14l3-3"/><circle cx="12" cy="14" r="8"/>',
  repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  pie:'<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
  chart:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-5M13 17V8M18 17v-3"/>',
  phone:'<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>'
};
const svg=(n,cls='i')=>`<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;

const CATS=[
  {id:'comida',name:'Comida',c:'#F97316'},
  {id:'transporte',name:'Transporte',c:'#3B82F6'},
  {id:'super',name:'Súper',c:'#10B981'},
  {id:'cafe',name:'Café y snacks',short:'Café',c:'#D97706'},
  {id:'ocio',name:'Entretención',short:'Ocio',c:'#8B5CF6'},
  {id:'salud',name:'Salud',c:'#EF4444'},
  {id:'hogar',name:'Hogar',c:'#0EA5E9'},
  {id:'servicios',name:'Cuentas',c:'#EAB308'},
  {id:'ropa',name:'Ropa',c:'#EC4899'},
  {id:'otros',name:'Otros',c:'#7C8BA1'}
];
const CAT=Object.freeze(Object.fromEntries(CATS.map(c=>[c.id,c])));
// Solo categorías propias de CAT (evita 'constructor', '__proto__', etc.)
const isCat=c=>typeof c==='string'&&Object.prototype.hasOwnProperty.call(CAT,c);
const tile=id=>{const k=isCat(id)?id:'otros';return `<span class="tile" style="--cc:${CAT[k].c}">${svg(k)}</span>`};

const KEY='misgastos.v1', TKEY='misgastos.theme', LEGACY_PHOTO_KEY='misgastos.photo';
const MAX_ITEMS=20000, MAX_BACKUP_CHARS=4000000, MAX_ENCRYPTED_BACKUP_CHARS=5400000;
const RECOVERY_KEY=KEY+'.recuperacion';
let data={items:[],settings:{small:5000,minRep:3}};
let selCat=null, view='add', theme='dark';

const $=id=>document.getElementById(id);
const fmt=new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0});
const money=n=>fmt.format(Math.round(n));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
const digits=s=>parseInt(String(s).replace(/\D/g,''),10)||0;

function todayStr(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function dayNum(s){const[y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)/864e5}
function fmtDate(s,o){const[y,m,d]=s.split('-').map(Number);return new Date(Date.UTC(y,m-1,d)).toLocaleDateString('es-CL',Object.assign({timeZone:'UTC'},o))}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
let month=todayStr().slice(0,7);
function monthName(ym,o){const[y,m]=ym.split('-').map(Number);return new Date(Date.UTC(y,m-1,1)).toLocaleDateString('es-CL',Object.assign({timeZone:'UTC'},o))}
function monthLabel(ym){return cap(monthName(ym,{month:'long',year:'numeric'}))}
function shiftMonth(ym,d){let[y,m]=ym.split('-').map(Number);m+=d;while(m<1){m+=12;y--}while(m>12){m-=12;y++}return y+'-'+String(m).padStart(2,'0')}
function daysInMonth(ym){const[y,m]=ym.split('-').map(Number);return new Date(Date.UTC(y,m,0)).getUTCDate()}

/* ---------- Validación de datos ---------- */
const ID_RE=/^[a-z0-9]{6,24}$/i;
const DATE_RE=/^\d{4}-\d{2}-\d{2}$/;
const MAX_DESC=60;
function validDateISO(s){
  if(typeof s!=='string'||!DATE_RE.test(s))return false;
  const y=Number(s.slice(0,4));
  if(y<1900||y>2100)return false;
  const d=new Date(s+'T00:00:00Z');
  return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===s;
}
function validAmount(v){
  return typeof v==='number'&&Number.isSafeInteger(v)&&v>=1&&v<1e10;
}
function newId(){
  const r=new Uint32Array(3);crypto.getRandomValues(r);
  return (Date.now().toString(36)+r[0].toString(36)+r[1].toString(36)+r[2].toString(36)).slice(0,24);
}
function validItem(i){
  if(!i||typeof i!=='object'||Array.isArray(i))return false;
  return typeof i.id==='string'&&ID_RE.test(i.id)
    &&validAmount(i.amount)&&validDateISO(i.date)
    &&isCat(i.cat)
    &&(i.desc==null||typeof i.desc==='string');
}
const cleanItem=i=>({
  id:i.id,amount:i.amount,date:i.date,cat:i.cat,
  desc:String(i.desc||'').trim().slice(0,MAX_DESC),
  ts:Number.isSafeInteger(i.ts)&&i.ts>=0?i.ts:0
});
function cleanItems(arr){
  if(!Array.isArray(arr))return[];
  const seen=new Set(),out=[];
  for(const i of arr){
    if(out.length>=MAX_ITEMS)break;
    if(validItem(i)&&!seen.has(i.id)){
      seen.add(i.id);out.push(cleanItem(i));
    }
  }
  return out;
}
function cleanSettings(s){
  s=s&&typeof s==='object'&&!Array.isArray(s)?s:{};
  const small=Number(s.small),rep=Number(s.minRep);
  return{small:Number.isSafeInteger(small)&&small>0&&small<1e9?small:5000,minRep:[2,3,4,5].includes(rep)?rep:3};
}

/* ---------- Almacenamiento local ---------- */
function keepRecoveryCopy(raw){
  // Conserva los datos dañados en otra clave antes de que un guardado nuevo los sobrescriba.
  try{if(raw&&!localStorage.getItem(RECOVERY_KEY))localStorage.setItem(RECOVERY_KEY,raw.slice(0,MAX_BACKUP_CHARS))}catch(_){}
  setTimeout(()=>toast('Los datos guardados estaban dañados. Se conservó una copia de recuperación.'),600);
}
function load(){
  let r=null;
  try{r=localStorage.getItem(KEY)}catch(e){}
  if(r){
    try{
      if(r.length>MAX_BACKUP_CHARS)throw new Error('Datos locales demasiado grandes');
      const p=JSON.parse(r);
      if(!p||typeof p!=='object'||!Array.isArray(p.items))throw new Error('Formato local inválido');
      data.items=cleanItems(p.items);
      data.settings=cleanSettings(p.settings);
      if(data.items.length!==Math.min(p.items.length,MAX_ITEMS))keepRecoveryCopy(r);
    }catch(e){
      /* No ejecutar ni confiar en datos locales corruptos, pero tampoco perderlos. */
      data.items=[];data.settings=cleanSettings();
      keepRecoveryCopy(r);
    }
  }
  try{const t=localStorage.getItem(TKEY);if(t==='light'||t==='dark'||t==='auto')theme=t}catch(e){}
}
function save(){try{const raw=JSON.stringify(data);if(raw.length>MAX_BACKUP_CHARS)throw new Error('Límite local');localStorage.setItem(KEY,raw);return true}catch(e){toast('No se pudo guardar en este dispositivo');return false}}
async function initStorage(){
  const el=$('msync');el.className='sync';el.innerHTML=svg('phone')+'<span></span>';el.lastChild.textContent='En este teléfono';
  $('storeHint').textContent='Tus gastos se guardan solo en este navegador/dispositivo: no se envían a ningún servidor. Al borrar los datos del sitio o desinstalar la app podrían perderse. Haz respaldos periódicos.';
  try{localStorage.removeItem(LEGACY_PHOTO_KEY)}catch(e){}
  try{if(navigator.storage&&navigator.storage.persist)await navigator.storage.persist()}catch(_){}
}

let tt;function toast(m,icon){const t=$('toast');t.innerHTML=(icon?svg(icon):'')+'<span></span>';t.lastChild.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)}
// El HTML original de cada botón se guarda en memoria, nunca en atributos del DOM.
const armedButtons=new WeakMap();
function disarm(btn){
  const st=armedButtons.get(btn);if(!st)return;
  clearTimeout(st.timer);armedButtons.delete(btn);
  btn.innerHTML=st.html;btn.classList.remove('danger-on');
}
function confirmTap(btn,label,fn){
  if(armedButtons.has(btn)){disarm(btn);fn();return}
  const st={html:btn.innerHTML,timer:0};
  armedButtons.set(btn,st);
  btn.textContent=label;
  btn.classList.add('danger-on');
  st.timer=setTimeout(()=>{if(btn.isConnected)disarm(btn);else armedButtons.delete(btn)},3500);
}
const monthItems=()=>data.items.filter(i=>i.date.slice(0,7)===month);
const label=i=>i.desc&&i.desc.trim()?i.desc.trim():(isCat(i.cat)?CAT[i.cat].name:'Gasto');

/* ---------- Tema ---------- */
const THEMES=[{id:'auto',name:'Automático',icon:'auto'},{id:'light',name:'Claro',icon:'sun'},{id:'dark',name:'Oscuro',icon:'moon'}];
const mq=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):null;
function applyTheme(){
  const r=document.documentElement;
  if(theme==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',theme);
  const dark=theme==='dark'||(theme==='auto'&&mq&&mq.matches);
  $('themeColor').setAttribute('content',dark?'#05060f':'#eef1f8');
  const cur=THEMES.find(t=>t.id===theme);
  $('themeBtn').innerHTML=svg(cur.icon);
  $('themeBtn').setAttribute('aria-label','Tema: '+cur.name+'. Toca para cambiar');
  $('themeSeg').innerHTML=THEMES.map(t=>`<button class="press" data-theme-id="${t.id}" aria-pressed="${t.id===theme}">${svg(t.icon)}${t.name}</button>`).join('');
}
function setTheme(t){theme=t;try{localStorage.setItem(TKEY,t)}catch(e){}applyTheme()}
$('themeBtn').addEventListener('click',()=>{const i=THEMES.findIndex(t=>t.id===theme);const n=THEMES[(i+1)%3];setTheme(n.id);toast('Tema: '+n.name,n.icon)});
$('themeSeg').addEventListener('click',e=>{const b=e.target.closest('[data-theme-id]');if(b)setTheme(b.dataset.themeId)});
if(mq&&mq.addEventListener)mq.addEventListener('change',applyTheme);

/* ---------- Agregar ---------- */
function setSaveIdle(){const b=$('saveBtn');b.classList.remove('ok');b.innerHTML=svg('check')+'Guardar gasto'}
function renderCats(){
  $('cats').innerHTML=CATS.map(c=>`<button class="cat press" data-cat="${c.id}" style="--cc:${c.c}" aria-pressed="${selCat===c.id}" aria-label="${c.name}">${tile(c.id)}<span aria-hidden="true">${c.short||c.name}</span></button>`).join('');
}
function renderAddHelpers(){
  const seen=new Map();
  [...data.items].sort((a,b)=>b.ts-a.ts).forEach(i=>{const k=norm(label(i))+'|'+i.cat;if(!seen.has(k))seen.set(k,i)});
  const rec=[...seen.values()].slice(0,8);
  $('recentWrap').hidden=!rec.length;
  $('recent').innerHTML=rec.map(i=>`<button class="press" data-rec="${esc(i.id)}">${tile(i.cat)}${esc(label(i))} <em class="num">${money(i.amount)}</em></button>`).join('');
  const descs=[...new Set([...data.items].sort((a,b)=>b.ts-a.ts).map(i=>(i.desc||'').trim()).filter(Boolean))].slice(0,80);
  $('desclist').innerHTML=descs.map(d=>`<option value="${esc(d)}">`).join('');
}
$('cats').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;selCat=b.dataset.cat;renderCats()});
$('amt').addEventListener('input',e=>{const n=digits(e.target.value);e.target.value=n?money(n):''});
$('recent').addEventListener('click',e=>{
  const b=e.target.closest('[data-rec]');if(!b)return;
  const i=data.items.find(x=>x.id===b.dataset.rec);if(!i)return;
  $('amt').value=money(i.amount);$('desc').value=i.desc||'';selCat=i.cat;$('date').value=todayStr();renderCats();
  toast('Revisa y toca Guardar gasto');
});
$('saveBtn').addEventListener('click',()=>{
  const amount=digits($('amt').value);const date=$('date').value;
  if(!validAmount(amount)){toast('Ingresa un monto válido');$('amt').focus();return}
  if(!selCat){toast('Elige el tipo de gasto');return}
  if(!validDateISO(date)){toast('Elige una fecha real');$('date').focus();return}
  if(!isCat(selCat)){toast('Elige el tipo de gasto');return}
  const desc=$('desc').value.trim().slice(0,MAX_DESC);
  if(!desc){toast('Escribe el nombre del gasto');$('desc').focus();return}
  if(data.items.length>=MAX_ITEMS){toast('Límite de gastos alcanzado. Haz un respaldo.');return}
  const item={id:newId(),amount,date,cat:selCat,desc,ts:Date.now()};
  data.items.push(item);
  if(!save()){data.items.pop();return}
  $('amt').value='';$('desc').value='';selCat=null;
  if(date.slice(0,7)!==month)month=date.slice(0,7);
  renderAll();
  const b=$('saveBtn');b.classList.add('ok');b.innerHTML=svg('check')+'Guardado';
  setTimeout(setSaveIdle,1300);
  toast('Gasto guardado: '+money(amount),'check');
});

/* ---------- Movimientos ---------- */
function emptyState(text,icon){return `<div class="card empty rise" style="--i:1"><div class="art">${svg(icon)}</div><p>${text}</p><button class="ghost press" data-go="add">${svg('plus')}Agregar un gasto</button></div>`}
function renderList(){
  const items=monthItems().sort((a,b)=>a.date<b.date?1:a.date>b.date?-1:b.ts-a.ts);
  if(!items.length){$('v-list').innerHTML=emptyState(`No hay gastos en ${monthName(month,{month:'long'})}.`,'receipt');return}
  const by=Object.create(null);items.forEach(i=>(by[i.date]=by[i.date]||[]).push(i));
  $('v-list').innerHTML=Object.keys(by).map((d,k)=>{
    const t=by[d].reduce((s,i)=>s+i.amount,0);
    return `<div class="card day rise" style="--i:${Math.min(k,8)}"><h3><span>${cap(fmtDate(d,{weekday:'long',day:'numeric',month:'short'}))}</span><span class="num">${money(t)}</span></h3>${
      by[d].map(i=>`<div class="row">${tile(i.cat)}<div class="tx"><div>${esc(label(i))}</div><small>${CAT[i.cat].name}</small></div><div class="am num">${money(i.amount)}</div><button class="del press" data-del="${esc(i.id)}" aria-label="Borrar ${esc(label(i))}">${svg('trash')}</button></div>`).join('')
    }</div>`}).join('');
}
$('v-list').addEventListener('click',e=>{
  const b=e.target.closest('[data-del]');
  if(b){confirmTap(b,'Borrar',()=>{const id=b.dataset.del,prev=data.items;data.items=prev.filter(i=>i.id!==id);if(!save()){data.items=prev;return}renderAll();toast('Gasto borrado','trash')})}
});

/* ---------- Resumen ---------- */
function analyze(items){
  const S=data.settings.small, R=data.settings.minRep;
  const total=items.reduce((s,i)=>s+i.amount,0);
  const cats=new Map();items.forEach(i=>cats.set(i.cat,(cats.get(i.cat)||0)+i.amount));
  const catList=[...cats.entries()].sort((a,b)=>b[1]-a[1]);
  const big=[...items].sort((a,b)=>b.amount-a.amount).slice(0,5);
  const small=items.filter(i=>i.amount<=S).sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:a.ts-b.ts);
  const groups=[];let cur=[];
  for(const it of small){
    if(cur.length){const gap=dayNum(it.date)-dayNum(cur[cur.length-1].date);const span=dayNum(it.date)-dayNum(cur[0].date);if(gap>1||span>2){groups.push(cur);cur=[]}}
    cur.push(it);
  }
  if(cur.length)groups.push(cur);
  const bursts=groups.filter(g=>g.length>=3).map(g=>{
    const days=dayNum(g[g.length-1].date)-dayNum(g[0].date)+1;
    return{items:g,start:g[0].date,end:g[g.length-1].date,days,total:g.reduce((s,i)=>s+i.amount,0)};
  }).sort((a,b)=>(b.items.length/b.days)-(a.items.length/a.days)||b.items.length-a.items.length).slice(0,4);
  // Map: un nombre como "constructor" o "__proto__" es solo un texto más.
  const hg=new Map();
  small.forEach(i=>{const k=i.desc&&i.desc.trim()?'d:'+norm(i.desc):'c:'+i.cat;if(!hg.has(k))hg.set(k,[]);hg.get(k).push(i)});
  const ants=[...hg.values()].filter(g=>g.length>=R).map(g=>{
    const t=g.reduce((s,i)=>s+i.amount,0);
    const d=[...new Set(g.map(i=>i.date))].sort();
    const every=d.length>1?(dayNum(d[d.length-1])-dayNum(d[0]))/(d.length-1):0;
    const cc=new Map();g.forEach(i=>cc.set(i.cat,(cc.get(i.cat)||0)+1));
    const cat=[...cc.entries()].sort((a,b)=>b[1]-a[1])[0][0];
    return{name:label(g[g.length-1]),cat,count:g.length,total:t,avg:t/g.length,every,year:t*12};
  }).sort((a,b)=>b.total-a.total);
  return{total,catList,big,bursts,ants};
}
function daysCount(){const t=todayStr(),cm=t.slice(0,7);return month===cm?Number(t.slice(8)):month<cm?daysInMonth(month):1}
function sec(icon,title,color){return `<div class="sec"><span class="badge"${color?` style="color:${color}"`:''}>${svg(icon)}</span><h2>${title}</h2></div>`}
function renderSummary(){
  const items=monthItems();
  if(!items.length){$('v-sum').innerHTML=emptyState(`Cuando registres gastos en ${monthName(month,{month:'long'})}, aquí verás el resumen del mes.`,'chart');return}
  const a=analyze(items);const S=data.settings.small;let n=0;
  let h=`<div class="stats rise" style="--i:${n++}">
    <div class="stat"><span>Promedio por día</span><strong class="num">${money(a.total/daysCount())}</strong></div>
    <div class="stat"><span>Gasto típico</span><strong class="num">${money(a.total/items.length)}</strong></div>
  </div>`;
  const max=a.catList[0][1];
  h+=`<div class="card rise" style="--i:${n++}">${sec('pie','Por tipo de gasto')}${a.catList.map(([c,v],k)=>`<div class="bar" style="--i:${k}">${tile(c)}<div class="bd"><div class="lb"><span>${CAT[c].name}</span><span class="num">${money(v)} · ${Math.round(v/a.total*100)}%</span></div><div class="tr"><i style="--cc:${CAT[c].c};width:${Math.max(2,v/max*100)}%"></i></div></div></div>`).join('')}</div>`;

  h+=`<div class="card rise" style="--i:${n++}">${sec('trend','Los gastos más grandes')}<ol class="rank">${a.big.map((i,k)=>`<li><span class="pos">${k+1}</span>${tile(i.cat)}<div class="tx"><div>${esc(label(i))}</div><small>${fmtDate(i.date,{day:'numeric',month:'short'})}</small></div><strong class="num">${money(i.amount)}</strong></li>`).join('')}</ol></div>`;

  h+=`<div class="card rise" style="--i:${n++}">${sec('timer','Gastos pequeños muy seguidos','var(--burst)')}<p class="hint">Momentos en que hiciste 3 o más gastos de hasta ${money(S)} en pocos días.</p>`;
  h+=a.bursts.length?a.bursts.map(b=>{
    const when=b.days===1?`el ${fmtDate(b.start,{day:'numeric',month:'short'})}`:`del ${fmtDate(b.start,{day:'numeric'})} al ${fmtDate(b.end,{day:'numeric',month:'short'})}`;
    return `<div class="burst"><p><strong>${b.items.length} gastos</strong> ${b.days===1?'en un mismo día':'en '+b.days+' días'}, ${when}, por <strong class="num">${money(b.total)}</strong></p><div class="pills">${b.items.map(i=>`<span>${tile(i.cat)}${esc(label(i))} <b class="num">${money(i.amount)}</b></span>`).join('')}</div></div>`}).join('')
    :`<p class="hint" style="margin:0">No hubo rachas de gastos pequeños este mes.</p>`;
  h+=`</div>`;

  h+=`<div class="card rise" style="--i:${n++}">${sec('repeat','Gastos hormiga','var(--ant)')}<p class="hint">Gastos pequeños que se repiten ${data.settings.minRep} o más veces en el mes. Usa siempre la misma descripción (ej. "café") para que se agrupen bien.</p>`;
  if(a.ants.length){
    const at=a.ants.reduce((s,x)=>s+x.total,0);
    h+=`<div class="antsum"><span>En total suman <strong class="num">${money(at)}</strong>, el ${Math.round(at/a.total*100)}% de lo que gastaste este mes.</span></div>`;
    h+=a.ants.map(x=>`<div class="ant">${tile(x.cat)}<div class="bd"><div class="top"><b>${esc(x.name)}</b><strong class="num">${money(x.total)}</strong></div>
      <p>${x.count} veces, en promedio ${money(x.avg)}${x.every>=1?`, más o menos cada ${Math.round(x.every)} día${Math.round(x.every)===1?'':'s'}`:', varias el mismo día'}.</p>
      <p>Si sigues así, al año serían <em class="num">${money(x.year)}</em>.</p></div></div>`).join('');
  } else h+=`<p class="hint" style="margin:0">Todavía no hay gastos pequeños que se repitan lo suficiente.</p>`;
  h+=`</div>`;
  $('v-sum').innerHTML=h;
}

/* ---------- Ajustes ---------- */
$('small').addEventListener('change',e=>{const n=digits(e.target.value),prev=data.settings;data.settings=cleanSettings({small:n||5000,minRep:data.settings.minRep});if(!save())data.settings=prev;renderAll()});
$('small').addEventListener('input',e=>{const n=digits(e.target.value);e.target.value=n?money(n):''});
$('minrep').addEventListener('change',e=>{const prev=data.settings;data.settings=cleanSettings({small:data.settings.small,minRep:e.target.value});if(!save())data.settings=prev;renderAll()});
/* Cifrado local para respaldos: AES-256-GCM y PBKDF2-SHA256. Sin claves almacenadas. */
const BACKUP_TYPE='misgastos-cifrado-v1';
const BACKUP_ROUNDS=600000;           // recomendación OWASP para PBKDF2-SHA256
const LEGACY_BACKUP_ROUNDS=250000;    // respaldos creados con la versión anterior
const ALLOWED_ROUNDS=[LEGACY_BACKUP_ROUNDS,BACKUP_ROUNDS];
const te=new TextEncoder(), td=new TextDecoder('utf-8',{fatal:true});
function toB64(bytes){
  let s='';
  for(let k=0;k<bytes.length;k+=32768)s+=String.fromCharCode(...bytes.subarray(k,k+32768));
  return btoa(s);
}
function fromB64(s,maxBytes){
  if(typeof s!=='string'||!s.length||s.length>Math.ceil(maxBytes*4/3)+8||!/^[A-Za-z0-9+/]+={0,2}$/.test(s))throw new Error('Formato de respaldo inválido');
  const bin=atob(s);
  if(bin.length>maxBytes)throw new Error('Respaldo demasiado grande');
  return Uint8Array.from(bin,c=>c.charCodeAt(0));
}
async function backupKey(password,salt,iterations){
  if(!ALLOWED_ROUNDS.includes(iterations))throw new Error('Formato cifrado inválido');
  const secret=await crypto.subtle.importKey('raw',te.encode(password),'PBKDF2',false,['deriveKey']);
  return crypto.subtle.deriveKey(
    {name:'PBKDF2',salt,iterations,hash:'SHA-256'},
    secret,{name:'AES-GCM',length:256},false,['encrypt','decrypt']
  );
}
async function encryptBackup(password){
  const raw=te.encode(JSON.stringify({version:2,items:data.items,settings:data.settings}));
  if(raw.length>MAX_BACKUP_CHARS)throw new Error('Respaldo demasiado grande');
  const salt=crypto.getRandomValues(new Uint8Array(16));
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const key=await backupKey(password,salt,BACKUP_ROUNDS);
  const ct=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,raw);
  return JSON.stringify({type:BACKUP_TYPE,kdf:'PBKDF2-SHA256',iter:BACKUP_ROUNDS,salt:toB64(salt),iv:toB64(iv),data:toB64(new Uint8Array(ct))});
}
async function decryptBackup(p,password){
  if(typeof password!=='string'||password.length<10)throw new Error('Ingresa la contraseña del respaldo (mínimo 10 caracteres)');
  const salt=fromB64(p.salt,16),iv=fromB64(p.iv,12),ct=fromB64(p.data,MAX_BACKUP_CHARS+16);
  if(salt.length!==16||iv.length!==12||ct.length<17)throw new Error('Formato cifrado inválido');
  if(p.kdf!==undefined&&p.kdf!=='PBKDF2-SHA256')throw new Error('Formato cifrado inválido');
  const iter=p.iter===undefined?LEGACY_BACKUP_ROUNDS:p.iter;
  if(!Number.isSafeInteger(iter)||!ALLOWED_ROUNDS.includes(iter))throw new Error('Formato cifrado inválido');
  const key=await backupKey(password,salt,iter);
  let pt;
  try{pt=await crypto.subtle.decrypt({name:'AES-GCM',iv},key,ct)}
  catch(e){throw new Error('Contraseña incorrecta o respaldo alterado')}
  return JSON.parse(td.decode(pt));
}
$('showBk').addEventListener('click',async e=>{
  const pass=$('bkPass').value;
  if(pass.length<10){toast('Usa una contraseña de al menos 10 caracteres');$('bkPass').focus();return}
  const btn=e.currentTarget;btn.disabled=true;
  try{
    const value=await encryptBackup(pass);
    const o=$('bkOut');o.hidden=false;$('copyBk').hidden=false;o.value=value;
    $('bkPass').value='';o.focus();o.select();toast('Respaldo cifrado creado','check');
  }catch(e){toast('No se pudo crear el respaldo cifrado')}
  finally{btn.disabled=false}
});
$('copyBk').addEventListener('click',async()=>{
  const o=$('bkOut');
  try{await navigator.clipboard.writeText(o.value);toast('Respaldo cifrado copiado','check')}
  catch(e){o.focus();o.select();o.setSelectionRange(0,o.value.length);toast('Selecciona y copia el respaldo manualmente')}
});
$('restore').addEventListener('click',e=>confirmTap(e.currentTarget,'Confirmar: reemplazar datos',async()=>{
  const raw=$('bkIn').value.trim();
  if(raw.length>MAX_ENCRYPTED_BACKUP_CHARS){toast('El respaldo es demasiado grande');return}
  let p;
  try{
    p=JSON.parse(raw);
    if(p&&p.type===BACKUP_TYPE)p=await decryptBackup(p,$('bkPass').value);
    else if(raw.length>MAX_BACKUP_CHARS)throw new Error('El respaldo antiguo es demasiado grande');
  }catch(err){toast(err instanceof Error?err.message:'Respaldo inválido');return}
  if(!p||typeof p!=='object'||!Array.isArray(p.items)||p.items.length>MAX_ITEMS){toast('El respaldo no contiene gastos válidos');return}
  const items=cleanItems(p.items);
  if(items.length!==p.items.length){toast('Respaldo rechazado: gastos inválidos o repetidos');return}
  const prev=data;
  data={items,settings:cleanSettings(p.settings)};
  if(!save()){data=prev;return}
  $('bkIn').value='';$('bkPass').value='';renderAll();
  toast(items.length+' gastos restaurados','check');
}));
$('wipe').addEventListener('click',e=>confirmTap(e.currentTarget,'Confirmar: borrar todo',()=>{
  const prev=data.items;
  data.items=[];
  if(!save()){data.items=prev;return}
  renderAll();toast('Se borraron todos los gastos','trash');
}));

/* ---------- General ---------- */
function animateView(){
  const s=$('v-'+view);s.classList.remove('animate');void s.offsetWidth;s.classList.add('animate');
  clearTimeout(s._t);s._t=setTimeout(()=>s.classList.remove('animate'),1400);
}
function show(v){
  view=v;
  document.querySelectorAll('.view').forEach(s=>s.classList.toggle('on',s.id==='v-'+v));
  document.querySelectorAll('nav button').forEach(b=>{if(b.dataset.view===v)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  $('hero').hidden=v==='set';
  animateView();
  window.scrollTo(0,0);
}
document.querySelector('nav').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b&&b.dataset.view!==view)show(b.dataset.view)});
document.querySelector('main').addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)show(b.dataset.go)});
function changeMonth(d){const next=shiftMonth(month,d);if(next<'1900-01'||next>'2100-12')return;month=next;renderAll();if(view!=='add'&&view!=='set')animateView();const h=$('hero');h.classList.remove('animate');void h.offsetWidth;h.classList.add('animate')}
$('prev').addEventListener('click',()=>changeMonth(-1));
$('next').addEventListener('click',()=>changeMonth(1));

/* El total del mes cuenta hasta su nuevo valor (sin animación si se pidió reducir movimiento). */
let shownTotal=null,totalRaf=0;
function setTotal(t){
  const el=$('mtotal');
  const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  cancelAnimationFrame(totalRaf);
  if(shownTotal===null||reduce||shownTotal===t){shownTotal=t;el.textContent=money(t);return}
  const from=shownTotal,start=performance.now(),dur=650;shownTotal=t;
  const step=now=>{const k=Math.min(1,(now-start)/dur),e=1-Math.pow(1-k,3);el.textContent=money(from+(t-from)*e);if(k<1)totalRaf=requestAnimationFrame(step)};
  totalRaf=requestAnimationFrame(step);
}
function renderAll(){
  const items=monthItems();const t=items.reduce((s,i)=>s+i.amount,0);
  $('mlabel').textContent=cap(monthName(month,{month:'short',year:'numeric'})).replace('.','');
  $('hlabel').textContent='Gastado en '+monthName(month,{month:'long'})+(month.slice(0,4)!==todayStr().slice(0,4)?' '+month.slice(0,4):'');
  setTotal(t);
  $('mcount').textContent=items.length?`${items.length} gasto${items.length===1?'':'s'}`:'Sin gastos';
  $('mavg').textContent=`${money(t/daysCount())} por día`;
  renderCats();renderAddHelpers();renderList();renderSummary();
  $('small').value=money(data.settings.small);$('minrep').value=String(data.settings.minRep);
}
load();
applyTheme();
setSaveIdle();
$('date').value=todayStr();
renderAll();
animateView();
initStorage();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
