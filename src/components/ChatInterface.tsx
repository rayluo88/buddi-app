import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Send } from 'lucide-react';
import type { ChatTopic, ChatMessage as ChatMessageType } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';

interface ChatInterfaceProps {
  topic: ChatTopic;
  messages: ChatMessageType[];
  isLoading: boolean;
  onBack: () => void;
  onSendMessage: (content: string) => void;
  onEndConversation: () => void;
}

export const ChatInterface = ({
  topic,
  messages,
  isLoading,
  onBack,
  onSendMessage,
  onEndConversation,
}: ChatInterfaceProps) => {
  const { t, i18n } = useTranslation('student');
  const isZh = i18n.language === 'zh';
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const userMessageCount = messages.filter(m => m.role === 'user').length;
  const canEndConversation = userMessageCount >= 2;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{topic.icon}</span>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {isZh ? topic.nameZh : topic.name}
              </h1>
              <p className="text-xs text-gray-500">{t('chat.with_buddi')}</p>
            </div>
          </div>
        </div>
        <LanguageSwitcher />
      </motion.header>

      {/* Messages Area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isLoading && <TypingIndicator />}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div
        className="bg-white border-t border-gray-200 px-4 py-3 shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* End Conversation Button (shown after 2+ exchanges) */}
        {canEndConversation && (
          <div className="mb-3">
            <Button
              onClick={onEndConversation}
              variant="outline"
              size="sm"
              className="w-full text-gray-600 hover:text-gray-900"
            >
              {t('chat.end_conversation')}
            </Button>
          </div>
        )}

        {/* Input Box */}
        <div className="flex gap-2 items-end">
          <textarea
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.type_message')}
            disabled={isLoading}
            rows={1}
            className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className="px-4 py-3 h-12 flex items-center justify-center"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {/* Character count / hint */}
        <div className="mt-2 text-xs text-gray-400 text-right">
          {inputValue.length > 0 && `${inputValue.length} / 500`}
        </div>
      </motion.div>
    </div>
  );
};
