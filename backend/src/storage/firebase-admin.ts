/**
 * Firebase Admin bootstrap for Storage + Firestore (Tier 2).
 * Uses FIREBASE_SERVICE_ACCOUNT_PATH (gitignored JSON file), or
 * FIREBASE_SERVICE_ACCOUNT_JSON (single-line string), or discrete
 * FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY.
 * When unset, Tier-2 writes no-op / report inactive — Supabase + R2 still work.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

type AdminApp = {
  name: string;
};

export type FirebaseAuthAdmin = {
  verifyIdToken: (
    token: string,
    checkRevoked?: boolean,
  ) => Promise<Record<string, unknown>>;
  revokeRefreshTokens: (uid: string) => Promise<void>;
  createUser: (props: Record<string, unknown>) => Promise<{ uid: string; email?: string }>;
  updateUser: (uid: string, props: Record<string, unknown>) => Promise<void>;
  getUserByEmail: (email: string) => Promise<{ uid: string; email?: string; displayName?: string }>;
  generatePasswordResetLink: (
    email: string,
    actionCodeSettings?: { url: string },
  ) => Promise<string>;
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
  auth: (app?: AdminApp) => FirebaseAuthAdmin;
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

function parseJsonServiceAccount(raw: string): object | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const candidates = [trimmed];
  if (trimmed.includes("\\n") || trimmed.includes('\\"')) {
    candidates.push(trimmed.replace(/\\n/g, "\n").replace(/\\"/g, '"'));
  }
  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as object;
    } catch {
      /* try next */
    }
  }
  return null;
}

function serviceAccountSearchBases(): string[] {
  const cwd = process.cwd();
  const here = dirname(fileURLToPath(import.meta.url));
  const backendRoot = resolve(here, "../..");
  const repoRoot = resolve(backendRoot, "..");
  return [...new Set([cwd, backendRoot, repoRoot, resolve(cwd, "backend"), resolve(repoRoot, "backend")])];
}

function readServiceAccountFile(pathRel: string): object | null {
  for (const base of serviceAccountSearchBases()) {
    const abs = resolve(base, pathRel);
    if (!existsSync(abs)) continue;
    const obj = parseJsonServiceAccount(readFileSync(abs, "utf8"));
    if (obj) return obj;
  }
  return null;
}

function parseServiceAccount(): object | null {
  const pathRel = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (pathRel) {
    const fromFile = readServiceAccountFile(pathRel);
    if (fromFile) return fromFile;
    initError = `FIREBASE_SERVICE_ACCOUNT_PATH not readable: ${pathRel}`;
    return null;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    const obj = parseJsonServiceAccount(raw);
    if (obj) return obj;
    initError = "FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON";
    return null;
  }
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  let privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();
  if (!projectId || !clientEmail || !privateKey) return null;
  privateKey = privateKey.replace(/\\n/g, "\n");
  return { projectId, clientEmail, privateKey };
}

export function isFirebaseAdminConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim() ||
      process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim() ||
      (process.env.FIREBASE_PROJECT_ID?.trim() &&
        process.env.FIREBASE_CLIENT_EMAIL?.trim() &&
        process.env.FIREBASE_PRIVATE_KEY?.trim()),
  );
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

export function getFirebaseAuth(): FirebaseAuthAdmin | null {
  const admin = loadAdmin();
  const app = ensureFirebaseAdmin();
  if (!admin || !app) return null;
  return admin.auth(app);
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
