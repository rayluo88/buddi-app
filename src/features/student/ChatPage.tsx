import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CHAT_TOPICS, getTopicById } from '../../data/chatTopics';
import { ChatTopicCard } from '../../components/ChatTopicCard';
import { ChatInterface } from '../../components/ChatInterface';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { chatService } from '../../services/api/chatService';
import type { Student } from '../../types/student';
import type { ChatTopic, ChatMessage, Conversation } from '../../types/chat';

type ViewMode = 'topics' | 'chat';

export const ChatPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('student');
  const isZh = i18n.language === 'zh';

  const [student, setStudent] = useState<Student | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('topics');
  const [currentTopic, setCurrentTopic] = useState<ChatTopic | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationStartTime, setConversationStartTime] = useState<Date | null>(null);

  // Load student data on mount
  useEffect(() => {
    const studentData = localStorage.getItem('currentStudent');
    if (studentData) {
      const parsedStudent = JSON.parse(studentData) as Student;
      // Initialize conversations array if not exists
      if (!parsedStudent.conversations) {
        parsedStudent.conversations = [];
      }
      setStudent(parsedStudent);
    }
  }, []);

  // Start a new conversation with selected topic
  const handleTopicSelect = (topic: ChatTopic) => {
    setCurrentTopic(topic);
    setViewMode('chat');
    setConversationStartTime(new Date());

    // Initialize with system prompt
    const systemPrompt = isZh ? topic.systemPromptZh : topic.systemPrompt;
    const systemMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'system',
      content: systemPrompt,
      timestamp: new Date(),
    };

    // Add welcome message from Buddi
    const welcomeMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: isZh
        ? `你好！我是Buddi。让我们聊聊${topic.nameZh}。你想从哪里开始？`
        : `Hi! I'm Buddi. Let's talk about ${topic.name}. What would you like to share?`,
      timestamp: new Date(),
    };

    setMessages([systemMessage, welcomeMessage]);
  };

  // Send user message and get AI response
  const handleSendMessage = async (content: string) => {
    if (!currentTopic || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare assistant message (for streaming)
      const assistantMessageId = crypto.randomUUID();
      let assistantContent = '';

      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      // Add placeholder for streaming
      setMessages(prev => [...prev, assistantMessage]);

      // Get system prompt
      const systemPrompt = isZh ? currentTopic.systemPromptZh : currentTopic.systemPrompt;

      // Send to chat service
      const response = await chatService.sendMessage(
        [...messages, userMessage],
        currentTopic.id,
        systemPrompt,
        (chunk: string) => {
          // Update streaming message
          assistantContent += chunk;
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: assistantContent, isStreaming: true }
                : msg
            )
          );
        }
      );

      // Finalize message (stop streaming)
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId ? { ...msg, content: response, isStreaming: false } : msg
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: isZh
          ? '抱歉，我现在无法回应。请稍后再试。'
          : "Sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // End conversation and award XP
  const handleEndConversation = () => {
    if (!student || !currentTopic || !conversationStartTime) return;

    const conversationEndTime = new Date();
    const duration = Math.floor(
      (conversationEndTime.getTime() - conversationStartTime.getTime()) / 1000
    );
    const userMessages = messages.filter(m => m.role === 'user');

    // Check if conversation qualifies for XP
    const qualifiesForXP = shouldAwardXP(userMessages, duration);

    // Create conversation record
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      topicId: currentTopic.id,
      messages: messages.filter(m => m.role !== 'system'), // Exclude system prompt
      startedAt: conversationStartTime,
      completedAt: conversationEndTime,
      xpAwarded: qualifiesForXP,
      messageCount: userMessages.length,
      duration,
    };

    // Save conversation and award XP
    const updatedStudent = { ...student };
    if (!updatedStudent.conversations) {
      updatedStudent.conversations = [];
    }
    updatedStudent.conversations.push(conversation);

    if (qualifiesForXP) {
      updatedStudent.totalXP += 30; // +30 XP for meaningful conversation
    }

    // Save to localStorage
    localStorage.setItem('currentStudent', JSON.stringify(updatedStudent));
    setStudent(updatedStudent);

    // Return to topic selection
    setViewMode('topics');
    setCurrentTopic(null);
    setMessages([]);
    setConversationStartTime(null);

    // TODO: Check for achievement unlocks (will be implemented with achievements)
    // TODO: Show XP celebration modal (will be implemented with gamification integration)
  };

  // Go back to topic selection
  const handleBackToTopics = () => {
    setViewMode('topics');
    setCurrentTopic(null);
    setMessages([]);
    setConversationStartTime(null);
  };

  // Helper: Check if conversation qualifies for XP
  const shouldAwardXP = (userMessages: ChatMessage[], duration: number): boolean => {
    // Minimum 2 user messages (4 total exchanges)
    if (userMessages.length < 2) return false;

    // Minimum 2 minutes duration (120 seconds)
    if (duration < 120) return false;

    // All user messages substantive (>10 characters)
    if (!userMessages.every(m => m.content.length >= 10)) return false;

    return true;
  };

  // Render topic selection view
  const renderTopicSelection = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/student')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t('chat.title')}</h1>
            <p className="text-sm text-gray-500">{t('chat.choose_topic')}</p>
          </div>
        </div>
        <LanguageSwitcher />
      </motion.header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Description */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-600">{t('chat.description')}</p>
        </motion.div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {CHAT_TOPICS.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ChatTopicCard topic={topic} onClick={() => handleTopicSelect(topic)} />
            </motion.div>
          ))}
        </div>

        {/* Recent Conversations (if any) */}
        {student?.conversations && student.conversations.length > 0 && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {t('chat.recent_conversations')}
            </h2>
            <div className="space-y-2">
              {student.conversations
                .slice(-3)
                .reverse()
                .map(conv => {
                  const topic = getTopicById(conv.topicId);
                  return (
                    <div
                      key={conv.id}
                      className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{topic?.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            {isZh ? topic?.nameZh : topic?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {conv.messageCount} {t('chat.messages')} •{' '}
                            {Math.floor(conv.duration / 60)} min
                          </div>
                        </div>
                      </div>
                      {conv.xpAwarded && (
                        <div className="text-primary-600 font-semibold">+30 XP</div>
                      )}
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  // Render chat interface view
  const renderChatInterface = () => {
    if (!currentTopic) return null;

    return (
      <ChatInterface
        topic={currentTopic}
        messages={messages}
        isLoading={isLoading}
        onBack={handleBackToTopics}
        onSendMessage={handleSendMessage}
        onEndConversation={handleEndConversation}
      />
    );
  };

  return viewMode === 'topics' ? renderTopicSelection() : renderChatInterface();
};
