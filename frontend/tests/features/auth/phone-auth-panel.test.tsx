import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => ({
  phoneSendCode: vi.fn(),
  phoneConfirm: vi.fn(),
  clearRecaptcha: vi.fn(),
  loginWithToken: vi.fn(),
  signupWithToken: vi.fn(),
  rememberPendingSignup: vi.fn(),
  rememberAccessOutcome: vi.fn(),
}));

vi.mock("@/lib/firebase/client-auth", () => ({
  useFirebaseClientAuth: () => true,
  firebasePhoneSendCode: mocks.phoneSendCode,
  firebasePhoneConfirm: mocks.phoneConfirm,
  clearPhoneRecaptcha: mocks.clearRecaptcha,
}));
vi.mock("@/lib/api/auth", () => ({
  loginWithFirebaseIdToken: mocks.loginWithToken,
  signupWithFirebaseIdToken: mocks.signupWithToken,
}));
vi.mock("@/features/auth/pending-signup-identity", () => ({
  DENIED_ROUTE: "/denied",
  WAITING_ROUTE: "/welcome/pending",
  rememberPendingSignup: mocks.rememberPendingSignup,
  rememberAccessOutcome: mocks.rememberAccessOutcome,
}));

import { PhoneAuthPanel } from "@/features/auth/components/phone-auth-panel";
import { DENIED_ROUTE, WAITING_ROUTE } from "@/features/auth/pending-signup-identity";

function renderPanel(overrides: Partial<React.ComponentProps<typeof PhoneAuthPanel>> = {}) {
  const onSignedIn = vi.fn();
  const onSignedUp = vi.fn();
  const onError = vi.fn();
  const onNavigate = vi.fn();
  render(
    <PhoneAuthPanel
      mode="signup"
      signupFullName="Test Person"
      onSignedIn={onSignedIn}
      onSignedUp={onSignedUp}
      onError={onError}
      onNavigate={onNavigate}
      {...overrides}
    />,
  );
  return { onSignedIn, onSignedUp, onError, onNavigate };
}

async function sendCodeAndVerify(codeButtonText: string) {
  fireEvent.change(screen.getByPlaceholderText("+9779800000000"), {
    target: { value: "+9779800000000" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Send verification code" }));
  await waitFor(() => expect(screen.getByPlaceholderText("6-digit code")).toBeTruthy());
  fireEvent.change(screen.getByPlaceholderText("6-digit code"), {
    target: { value: "123456" },
  });
  fireEvent.click(screen.getByRole("button", { name: codeButtonText }));
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.phoneSendCode.mockResolvedValue({ confirmationId: "confirm" });
  mocks.phoneConfirm.mockResolvedValue("firebase-id-token");
});

describe("PhoneAuthPanel signup mode", () => {
  it("refuses to send an SMS code until a full name is entered", async () => {
    const { onError } = renderPanel({ signupFullName: "" });
    fireEvent.change(screen.getByPlaceholderText("+9779800000000"), {
      target: { value: "+9779800000000" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send verification code" }));
    expect(onError).toHaveBeenCalledWith(expect.stringContaining("full name"));
    expect(mocks.phoneSendCode).not.toHaveBeenCalled();
  });

  it("signs up with the id token + full name and routes a pending outcome to the waiting screen", async () => {
    mocks.signupWithToken.mockResolvedValue({
      code: "PENDING_APPROVAL",
      statusToken: "signed-status",
      user: null,
      accessToken: null,
    });
    const { onSignedUp, onNavigate } = renderPanel();
    await sendCodeAndVerify("Verify and create account");
    await waitFor(() => expect(onNavigate).toHaveBeenCalledWith(WAITING_ROUTE));
    expect(mocks.signupWithToken).toHaveBeenCalledWith("firebase-id-token", "Test Person");
    expect(mocks.rememberPendingSignup).toHaveBeenCalledWith("signed-status");
    expect(mocks.rememberAccessOutcome).toHaveBeenCalledWith("PENDING");
    expect(onSignedUp).not.toHaveBeenCalled();
  });

  it("hands an ACTIVE signup result to the success callback", async () => {
    mocks.signupWithToken.mockResolvedValue({
      user: { id: "u1", email: "t@example.com" },
      accessToken: "session-token",
    });
    const { onSignedUp, onNavigate } = renderPanel();
    await sendCodeAndVerify("Verify and create account");
    await waitFor(() => expect(onSignedUp).toHaveBeenCalled());
    expect(onNavigate).not.toHaveBeenCalled();
    expect(mocks.rememberAccessOutcome).not.toHaveBeenCalled();
  });

  // Regression: accessDenied() answers 403 and apiFetch THROWS on non-2xx
  // (attaching `code` + `statusToken` to the error), so a rejected account
  // arrives as a rejected promise — it must still open the denied screen.
  it("routes a thrown ACCOUNT_REJECTED error to the denied screen", async () => {
    mocks.signupWithToken.mockRejectedValue(
      Object.assign(new Error("Account denied"), {
        status: 403,
        code: "ACCOUNT_REJECTED",
        statusToken: "signed-status",
      }),
    );
    const { onError, onNavigate } = renderPanel();
    await sendCodeAndVerify("Verify and create account");
    await waitFor(() => expect(onNavigate).toHaveBeenCalledWith(DENIED_ROUTE));
    expect(mocks.rememberAccessOutcome).toHaveBeenCalledWith("REJECTED");
    expect(mocks.rememberPendingSignup).toHaveBeenCalledWith("signed-status");
    expect(onError.mock.calls.flat().filter(Boolean)).toHaveLength(0);
  });
});

describe("PhoneAuthPanel login mode", () => {
  it("signs in with the id token and reaches the success callback", async () => {
    mocks.loginWithToken.mockResolvedValue({
      user: { id: "u1", email: "t@example.com" },
      accessToken: "session-token",
    });
    const { onSignedIn, onNavigate } = renderPanel({ mode: "login" });
    await sendCodeAndVerify("Verify and sign in");
    await waitFor(() => expect(onSignedIn).toHaveBeenCalled());
    expect(mocks.loginWithToken).toHaveBeenCalledWith("firebase-id-token");
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it("routes a thrown ACCOUNT_REJECTED error to the denied screen", async () => {
    mocks.loginWithToken.mockRejectedValue(
      Object.assign(new Error("Account denied"), {
        status: 403,
        code: "ACCOUNT_REJECTED",
        statusToken: "signed-status",
      }),
    );
    const { onError, onNavigate } = renderPanel({ mode: "login" });
    await sendCodeAndVerify("Verify and sign in");
    await waitFor(() => expect(onNavigate).toHaveBeenCalledWith(DENIED_ROUTE));
    expect(mocks.rememberAccessOutcome).toHaveBeenCalledWith("REJECTED");
    expect(onError.mock.calls.flat().filter(Boolean)).toHaveLength(0);
  });

  it("surfaces a non-access failure as an error message", async () => {
    mocks.loginWithToken.mockRejectedValue(
      Object.assign(new Error("bad"), { status: 403, code: "DEVICE_SIGNUP_LIMIT" }),
    );
    const { onError, onNavigate } = renderPanel({ mode: "login" });
    await sendCodeAndVerify("Verify and sign in");
    await waitFor(() => expect(onError).toHaveBeenCalled());
    expect(onError).toHaveBeenCalledWith(expect.stringContaining("device"));
    expect(onNavigate).not.toHaveBeenCalled();
  });
});
