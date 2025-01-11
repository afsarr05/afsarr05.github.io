'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "e8165db75b8a7dd99f432473fd843eca",
"assets/AssetManifest.bin.json": "f9d4aea6a7ff74701e4877b3e774f6fb",
"assets/AssetManifest.json": "426fcd0bbe4e2b7f3139cdf0147e6076",
"assets/assets/animations/hi.gif": "2780abc6619d2372c70ecee26fb30c32",
"assets/assets/animations/hi.json": "d7dfbc60fbdfbd16066311391d7707b8",
"assets/assets/icons/android.png": "3dc2d91b4828a75e309a345fbcc2d6e5",
"assets/assets/icons/bg_clean_logo.png": "226fdce79a6230faaece16d1b509e154",
"assets/assets/icons/cantact.png": "14cf91f897ad306d78d1c546a91cbabb",
"assets/assets/icons/css.png": "d0113b75fb1250ea351458d5e0b97e8c",
"assets/assets/icons/dart.png": "8522e7abca887db9054fa86356d2060f",
"assets/assets/icons/facebook.png": "7d3ab0d6ea31e1be5c73160813a67f2e",
"assets/assets/icons/fiver.png": "ea729c0867993e4bb3519fb34b657096",
"assets/assets/icons/flutter.png": "16146638fb7793b9b9b0f79f7723f3a8",
"assets/assets/icons/gethub.png": "c6a7f19c9999cd209a27083777c6d086",
"assets/assets/icons/htlm.png": "71e746c69708dca1cb175c46c73d1ccb",
"assets/assets/icons/ios.png": "27ff1ba5b8de6be08aef31637c445137",
"assets/assets/icons/java.png": "adc72a4827800b4773bc7439c3b41b70",
"assets/assets/icons/js.png": "19d051b5642fdc24077a9e5390fde7b0",
"assets/assets/icons/linkedin.png": "6db963fcbb0b63f3eed7397b8a36a6d1",
"assets/assets/icons/pc.png": "c5cffdfc3b8ebc385d155b7244c88d28",
"assets/assets/icons/service.png": "89e163334556cc602a2e10c64e8bb28d",
"assets/assets/icons/web.png": "3315cdf497b18674c2efdef45c8cb815",
"assets/assets/icons/whatsapp.png": "0fb67652cb671ddd978133a5c3a852e8",
"assets/assets/projects%2520images/home.jpg": "96e8f21a7666fb0e75e0970ce1212e36",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "ad8c0f17d81f42611aea066d78860c7a",
"assets/NOTICES": "c15e192298a9aec7a2f091800e35383f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "880d0af44986dd5bdfe23436025c0f3c",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "d7b1cb473f24a36168248980eca4eee4",
"icons/Icon-192.png": "36cb983745199a8fed1d75c040582f5f",
"icons/Icon-512.png": "98883dbccdefc1e677174590f66c732d",
"icons/Icon-maskable-192.png": "36cb983745199a8fed1d75c040582f5f",
"icons/Icon-maskable-512.png": "98883dbccdefc1e677174590f66c732d",
"index.html": "b506e8feee990d3acee7f29e887bb6e2",
"/": "b506e8feee990d3acee7f29e887bb6e2",
"main.dart.js": "cc5ebfb6526471b310f86efcbecd6945",
"manifest.json": "a7b4111c7937d32a6b9753b54a7a8600",
"version.json": "ada65f25aa5365c0e8c038384b590ed5"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
