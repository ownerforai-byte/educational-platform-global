export interface AIProviderConfig {
  id: string;
  name: string;
  model: string;
  baseUrl: string;
  apiKey?: string;
  enabled: boolean;
  maxTokens?: number;
}

export interface ProviderCompletionRequest {
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ProviderCompletionResponse {
  content: string;
  model: string;
  finishReason?: string;
}

export interface AIProviderAdapter {
  id: string;
  name: string;
  complete(request: ProviderCompletionRequest): Promise<ProviderCompletionResponse>;
}
