/* Mis Gastos PWA. Nunca modifica cachés de otras aplicaciones del mismo origen. */
const CACHE='mis-gastos-pwa-v5';
const PREVIOUS='mis-gastos-v2';
const FILES=['./','./index.html','./style.css','./app.js','./manifest.json','./icon-180.png','./icon-192.png','./icon-512.png'];
const URLS=FILES.map(f=>new URL(f,self.registration.scope).href);
const KNOWN=new Set(URLS.map(u=>new URL(u).pathname));

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k===PREVIOUS||(k.startsWith('mis-gastos-pwa-')&&k!==CACHE)).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||url.search||!KNOWN.has(url.pathname))return;
  const canonical=new URL(url.pathname,self.location.origin).href;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    try{
      const response=await fetch(request,{cache:'no-cache'});
      if(response.ok&&response.type==='basic'){
        event.waitUntil(cache.put(canonical,response.clone()).catch(()=>{}));
      }
      return response;
    }catch(e){
      return await cache.match(canonical)||Response.error();
    }
  })());
});
