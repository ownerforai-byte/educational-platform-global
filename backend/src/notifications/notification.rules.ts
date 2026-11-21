import type {
  NotificationKind,
  NotificationRule,
  UserNotificationContext,
} from "./notification.types.js";

/**
 * Standard notification rules with condition logic, cooldown thresholds,
 * and templated copy.
 */
export const NOTIFICATION_RULES: Record<NotificationKind, NotificationRule> = {
  account_approved: {
    kind: "account_approved",
    category: "account",
    condition: (ctx) => ctx.accessStatus === "ACTIVE",
    buildPayload: () => ({
      title: "Your account is approved 🎉",
      body: "Sign in to start learning on Verner.",
      deepLink: "/welcome/approved",
      actionLabel: "Sign In",
    }),
  },

  account_created: {
    kind: "account_created",
    category: "account",
    condition: (ctx) => ctx.accessStatus === "PENDING",
    buildPayload: () => ({
      title: "Account Registered Successfully",
      body: "Your registration is received and being verified.",
      deepLink: "/welcome/pending",
      actionLabel: "Check Status",
    }),
  },

  account_rejected: {
    kind: "account_rejected",
    category: "account",
    condition: (ctx) => ctx.accessStatus === "REJECTED",
    buildPayload: () => ({
      title: "Access Request Update",
      body: "Your access request could not be approved at this time.",
      deepLink: "/welcome/pending",
      actionLabel: "View Details",
    }),
  },

  sparks_low: {
    kind: "sparks_low",
    category: "account",
    cooldownMs: 12 * 60 * 60 * 1000, // 12 hours
    condition: (ctx) => typeof ctx.credits === "number" && ctx.credits <= 3,
    buildPayload: (ctx) => ({
      title: "⚡ Spark Balance Running Low",
      body: `You have ${ctx.credits ?? 0} spark${(ctx.credits ?? 0) === 1 ? "" : "s"} remaining for Veer AI questions.`,
      deepLink: "/settings",
      actionLabel: "View Balance",
    }),
  },

  sparks_refilled: {
    kind: "sparks_refilled",
    category: "account",
    cooldownMs: 20 * 60 * 60 * 1000, // 20 hours
    condition: (ctx) => typeof ctx.credits === "number" && ctx.credits >= 20,
    buildPayload: (ctx) => ({
      title: "✨ Sparks Refilled",
      body: `Your daily spark pool has refreshed to ${ctx.credits ?? 20} sparks. Ready to solve concepts!`,
      deepLink: "/home",
      actionLabel: "Start Learning",
    }),
  },

  device_limit_warning: {
    kind: "device_limit_warning",
    category: "account",
    cooldownMs: 60 * 60 * 1000, // 1 hour
    condition: (ctx) => Boolean(ctx.metadata?.newDeviceDetected),
    buildPayload: () => ({
      title: "New Device Registered",
      body: "A new device was linked to your learning account.",
      deepLink: "/settings",
      actionLabel: "Review Devices",
    }),
  },

  new_device_login: {
    kind: "new_device_login",
    category: "account",
    cooldownMs: 60 * 60 * 1000, // 1 hour
    condition: (ctx) => Boolean(ctx.metadata?.loginIp),
    buildPayload: (ctx) => ({
      title: "New Login Detected",
      body: `Sign in confirmed${ctx.metadata?.loginIp ? ` from ${ctx.metadata.loginIp}` : ""}.`,
      deepLink: "/settings",
      actionLabel: "Security Settings",
    }),
  },

  streak_milestone: {
    kind: "streak_milestone",
    category: "curriculum",
    cooldownMs: 24 * 60 * 60 * 1000, // 24 hours
    condition: (ctx) =>
      typeof ctx.streakDays === "number" &&
      ctx.streakDays > 0 &&
      [3, 7, 14, 21, 30, 50, 100, 365].includes(ctx.streakDays),
    buildPayload: (ctx) => ({
      title: `🔥 ${ctx.streakDays}-Day Streak Unlocked!`,
      body: `Phenomenal consistency! You have studied ${ctx.streakDays} days consecutively.`,
      deepLink: "/home",
      actionLabel: "Keep Streak",
    }),
  },

  streak_freeze_used: {
    kind: "streak_freeze_used",
    category: "curriculum",
    cooldownMs: 24 * 60 * 60 * 1000,
    condition: (ctx) => Boolean(ctx.metadata?.streakFreezeUsed),
    buildPayload: () => ({
      title: "🛡️ Streak Freeze Activated",
      body: "Your study streak was protected for today. Continue studying tomorrow to keep it intact!",
      deepLink: "/home",
      actionLabel: "Continue",
    }),
  },

  study_reminder: {
    kind: "study_reminder",
    category: "curriculum",
    cooldownMs: 20 * 60 * 60 * 1000, // 20 hours
    condition: (ctx) => ctx.preferences?.studyReminders !== false,
    buildPayload: () => ({
      title: "📚 Today's Study Target Awaits",
      body: "Keep your momentum going! Spend a few minutes reviewing your core topics today.",
      deepLink: "/home",
      actionLabel: "Study Now",
    }),
  },

  quiz_completed: {
    kind: "quiz_completed",
    category: "curriculum",
    condition: (ctx) => Boolean(ctx.metadata?.quizScore !== undefined),
    buildPayload: (ctx) => ({
      title: "Quiz Evaluation Complete",
      body: `Your quiz results${ctx.metadata?.quizTitle ? ` for ${ctx.metadata.quizTitle}` : ""} are ready to review.`,
      deepLink: (ctx.metadata?.quizResultUrl as string) || "/quiz",
      actionLabel: "View Results",
    }),
  },

  new_content: {
    kind: "new_content",
    category: "curriculum",
    cooldownMs: 12 * 60 * 60 * 1000,
    condition: (ctx) => Boolean(ctx.metadata?.newContentTitle),
    buildPayload: (ctx) => ({
      title: "📖 New Learning Material Available",
      body: (ctx.metadata?.newContentTitle as string) || "New high-yield study notes have been added.",
      deepLink: (ctx.metadata?.contentUrl as string) || "/curriculum",
      actionLabel: "Explore",
    }),
  },

  ai_insight_ready: {
    kind: "ai_insight_ready",
    category: "ai",
    condition: (ctx) => Boolean(ctx.metadata?.insightReady),
    buildPayload: () => ({
      title: "💡 Veer AI Study Insights Ready",
      body: "Veer analyzed your practice questions and identified recommended review topics.",
      deepLink: "/home",
      actionLabel: "See Insights",
    }),
  },

  ai_deep_dive_ready: {
    kind: "ai_deep_dive_ready",
    category: "ai",
    condition: (ctx) => Boolean(ctx.metadata?.deepDiveReady),
    buildPayload: (ctx) => ({
      title: "🔬 Concept Deep Dive Ready",
      body: `Your in-depth explanation${ctx.metadata?.topic ? ` on ${ctx.metadata.topic}` : ""} has finished generating.`,
      deepLink: (ctx.metadata?.deepDiveUrl as string) || "/ai",
      actionLabel: "Read Deep Dive",
    }),
  },

  system_notice: {
    kind: "system_notice",
    category: "system",
    condition: () => true,
    buildPayload: (ctx) => ({
      title: (ctx.metadata?.noticeTitle as string) || "System Announcement",
      body: (ctx.metadata?.noticeBody as string) || "A new announcement has been published to the student board.",
      deepLink: (ctx.metadata?.noticeUrl as string) || "/notice",
      actionLabel: "Read Notice",
    }),
  },

  system_maintenance: {
    kind: "system_maintenance",
    category: "system",
    cooldownMs: 6 * 60 * 60 * 1000,
    condition: () => true,
    buildPayload: (ctx) => ({
      title: "🛠️ Scheduled Platform Maintenance",
      body: (ctx.metadata?.maintenanceDetails as string) || "Routine platform maintenance is scheduled.",
      deepLink: "/home",
      actionLabel: "Details",
    }),
  },

  community_activity: {
    kind: "community_activity",
    category: "system",
    condition: () => true,
    buildPayload: (ctx) => ({
      title: (ctx.metadata?.noticeTitle as string) || "Community update",
      body: (ctx.metadata?.noticeBody as string) || "Something new happened in the community.",
      deepLink: (ctx.metadata?.deepLink as string) || "/ai/community",
      actionLabel: "Open",
    }),
  },
};
