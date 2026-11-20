"use strict";
/* دليل المعلم: يعمل بدون إنترنت بعد أول زيارة. غيّر رقم الإصدار عند كل تحديث للموقع. */
const VERSION = "tg-v1";
const CORE = ["./", "./assets/guide.js", "./assets/icons/apple-touch-icon.png", "./assets/icons/favicon-32.png", "./assets/icons/icon-192.png", "./assets/icons/icon-512.png", "./assets/icons/maskable-512.png", "./assets/logo.svg", "./assets/studio.js", "./assets/templates-data.js", "./assets/templates.js", "./guide.html", "./index.html", "./manifest.webmanifest", "./studio.html", "./style.css", "./templates.html", "./terms.html", "./vendor/Amiri-Bold.ttf", "./vendor/Amiri-Regular.ttf", "./vendor/mammoth.browser.min.js", "./vendor/pdf.min.js", "./vendor/pdf.worker.min.js", "./vendor/pptxgen.bundle.js"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // الصفحات: الشبكة أولًا لتصل التحديثات، ثم النسخة المحفوظة عند انقطاع الإنترنت
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html"))));
    return;
  }
  // الملفات الثابتة: المحفوظ أولًا
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })));
});
