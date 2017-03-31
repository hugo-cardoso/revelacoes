var CACHE_NAME = 'my-cache-v7';
var urlsToCache = [
'index.html',
'css/style.css',
'css/grid12.css',
'js/angular.min.js',
'js/app.js',
'js/angular-moment.min.js',
'js/moment.min.js',
'img/logo_192.png',
'img/favicon-16x16.png',
'img/favicon-32x32.png',
'img/favicon-96x96.png'
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