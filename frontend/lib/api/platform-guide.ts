import { apiFetch } from "../api-client";

export function postPlatformGuideMessage(message: string): Promise<{ reply: string }> {
  return apiFetch<{ reply: string; provider?: string }>("/api/ai/platform-guide", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}
