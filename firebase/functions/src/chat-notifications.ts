import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";

/**
 * Firestore trigger on `/realtime_chats/{roomId}/messages/{messageId}`:
 * resolves other participants in `/realtime_chats/{roomId}` and dispatches
 * an FCM push notification to each recipient's registered device tokens.
 */
export const sendChatPushNotification = onDocumentCreated(
  {
    document: "realtime_chats/{roomId}/messages/{messageId}",
    region: "asia-south1",
  },
  async (event) => {
    const [{ getFirestoreAdmin }, { sendPushToUid }] = await Promise.all([
      import("./firestore"),
      import("./fcm"),
    ]);

    const snapshot = event.data;
    if (!snapshot) {
      logger.warn("[chat-push] missing event snapshot");
      return;
    }

    const messageData = snapshot.data();
    const { roomId, messageId } = event.params;
    const senderId = typeof messageData.senderId === "string" ? messageData.senderId.trim() : "";
    const rawText = typeof messageData.text === "string" ? messageData.text.trim() : "";
    const senderName =
      typeof messageData.senderName === "string" && messageData.senderName.trim()
        ? messageData.senderName.trim()
        : "New message";

    if (!senderId) {
      logger.warn("[chat-push] message missing senderId", { roomId, messageId });
      return;
    }

    const roomSnap = await getFirestoreAdmin().doc(`realtime_chats/${roomId}`).get();
    if (!roomSnap.exists) {
      logger.warn("[chat-push] chat room not found", { roomId });
      return;
    }

    const roomData = roomSnap.data() ?? {};
    const participants: string[] = Array.isArray(roomData.participantIds)
      ? roomData.participantIds.filter(
          (id: unknown): id is string => typeof id === "string" && id.trim().length > 0,
        )
      : [];
    const recipients = [...new Set(participants)].filter((uid) => uid !== senderId);

    if (recipients.length === 0) {
      logger.info("[chat-push] no recipients for message", { roomId, messageId });
      return;
    }

    const body = rawText.length > 100 ? `${rawText.slice(0, 97)}...` : rawText || "Sent a message";

    await Promise.all(
      recipients.map((recipientId) =>
        sendPushToUid(
          recipientId,
          { title: senderName, body },
          {
            kind: "chat_message",
            roomId,
            messageId,
            senderId,
          },
          {
            priority: "high",
            notification: {
              channelId: "chat_messages",
              sound: "default",
            },
          },
        ),
      ),
    );
  },
);
