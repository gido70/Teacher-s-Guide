"use strict";
/* تسجيل التطبيق (PWA) وزر التثبيت */
(function () {
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
  const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  let deferred = null;
  const btn = () => document.getElementById("install-btn");
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault(); deferred = e;
    const b = btn(); if (b) b.hidden = false;
  });
  window.addEventListener("appinstalled", () => { const b = btn(); if (b) b.hidden = true; deferred = null; });
  document.addEventListener("DOMContentLoaded", () => {
    const b = btn(); if (!b || standalone) return;
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (ios) b.hidden = false;
    b.addEventListener("click", async () => {
      if (deferred) { deferred.prompt(); await deferred.userChoice; deferred = null; b.hidden = true; return; }
      if (document.querySelector(".ios-tip")) return;
      const tip = document.createElement("div");
      tip.className = "ios-tip"; tip.setAttribute("role", "dialog");
      tip.innerHTML = '<button type="button" class="btn quiet small" aria-label="إغلاق">×</button><strong>لتثبيت دليل المعلم على هاتفك:</strong><br>في iPhone: افتح الموقع في Safari، واضغط زر المشاركة <b>⬆︎</b> ثم «إضافة إلى الشاشة الرئيسية».<br>في Android: من قائمة المتصفح ⋮ اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».';
      tip.querySelector("button").addEventListener("click", () => tip.remove());
      document.body.append(tip);
    });
  });
})();
