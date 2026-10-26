import { AI_SPARK_LIMITS } from "./aiSpark";

/** Guest trial exhausted — points at the AI spark pool, not content sparks. */
export function signInForMoreAiSparkMessage(extra?: string): string {
  const member = AI_SPARK_LIMITS.member;
  const prefix = extra ? `${extra} ` : "";
  return (
    `${prefix}Sign in to keep going — members get ${member} AI sparks per UTC day. ` +
    "AI sparks meter Veer chat; content sparks unlock notes separately."
  );
}
