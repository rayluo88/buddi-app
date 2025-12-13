import { motion } from 'framer-motion';

interface XPFloatingTextProps {
  xp?: number;
  amount?: number;
  onComplete?: () => void;
}

export const XPFloatingText = ({ xp, amount, onComplete }: XPFloatingTextProps) => {
  const value = xp || amount || 0;
  return (
    <motion.div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 1, 0], y: -100, scale: [0.5, 1.2, 1.2, 1] }}
      transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
      onAnimationComplete={onComplete}
    >
      <div className="text-5xl font-bold text-secondary-500 drop-shadow-lg">+{value} XP</div>
    </motion.div>
  );
};
