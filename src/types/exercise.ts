export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  description: string;
  duration: number; // in minutes
  xpReward: number;
  content: ExerciseContent;
}

export type ExerciseType =
  | 'thought-flipper'
  | 'gratitude'
  | 'worry-box'
  | 'energy-boost'
  | 'self-compassion';

export interface ExerciseContent {
  steps: ExerciseStep[];
  resources?: string[];
}

export interface ExerciseStep {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'input' | 'choice' | 'reflection';
  options?: string[];
}

export interface ExerciseCompletion {
  id: string;
  studentId: string;
  exerciseId: string;
  completedAt: Date;
  responses: Record<string, string>;
  xpEarned: number;
}

export interface MindfulnessSession {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  audioUrl: string;
  thumbnailUrl?: string;
  xpReward: number;
  type: MindfulnessType;
}

export type MindfulnessType =
  | 'calm-morning'
  | 'exam-stress'
  | 'sleep-well'
  | 'quick-reset'
  | 'body-scan'
  | 'gratitude-journey';

export interface MindfulnessCompletion {
  id: string;
  studentId: string;
  sessionId: string;
  completedAt: Date;
  postMood?: string;
  xpEarned: number;
}
