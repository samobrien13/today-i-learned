const installEvent = () => {
    self.addEventListener("install", () => {
        console.log("service worker installed");
    });
};

installEvent();

const activateEvent = () => {
    self.addEventListener("activate", () => {
        console.log("service worker activated");
    });
};

activateEvent();

const cacheName = "v1";

async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch {
        const cachedResponse = await caches.match(request);
        return cachedResponse || Response.error();
    }
}

const fetchEvent = () => {
    self.addEventListener("fetch", (e) => {
        e.respondWith(networkFirst(e.request));
    });
};

fetchEvent();
