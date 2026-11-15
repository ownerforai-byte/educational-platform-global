/**
 * Display-only masking for secrets in UI — never use for authorization or logging raw values.
 */

const SENSITIVE_KEY =
  /(?:^|_)(secret|token|password|passwd|private|api[_-]?key|cron[_-]?key|signing)(?:$|_)/i;

const SENSITIVE_KEY_SUFFIX = /(?:key|token|secret)$/i;

/** True when a config/env key likely holds secret material. */
export function isSensitiveConfigKey(key: string): boolean {
  const k = key.trim();
  if (!k) return false;
  if (SENSITIVE_KEY.test(k)) return true;
  if (SENSITIVE_KEY_SUFFIX.test(k) && !/^(public|publishable|anon)(_|$)/i.test(k)) return true;
  return false;
}

/** Replace secret string with asterisks for on-screen display. */
export function maskSecretForDisplay(value: string, visibleTail = 0): string {
  const v = value.trim();
  if (!v) return "";
  if (visibleTail > 0 && v.length > visibleTail) {
    return `${"*".repeat(Math.max(8, v.length - visibleTail))}${v.slice(-visibleTail)}`;
  }
  return "*".repeat(Math.max(8, Math.min(v.length, 24)));
}