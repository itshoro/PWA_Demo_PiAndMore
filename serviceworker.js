let cacheName = "piAndMore_PWA-v1";
let filesToCache = [
    "/",
    "/core.css",
    "/script.js",
    "/serviceworker.js",
    "/index.html"
];

const apiUrlBase = "http://127.0.0.1:5000/api/";

let dataCacheName = "piAndMore_PWA_Data-v1";

self.addEventListener("install", function(e){
    console.log("[ServiceWorker] Installed");
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log("[ServiceWorker] Cached App Shell");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", function(e) {
    console.log("[ServiceWorker] Activated");
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(
                keyList.map(function(key){
                    if(key !== cacheName) {
                        console.log("[ServiceWorker] Removing old cache", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    // Experimental function that circumvents that a service worker is only deployed once a page is refreshed.
    self.clients.claim();
});

self.addEventListener("fetch", function(e) {
    if (e.request.url.indexOf(apiUrlBase) > -1) {
        // When the dataUrl is part of the request.url, then the app is asking for data from the api. (Cache first then network)
        e.respondWith(
            caches.open(dataCacheName).then(function(cache) {
                return fetch(e.request).then(function(response) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            })
        );
    }
    else {
        // The app asks for app shell files, that are probably already cached. (Cache first, network fallback)
        e.respondWith(
            caches.match(e.request).then(function(response){
                return response || fetch(e.request);
            })
        );
    }
})