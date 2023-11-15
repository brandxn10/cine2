self.addEventListener('install', event => {
    const recursos = caches.open('CacheRecursos').then(cache => {
        cache.addAll([
            '/',
            'index.html',
            'bootstrap.css',
            'app.js',
            'img/it.jpg',
            'img/king.jpg',
            'img/leather.jpg',
            'img/saw.jpg',
            'img/starWars.jpg'
        ]);
    });
    event.waitUntil(recursos);
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).then(response => {
            if (response && response.status === 200) {
                const responseToCache = response.clone();

                caches.open('CacheRecursos').then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            }
            return caches.match(event.request);
        }).catch(error => {
            console.error('Error en la estrategia de caché:', error);
            return new Response('Error en la estrategia de caché', { status: 500, statusText: 'Internal Server Error' });
        })
    );
});


/*
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then(response => {
                if (response && response.status === 200) {
                    const responseToCache = response.clone();

                    caches.open('CacheRecursos').then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
                return new Response('Recurso no encontrado', { status: 404, statusText: 'Not Found' });
            });
        }).catch(error => {
            console.error('Error en la estrategia de caché:', error);
            return new Response('Error en la estrategia de caché', { status: 500, statusText: 'Internal Server Error' });
        })
    );
}); 
*/