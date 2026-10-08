// 每次改 concepts.json / quiz.json / weeks.json / index.html 都要把版本號 +1，手機才會拿到新內容
const CACHE = 'cogneuro-review-v5';
const FILES = ['./', 'index.html', 'concepts.json', 'quiz.json', 'weeks.json', 'manifest.json', 'icon-192.png', 'icon-512.png', 'img/lobes.svg', 'img/neuron.svg', 'img/potentials.svg', 'img/bold.svg', 'img/design.svg', 'img/erp.svg', 'img/dissociation.svg', 'img/stimulation.svg', 'img/mismatch.svg', 'img/tradeoff.svg', 'img/mindbody.svg', 'img/localization.svg', 'img/history.svg', 'img/processing.svg', 'img/limbic.svg', 'img/rhythms.svg', 'img/colliculi.svg', 'img/donders.svg', 'img/factorial.svg', 'img/lesions.svg', 'img/imaging.svg', 'img/evolution.svg', 'img/rt.svg', 'img/phrenology.svg', 'img/neurondoctrine.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// 網路優先、失敗才用快取：有網路時永遠拿最新題庫，離線也能用
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request))
  );
});
