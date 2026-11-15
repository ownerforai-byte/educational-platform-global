import {
  getAgnesKey,
  getCerebrasKey,
  getCloudflareAiKey,
  getGeminiKey,
  getGroqKey,
  type SupportedProviderName,
} from "./config";
import { configuredFreeLlmProviders } from "./providers/free-llm-pool";

const PRIMARY_POOL: ReadonlyArray<{
  name: SupportedProviderName;
  hasKey: () => string | undefined;
}> = [
  { name: "agnes", hasKey: getAgnesKey },
  { name: "groq", hasKey: getGroqKey },
  { name: "cerebras", hasKey: getCerebrasKey },
  { name: "gemini", hasKey: getGeminiKey },
  { name: "cloudflare", hasKey: getCloudflareAiKey },
];

/** UTC midnight bucket — rotates which single provider backs community bot replies. */
function utcDayIndex(now = Date.now()): number {
  return Math.floor(now / 86_400_000);
}

/**
 * Providers that currently have credentials (primary keys + configured free LLM pool).
 * Names only — never expose key material or env var labels to callers.
 */
export function configuredCommunityBotProviderPool(): string[] {
  const names: string[] = [];
  for (const entry of PRIMARY_POOL) {
    if (entry.hasKey()) names.push(entry.name);
  }
  for (const { spec } of configuredFreeLlmProviders()) {
    if (!names.includes(spec.name)) names.push(spec.name);
  }
  return names;
}

/**
 * One dedicated provider for all community bot replies for the current UTC day.
 * When `liveProviderNames` is passed, only registered AIService links are eligible
 * (avoids rotating onto env keys that never registered). Returns `""` when the
 * filtered pool is empty — callers should fall back to the normal AIService chain.
 */
export function getCommunityBotDailyProvider(
  now = Date.now(),
  liveProviderNames?: readonly string[],
): string {
  let pool = configuredCommunityBotProviderPool();
  if (liveProviderNames?.length) {
    const live = new Set(liveProviderNames.map((n) => n.toLowerCase()));
    pool = pool.filter((n) => live.has(n.toLowerCase()));
  }
  if (pool.length === 0) return "";
  return pool[utcDayIndex(now) % pool.length] ?? "";
}