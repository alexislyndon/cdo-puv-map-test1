importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);


workbox.routing.registerRoute(
    /\/routes/,
    new workbox.strategies.CacheFirst({
        cacheName: 'routes-cache',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    }),
);

workbox.routing.registerRoute(
    /^https:\/\/api.maptiler.com\/maps.*/,
    new workbox.strategies.CacheFirst({
        cacheName: 'tile-cache',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    }),
);

workbox.routing.registerRoute(
    /\.html/,
    new workbox.strategies.CacheFirst({
        cacheName: 'html-cache',
    })
);

workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'css-cache',
    })
);

workbox.routing.registerRoute(
    /\.js/,
    new workbox.strategies.CacheFirst({
        cacheName: 'js-cache',
    })
);

workbox.routing.registerRoute(
    /\/.*/,
    new workbox.strategies.NetworkFirst({
        cacheName: 'all-cache'
    })
);