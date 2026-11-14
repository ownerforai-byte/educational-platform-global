/* eslint-disable no-undef */
/**
 * Background FCM handler. Public Firebase web config is injected by the page
 * via `?cfg=` (base64url JSON) when the SW is registered — see
 * frontend/lib/fcm/register-token.ts. No secrets here; the config is the
 * public NEXT_PUBLIC_FIREBASE_* web config only.
 */
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js");

function readConfigFromUrl() {
  try {
    const params = new URL(self.location.href).searchParams;
    const cfg = params.get("cfg");
    if (!cfg) return null;
    let b64 = cfg.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4 !== 0) b64 += "=";
    return JSON.parse(atob(b64));
  } catch (err) {
    console.error("[fcm-sw] failed to read firebase config from URL", err);
    return null;
  }
}

function asString(value, fallback) {
  return typeof value === "string" && value ? value : fallback;
}

/**
 * Build a system notification from an FCM payload (compat `onBackgroundMessage`
 * shape, or the raw push JSON — they share `notification` / `data`).
 */
function buildNotification(payload) {
  const notification = (payload && payload.notification) || {};
  let data = (payload && payload.data) || {};
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (_) {
      data = { body: data };
    }
  }
  const title = asString(notification.title, asString(data.title, "Verner"));
  const body = asString(
    notification.body,
    asString(data.body, "Open Verner to continue."),
  );
  const link = asString(
    data.url,
    asString(data.click_action, asString(data.deepLink, asString(notification.click_action, "/"))),
  );
  return {
    title,
    options: {
      body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: Object.assign({}, data, { url: link }),
    },
  };
}

function showPushNotification(payload) {
  try {
    const notification = buildNotification(payload);
    return self.registration
      .showNotification(notification.title, notification.options)
      .catch(function (err) {
        console.error("[fcm-sw] showNotification failed", err);
      });
  } catch (err) {
    console.error("[fcm-sw] failed to handle push payload", err);
    return Promise.resolve();
  }
}

const firebaseConfig = readConfigFromUrl();
let messagingReady = false;

if (firebaseConfig) {
  try {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(function (payload) {
      return showPushNotification(payload);
    });
    messagingReady = true;
  } catch (err) {
    console.error("[fcm-sw] firebase messaging init failed", err);
  }
} else {
  console.error(
    "[fcm-sw] registered without ?cfg= — re-register via registerFcmToken(); falling back to raw push handling",
  );
}

/**
 * Raw `push` fallback — only active when the FCM SDK above could not handle
 * pushes (missing/invalid config or messaging unsupported). When the SDK is
 * ready it owns the push event and this listener returns early, so a push is
 * never shown twice.
 */
self.addEventListener("push", function (event) {
  if (messagingReady) return;
  let payload = null;
  try {
    payload = event.data ? event.data.json() : null;
  } catch (_) {
    try {
      payload = { data: { body: event.data ? event.data.text() : "" } };
    } catch (__) {
      payload = null;
    }
  }
  event.waitUntil(showPushNotification(payload));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const data =
    (event.notification && event.notification.data) || {};
  let path = asString(data.url, asString(data.deepLink, "/"));
  try {
    if (path.indexOf("http") === 0) {
      const parsed = new URL(path);
      path = parsed.pathname + parsed.search;
    } else if (path.charAt(0) !== "/") {
      path = "/" + path;
    }
  } catch (_) {
    path = "/";
  }
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (list) {
        for (let i = 0; i < list.length; i++) {
          const client = list[i];
          if ("focus" in client) {
            if (client.navigate) client.navigate(path);
            return client.focus();
          }
        }
        if (clients.openWindow) return clients.openWindow(path);
      })
      .catch(function (err) {
        console.error("[fcm-sw] notificationclick failed", err);
      }),
  );
});
