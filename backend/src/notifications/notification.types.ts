/**
 * Unified notification types and rules for the educational platform.
 * Supports all notification categories, types, and condition-based dispatch.
 */

export type NotificationCategory = "account" | "curriculum" | "ai" | "system";

export type NotificationKind =
  // Account & Access
  | "account_approved"
  | "account_created"
  | "account_rejected"
  | "sparks_refilled"
  | "sparks_low"
  | "device_limit_warning"
  | "new_device_login"
  // Curriculum & Study
  | "streak_milestone"
  | "streak_freeze_used"
  | "study_reminder"
  | "quiz_completed"
  | "new_content"
  // AI & Veer Tutor
  | "ai_insight_ready"
  | "ai_deep_dive_ready"
  // System & Platform Notices
  | "system_notice"
  | "system_maintenance"
  | "community_activity";

export interface NotificationPayload {
  kind: NotificationKind;
  category: NotificationCategory;
  title: string;
  body: string;
  deepLink: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
}

export interface UserNotificationContext {
  userId: string;
  email?: string;
  accessStatus?: "PENDING" | "ACTIVE" | "REJECTED" | string;
  credits?: number;
  streakDays?: number;
  lastStudyAt?: string | number;
  lastNotifiedMap?: Record<string, number>;
  metadata?: Record<string, unknown>;
  preferences?: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    studyReminders?: boolean;
    systemAlerts?: boolean;
  };
}

export type NotificationCondition = (context: UserNotificationContext) => boolean;

export interface NotificationRule {
  kind: NotificationKind;
  category: NotificationCategory;
  cooldownMs?: number;
  condition: NotificationCondition;
  buildPayload: (context: UserNotificationContext) => Omit<NotificationPayload, "kind" | "category">;
}
