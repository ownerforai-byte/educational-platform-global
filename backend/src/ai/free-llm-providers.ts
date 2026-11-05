/**
 * Free-tier LLM providers — extra fallback capacity for the ordered AI chain.
 *
 * Source directory: github.com/open-free-llm-api/awesome-free-llm-apis.
 * Every provider listed there exposes an **OpenAI-compatible**
 * `/v1/chat/completions` endpoint, so one transport (OpenAICompatProvider in
 * service.ts) drives all of them: only the base URL, key and model id change.
 *
 * Contract (same as config.ts):
 *   · keys come from the git-ignored env files through the central resolver —
 *     values are NEVER logged, only presence is reported;
 *   · a provider with no key simply does not register, so a missing signup
 *     turns that link off instead of throwing at request time;
 *   · LLM7.io works WITHOUT a key (its free "turbo" tier), so a deployment
 *     with no LLM key at all still has one real LLM link before the internal
 *     keyword engine. Set FREE_LLM_DISABLED=1 to keep the pool out entirely.
 *
 * The whole list is appended to the chain AFTER every provider named in
 * AI_CHAIN_ORDER and BEFORE `internal`, so the owner's primary policy is
 * untouched: a free link only answers when the paid/primary links fail.
 */

import { getFreeLlmKey, isFreeLlmDisabled } from "./config";

export const FREE_LLM_NAMES = [
  "llm7",
  "ovh",
  "openrouter",
  "mistral",
  "nvidia",
  "deepseek",
  "sambanova",
  "modelscope",
  "siliconflow",
  "huggingface",
] as const;

export type FreeLlmProviderName = (typeof FREE_LLM_NAMES)[number];

export interface FreeLlmProviderSpec {
  /** Chain id — also the token used in AI_CHAIN_ORDER. */
  name: FreeLlmProviderName;
  /** Human label used in logs. */
  label: string;
  /** API root; `/chat/completions` is appended. */
  baseUrl: string;
  /** Env var that overrides baseUrl. */
  baseUrlEnv: string;
  /** Accepted key env vars, checked in order (first non-blank wins). */
  envVars: readonly string[];
  /** Env var that overrides the model id. */
  modelEnv: string;
  /** Model used when nothing is configured (from the directory's best-free list). */
  defaultModel: string;
  /** Env var that overrides this provider's request timeout. */
  timeoutEnv: string;
  /** Signup link, kept for operators reading the env example. */
  docsUrl: string;
  /** True when the provider serves a usable free tier without any key. */
  keyless?: boolean;
}

export const FREE_LLM_PROVIDERS: readonly FreeLlmProviderSpec[] = [
  {
    name: "llm7",
    label: "LLM7.io",
    baseUrl: "https://api.llm7.io/v1",
    baseUrlEnv: "LLM7_API_URL",
    envVars: ["LLM7_API_KEY"],
    modelEnv: "LLM7_MODEL",
    defaultModel: "gpt-oss:20b",
    timeoutEnv: "LLM7_TIMEOUT_MS",
    docsUrl: "https://token.llm7.io",
    keyless: true,
  },
  {
    name: "ovh",
    label: "OVHcloud AI Endpoints",
    baseUrl: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1",
    baseUrlEnv: "OVH_AI_API_URL",
    envVars: ["OVH_AI_API_KEY", "OVHCLOUD_API_KEY"],
    modelEnv: "OVH_MODEL",
    // Anonymous access is allowed but throttled (≈2 RPM); an OVH API key
    // lifts the limit. Verified live: anonymous completion on this model.
    defaultModel: "meta-llama-3_3-70b-instruct",
    timeoutEnv: "OVH_TIMEOUT_MS",
    docsUrl: "https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/",
    keyless: true,
  },
  {
    name: "openrouter",
    label: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    baseUrlEnv: "OPENROUTER_API_URL",
    envVars: ["OPENROUTER_API_KEY"],
    modelEnv: "OPENROUTER_MODEL",
    defaultModel: "nvidia/nemotron-3-ultra-550b-a55b:free",
    timeoutEnv: "OPENROUTER_TIMEOUT_MS",
    docsUrl: "https://openrouter.ai/keys",
  },
  {
    name: "mistral",
    label: "Mistral AI",
    baseUrl: "https://api.mistral.ai/v1",
    baseUrlEnv: "MISTRAL_API_URL",
    envVars: ["MISTRAL_API_KEY"],
    modelEnv: "MISTRAL_MODEL",
    defaultModel: "mistral-medium-3-5-128b",
    timeoutEnv: "MISTRAL_TIMEOUT_MS",
    docsUrl: "https://console.mistral.ai/api-keys",
  },
  {
    name: "nvidia",
    label: "NVIDIA NIM",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    baseUrlEnv: "NVIDIA_API_URL",
    envVars: ["NVIDIA_API_KEY", "NIM_API_KEY"],
    modelEnv: "NVIDIA_MODEL",
    defaultModel: "z-ai/glm-5.2",
    timeoutEnv: "NVIDIA_TIMEOUT_MS",
    docsUrl: "https://build.nvidia.com/settings/api-keys",
  },
  {
    name: "deepseek",
    label: "DeepSeek",
    baseUrl: "https://api.deepseek.com/v1",
    baseUrlEnv: "DEEPSEEK_API_URL",
    envVars: ["DEEPSEEK_API_KEY"],
    modelEnv: "DEEPSEEK_MODEL",
    defaultModel: "deepseek-chat",
    timeoutEnv: "DEEPSEEK_TIMEOUT_MS",
    docsUrl: "https://platform.deepseek.com/api_keys",
  },
  {
    name: "sambanova",
    label: "SambaNova",
    baseUrl: "https://api.sambanova.ai/v1",
    baseUrlEnv: "SAMBANOVA_API_URL",
    envVars: ["SAMBANOVA_API_KEY"],
    modelEnv: "SAMBANOVA_MODEL",
    defaultModel: "Meta-Llama-3.3-70B-Instruct",
    timeoutEnv: "SAMBANOVA_TIMEOUT_MS",
    docsUrl: "https://cloud.sambanova.ai/apis",
  },
  {
    name: "modelscope",
    label: "ModelScope",
    baseUrl: "https://api-inference.modelscope.cn/v1",
    baseUrlEnv: "MODELSCOPE_API_URL",
    envVars: ["MODELSCOPE_API_KEY"],
    modelEnv: "MODELSCOPE_MODEL",
    defaultModel: "Qwen/Qwen3.5-35B-A3B",
    timeoutEnv: "MODELSCOPE_TIMEOUT_MS",
    docsUrl: "https://modelscope.cn/my/myaccesstoken",
  },
  {
    name: "siliconflow",
    label: "SiliconFlow",
    baseUrl: "https://api.siliconflow.cn/v1",
    baseUrlEnv: "SILICONFLOW_API_URL",
    envVars: ["SILICONFLOW_API_KEY"],
    modelEnv: "SILICONFLOW_MODEL",
    defaultModel: "Qwen/Qwen3-8B",
    timeoutEnv: "SILICONFLOW_TIMEOUT_MS",
    docsUrl: "https://cloud.siliconflow.cn/account/ak",
  },
  {
    name: "huggingface",
    label: "Hugging Face Router",
    baseUrl: "https://router.huggingface.co/v1",
    baseUrlEnv: "HF_API_URL",
    envVars: ["HF_TOKEN", "HUGGINGFACE_API_KEY", "HF_API_KEY"],
    modelEnv: "HF_MODEL",
    // The HF router may need a provider suffix (e.g. `:novita`) — override
    // HF_MODEL when the default id is not routed for the account.
    defaultModel: "Qwen/Qwen3-8B",
    timeoutEnv: "HF_TIMEOUT_MS",
    docsUrl: "https://huggingface.co/settings/tokens",
  },
];

/** A spec plus the key that backed it ("" for a keyless provider). */
export interface ResolvedFreeLlmProvider {
  spec: FreeLlmProviderSpec;
  apiKey: string;
}

/**
 * Providers that are actually usable right now, in registry order. A keyed
 * provider needs one of its env vars; a keyless one (LLM7) is always usable
 * unless the owner turned the pool off.
 */
export function configuredFreeLlmProviders(): ResolvedFreeLlmProvider[] {
  if (isFreeLlmDisabled()) return [];
  const resolved: ResolvedFreeLlmProvider[] = [];
  for (const spec of FREE_LLM_PROVIDERS) {
    const apiKey = getFreeLlmKey(spec.envVars);
    if (!apiKey && !spec.keyless) continue;
    resolved.push({ spec, apiKey: apiKey ?? "" });
  }
  return resolved;
}

/** `baseUrl` with `/chat/completions` appended (trailing slashes tolerated). */
export function chatCompletionsUrl(spec: FreeLlmProviderSpec): string {
  const base = (process.env[spec.baseUrlEnv] || spec.baseUrl).trim().replace(/\/+$/, "");
  return `${base}/chat/completions`;
}

/**
 * Boolean-only presence report, safe to log: which free links are live.
 * Never returns key material.
 */
export function describeFreeLlmPresence(): { live: FreeLlmProviderName[]; keyless: FreeLlmProviderName[] } {
  const live = configuredFreeLlmProviders().map((p) => p.spec.name);
  return {
    live,
    keyless: FREE_LLM_PROVIDERS.filter((spec) => spec.keyless && live.includes(spec.name)).map(
      (spec) => spec.name,
    ),
  };
}
