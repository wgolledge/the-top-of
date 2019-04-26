if (typeof importScripts === 'function') {
  // eslint-disable-next-line
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js',
  );
  /* global workbox */
  if (!workbox) {
    console.log('Workbox could not be loaded. No Offline support');
  }
  console.log('Workbox is loaded');

  /* injection point for manifest files.  */
  workbox.precaching.precacheAndRoute([]);

  /* custom cache rules */
  workbox.routing.registerNavigationRoute('/index.html', {
    blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
  });

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    }),
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24, // 1 Day
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    /https:\/\/the-top-of-api.herokuapp.com\/sources\/[0-9]?[0-9]/,
    new workbox.strategies.NetworkFirst({
      cacheName: 'sourceData',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 30, // 30 Minutes
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [200],
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    /https:\/\/the-top-of-api.herokuapp.com\/(sources|images\/[0-9]?[0-9])/,
    new workbox.strategies.CacheFirst({
      cacheName: 'sources',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24, // 1 Day
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
      ],
    }),
  );
}
