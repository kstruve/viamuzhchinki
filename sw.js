const CACHE="bandwhack-gh-7c9dfc884331";
const FILES=["./index.html", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./manifest.webmanifest", "./phaser.min.js?v=e92ddef111ba", "./music.js?v=aebca1c68cb8", "./sfx.js?v=e979b41dcc85", "./characters.js?v=30fb66e9e9fa", "./character-struve.js?v=bfb92c2c2ca2", "./character-mirosh.js?v=87e3cdfe51d7", "./character-drew.js?v=74f470d2cbf7", "./character-semenych.js?v=fe583ae16028", "./character-domik.js?v=01ce268b8b75", "./character-glebas.js?v=dbc5ad060d16", "./character-egor.js?v=c0114064cb00", "./character-edik.js?v=daebf6bee4ce", "./character-bodya.js?v=7494fab25f25", "./character-tema.js?v=ce8597786013", "./character-dariy.js?v=e70d9fa587ff", "./character-yarik.js?v=a991cc73a7d5", "./character-iiist.js?v=c0753ebc134a", "./character-kostyan.js?v=eeb92a436926", "./character-mashkov.js?v=6254062601f2", "./background.js?v=ae39046c77d6", "./chandelier.js?v=cc167d494df5", "./hole.js?v=180fa2c98fc3"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES).then(()=>self.skipWaiting())));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bandwhack-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(caches.open(CACHE).then(async cache=>{
   try{const response=await fetch(event.request);if(response.ok)await cache.put('./index.html',response.clone());return response;}
   catch(error){const offline=await cache.match('./index.html');if(offline)return offline;throw error;}
  }));return;
 }
 event.respondWith(caches.open(CACHE).then(async cache=>{const cached=await cache.match(event.request);return cached||fetch(event.request);}));
});
