import { APP_VERSION } from "./app-version.js";

const staticAttendanceAnalyzer = "attendance-analyzer-v" + APP_VERSION;
const assets = [
    "/",
    "/index.html",
    "/styles.css",
    "/app.js",
    "/assets/site.webmanifest",
    "/assets/android-chrome-192x192.png",
    "/assets/android-chrome-512x512.png",
    "/assets/apple-touch-icon.png",
    "/assets/favicon-32x32.png",
    "/assets/favicon-16x16.png",
    "/assets/favicon.ico",
    "/assets/down-arrow.png",
    "/assets/up-arrow.png",
    "/assets/close-icon.svg",
];

// TODO: use versionUpdateType() to update cache as per change
self.addEventListener("install", (installEvent) => {
    installEvent.waitUntil(
        caches.open(staticAttendanceAnalyzer).then((cache) => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((res) => {
            return res || fetch(fetchEvent.request);
        })
    );
});

export const unregisterServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .getRegistrations()
            .then(function (registrations) {
                for (let registration of registrations) {
                    registration.unregister();
                }
            });
    }
};
