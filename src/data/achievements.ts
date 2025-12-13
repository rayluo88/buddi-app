import type { Achievement } from '../types';

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'check-in' | 'exercise' | 'mindfulness' | 'social' | 'milestone';
  requirement: {
    type:
      | 'streak'
      | 'check-in-count'
      | 'exercise-count'
      | 'mindfulness-count'
      | 'xp-total'
      | 'special';
    value: number;
  };
  xpReward: number;
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  // First Steps
  {
    id: 'first-check-in',
    name: 'First Steps',
    description: 'Complete your first mood check-in',
    icon: '🎯',
    category: 'check-in',
    requirement: { type: 'check-in-count', value: 1 },
    xpReward: 25,
  },

  // Streak Achievements
  {
    id: 'streak-3',
    name: '3-Day Streak',
    description: 'Check in for 3 consecutive days',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 3 },
    xpReward: 30,
  },
  {
    id: 'streak-7',
    name: '7-Day Warrior',
    description: 'Maintain a 7-day check-in streak',
    icon: '⚡',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
    xpReward: 50,
  },
  {
    id: 'streak-14',
    name: '2-Week Champion',
    description: 'Keep your streak alive for 14 days',
    icon: '💪',
    category: 'streak',
    requirement: { type: 'streak', value: 14 },
    xpReward: 100,
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Achieve a 30-day streak',
    icon: '👑',
    category: 'streak',
    requirement: { type: 'streak', value: 30 },
    xpReward: 200,
  },

  // Check-in Milestones
  {
    id: 'check-in-10',
    name: 'Getting Started',
    description: 'Complete 10 mood check-ins',
    icon: '📝',
    category: 'check-in',
    requirement: { type: 'check-in-count', value: 10 },
    xpReward: 50,
  },
  {
    id: 'check-in-50',
    name: 'Dedicated Tracker',
    description: 'Complete 50 mood check-ins',
    icon: '📊',
    category: 'check-in',
    requirement: { type: 'check-in-count', value: 50 },
    xpReward: 150,
  },
  {
    id: 'check-in-100',
    name: 'Century Club',
    description: 'Reach 100 mood check-ins',
    icon: '💯',
    category: 'check-in',
    requirement: { type: 'check-in-count', value: 100 },
    xpReward: 300,
  },

  // Exercise Achievements
  {
    id: 'first-exercise',
    name: 'First Workout',
    description: 'Complete your first CBT exercise',
    icon: '🧠',
    category: 'exercise',
    requirement: { type: 'exercise-count', value: 1 },
    xpReward: 25,
  },
  {
    id: 'thought-master',
    name: 'Thought Master',
    description: 'Complete 5 Thought Flipper exercises',
    icon: '💭',
    category: 'exercise',
    requirement: { type: 'special', value: 5 },
    xpReward: 50,
  },
  {
    id: 'exercise-variety',
    name: 'Variety Seeker',
    description: 'Try all 5 types of CBT exercises',
    icon: '🌈',
    category: 'exercise',
    requirement: { type: 'special', value: 5 },
    xpReward: 75,
  },
  {
    id: 'exercise-devotee',
    name: 'Exercise Devotee',
    description: 'Complete 25 CBT exercises',
    icon: '🎓',
    category: 'exercise',
    requirement: { type: 'exercise-count', value: 25 },
    xpReward: 150,
  },

  // Mindfulness Achievements
  {
    id: 'mindful-explorer',
    name: 'Mindful Explorer',
    description: 'Complete your first mindfulness session',
    icon: '🧘',
    category: 'mindfulness',
    requirement: { type: 'mindfulness-count', value: 1 },
    xpReward: 30,
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    description: 'Complete 10 mindfulness sessions',
    icon: '☮️',
    category: 'mindfulness',
    requirement: { type: 'mindfulness-count', value: 10 },
    xpReward: 100,
  },
  {
    id: 'meditation-guru',
    name: 'Meditation Guru',
    description: 'Complete all 6 mindfulness sessions',
    icon: '🕉️',
    category: 'mindfulness',
    requirement: { type: 'special', value: 6 },
    xpReward: 150,
  },

  // Social Achievements
  {
    id: 'helpful-friend',
    name: 'Helpful Friend',
    description: 'Use the peer support feature',
    icon: '🤝',
    category: 'social',
    requirement: { type: 'special', value: 1 },
    xpReward: 40,
  },

  // XP Milestones
  {
    id: 'xp-100',
    name: 'First 100',
    description: 'Earn 100 total XP',
    icon: '🌟',
    category: 'milestone',
    requirement: { type: 'xp-total', value: 100 },
    xpReward: 25,
  },
  {
    id: 'xp-500',
    name: 'Rising Star',
    description: 'Earn 500 total XP',
    icon: '⭐',
    category: 'milestone',
    requirement: { type: 'xp-total', value: 500 },
    xpReward: 50,
  },
  {
    id: 'xp-1000',
    name: 'Superstar',
    description: 'Earn 1,000 total XP',
    icon: '🌠',
    category: 'milestone',
    requirement: { type: 'xp-total', value: 1000 },
    xpReward: 100,
  },
  {
    id: 'xp-2500',
    name: 'Legend',
    description: 'Earn 2,500 total XP',
    icon: '🏆',
    category: 'milestone',
    requirement: { type: 'xp-total', value: 2500 },
    xpReward: 250,
  },
];

/**
 * Check if achievement requirement is met
 */
export const checkAchievementUnlock = (
  achievement: AchievementDefinition,
  stats: {
    streakCount?: number;
    checkInCount?: number;
    exerciseCount?: number;
    mindfulnessCount?: number;
    totalXP?: number;
    completedExerciseTypes?: string[];
    completedMindfulnessTypes?: string[];
  }
): boolean => {
  const { type, value } = achievement.requirement;

  switch (type) {
    case 'streak':
      return (stats.streakCount || 0) >= value;
    case 'check-in-count':
      return (stats.checkInCount || 0) >= value;
    case 'exercise-count':
      return (stats.exerciseCount || 0) >= value;
    case 'mindfulness-count':
      return (stats.mindfulnessCount || 0) >= value;
    case 'xp-total':
      return (stats.totalXP || 0) >= value;
    case 'special':
      // Handle special achievement cases
      if (achievement.id === 'thought-master') {
        // Count specific exercise type completions
        return (stats.exerciseCount || 0) >= value;
      }
      if (achievement.id === 'exercise-variety') {
        return (stats.completedExerciseTypes || []).length >= value;
      }
      if (achievement.id === 'meditation-guru') {
        return (stats.completedMindfulnessTypes || []).length >= value;
      }
      return false;
    default:
      return false;
  }
};

/**
 * Get newly unlocked achievements
 */
export const getNewlyUnlockedAchievements = (
  currentAchievements: Achievement[],
  stats: Parameters<typeof checkAchievementUnlock>[1]
): AchievementDefinition[] => {
  const unlockedIds = new Set(currentAchievements.map(a => a.id));
  const newlyUnlocked: AchievementDefinition[] = [];

  for (const achievement of ACHIEVEMENT_DEFINITIONS) {
    if (!unlockedIds.has(achievement.id) && checkAchievementUnlock(achievement, stats)) {
      newlyUnlocked.push(achievement);
    }
  }

  return newlyUnlocked;
};

/**
 * Check for newly unlocked achievements and return them as Achievement objects
 */
export const checkNewAchievements = (
  currentAchievements: Achievement[],
  stats: Parameters<typeof checkAchievementUnlock>[1]
): Achievement[] => {
  const newDefinitions = getNewlyUnlockedAchievements(currentAchievements, stats);
  return newDefinitions.map(def => ({
    id: def.id,
    name: def.name,
    description: def.description,
    icon: def.icon,
    unlockedAt: new Date(),
    xpReward: def.xpReward,
  }));
};
