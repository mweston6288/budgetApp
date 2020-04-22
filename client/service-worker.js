const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/style.css",
    "/dist/app.bundle.js",
    "/dist/transaction.bundle.js"
];


const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    console.log(self);
     console.log(event)
    if (event.request.url.startsWith(self.location.origin)) {
        console.log(caches)

        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                console.log(cachedResponse)
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    console.log(cache);
                    return fetch(event.request).then(response => {
                        console.log(response)

                        return cache.put(event.request, response.clone()).then(() => {
                            
                            return response;
                        });
                    });
                });
            })
        );
    }
});