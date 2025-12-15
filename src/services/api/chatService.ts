/**
 * Unified Chat Service
 *
 * Provides a single interface for chat functionality with hybrid approach:
 * - Demo mode: Uses mock responses for reliable demos
 * - Production mode: Uses real DeepSeek API with fallback to mocks on error
 */

import { DeepSeekClient } from './deepseek';
import { getMockResponse } from './mockResponses';
import type { ChatMessage, DeepSeekMessage } from '../../types/chat';

export class ChatService {
  private client: DeepSeekClient;
  private demoMode: boolean;
  private streamEnabled: boolean;

  constructor() {
    this.client = new DeepSeekClient();
    this.demoMode = import.meta.env.VITE_CHAT_DEMO_MODE === 'true';
    this.streamEnabled = import.meta.env.VITE_CHAT_STREAM_ENABLED !== 'false';
  }

  /**
   * Send a message and get AI response
   *
   * @param messages - Conversation history
   * @param topicId - Current topic ID (for mock responses)
   * @param systemPrompt - System prompt for AI context
   * @param onChunk - Optional streaming callback
   * @returns Full AI response text
   */
  async sendMessage(
    messages: ChatMessage[],
    topicId: string,
    systemPrompt: string,
    onChunk?: (text: string) => void
  ): Promise<string> {
    // Demo mode: Use mock responses only
    if (this.demoMode) {
      return this.getMockResponseWithStreaming(topicId, messages.length, onChunk);
    }

    // Production mode: Try real API, fallback to mock
    try {
      const deepseekMessages: DeepSeekMessage[] = [
        { role: 'system', content: systemPrompt },
        ...messages.map(msg => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content,
        })),
      ];

      const useStreaming = this.streamEnabled && onChunk !== undefined;
      return await this.client.sendMessage(deepseekMessages, useStreaming ? onChunk : undefined);
    } catch (error) {
      console.warn('DeepSeek API failed, falling back to mock response:', error);
      return this.getMockResponseWithStreaming(topicId, messages.length, onChunk);
    }
  }

  /**
   * Get mock response with optional streaming simulation
   */
  private async getMockResponseWithStreaming(
    topicId: string,
    messageIndex: number,
    onChunk?: (text: string) => void
  ): Promise<string> {
    const mockResponse = getMockResponse(topicId, messageIndex);

    // Simulate streaming if callback provided
    if (onChunk && this.streamEnabled) {
      for (let i = 0; i < mockResponse.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30)); // 30ms per character
        onChunk(mockResponse[i]);
      }
    }

    return mockResponse;
  }

  /**
   * Check if service is in demo mode
   */
  isDemoMode(): boolean {
    return this.demoMode;
  }

  /**
   * Check if streaming is enabled
   */
  isStreamingEnabled(): boolean {
    return this.streamEnabled;
  }
}

// Export singleton instance
export const chatService = new ChatService();
