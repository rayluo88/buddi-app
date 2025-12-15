/**
 * DeepSeek API Client using OpenAI SDK
 *
 * DeepSeek API is OpenAI-compatible, so we use the official OpenAI SDK
 * with a custom baseURL for better streaming support and type safety.
 */

import OpenAI from 'openai';
import type { DeepSeekMessage } from '../../types/chat';

export class DeepSeekClient {
  private client: OpenAI;

  constructor() {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
    const baseURL = import.meta.env.VITE_DEEPSEEK_API_URL || 'https://api.deepseek.com/v1';

    this.client = new OpenAI({
      apiKey,
      baseURL,
      dangerouslyAllowBrowser: true, // Required for client-side usage in demo
    });
  }

  /**
   * Send a message and get a response from DeepSeek API
   *
   * @param messages - Array of conversation messages
   * @param onChunk - Optional callback for streaming chunks
   * @returns Full response text
   */
  async sendMessage(
    messages: DeepSeekMessage[],
    onChunk?: (text: string) => void
  ): Promise<string> {
    try {
      if (onChunk) {
        // Streaming mode
        const stream = await this.client.chat.completions.create({
          model: 'deepseek-chat',
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 150,
        });

        let fullText = '';
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            fullText += content;
            onChunk(content);
          }
        }
        return fullText;
      } else {
        // Non-streaming mode
        const response = await this.client.chat.completions.create({
          model: 'deepseek-chat',
          messages,
          stream: false,
          temperature: 0.7,
          max_tokens: 150,
        });
        return response.choices[0]?.message?.content || '';
      }
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw error;
    }
  }
}
