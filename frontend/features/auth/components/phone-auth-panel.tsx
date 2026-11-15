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
import { loginWithFirebaseIdToken, type FirebaseIdTokenLoginResult } from "@/lib/api/auth";
import { authFailureMessage } from "../public-messages";
import type { ConfirmationResult } from "firebase/auth";
interface PhoneAuthPanelProps {
  disabled?: boolean;
  onSignedIn: (res: FirebaseIdTokenLoginResult) => void | Promise<void>;
  onError: (message: string) => void;
}

export function PhoneAuthPanel({ disabled, onSignedIn, onError }: PhoneAuthPanelProps) {
  const firebaseMode = useFirebaseClientAuth();
  const recaptchaHostId = useId().replace(/:/g, "");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [pending, setPending] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  if (!firebaseMode) return null;

  const finishWithToken = async (idToken: string) => {
    const res = await loginWithFirebaseIdToken(idToken);
    clearPhoneRecaptcha();
    await onSignedIn(res);
  };

  const sendCode = async () => {
    onError("");
    setLoading(true);
    try {
      const confirmation = await firebasePhoneSendCode(phone, recaptchaHostId);
      setPending(confirmation);
      setStep("code");
    } catch (err) {
      onError(authFailureMessage(err, "oauth"));
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
      onError(authFailureMessage(err, "oauth"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 rounded-2xl border border-border/80 bg-muted/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone sign-in</p>
      <div id={recaptchaHostId} className="hidden" aria-hidden="true" />
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
          "Verify and sign in"
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