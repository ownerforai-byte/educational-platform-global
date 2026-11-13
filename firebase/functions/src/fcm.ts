import * as admin from "firebase-admin";
import { ACCESS_BOT } from "./config";

if (!admin.apps.length) {
  admin.initializeApp();
}

export interface GuidedPush {
  title: string;
  body: string;
  /** In-app path, e.g. /home/member or /welcome */
  deepLink: string;
  kind: "approved" | "reminder" | "guidance" | "expired";
  requestId: string;
}

/** Send one FCM web/device notification with actionable deep-link data. */
export async function sendGuidedPush(
  token: string,
  push: GuidedPush,
): Promise<string> {
  const link = `${ACCESS_BOT.siteUrl}${push.deepLink.startsWith("/") ? push.deepLink : `/${push.deepLink}`}`;

  return admin.messaging().send({
    token,
    notification: {
      title: push.title,
      body: push.body,
    },
    data: {
      kind: push.kind,
      requestId: push.requestId,
      deepLink: push.deepLink,
      click_action: link,
    },
    webpush: {
      fcmOptions: { link },
      notification: {
        title: push.title,
        body: push.body,
        icon: "/icons/icon-192.png",
        data: {
          kind: push.kind,
          deepLink: push.deepLink,
          url: link,
        },
      },
    },
  });
}
