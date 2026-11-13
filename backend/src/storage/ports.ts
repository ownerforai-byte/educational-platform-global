/**
 * Storage ports (T11) — vendor-neutral interfaces. Controllers/services depend
 * on these; adapters wrap R2 / Firestore / FCM Admin.
 */

export type ObjectPutInput = {
  path: string;
  buffer: Buffer;
  contentType: string;
};

export type ObjectPutResult = {
  path: string;
  publicUrl: string;
};

export interface ObjectStore {
  readonly name: "r2";
  isActive(): boolean;
  put(input: ObjectPutInput): Promise<ObjectPutResult>;
}

export interface RealtimeDocStore {
  upsertFcmToken(
    userId: string,
    token: string,
    extra?: Record<string, unknown>,
  ): Promise<void>;
  appendNotificationLog(entry: {
    userId: string;
    kind: string;
    title: string;
    body: string;
    deepLink?: string;
    requestId?: string;
  }): Promise<string | null>;
  upsertAccessSession(entry: {
    requestId: string;
    userId: string;
    status: string;
    requestedAt?: string | null;
    approvedAt?: string | null;
    expiresAt?: string | null;
  }): Promise<void>;
}

export interface NotificationSender {
  isConfigured(): boolean;
}
