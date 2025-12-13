import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { calculateLevel, calculateXPToNextLevel, calculateLevelProgress } from '../utils/xp';

interface XPDisplayProps {
  totalXP: number;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const XPDisplay = ({ totalXP, showProgress = true, size = 'md' }: XPDisplayProps) => {
  const { t } = useTranslation();
  const currentLevel = calculateLevel(totalXP);
  const xpToNext = calculateXPToNextLevel(totalXP);
  const progress = calculateLevelProgress(totalXP);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const progressHeightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`${sizeClasses[size]}`}>
      {/* Level and XP Info */}
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-secondary-600">
            {t('student.xp.level', { level: currentLevel })}
          </span>
          <span className="text-gray-600 text-sm">{totalXP.toLocaleString()} XP</span>
        </div>
        {xpToNext > 0 && (
          <span className="text-xs text-gray-500">
            {t('student.xp.next_level', { xp: xpToNext })}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && xpToNext > 0 && (
        <div
          className={`w-full bg-gray-200 rounded-full overflow-hidden ${progressHeightClasses[size]}`}
        >
          <motion.div
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Max Level Indicator */}
      {xpToNext === 0 && (
        <div className="text-xs text-success-600 font-medium">🏆 Max Level Reached!</div>
      )}
    </div>
  );
};
