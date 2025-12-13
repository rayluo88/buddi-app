import { LEVEL_PROGRESSION, XP_REWARDS } from '../types';
import type { XPSource } from '../types';

/**
 * Calculate the current level based on total XP
 */
export const calculateLevel = (totalXP: number): number => {
  for (let i = LEVEL_PROGRESSION.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_PROGRESSION[i].xpRequired) {
      return LEVEL_PROGRESSION[i].level;
    }
  }
  return 1;
};

/**
 * Calculate XP needed for next level
 */
export const calculateXPToNextLevel = (totalXP: number): number => {
  const currentLevel = calculateLevel(totalXP);
  const nextLevelIndex = LEVEL_PROGRESSION.findIndex(l => l.level === currentLevel + 1);

  if (nextLevelIndex === -1) {
    // Max level reached
    return 0;
  }

  const nextLevelXP = LEVEL_PROGRESSION[nextLevelIndex].xpRequired;
  return nextLevelXP - totalXP;
};

/**
 * Calculate XP progress percentage within current level
 */
export const calculateLevelProgress = (totalXP: number): number => {
  const currentLevel = calculateLevel(totalXP);
  const currentLevelIndex = LEVEL_PROGRESSION.findIndex(l => l.level === currentLevel);
  const nextLevelIndex = LEVEL_PROGRESSION.findIndex(l => l.level === currentLevel + 1);

  if (nextLevelIndex === -1) {
    // Max level reached
    return 100;
  }

  const currentLevelXP = LEVEL_PROGRESSION[currentLevelIndex].xpRequired;
  const nextLevelXP = LEVEL_PROGRESSION[nextLevelIndex].xpRequired;
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;

  return Math.floor((xpInCurrentLevel / xpNeededForLevel) * 100);
};

/**
 * Calculate XP reward for an action
 */
export const calculateXPReward = (source: XPSource, hasStreak: boolean = false): number => {
  let baseXP = 0;

  switch (source) {
    case 'mood-check-in':
      baseXP = XP_REWARDS.MOOD_CHECK_IN;
      if (hasStreak) {
        baseXP += XP_REWARDS.MOOD_CHECK_IN_STREAK_BONUS;
      }
      break;
    case 'exercise-completion':
      baseXP = XP_REWARDS.EXERCISE_COMPLETION;
      break;
    case 'mindfulness-session':
      baseXP = XP_REWARDS.MINDFULNESS_SESSION;
      break;
    case 'daily-challenge':
      baseXP = XP_REWARDS.DAILY_CHALLENGE;
      break;
    case 'streak-bonus':
      baseXP = XP_REWARDS.MOOD_CHECK_IN_STREAK_BONUS;
      break;
    case 'achievement-unlock':
      baseXP = 50; // Bonus XP for unlocking achievements
      break;
    default:
      baseXP = 0;
  }

  return baseXP;
};

/**
 * Check if adding XP will cause a level up
 */
export const willLevelUp = (currentXP: number, xpToAdd: number): boolean => {
  const currentLevel = calculateLevel(currentXP);
  const newLevel = calculateLevel(currentXP + xpToAdd);
  return newLevel > currentLevel;
};

/**
 * Get all level-ups that will occur when adding XP
 */
export const getLevelUps = (currentXP: number, xpToAdd: number): number[] => {
  const currentLevel = calculateLevel(currentXP);
  const newLevel = calculateLevel(currentXP + xpToAdd);
  const levelUps: number[] = [];

  for (let level = currentLevel + 1; level <= newLevel; level++) {
    levelUps.push(level);
  }

  return levelUps;
};
