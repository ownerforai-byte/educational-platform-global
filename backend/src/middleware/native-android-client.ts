import type { NextFunction, Request, Response } from "express";
import {
  NATIVE_ANDROID_CLIENT_HEADER,
  isAllowedNativeSigningCert,
} from "../lib/native-android-security.js";

/**
 * When the official Android app calls the API it sends X-Rn-Client + signing cert hash.
 * Reject repackaged APKs that do not match the Play upload/signing keys in assetlinks.json.
 * Browsers and curl omit these headers — unaffected.
 */
export function enforceNativeAndroidClient(req: Request, res: Response, next: NextFunction) {
  const client = req.get("X-Rn-Client");
  if (client !== NATIVE_ANDROID_CLIENT_HEADER) {
    return next();
  }
  const cert = req.get("X-Rn-Signing-Cert");
  if (!isAllowedNativeSigningCert(cert)) {
    res.status(403).json({ error: "Unofficial Android client" });
    return;
  }
  next();
}