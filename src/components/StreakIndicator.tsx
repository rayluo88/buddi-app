import { motion } from 'framer-motion';
import { formatStreakText, getStreakMilestone } from '../utils/streak';
import { Badge } from './Badge';

interface StreakIndicatorProps {
  streakCount: number;
  freezeTokens: number;
  size?: 'sm' | 'md' | 'lg';
  showTokens?: boolean;
}

export const StreakIndicator = ({
  streakCount,
  freezeTokens,
  size = 'md',
  showTokens = true,
}: StreakIndicatorProps) => {
  const milestone = getStreakMilestone(streakCount);

  const flameSize = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className="flex flex-col items-center">
      {/* Streak Flame */}
      <motion.div
        className="relative"
        animate={{
          scale: streakCount > 0 ? [1, 1.1, 1] : 1,
        }}
        transition={{
          repeat: streakCount > 0 ? Infinity : 0,
          duration: 2,
        }}
      >
        <span className={flameSize[size]}>{streakCount > 0 ? '🔥' : '⭕'}</span>
      </motion.div>

      {/* Streak Count */}
      <div className={`font-bold text-primary-600 mt-2 ${textSize[size]}`}>
        {streakCount === 0 ? (
          <span className="text-gray-500">No streak</span>
        ) : (
          <span>{formatStreakText(streakCount)}</span>
        )}
      </div>

      {/* Milestone Badge */}
      {milestone && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-2"
        >
          <Badge variant="success" className="text-xs">
            {milestone}
          </Badge>
        </motion.div>
      )}

      {/* Freeze Tokens */}
      {showTokens && freezeTokens > 0 && (
        <div className="mt-3 flex items-center gap-2 bg-primary-50 px-3 py-1 rounded-full">
          <span className="text-sm">❄️</span>
          <span className="text-xs font-medium text-primary-700">
            {freezeTokens} {freezeTokens === 1 ? 'Freeze Token' : 'Freeze Tokens'}
          </span>
        </div>
      )}

      {/* Earn Token Progress */}
      {showTokens && streakCount > 0 && streakCount % 7 !== 0 && (
        <div className="mt-2 text-xs text-gray-500">{7 - (streakCount % 7)} days to next token</div>
      )}
    </div>
  );
};
