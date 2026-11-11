export type ChatRole = 'system' | 'user' | 'assistant' | 'tool';

export interface ChatMessage {
  id?: string;
  role: ChatRole;
  content: string;
  timestamp?: number;
  metadata?: Record<string, unknown>;
}

export interface AIProviderMeta {
  id: string;
  name: string;
  type: 'primary' | 'fallback';
  model: string;
  enabled: boolean;
}

export interface AICompletionOptions {
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  subject?: string;
  classLevel?: string;
  unitSlug?: string;
}
