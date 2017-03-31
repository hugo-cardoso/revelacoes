var CACHE_NAME = 'my-cache-v2';
var urlsToCache = [
'index.html',
'css/style.css',
'css/grid12.css'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
  	caches.open(CACHE_NAME)
  	.then(function(cache) {
  		console.log('Opened cache');
  		return cache.addAll(urlsToCache);
  	})
  	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		fetch(event.request).catch(function() {
			return caches.match(event.request);
		})
		);
});