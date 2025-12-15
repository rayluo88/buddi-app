import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { ChatMessage as ChatMessageType } from '../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  // Don't render system messages
  if (isSystem) {
    return null;
  }

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[80%]`}
      >
        {/* Avatar */}
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-sm">
            🤖
          </div>
        )}

        {/* Message Bubble */}
        <div className="flex flex-col">
          <div
            className={`rounded-2xl px-4 py-3 ${
              isUser
                ? 'bg-primary-500 text-white rounded-br-sm'
                : 'bg-gray-100 text-gray-900 rounded-bl-sm'
            }`}
          >
            {message.isStreaming ? (
              <span className="inline-block">
                {message.content}
                <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
              </span>
            ) : (
              <span className="whitespace-pre-wrap break-words">{message.content}</span>
            )}
          </div>

          {/* Timestamp */}
          {!message.isStreaming && (
            <div
              className={`text-xs text-gray-400 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}
            >
              {format(message.timestamp, 'h:mm a')}
            </div>
          )}
        </div>

        {/* User Avatar (optional placeholder) */}
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm">
            👤
          </div>
        )}
      </div>
    </motion.div>
  );
};
