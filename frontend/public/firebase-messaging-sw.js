/* eslint-disable no-undef */
/**
 * Background FCM handler. Public Firebase web config is injected by the page
 * via `?cfg=` (base64url JSON) when the SW is registered — no secrets here.
 */
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js");

function readConfigFromUrl() {
  try {
    const params = new URL(self.location.href).searchParams;
    const cfg = params.get("cfg");
    if (!cfg) return null;
    const json = atob(cfg.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const firebaseConfig = readConfigFromUrl();
if (firebaseConfig) {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || "Verner";
    const body =
      (payload.notification && payload.notification.body) ||
      "Open Verner to continue.";
    const data = payload.data || {};
    const link = data.deepLink || data.click_action || "/home/member";
    self.registration.showNotification(title, {
      body,
      icon: "/icon-192.png",
      data: Object.assign({ url: link }, data),
    });
  });
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const raw =
    (event.notification && event.notification.data && event.notification.data.url) ||
    (event.notification && event.notification.data && event.notification.data.deepLink) ||
    "/";
  let path = raw;
  try {
    if (typeof raw === "string" && raw.indexOf("http") === 0) {
      path = new URL(raw).pathname + new URL(raw).search;
    }
  } catch (_) {
    path = "/";
  }
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (let i = 0; i < list.length; i++) {
        const client = list[i];
        if ("focus" in client) {
          if (client.navigate) client.navigate(path);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(path);
    }),
  );
});
