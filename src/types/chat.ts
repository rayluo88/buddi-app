/**
 * Chat-related TypeScript interfaces for Buddi AI conversation feature
 */

/**
 * Individual message in a conversation
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

/**
 * Complete conversation with metadata
 */
export interface Conversation {
  id: string;
  topicId: string;
  messages: ChatMessage[];
  startedAt: Date;
  completedAt?: Date;
  xpAwarded: boolean;
  messageCount: number;
  duration: number; // seconds
}

/**
 * Pre-defined conversation topic
 */
export interface ChatTopic {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  icon: string;
  category: 'stress' | 'friendship' | 'academic' | 'family' | 'self-esteem';
  systemPrompt: string;
  systemPromptZh: string;
  color: string; // Tailwind color class (e.g., 'bg-blue-100')
}

/**
 * DeepSeek API request message format
 */
export interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Chat service configuration
 */
export interface ChatConfig {
  apiKey: string;
  apiUrl: string;
  demoMode: boolean;
  streamEnabled: boolean;
  maxMessages: number;
}
