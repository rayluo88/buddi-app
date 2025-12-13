import { startOfDay, differenceInDays, isToday, isYesterday, parseISO, formatISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// Singapore timezone
const TIMEZONE = 'Asia/Singapore';

/**
 * Get current date in Singapore timezone
 */
export const getCurrentDateSG = (): Date => {
  return toZonedTime(new Date(), TIMEZONE);
};

/**
 * Get start of day in Singapore timezone
 */
export const getStartOfDaySG = (date: Date): Date => {
  const sgDate = toZonedTime(date, TIMEZONE);
  return startOfDay(sgDate);
};

/**
 * Check if user checked in today
 */
export const hasCheckedInToday = (lastCheckIn: Date | string): boolean => {
  const lastDate = typeof lastCheckIn === 'string' ? parseISO(lastCheckIn) : lastCheckIn;
  const lastDateSG = toZonedTime(lastDate, TIMEZONE);
  const todaySG = getCurrentDateSG();

  return (
    isToday(lastDateSG) || formatISO(startOfDay(lastDateSG)) === formatISO(startOfDay(todaySG))
  );
};

/**
 * Check if streak should continue (checked in yesterday)
 */
export const shouldContinueStreak = (lastCheckIn: Date | string): boolean => {
  const lastDate = typeof lastCheckIn === 'string' ? parseISO(lastCheckIn) : lastCheckIn;
  const lastDateSG = toZonedTime(lastDate, TIMEZONE);
  const todaySG = getCurrentDateSG();

  return (
    isYesterday(lastDateSG) ||
    formatISO(startOfDay(lastDateSG)) ===
      formatISO(startOfDay(new Date(todaySG.getTime() - 24 * 60 * 60 * 1000)))
  );
};

/**
 * Calculate new streak count
 */
export const calculateStreak = (
  currentStreak: number,
  lastCheckIn: Date | string,
  hasCheckedInToday: boolean
): number => {
  if (hasCheckedInToday) {
    // Already checked in today, streak unchanged
    return currentStreak;
  }

  if (shouldContinueStreak(lastCheckIn)) {
    // Checked in yesterday, increment streak
    return currentStreak + 1;
  }

  // Streak broken, reset to 1 (for today's check-in)
  return 1;
};

/**
 * Check if streak is broken (missed a day)
 */
export const isStreakBroken = (lastCheckIn: Date | string): boolean => {
  const lastDate = typeof lastCheckIn === 'string' ? parseISO(lastCheckIn) : lastCheckIn;
  const lastDateSG = getStartOfDaySG(lastDate);
  const todaySG = getStartOfDaySG(getCurrentDateSG());

  const daysDiff = differenceInDays(todaySG, lastDateSG);

  // Streak broken if more than 1 day has passed
  return daysDiff > 1;
};

/**
 * Calculate freeze tokens earned
 * Earn 1 freeze token for every 7-day streak
 */
export const calculateFreezeTokens = (streakCount: number): number => {
  return Math.floor(streakCount / 7);
};

/**
 * Use freeze token to preserve streak
 */
export const useFreezeToken = (
  currentTokens: number,
  _currentStreak: number,
  lastCheckIn: Date | string
): { tokensRemaining: number; streakPreserved: boolean } => {
  if (currentTokens === 0) {
    return { tokensRemaining: 0, streakPreserved: false };
  }

  if (!isStreakBroken(lastCheckIn)) {
    // Streak not broken, no need to use token
    return { tokensRemaining: currentTokens, streakPreserved: false };
  }

  // Use one token to preserve streak
  return { tokensRemaining: currentTokens - 1, streakPreserved: true };
};

/**
 * Get streak milestone message
 */
export const getStreakMilestone = (streakCount: number): string | null => {
  const milestones: Record<number, string> = {
    3: "3-Day Streak! You're building a habit! 🔥",
    7: '7-Day Warrior! One week strong! 🌟',
    14: '2-Week Champion! Incredible consistency! 💪',
    30: "30-Day Legend! You're unstoppable! 🏆",
    60: '60-Day Master! Extraordinary dedication! 👑',
    100: "100-Day Hero! You're an inspiration! 🎯",
  };

  return milestones[streakCount] || null;
};

/**
 * Format streak display text
 */
export const formatStreakText = (streakCount: number): string => {
  if (streakCount === 0) return 'Start your streak today!';
  if (streakCount === 1) return '1 day';
  return `${streakCount} days`;
};
