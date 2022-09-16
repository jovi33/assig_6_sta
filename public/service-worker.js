/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
// eslint-disable-next-line no-unused-vars, linebreak-style
import {cacheFirst} from 'workbox-strategies/CacheFirst';
workbox.routing.registerRoute(
    /.*\.html/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'MY-CACHE',
    }),
);

self.addEventListener('install', (event)=> {
  const urls = ['https://url2.html', 'etc'];
  event.waitUntil(caches.open('MY-CACHE').then(() => cacheFirst.addAll(urls)));
});

import {VitePWA} from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    // eslint-disable-next-line new-cap
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'my-sw.js',
    }),
  ],
});
