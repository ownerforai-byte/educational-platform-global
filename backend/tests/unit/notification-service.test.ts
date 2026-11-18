import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  sendConditionalNotification,
  evaluateAndDispatchAllEligible,
  resetNotificationCooldown,
} from "../../src/notifications/notification.service.js";
import { fcmNotificationSender } from "../../src/storage/adapters/fcm.js";
import * as firebaseStore from "../../src/storage/firebase-store.js";

describe("Notification Service & Condition Engine", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    resetNotificationCooldown("test-user-123");
    vi.spyOn(firebaseStore, "appendNotificationLog").mockResolvedValue("log-doc-id-123");
    vi.spyOn(fcmNotificationSender, "sendPush").mockResolvedValue({
      successCount: 1,
      failureCount: 0,
      results: [{ token: "fcm-tok", ok: true, messageId: "msg-123" }],
    });
  });

  it("sends account_approved notification when condition is met (accessStatus === ACTIVE)", async () => {
    const res = await sendConditionalNotification("account_approved", {
      userId: "test-user-123",
      accessStatus: "ACTIVE",
    });

    expect(res.sent).toBe(true);
    expect(res.kind).toBe("account_approved");
    expect(res.payload?.title).toContain("Your account is approved");
    expect(res.payload?.deepLink).toBe("/welcome/approved");
    expect(res.inAppLogId).toBe("log-doc-id-123");
  });

  it("does not send account_approved if accessStatus is PENDING", async () => {
    const res = await sendConditionalNotification("account_approved", {
      userId: "test-user-123",
      accessStatus: "PENDING",
    });

    expect(res.sent).toBe(false);
    expect(res.reason).toContain("Condition for account_approved not satisfied");
  });

  it("sends sparks_low notification when credits <= 3", async () => {
    const res = await sendConditionalNotification("sparks_low", {
      userId: "test-user-123",
      credits: 2,
    });

    expect(res.sent).toBe(true);
    expect(res.kind).toBe("sparks_low");
    expect(res.payload?.title).toContain("Spark Balance Running Low");
    expect(res.payload?.body).toContain("2 sparks remaining");
  });

  it("enforces cooldown so sparks_low is not spammed repeatedly", async () => {
    const first = await sendConditionalNotification("sparks_low", {
      userId: "test-user-123",
      credits: 1,
    });
    expect(first.sent).toBe(true);

    const second = await sendConditionalNotification("sparks_low", {
      userId: "test-user-123",
      credits: 1,
    });
    expect(second.sent).toBe(false);
    expect(second.reason).toContain("Cooldown not satisfied");
  });

  it("respects user preference opt-out for study reminders", async () => {
    const res = await sendConditionalNotification("study_reminder", {
      userId: "test-user-123",
      preferences: { studyReminders: false },
    });

    expect(res.sent).toBe(false);
    expect(res.reason).toContain("opted out");
  });

  it("evaluates multiple rules and dispatches only those that match", async () => {
    const results = await evaluateAndDispatchAllEligible(
      {
        userId: "test-user-123",
        accessStatus: "ACTIVE",
        streakDays: 7, // 7-day milestone
        credits: 15,   // not low, not >=20
      },
      ["account_approved", "streak_milestone", "sparks_low"],
    );

    expect(results.length).toBe(2);
    const kinds = results.map((r) => r.kind);
    expect(kinds).toContain("account_approved");
    expect(kinds).toContain("streak_milestone");
    expect(kinds).not.toContain("sparks_low");
  });
});
