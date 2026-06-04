const CACHE = 'cassaforte-v1';
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { self.clients.claim(); });
self.addEventListener('fetch', function (e) {
  var req = e.request;
  var url = new URL(req.url);
  // gestisco solo i file dell'app (stesso sito, GET): lascio passare voce e Supabase
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(function (resp) {
      var copy = resp.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function(){});
      return resp;
    }).catch(function () { return caches.match(req); })
  );
});
