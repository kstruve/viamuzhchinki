const CACHE="bandwhack-gh-abe3fdcceb77";
const FILES=["./index.html", "./phaser.min.js", "./music.js", "./sfx.js", "./background.js", "./chandelier.js", "./hole.js", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./manifest.webmanifest", "./characters.js", "./character-struve.js", "./character-mirosh.js", "./character-drew.js", "./character-semenych.js", "./character-domik.js", "./character-glebas.js", "./character-egor.js", "./character-edik.js", "./character-bodya.js", "./character-tema.js", "./character-dariy.js", "./character-yarik.js", "./character-iiist.js", "./character-kostyan.js", "./character-mashkov.js"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES).then(()=>self.skipWaiting())));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bandwhack-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const cached=await cache.match(event.request);
  if(cached)return cached;
  try{return await fetch(event.request);}catch(error){
   if(event.request.mode==='navigate')return cache.match('./index.html');
   throw error;
  }
 }));
});
