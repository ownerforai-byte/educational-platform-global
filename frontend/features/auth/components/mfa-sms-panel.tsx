"use client";

import { useId, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField } from "./auth-field";
import {
  clearPhoneRecaptcha,
  firebaseMfaConfirmSmsAndFinish,
  firebaseMfaSendSmsCode,
} from "@/lib/firebase/client-auth";
import { authFailureMessage } from "../public-messages";
import type { MultiFactorResolver } from "firebase/auth";

interface MfaSmsPanelProps {
  resolver: MultiFactorResolver;
  disabled?: boolean;
  onCancel: () => void;
  onIdToken: (idToken: string) => void | Promise<void>;
  onError: (message: string) => void;
}

export function MfaSmsPanel({ resolver, disabled, onCancel, onIdToken, onError }: MfaSmsPanelProps) {
  const recaptchaHostId = useId().replace(/:/g, "");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    onError("");
    setLoading(true);
    try {
      const id = await firebaseMfaSendSmsCode(resolver, recaptchaHostId);
      setVerificationId(id);
    } catch (err) {
      onError(authFailureMessage(err, "login"));
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (!verificationId || !code.trim()) return;
    onError("");
    setLoading(true);
    try {
      const idToken = await firebaseMfaConfirmSmsAndFinish(resolver, verificationId, code);
      clearPhoneRecaptcha();
      await onIdToken(idToken);
    } catch (err) {
      onError(authFailureMessage(err, "login"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 rounded-2xl border border-primary/25 bg-primary/5 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
        <ShieldCheck className="h-4 w-4" />
        Two-step verification
      </p>
      <p className="text-xs text-muted-foreground">
        We sent or will send a code to your enrolled phone number. Enter it below to finish signing in.
      </p>
      <div
        id={recaptchaHostId}
        className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      />
      {!verificationId ? (
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-full font-semibold"
          disabled={disabled || loading}
          onClick={() => void sendCode()}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send SMS code"}
        </Button>
      ) : (
        <>
          <AuthField
            id="mfa-sms-code"
            label="SMS code"
            placeholder="6-digit code"
            activePlaceholder="6-digit code"
            type="text"
            value={code}
            onChange={setCode}
            icon={<ShieldCheck className="h-5 w-5" />}
            autoComplete="one-time-code"
            required
          />
          <Button
            type="button"
            className="h-11 w-full rounded-full font-semibold"
            disabled={disabled || loading || !code.trim()}
            onClick={() => void verify()}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify and continue"}
          </Button>
        </>
      )}
      <button
        type="button"
        className="w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground"
        onClick={() => {
          clearPhoneRecaptcha();
          onCancel();
        }}
      >
        Back to sign in
      </button>
    </div>
  );
}