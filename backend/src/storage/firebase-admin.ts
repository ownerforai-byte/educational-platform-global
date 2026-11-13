/**
 * Firebase Admin bootstrap for Storage + Firestore (Tier 2).
 * Uses FIREBASE_SERVICE_ACCOUNT_JSON (full JSON string) or discrete
 * FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY.
 * When unset, Tier-2 writes no-op / report inactive — Supabase + R2 still work.
 */
import { createRequire } from "node:module";

type AdminApp = {
  name: string;
};

type AdminNamespace = {
  apps: AdminApp[];
  app: (name?: string) => AdminApp;
  initializeApp: (options?: {
    credential?: unknown;
    storageBucket?: string;
    projectId?: string;
  }) => AdminApp;
  credential: {
    cert: (serviceAccount: object) => unknown;
  };
  firestore: (app?: AdminApp) => FirebaseFirestore;
  storage: (app?: AdminApp) => { bucket: (name?: string) => FirebaseBucket };
};

type FirebaseFirestore = {
  collection: (name: string) => {
    doc: (id: string) => {
      set: (data: object, opts?: { merge?: boolean }) => Promise<void>;
      get: () => Promise<{ exists: boolean; data: () => Record<string, unknown> | undefined }>;
    };
    add: (data: object) => Promise<{ id: string }>;
  };
};

type FirebaseBucket = {
  name: string;
  file: (path: string) => {
    save: (buf: Buffer, opts: object) => Promise<void>;
    getSignedUrl: (opts: object) => Promise<[string]>;
    makePublic?: () => Promise<void>;
  };
};

const require = createRequire(import.meta.url);

let adminNs: AdminNamespace | null = null;
let initAttempted = false;
let initError: string | null = null;

function loadAdmin(): AdminNamespace | null {
  if (adminNs) return adminNs;
  try {
    // Dynamic require so the backend still boots when firebase-admin is absent.
    adminNs = require("firebase-admin") as AdminNamespace;
    return adminNs;
  } catch (err) {
    initError = err instanceof Error ? err.message : "firebase-admin not installed";
    return null;
  }
}

function parseServiceAccount(): object | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    try {
      return JSON.parse(raw) as object;
    } catch {
      initError = "FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON";
      return null;
    }
  }
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  let privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();
  if (!projectId || !clientEmail || !privateKey) return null;
  privateKey = privateKey.replace(/\\n/g, "\n");
  return { projectId, clientEmail, privateKey };
}

export function isFirebaseAdminConfigured(): boolean {
  return Boolean(parseServiceAccount() || process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim());
}

export function getFirebaseInitError(): string | null {
  ensureFirebaseAdmin();
  return initError;
}

export function ensureFirebaseAdmin(): AdminApp | null {
  if (initAttempted) {
    const admin = loadAdmin();
    return admin && admin.apps.length ? admin.app() : null;
  }
  initAttempted = true;
  const admin = loadAdmin();
  if (!admin) return null;

  if (admin.apps.length) return admin.app();

  const account = parseServiceAccount();
  if (!account) {
    initError = initError ?? "Firebase Admin credentials not set";
    return null;
  }

  try {
    const bucket =
      process.env.FIREBASE_STORAGE_BUCKET?.trim() ||
      `${(account as { project_id?: string; projectId?: string }).project_id
        ?? (account as { projectId?: string }).projectId
        ?? "app"}.appspot.com`;
    const app = admin.initializeApp({
      credential: admin.credential.cert(account),
      storageBucket: bucket,
      projectId:
        (account as { project_id?: string }).project_id ??
        (account as { projectId?: string }).projectId,
    });
    initError = null;
    return app;
  } catch (err) {
    initError = err instanceof Error ? err.message : "Firebase Admin init failed";
    return null;
  }
}

export function getFirestore(): FirebaseFirestore | null {
  const admin = loadAdmin();
  const app = ensureFirebaseAdmin();
  if (!admin || !app) return null;
  return admin.firestore(app);
}

export function getStorageBucket(): FirebaseBucket | null {
  const admin = loadAdmin();
  const app = ensureFirebaseAdmin();
  if (!admin || !app) return null;
  const name = process.env.FIREBASE_STORAGE_BUCKET?.trim();
  return name ? admin.storage(app).bucket(name) : admin.storage(app).bucket();
}

export function firebaseAdminHealth(): {
  configured: boolean;
  ready: boolean;
  error: string | null;
  storageBucket: string | null;
} {
  const configured = isFirebaseAdminConfigured();
  const app = configured ? ensureFirebaseAdmin() : null;
  return {
    configured,
    ready: Boolean(app),
    error: initError,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET?.trim() || null,
  };
}
