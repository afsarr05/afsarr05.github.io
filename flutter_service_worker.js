'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "c04c6b8ee29e741bfda538e5b20464b8",
"assets/AssetManifest.bin.json": "461e26cbc0af492421eab3bcc018cb11",
"assets/AssetManifest.json": "f1905b6cbba691c50a251ba92f1e5808",
"assets/assets/animations/hi.gif": "2780abc6619d2372c70ecee26fb30c32",
"assets/assets/animations/hi.json": "d7dfbc60fbdfbd16066311391d7707b8",
"assets/assets/icons/android.png": "3dc2d91b4828a75e309a345fbcc2d6e5",
"assets/assets/icons/bg_clean_logo.png": "226fdce79a6230faaece16d1b509e154",
"assets/assets/icons/cantact.png": "14cf91f897ad306d78d1c546a91cbabb",
"assets/assets/icons/css.png": "d0113b75fb1250ea351458d5e0b97e8c",
"assets/assets/icons/dart.png": "8522e7abca887db9054fa86356d2060f",
"assets/assets/icons/flutter.png": "16146638fb7793b9b9b0f79f7723f3a8",
"assets/assets/icons/htlm.png": "71e746c69708dca1cb175c46c73d1ccb",
"assets/assets/icons/ios.png": "27ff1ba5b8de6be08aef31637c445137",
"assets/assets/icons/java.png": "1e1ba20cfa4a4c86d66437632e35df2f",
"assets/assets/icons/js.png": "19d051b5642fdc24077a9e5390fde7b0",
"assets/assets/icons/pc.png": "c5cffdfc3b8ebc385d155b7244c88d28",
"assets/assets/icons/profile.png": "1f2089e8d53e7c7344f80c2efa8d4ef6",
"assets/assets/icons/service.png": "89e163334556cc602a2e10c64e8bb28d",
"assets/assets/icons/web.png": "3315cdf497b18674c2efdef45c8cb815",
"assets/assets/projects%2520images/home.jpg": "96e8f21a7666fb0e75e0970ce1212e36",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "49de1e66651de05d876373200f5e2b20",
"assets/NOTICES": "55cd3f5451c607641da61deeceb3343f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "b6e0568e0ce6fd0ce9651a65e3df70d0",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "30319b651cc5a6f90fc6842103bf2f56",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "fbb667e7ccd2207f71d4aa195259db61",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "880d0af44986dd5bdfe23436025c0f3c",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "586dc7b516dd124306d9e14eede1990f",
"icons/Icon-192.png": "36cb983745199a8fed1d75c040582f5f",
"icons/Icon-512.png": "98883dbccdefc1e677174590f66c732d",
"icons/Icon-maskable-192.png": "36cb983745199a8fed1d75c040582f5f",
"icons/Icon-maskable-512.png": "98883dbccdefc1e677174590f66c732d",
"index.html": "b506e8feee990d3acee7f29e887bb6e2",
"/": "b506e8feee990d3acee7f29e887bb6e2",
"main.dart.js": "a376151b3255609c2e493a9f58fdf957",
"main.dart.mjs": "de291cc202a96a7ec8730db20b4cd7e7",
"main.dart.wasm": "f115841d6e02ff6ce294d537b3118fee",
"manifest.json": "a7b4111c7937d32a6b9753b54a7a8600",
"version.json": "ada65f25aa5365c0e8c038384b590ed5"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
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
