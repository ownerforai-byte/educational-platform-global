import { AIProvider, AIChatMessage, AISearchResponse } from "./types";
import { GeminiProvider } from "./providers/gemini";
import { OpenRouterProvider } from "./providers/openrouter";
import { InternalProvider } from "./providers/internal";

export type SupportedProvider = "gemini" | "openrouter" | "internal";

export class AIService {
  private providers: Map<string, AIProvider> = new Map();
  private defaultProvider: string = "internal";

  constructor() {
    this.providers.set("internal", new InternalProvider());

    const geminiKey = process.env.GEMINI_API_KEY;
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const defaultProvider = (
      process.env.AI_DEFAULT_PROVIDER ?? process.env.AI_PROVIDER
    )?.toLowerCase();

    if (geminiKey) this.providers.set("gemini", new GeminiProvider(geminiKey));
    if (openrouterKey) this.providers.set("openrouter", new OpenRouterProvider(openrouterKey));

    if (defaultProvider && this.providers.has(defaultProvider)) {
      this.defaultProvider = defaultProvider;
    } else if (openrouterKey) {
      this.defaultProvider = "openrouter";
    } else if (geminiKey) {
      this.defaultProvider = "gemini";
    }
  }

  getProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  getDefaultProvider(): string {
    return this.defaultProvider;
  }

  private resolve(providerName: string): AIProvider {
    return (
      this.providers.get(providerName.toLowerCase()) ??
      this.providers.get("internal")!
    );
  }

  async chat(providerName: string, messages: AIChatMessage[]): Promise<string> {
    const provider = this.resolve(providerName);
    if (provider.name === "internal") return provider.chat(messages);
    try {
      return await provider.chat(messages);
    } catch {
      return this.providers.get("internal")!.chat(messages);
    }
  }

  async search(providerName: string, query: string): Promise<AISearchResponse> {
    const provider = this.resolve(providerName);
    if (provider.name === "internal") return provider.search(query);
    try {
      return await provider.search(query);
    } catch {
      return this.providers.get("internal")!.search(query);
    }
  }
}

export function createAIService(): AIService {
  return new AIService();
}