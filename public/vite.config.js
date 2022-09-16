import {VitePWA} from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate'
      workbox: {
        clientsClaim: true,
        skipWaiting: true
  }
  })
  ]
})
 
VitePWA({
  strategies: 'injectManifest',
})
VitePWA({
  injectManifest: ['**/*.html'],
})
 
import {offlineFallback} from 'workbox-recipes';
import {setDefaultHandler} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';
 
setDefaultHandler(new NetworkOnly());
 
offlineFallback();
 
import {setCatchHandler, setDefaultHandler} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';
 
const pageFallback = 'offline.html';
const imageFallback = false;
const fontFallback = false;
 
setDefaultHandler(new NetworkOnly());
 
self.addEventListener('install', event => {
  const files = [pageFallback];
  if (imageFallback) {
    files.push(imageFallback);
  }
  if (fontFallback) {
    files.push(fontFallback);
  }
 
  event.waitUntil(
    self.caches
      .open('workbox-offline-fallbacks')
      .then(cache => cache.addAll(files))
  );
});
 
const handler = async options => {
  const dest = options.request.destination;
  const cache = await self.caches.open('workbox-offline-fallbacks');
 
  if (dest === 'document') {
    return (await cache.match(pageFallback)) || Response.error();
  }
 
  if (dest === 'image' && imageFallback !== false) {
    return (await cache.match(imageFallback)) || Response.error();
  }
 
  if (dest === 'font' && fontFallback !== false) {
    return (await cache.match(fontFallback)) || Response.error();
  }
 
  return Response.error();
};
 
setCatchHandler(handler);
 
import {imageCache} from 'workbox-recipes';
 
imageCache();
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';
 
const cacheName = 'images';
const matchCallback = ({request}) => request.destination === 'image';
const maxAgeSeconds = 30 * 24 * 60 * 60;
const maxEntries = 60;
 
registerRoute(
  matchCallback,
  new CacheFirst({
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries,
        maxAgeSeconds,
      }),
    ],
  })
);
