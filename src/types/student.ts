import type { Conversation } from './chat';

export interface Student {
  id: string;
  name: string;
  class: string;
  moodHistory: MoodEntry[];
  streakCount: number;
  totalXP: number;
  level: number;
  achievements: Achievement[];
  riskScore: RiskScore;
  lastActive?: Date;
  conversations?: Conversation[]; // Chat with Buddi AI conversations
}

export interface MoodEntry {
  id: string;
  studentId?: string; // Optional for demo
  date: Date;
  mood: MoodType;
  contextTags?: ContextTag[]; // Optional for demo
  journalEntry?: string;
  note?: string; // Alias for journalEntry, used in demo
  sentiment?: number; // -1 to 1 (negative to positive)
}

export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'struggling';

export type ContextTag = 'school' | 'friends' | 'family' | 'health' | 'other';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number; // 0-100
  target?: number;
  xpReward?: number; // XP awarded when unlocked
}

export interface RiskScore {
  level: RiskLevel;
  score: number; // 0-100
  factors?: string[]; // Optional for demo
  lastUpdated: Date;
}

export type RiskLevel = 'green' | 'yellow' | 'orange' | 'red';

export interface Profile {
  avatar: Avatar;
  username: string;
  customization: ProfileCustomization;
}

export interface Avatar {
  base: string;
  accessories: string[];
  background: string;
}

export interface ProfileCustomization {
  theme: string;
  unlocks: string[];
}
