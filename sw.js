// 每次改 concepts.json / quiz.json / weeks.json / index.html 都要把版本號 +1，手機才會拿到新內容
const CACHE = 'cogneuro-review-v11-fsrs';
const FILES = ["vendor/fsrs-4RMZC3F7.js", "vendor/fsrs-R4FOUOM7.js", "vendor/fsrs-RHITFDTI.js", "vendor/fsrs-TW3U5E4J.js", "vendor/fsrs-DKTNX46A.js", "vendor/fsrs-RNGPXBZY.js", "vendor/fsrs-VHQOKJZ6.js", "vendor/fsrs.js", "vendor/fsrs-DC5JFV5X.js", "vendor/fsrs-SII3R63C.js", "vendor/fsrs-OAMKRLUO.js"].concat(['./', 'index.html', 'concepts.json', 'quiz.json', 'weeks.json', 'essays.json', 'manifest.json', 'icon-192.png', 'icon-512.png', 'img/lobes.svg', 'img/neuron.svg', 'img/potentials.svg', 'img/bold.svg', 'img/design.svg', 'img/erp.svg', 'img/dissociation.svg', 'img/stimulation.svg', 'img/mismatch.svg', 'img/tradeoff.svg', 'img/mindbody.svg', 'img/localization.svg', 'img/history.svg', 'img/processing.svg', 'img/limbic.svg', 'img/rhythms.svg', 'img/colliculi.svg', 'img/donders.svg', 'img/factorial.svg', 'img/lesions.svg', 'img/imaging.svg', 'img/evolution.svg', 'img/rt.svg', 'img/phrenology.svg', 'img/neurondoctrine.svg', 'img/hippocampus.svg', 'img/callosum.svg', 'img/eegfeatures.svg', 'img/synapse.svg', 'img/exoendo.svg', 'img/dmn.svg', 'img/singlecase.svg', 'img/braille.svg', 'img/v5.svg', 'img/visualpath.svg', 'img/rf.svg', 'img/routes.svg', 'img/fielddefects.svg', 'img/streams.svg', 'img/gestalt.svg', 'img/adaptation.svg', 'img/category.svg', 'img/optogenetics.svg', 'img/auditorypath.svg', 'img/tonotopic.svg', 'img/audvis.svg', 'img/audstreams.svg', 'img/soundloc.svg', 'img/motortheory.svg', 'img/mcgurk.svg', 'img/catperc.svg', 'img/musicspeech.svg']);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('cogneuro-review-') && k !== CACHE).map(k => caches.delete(k))))
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
