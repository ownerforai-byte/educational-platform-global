import { afterAll, describe, expect, it } from "vitest";

import { isFirebaseAdminConfigured } from "../../src/storage/firebase-admin.js";

const ORIGINAL = { ...process.env };

const clearRelevantEnv = () => {
  delete process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  delete process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  delete process.env.FIREBASE_PROJECT_ID;
  delete process.env.FIREBASE_CLIENT_EMAIL;
  delete process.env.FIREBASE_PRIVATE_KEY;
  delete process.env.K_SERVICE;
  delete process.env.FUNCTION_TARGET;
};

afterAll(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL)) delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL);
});

describe("isFirebaseAdminConfigured", () => {
  it("is false with no credentials and no Google Cloud runtime signals", () => {
    clearRelevantEnv();
    expect(isFirebaseAdminConfigured()).toBe(false);
  });

  it("is true on Cloud Functions runtime signals (ADC, no key material)", () => {
    clearRelevantEnv();
    process.env.K_SERVICE = "api";
    expect(isFirebaseAdminConfigured()).toBe(true);
  });

  it("is true on FUNCTION_TARGET alone (Cloud Functions loader signal)", () => {
    clearRelevantEnv();
    process.env.FUNCTION_TARGET = "api";
    expect(isFirebaseAdminConfigured()).toBe(true);
  });

  it("stays true with the explicit service-account JSON form", () => {
    clearRelevantEnv();
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON = "{}";
    expect(isFirebaseAdminConfigured()).toBe(true);
  });
});
