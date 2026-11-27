/**
 * Firebase Admin bootstrap for Storage + Firestore (Tier 2).
 * Uses FIREBASE_SERVICE_ACCOUNT_PATH (gitignored JSON file), or
 * FIREBASE_SERVICE_ACCOUNT_JSON (single-line string), or discrete
 * FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY,
 * or — on Google Cloud (Cloud Functions / Cloud Run) — Application Default
 * Credentials from the runtime service account (no key material shipped).
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
  deleteUser: (uid: string) => Promise<void>;
  updateUser: (uid: string, props: Record<string, unknown>) => Promise<void>;
  getUserByEmail: (email: string) => Promise<{ uid: string; email?: string; displayName?: string }>;
  generatePasswordResetLink: (
    email: string,
    actionCodeSettings?: { url: string },
  ) => Promise<string>;
  generateEmailVerificationLink?: (
    email: string,
    actionCodeSettings?: { url: string },
  ) => Promise<string>;
};

type AdminNamespace = {
  /** firebase-admin 13.x exposes the app registry as an array … */
  apps?: AdminApp[];
  /** … while 14.x replaced it with a `getApps()` accessor. */
  getApps?: () => AdminApp[];
  app: (name?: string) => AdminApp;
  initializeApp: (options?: {
    credential?: unknown;
    storageBucket?: string;
    projectId?: string;
  }) => AdminApp;
  credential: {
    cert: (serviceAccount: object) => unknown;
    applicationDefault?: () => unknown;
  };
  /** firebase-admin 14.x: top-level named exports (v13 kept them under credential). */
  cert?: (serviceAccount: object) => unknown;
  applicationDefault?: () => unknown;
  auth: (app?: AdminApp) => FirebaseAuthAdmin;
  firestore: (app?: AdminApp) => FirebaseFirestore;
  storage: (app?: AdminApp) => { bucket: (name?: string) => FirebaseBucket };
  /** firebase-admin 14.x: subpath entry points, attached by loadAdmin(). */
  messaging?: (app?: AdminApp) => unknown;
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
    const mod = require("firebase-admin") as unknown as Record<string, unknown>;
    // firebase-admin 14.x moved the service accessors (auth/firestore/storage/
    // messaging) into subpath entry points ("firebase-admin/auth" etc.) and
    // cert/applicationDefault to top-level named exports. Wrap the module once
    // here so every call site keeps the v13 shape (`admin.auth(app)`), and
    // neither SDK version can silently break auth again.
    const admin = { ...mod } as AdminNamespace & Record<string, unknown>;
    const sub = (p: string): Record<string, unknown> | null => {
      try {
        return require(p) as Record<string, unknown>;
      } catch {
        return null;
      }
    };
    if (typeof admin.app !== "function" && typeof mod.getApp === "function") {
      admin.app = (name?: string) => (mod.getApp as (n?: string) => AdminApp)(name);
    }
    if (typeof admin.auth !== "function") {
      const m = sub("firebase-admin/auth");
      if (typeof m?.getAuth === "function") admin.auth = (app?: AdminApp) => (m.getAuth as (a?: AdminApp) => FirebaseAuthAdmin)(app);
    }
    if (typeof admin.firestore !== "function") {
      const m = sub("firebase-admin/firestore");
      if (typeof m?.getFirestore === "function") admin.firestore = (app?: AdminApp) => (m.getFirestore as (a?: AdminApp) => FirebaseFirestore)(app);
    }
    if (typeof admin.storage !== "function") {
      const m = sub("firebase-admin/storage");
      if (typeof m?.getStorage === "function") admin.storage = (app?: AdminApp) => (m.getStorage as (a?: AdminApp) => { bucket: (name?: string) => FirebaseBucket })(app);
    }
    if (typeof admin.messaging !== "function") {
      const m = sub("firebase-admin/messaging");
      if (typeof m?.getMessaging === "function") admin.messaging = (app?: AdminApp) => (m.getMessaging as (a?: AdminApp) => unknown)(app);
    }
    // v13 keeps initializeApp/app/apps as PROTOTYPE getters on the namespace
    // class (own-property spread copies miss them — verified against
    // firebase-admin 13.10.0: own props are only __esModule/credential/
    // SDK_VERSION/Promise/INTERNAL/default). Delegate to the live module so
    // app lifecycle (initializeApp/app/apps) stays live on the copy.
    if (typeof admin.initializeApp !== "function" && typeof (mod as { initializeApp?: unknown }).initializeApp !== "function") {
      const appMod = sub("firebase-admin/app");
      if (typeof appMod?.initializeApp === "function") {
        admin.initializeApp = appMod.initializeApp as unknown as typeof admin.initializeApp;
        if (typeof admin.getApps !== "function" && typeof appMod.getApps === "function") {
          admin.getApps = appMod.getApps as unknown as typeof admin.getApps;
        }
      }
    }
    if (typeof admin.initializeApp !== "function") {
      // Fall back to the prototype chain of the required module (v13 keeps
      // initializeApp there) — bind to the module so `this` stays correct.
      const proto = Object.getPrototypeOf(mod) as Record<string, unknown> | null;
      if (proto && typeof proto.initializeApp === "function") {
        admin.initializeApp = (proto.initializeApp as (...a: unknown[]) => AdminApp).bind(mod);
      }
      if (typeof admin.app !== "function" && proto && typeof proto.app === "function") {
        admin.app = (proto.app as (...a: unknown[]) => AdminApp).bind(mod);
      }
      // NB: do NOT touch proto.apps directly — it is a live getter whose `this`
      // must be the module instance (reading it off the prototype throws
      // "Cannot read properties of undefined (reading 'apps')"). Check the
      // descriptor instead and re-expose the getter bound to the module.
      const appsDesc = proto ? Object.getOwnPropertyDescriptor(proto, "apps") : undefined;
      if (
        appsDesc &&
        typeof appsDesc.get === "function" &&
        !Array.isArray(admin.apps) &&
        typeof admin.getApps !== "function"
      ) {
        Object.defineProperty(admin, "apps", {
          get: () => (mod as { apps?: AdminApp[] }).apps,
          enumerable: true,
          configurable: true,
        });
      }
    }
    adminNs = admin as AdminNamespace;
    return adminNs;
  } catch (err) {
    initError = err instanceof Error ? err.message : "firebase-admin not installed";
    return null;
  }
}

/**
 * How many Firebase apps are already initialised.
 *
 * firebase-admin 13.x exposes the registry as the array `apps`; 14.x replaced
 * it with `getApps()`, so `admin.apps.length` throws "Cannot read properties of
 * undefined" on v14 — which silently broke every profile read (login returned a
 * null user). Read both shapes so either version works.
 */
function initializedAppCount(admin: AdminNamespace): number {
  if (Array.isArray(admin.apps)) return admin.apps.length;
  if (typeof admin.getApps === "function") return admin.getApps().length;
  return 0;
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
        process.env.FIREBASE_PRIVATE_KEY?.trim()) ||
      runsOnGoogleCloud(),
  );
}

/** True when running inside a Google Cloud host that provides ADC (Cloud Functions / Cloud Run). */
function runsOnGoogleCloud(): boolean {
  return Boolean(process.env.K_SERVICE?.trim() || process.env.FUNCTION_TARGET?.trim());
}

/** The adapted firebase-admin namespace (v13/v14 shape unified) — or null. */
export function getAdminNamespace(): AdminNamespace | null {
  return loadAdmin();
}

export function getFirebaseInitError(): string | null {
  ensureFirebaseAdmin();
  return initError;
}

export function ensureFirebaseAdmin(): AdminApp | null {
  if (initAttempted) {
    const admin = loadAdmin();
    return admin && initializedAppCount(admin) ? admin.app() : null;
  }
  initAttempted = true;
  const admin = loadAdmin();
  if (!admin) return null;

  if (initializedAppCount(admin)) return admin.app();

  const account = parseServiceAccount();
  // firebase-admin 14.x moved `cert`/`applicationDefault` to top-level named
  // exports (the 13.x `admin.credential.cert` shape is gone there). Support
  // both so the SDK version can not silently break auth again.
  const certFn = admin.credential?.cert ?? admin.cert;
  const appDefaultFn = admin.credential?.applicationDefault ?? admin.applicationDefault;
  const projectId =
    (account as { project_id?: string; projectId?: string } | null)?.project_id ??
    (account as { projectId?: string } | null)?.projectId ??
    process.env.FIREBASE_PROJECT_ID?.trim() ??
    process.env.GCLOUD_PROJECT?.trim() ??
    process.env.GOOGLE_CLOUD_PROJECT?.trim();
  const bucket = process.env.FIREBASE_STORAGE_BUCKET?.trim() || `${projectId ?? "app"}.appspot.com`;

  try {
    if (account && typeof certFn === "function") {
      const app = admin.initializeApp({
        credential: certFn(account),
        storageBucket: bucket,
        projectId: projectId,
      });
      initError = null;
      return app;
    }
    if (runsOnGoogleCloud() && typeof appDefaultFn === "function") {
      // Cloud Functions / Cloud Run: the runtime service account is the
      // credential — nothing to ship or rotate in env vars.
      const app = admin.initializeApp({
        credential: appDefaultFn(),
        storageBucket: bucket,
        projectId: projectId,
      });
      initError = null;
      return app;
    }
    initError = initError ?? "Firebase Admin credentials not set";
    return null;
  } catch (err) {
    initError = err instanceof Error ? err.message : "Firebase Admin init failed";
    return null;
  }
}

export function getFirestore(): FirebaseFirestore | null {
  const admin = loadAdmin();
  const app = ensureFirebaseAdmin();
  if (!admin || !app) return null;
  if (typeof admin.firestore !== "function") return null;
  return admin.firestore(app);
}

export function getStorageBucket(): FirebaseBucket | null {
  const admin = loadAdmin();
  const app = ensureFirebaseAdmin();
  if (!admin || !app) return null;
  if (typeof admin.storage !== "function") return null;
  const name = process.env.FIREBASE_STORAGE_BUCKET?.trim();
  return name ? admin.storage(app).bucket(name) : admin.storage(app).bucket();
}

export function getFirebaseAuth(): FirebaseAuthAdmin | null {
  const admin = loadAdmin();
  const app = ensureFirebaseAdmin();
  if (!admin || !app) return null;
  if (typeof admin.auth !== "function") return null;
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
