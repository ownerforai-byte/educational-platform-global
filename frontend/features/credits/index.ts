/**
 * Credit / access management layer.
 *
 * Public surface:
 *   - <CreditProvider>  → mount once in the root layout
 *   - <CreditGate>      → blur/overlay any coin-gated block
 *   - <DirectoryCard>   → the single gated opening for the academic directory
 *   - useCredit()       → session, coins, unlock windows, notice control
 *   - useSessionTimer() → frame-by-frame 2-hour countdown
 */

export { CreditProvider, useCredit } from "./credit-provider";
export type { CreditContextValue } from "./credit-provider";
export { CreditGate } from "./credit-gate";
export type { CreditGateProps } from "./credit-gate";
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
