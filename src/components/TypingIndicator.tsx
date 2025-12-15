import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const TypingIndicator = () => {
  const { t } = useTranslation('student');

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end gap-2 max-w-[80%]">
        {/* Buddi Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-sm">
          🤖
        </div>

        {/* Typing Bubble */}
        <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
          <span className="text-sm text-gray-600 mr-2">{t('chat.buddi_typing')}</span>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-400"
                animate={{
                  y: ['0%', '-50%', '0%'],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
