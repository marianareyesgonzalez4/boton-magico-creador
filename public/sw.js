
const CACHE_NAME = 'choco-artesanal-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(    caches.open(CACHE_NAME)
      .then(cache => {
        if (self.location.hostname === 'localhost') {
          console.log('Opened cache');
        }
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              // Only cache GET requests
              if (event.request.method === 'GET') {
                cache.put(event.request, responseToCache);
              }
            });
          
          return response;
        }).catch(() => {
          // Return offline page if available
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            if (self.location.hostname === 'localhost') {
              console.log('Deleting old cache:', cacheName);
            }
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for cart data
self.addEventListener('sync', event => {
  if (event.tag === 'cart-sync') {
    event.waitUntil(syncCartData());
  }
});

async function syncCartData() {
  try {
    // Sync cart data when back online
    const cartData = await getStoredCartData();
    if (cartData) {
      await fetch('/api/sync-cart', {
        method: 'POST',
        body: JSON.stringify(cartData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }  } catch (error) {
    if (self.location.hostname === 'localhost') {
      console.log('Cart sync failed:', error);
    }
  }
}

async function getStoredCartData() {
  // Get cart data from IndexedDB or localStorage
  const cartData = localStorage.getItem('cart-state');
  return cartData ? JSON.parse(cartData) : null;
}
