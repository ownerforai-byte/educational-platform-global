/**
 * Credit / access management layer.
 *
 * Public surface:
 *   - <CreditProvider>  → mount once in the root layout
 *   - <SparkGate>       → THE gate: route sections and inline blocks
 *   - <DirectoryCard>   → the single gated opening for the academic directory
 *   - useCredit()       → session, coins, unlock windows, notice control
 *   - useSessionTimer() → frame-by-frame unlock countdown
 */

export { CreditProvider, useCredit } from "./credit-provider";
export type { CreditContextValue } from "./credit-provider";
export { SparkGate } from "./spark-gate";
export type { SparkGateProps } from "./spark-gate";
export { DirectoryCard } from "./directory-card";
export { AdminApprovalModal } from "./admin-approval-modal";
export type { AdminApprovalModalProps } from "./admin-approval-modal";
export { useSessionTimer } from "./use-session-timer";
export type { SessionTimerState } from "./use-session-timer";
export {
  TOKEN_MATRIX,
  UNLOCK_WINDOW_SECONDS,
  NOTICE_COPY,
  LOGIN_PATH,
  PUBLIC_PATHS,
  categoryForPath,
  creditModuleKey,
  formatRemaining,
} from "./constants";
export type { ContentCategory, CategoryRule } from "./constants";
export {
  unlockModule,
  unlockModuleAt,
  lockModule,
  useUnlocks,
  isUnlocked,
  secondsRemaining,
  pruneExpired,
  currentEpochSeconds,
} from "./unlock-store";
export type { UnlockMap } from "./unlock-store";
