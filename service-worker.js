
// service-worker.js
// STRATEGY: Hybrid Architecture
// 1. Immutable Assets (/assets/): Cache-First (Max Performance, Zero Latency)
// 2. Mutable Content (HTML, JSON): Stale-While-Revalidate (Freshness guaranteed)

const CACHE_VERSION = 'v7-perf-2024-07-25'; // Incremented version to clear old broken caches
const CACHE_NAME = `portfolio-dynamic-${CACHE_VERSION}`;

// Core assets required for the "App Shell"
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// --- 1. INSTALL: Pre-cache App Shell ---
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force immediate activation
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch(err => {
          console.warn('SW: Failed to cache some core assets', err);
      });
    })
  );
});

// --- 2. ACTIVATE: Cleanup Old Caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control immediately
  );
});

// --- 3. FETCH: Hybrid Strategy ---
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignore non-GET, chrome-extensions, and admin panel
  if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:' || url.pathname.startsWith('/admin')) {
    return;
  }

  // STRATEGY A: Cache-First for Hashed/Immutable Assets
  // Vite assets always have a hash in the filename (e.g. index-XyZ.js) or are in /assets/
  // These files are immutable. If we have them, return them. No network check needed.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse; // HIT: Return immediately, 0KB network usage
          }
          // MISS: Fetch, Cache, Return
          return fetch(event.request).then((networkResponse) => {
            // Only cache valid responses (200)
            if (networkResponse && networkResponse.status === 200) {
               cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
             // Return nothing/error if image missing - preventing 404 loops
             return new Response('', { status: 404, statusText: 'Not Found' });
          });
        });
      })
    );
    return;
  }

  // STRATEGY B: Stale-While-Revalidate for Mutable Content
  // (index.html, data/*.json, manifest.json)
  // Serve cached immediately for speed, but update in background for next visit.
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        
        // 1. Trigger Network Request (Background Update)
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Validate response
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // Offline fallback could go here
          });

        // 2. Return Cached Response immediately if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // 3. If not in cache, wait for network
        return fetchPromise;
      });
    })
  );
});
