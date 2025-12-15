import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { ChatTopic } from '../types/chat';
import { Card } from './Card';

interface ChatTopicCardProps {
  topic: ChatTopic;
  onClick: () => void;
}

export const ChatTopicCard = ({ topic, onClick }: ChatTopicCardProps) => {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        className={`cursor-pointer hover:shadow-lg transition-shadow ${topic.color} border-2 border-transparent hover:border-primary-300`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center text-center p-4">
          {/* Icon */}
          <div className="text-5xl mb-3">{topic.icon}</div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isZh ? topic.nameZh : topic.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600">{isZh ? topic.descriptionZh : topic.description}</p>

          {/* Start Chat Button */}
          <div className="mt-4 text-primary-600 text-sm font-medium flex items-center gap-1">
            <span>💬</span>
            <span>{isZh ? '开始对话' : 'Start Chat'}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
