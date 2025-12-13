// Student & Mood types
export type {
  Student,
  MoodEntry,
  MoodType,
  ContextTag,
  Achievement,
  RiskScore,
  RiskLevel,
  Profile,
  Avatar,
  ProfileCustomization,
} from './student';

// Exercise types
export type {
  Exercise,
  ExerciseType,
  ExerciseContent,
  ExerciseStep,
  ExerciseCompletion,
  MindfulnessSession,
  MindfulnessType,
  MindfulnessCompletion,
} from './exercise';

// Gamification types
export type {
  XPSystem,
  StreakSystem,
  XPReward,
  XPSource,
  LevelConfig,
  Reward,
} from './gamification';

export { LEVEL_PROGRESSION, XP_REWARDS } from './gamification';

// Role types
export type { UserRole, DemoPersona, StudentData, CounselorData, TeacherData } from './role';

export { DEMO_PERSONAS } from './role';
