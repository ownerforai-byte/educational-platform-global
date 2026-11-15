"use client";

import { useId, useState } from "react";
import { Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField } from "./auth-field";
import {
  clearPhoneRecaptcha,
  firebasePhoneConfirm,
  firebasePhoneSendCode,
  useFirebaseClientAuth,
} from "@/lib/firebase/client-auth";
import {
  loginWithFirebaseIdToken,
  signupWithFirebaseIdToken,
  type FirebaseIdTokenLoginResult,
  type FirebaseIdTokenSignupResult,
} from "@/lib/api/auth";
import {
  DENIED_ROUTE,
  rememberAccessOutcome,
  rememberPendingSignup,
  WAITING_ROUTE,
} from "../pending-signup-identity";
import { authFailureMessage } from "../public-messages";
import type { ConfirmationResult } from "firebase/auth";
interface PhoneAuthPanelProps {
  mode?: "login" | "signup";
  signupFullName?: string;
  disabled?: boolean;
  onSignedIn?: (res: FirebaseIdTokenLoginResult) => void | Promise<void>;
  onSignedUp?: (res: FirebaseIdTokenSignupResult) => void | Promise<void>;
  onError: (message: string) => void;
  onNavigate?: (path: string) => void;
}

export function PhoneAuthPanel({
  mode = "login",
  signupFullName = "",
  disabled,
  onSignedIn,
  onSignedUp,
  onError,
  onNavigate,
}: PhoneAuthPanelProps) {
  const firebaseMode = useFirebaseClientAuth();
  const recaptchaHostId = useId().replace(/:/g, "");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [pending, setPending] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  if (!firebaseMode) return null;

  /** Backend access outcome — a resolved body OR a thrown apiFetch error
   * (accessDenied() answers 403, and apiFetch throws on non-2xx while still
   * attaching `code` + `statusToken` to the error). */
  type AccessOutcome = { code?: string; statusToken?: string; user?: unknown };

  const routeAccessOutcome = (outcome: AccessOutcome): boolean => {
    const code = String(outcome.code ?? "").toUpperCase();
    const rejected = code === "ACCOUNT_REJECTED";
    // `statusToken && !user` is the pending shape — but an explicit rejection
    // code wins, so rejected users land on the denied screen, not the waiting one.
    if (!rejected && code !== "PENDING_APPROVAL" && !(outcome.statusToken && !outcome.user)) {
      return false;
    }
    if (outcome.statusToken) rememberPendingSignup(outcome.statusToken);
    if (rejected) {
      rememberAccessOutcome("REJECTED");
      onNavigate?.(DENIED_ROUTE);
    } else {
      rememberAccessOutcome("PENDING");
      onNavigate?.(WAITING_ROUTE);
    }
    return true;
  };

  const finishWithToken = async (idToken: string) => {
    clearPhoneRecaptcha();
    const signup = mode === "signup";
    let outcome: AccessOutcome;
    try {
      outcome = signup
        ? await signupWithFirebaseIdToken(idToken, signupFullName)
        : await loginWithFirebaseIdToken(idToken);
    } catch (err) {
      if (!routeAccessOutcome((err ?? {}) as AccessOutcome)) throw err;
      return;
    }
    if (routeAccessOutcome(outcome)) return;
    if (signup) {
      await onSignedUp?.(outcome as FirebaseIdTokenSignupResult);
    } else {
      await onSignedIn?.(outcome as FirebaseIdTokenLoginResult);
    }
  };

  const sendCode = async () => {
    onError("");
    if (mode === "signup" && signupFullName.trim().length < 2) {
      onError("Enter your full name above before verifying your phone number.");
      return;
    }
    setLoading(true);
    try {
      const confirmation = await firebasePhoneSendCode(phone, recaptchaHostId);
      setPending(confirmation);
      setStep("code");
    } catch (err) {
      onError(authFailureMessage(err, mode === "signup" ? "signup" : "oauth"));
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!pending) return;
    onError("");
    setLoading(true);
    try {
      const idToken = await firebasePhoneConfirm(pending, code);
      await finishWithToken(idToken);
    } catch (err) {
      onError(authFailureMessage(err, mode === "signup" ? "signup" : "oauth"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 rounded-2xl border border-border/80 bg-muted/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {mode === "signup" ? "Phone sign-up" : "Phone sign-in"}
      </p>
      {mode === "signup" ? (
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          SMS verification creates your Firebase login. After the code, we start your platform access
          request (same as email sign-up).
        </p>
      ) : null}
      <div
        id={recaptchaHostId}
        className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      />
      {step === "phone" ? (
        <AuthField
          id="phone"
          label="Mobile number"
          placeholder="+9779800000000"
          activePlaceholder="+9779800000000"
          type="tel"
          value={phone}
          onChange={setPhone}
          icon={<Phone className="h-5 w-5" />}
          autoComplete="tel"
          required
        />
      ) : (
        <AuthField
          id="sms-code"
          label="SMS code"
          placeholder="6-digit code"
          activePlaceholder="6-digit code"
          type="text"
          value={code}
          onChange={setCode}
          icon={<Phone className="h-5 w-5" />}
          autoComplete="one-time-code"
          required
        />
      )}
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full rounded-full font-semibold"
        disabled={disabled || loading || (step === "phone" ? !phone.trim() : !code.trim())}
        onClick={() => void (step === "phone" ? sendCode() : verifyCode())}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : step === "phone" ? (
          "Send verification code"
        ) : (
          mode === "signup" ? "Verify and create account" : "Verify and sign in"
        )}
      </Button>
      {step === "code" ? (
        <button
          type="button"
          className="w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground"
          onClick={() => {
            setStep("phone");
            setCode("");
            setPending(null);
            clearPhoneRecaptcha();
          }}
        >
          Use a different number
        </button>
      ) : null}
    </div>
  );
}