import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface AchievementUnlockModalProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: string;
    xpReward?: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementUnlockModal = ({
  achievement,
  isOpen,
  onClose,
}: AchievementUnlockModalProps) => {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.7 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <motion.div
                className="text-sm font-medium text-primary-600 uppercase tracking-wide mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Achievement Unlocked!
              </motion.div>

              {/* Achievement Icon */}
              <motion.div
                className="text-8xl mb-4"
                initial={{ scale: 0, rotate: -360 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
              >
                {achievement.icon}
              </motion.div>

              {/* Achievement Name */}
              <motion.h2
                className="text-3xl font-bold text-gray-900 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {achievement.name}
              </motion.h2>

              {/* Achievement Description */}
              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {achievement.description}
              </motion.p>

              {/* XP Reward */}
              <motion.div
                className="inline-flex items-center gap-2 bg-secondary-50 px-4 py-2 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                <span className="text-2xl">🌟</span>
                <span className="text-secondary-700 font-bold">+{achievement.xpReward} XP</span>
              </motion.div>

              {/* Close Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button variant="primary" onClick={onClose} className="w-full py-3">
                  Awesome!
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
