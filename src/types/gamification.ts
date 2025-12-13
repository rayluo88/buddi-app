export interface XPSystem {
  currentXP: number;
  currentLevel: number;
  xpToNextLevel: number;
  totalXPEarned: number;
}

export interface StreakSystem {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: Date;
  freezeTokens: number;
}

export interface XPReward {
  amount: number;
  source: XPSource;
  bonusMultiplier?: number;
  description: string;
}

export type XPSource =
  | 'mood-check-in'
  | 'exercise-completion'
  | 'mindfulness-session'
  | 'daily-challenge'
  | 'streak-bonus'
  | 'achievement-unlock';

export interface LevelConfig {
  level: number;
  xpRequired: number;
  rewards: Reward[];
}

export interface Reward {
  type: 'avatar-item' | 'theme' | 'freeze-token' | 'badge';
  id: string;
  name: string;
  description: string;
}

export const LEVEL_PROGRESSION: LevelConfig[] = [
  { level: 1, xpRequired: 0, rewards: [] },
  { level: 2, xpRequired: 100, rewards: [] },
  { level: 3, xpRequired: 250, rewards: [] },
  { level: 4, xpRequired: 500, rewards: [] },
  { level: 5, xpRequired: 1000, rewards: [] },
  { level: 6, xpRequired: 1750, rewards: [] },
  { level: 7, xpRequired: 2750, rewards: [] },
  { level: 8, xpRequired: 4000, rewards: [] },
  { level: 9, xpRequired: 5750, rewards: [] },
  { level: 10, xpRequired: 8000, rewards: [] },
];

export const XP_REWARDS = {
  MOOD_CHECK_IN: 10,
  MOOD_CHECK_IN_STREAK_BONUS: 5,
  EXERCISE_COMPLETION: 20,
  MINDFULNESS_SESSION: 50,
  DAILY_CHALLENGE: 30,
};
