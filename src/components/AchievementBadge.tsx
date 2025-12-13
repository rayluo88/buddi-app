import { motion } from 'framer-motion';
import type { Achievement } from '../types';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  locked?: boolean;
}

export const AchievementBadge = ({
  achievement,
  size = 'md',
  showName = true,
  locked = false,
}: AchievementBadgeProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-6xl',
  };

  const isUnlocked = !!achievement.unlockedAt;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`
          ${sizeClasses[size]}
          rounded-full
          flex items-center justify-center
          ${isUnlocked ? 'bg-gradient-to-br from-primary-100 to-secondary-100 shadow-lg' : 'bg-gray-100'}
          ${locked && !isUnlocked ? 'grayscale opacity-50' : ''}
          relative
        `}
        whileHover={isUnlocked ? { scale: 1.1 } : {}}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span className={locked && !isUnlocked ? 'opacity-30' : ''}>
          {isUnlocked ? achievement.icon : '🔒'}
        </span>

        {/* Shine effect for unlocked */}
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)',
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'linear',
            }}
          />
        )}
      </motion.div>

      {/* Achievement Name */}
      {showName && (
        <div className="mt-2 text-center">
          <div className={`text-sm font-medium ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>
            {achievement.name}
          </div>
          {achievement.description && (
            <div className="text-xs text-gray-500 mt-1 max-w-[120px]">
              {achievement.description}
            </div>
          )}
        </div>
      )}

      {/* Progress Bar for partially completed */}
      {achievement.progress !== undefined && !isUnlocked && (
        <div className="mt-2 w-full max-w-[100px]">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: 0 }}
              animate={{ width: `${achievement.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-gray-500 text-center mt-1">{achievement.progress}%</div>
        </div>
      )}
    </div>
  );
};
