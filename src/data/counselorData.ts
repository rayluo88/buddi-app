import type { Student, MoodType, RiskLevel } from '../types/student';

// Helper function to create date in the past
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Generate synthetic student data for Class 2A (35 students)
export const DEMO_STUDENTS: Student[] = [
  // RED FLAG - Urgent attention needed
  {
    id: 'student-red-1',
    name: 'Aisha Rahman',
    class: '2A',
    moodHistory: [
      {
        id: 'm1',
        mood: 'struggling' as MoodType,
        date: daysAgo(7),
        note: 'Everything feels overwhelming',
      },
      {
        id: 'm2',
        mood: 'struggling' as MoodType,
        date: daysAgo(6),
        note: 'Cannot sleep, worried about exams',
      },
      { id: 'm3', mood: 'low' as MoodType, date: daysAgo(5), note: 'Tired all the time' },
      {
        id: 'm4',
        mood: 'struggling' as MoodType,
        date: daysAgo(4),
        note: "Don't see the point anymore",
      },
      { id: 'm5', mood: 'low' as MoodType, date: daysAgo(3), note: 'Skipped school today' },
      { id: 'm6', mood: 'struggling' as MoodType, date: daysAgo(2), note: 'Feel like giving up' },
      { id: 'm7', mood: 'struggling' as MoodType, date: daysAgo(1), note: 'Nobody understands' },
    ],
    streakCount: 7,
    totalXP: 120,
    level: 2,
    achievements: [],
    riskScore: {
      level: 'red' as RiskLevel,
      score: 0.87,
      factors: [
        'Declining mood trend (7 days)',
        'Concerning keywords detected',
        'Engagement drop (missed 2 exercises)',
        'Mentioned hopelessness',
      ],
      lastUpdated: daysAgo(1),
    },
  },

  // ORANGE FLAG - Elevated concern
  {
    id: 'student-orange-1',
    name: 'Marcus Lim',
    class: '2A',
    moodHistory: [
      { id: 'm1', mood: 'good' as MoodType, date: daysAgo(10) },
      { id: 'm2', mood: 'okay' as MoodType, date: daysAgo(9), note: 'Math test was hard' },
      {
        id: 'm3',
        mood: 'low' as MoodType,
        date: daysAgo(8),
        note: 'Parents disappointed in my grades',
      },
      {
        id: 'm4',
        mood: 'low' as MoodType,
        date: daysAgo(6),
        note: 'Feeling stressed about school',
      },
      { id: 'm5', mood: 'okay' as MoodType, date: daysAgo(4) },
      { id: 'm6', mood: 'low' as MoodType, date: daysAgo(2), note: 'Hard to focus lately' },
    ],
    streakCount: 3,
    totalXP: 185,
    level: 2,
    achievements: [],
    riskScore: {
      level: 'orange' as RiskLevel,
      score: 0.65,
      factors: [
        'Mood decline over 10 days',
        'Stress keywords (exams, grades)',
        'Inconsistent engagement',
      ],
      lastUpdated: daysAgo(2),
    },
  },

  {
    id: 'student-orange-2',
    name: 'Priya Kumar',
    class: '2A',
    moodHistory: [
      { id: 'm1', mood: 'great' as MoodType, date: daysAgo(8) },
      { id: 'm2', mood: 'good' as MoodType, date: daysAgo(7) },
      { id: 'm3', mood: 'okay' as MoodType, date: daysAgo(5), note: 'Friendship issues' },
      { id: 'm4', mood: 'low' as MoodType, date: daysAgo(3), note: 'Feeling left out' },
      { id: 'm5', mood: 'low' as MoodType, date: daysAgo(1), note: 'Nobody talks to me anymore' },
    ],
    streakCount: 5,
    totalXP: 210,
    level: 3,
    achievements: [],
    riskScore: {
      level: 'orange' as RiskLevel,
      score: 0.58,
      factors: ['Social isolation keywords', 'Mood decline (5 days)', 'Friendship concerns'],
      lastUpdated: daysAgo(1),
    },
  },

  // YELLOW FLAG - Monitor
  {
    id: 'student-yellow-1',
    name: 'Daniel Tan',
    class: '2A',
    moodHistory: [
      { id: 'm1', mood: 'good' as MoodType, date: daysAgo(6) },
      { id: 'm2', mood: 'okay' as MoodType, date: daysAgo(5), note: 'Tired from staying up late' },
      { id: 'm3', mood: 'okay' as MoodType, date: daysAgo(4) },
      { id: 'm4', mood: 'good' as MoodType, date: daysAgo(2) },
      { id: 'm5', mood: 'okay' as MoodType, date: daysAgo(1), note: 'Sleep schedule is off' },
    ],
    streakCount: 5,
    totalXP: 275,
    level: 3,
    achievements: [],
    riskScore: {
      level: 'yellow' as RiskLevel,
      score: 0.35,
      factors: ['Sleep pattern concerns', 'Mild mood fluctuation'],
      lastUpdated: daysAgo(1),
    },
  },

  {
    id: 'student-yellow-2',
    name: 'Sofia Chen',
    class: '2A',
    moodHistory: [
      { id: 'm1', mood: 'great' as MoodType, date: daysAgo(7) },
      { id: 'm2', mood: 'good' as MoodType, date: daysAgo(6) },
      { id: 'm3', mood: 'okay' as MoodType, date: daysAgo(4), note: 'Nervous about presentation' },
      { id: 'm4', mood: 'good' as MoodType, date: daysAgo(2) },
      { id: 'm5', mood: 'great' as MoodType, date: daysAgo(1) },
    ],
    streakCount: 7,
    totalXP: 340,
    level: 4,
    achievements: [],
    riskScore: {
      level: 'yellow' as RiskLevel,
      score: 0.28,
      factors: ['Temporary anxiety (presentation)', 'Overall positive trend'],
      lastUpdated: daysAgo(1),
    },
  },

  // GREEN - Doing well
  {
    id: 'student-1',
    name: 'Wei Ling',
    class: '2A',
    moodHistory: [
      {
        id: 'mood-1',
        mood: 'good' as MoodType,
        date: daysAgo(6),
        note: 'Feeling energized today!',
      },
      { id: 'mood-2', mood: 'great' as MoodType, date: daysAgo(5), note: 'Aced my math test!' },
      { id: 'mood-3', mood: 'okay' as MoodType, date: daysAgo(4) },
      { id: 'mood-4', mood: 'good' as MoodType, date: daysAgo(3) },
      {
        id: 'mood-5',
        mood: 'good' as MoodType,
        date: daysAgo(2),
        note: 'Had fun at recess with friends',
      },
      { id: 'mood-6', mood: 'great' as MoodType, date: daysAgo(1) },
    ],
    streakCount: 6,
    totalXP: 360,
    level: 4,
    achievements: [],
    riskScore: {
      level: 'green' as RiskLevel,
      score: 0.12,
      factors: ['Positive mood trend', 'High engagement', 'Strong social connections'],
      lastUpdated: daysAgo(1),
    },
  },

  // More GREEN students (abbreviated for brevity)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `student-green-${i + 1}`,
    name: [
      'Alex Wong',
      'Emma Ng',
      'Ryan Koh',
      'Maya Singh',
      'Ethan Lee',
      'Zoe Tan',
      'Lucas Ong',
      'Chloe Lim',
      'Noah Teo',
      'Lily Chan',
    ][i],
    class: '2A',
    moodHistory: [
      { id: 'm1', mood: 'good' as MoodType, date: daysAgo(3) },
      { id: 'm2', mood: 'great' as MoodType, date: daysAgo(2) },
      { id: 'm3', mood: 'good' as MoodType, date: daysAgo(1) },
    ],
    streakCount: 3 + i,
    totalXP: 150 + i * 20,
    level: 2 + Math.floor(i / 3),
    achievements: [],
    riskScore: {
      level: 'green' as RiskLevel,
      score: 0.1 + i * 0.01,
      factors: ['Positive engagement', 'Stable mood'],
      lastUpdated: daysAgo(1),
    },
  })),

  // More YELLOW students
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `student-yellow-${i + 3}`,
    name: [
      'Benjamin Yeo',
      'Olivia Goh',
      'Isaac Tan',
      'Ava Lim',
      'Nathan Ho',
      'Grace Lee',
      'Caleb Ng',
      'Mia Tay',
    ][i],
    class: '2A',
    moodHistory: [
      { id: 'm1', mood: 'okay' as MoodType, date: daysAgo(3) },
      { id: 'm2', mood: 'good' as MoodType, date: daysAgo(2) },
      { id: 'm3', mood: 'okay' as MoodType, date: daysAgo(1) },
    ],
    streakCount: 2 + i,
    totalXP: 120 + i * 15,
    level: 2,
    achievements: [],
    riskScore: {
      level: 'yellow' as RiskLevel,
      score: 0.3 + i * 0.02,
      factors: ['Moderate engagement', 'Minor concerns'],
      lastUpdated: daysAgo(1),
    },
  })),

  // More ORANGE students
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `student-orange-${i + 3}`,
    name: ['Joshua Sim', 'Sophia Tan', 'Samuel Low', 'Hannah Koh', 'David Chen'][i],
    class: '2A',
    moodHistory: [
      { id: 'm1', mood: 'okay' as MoodType, date: daysAgo(4) },
      { id: 'm2', mood: 'low' as MoodType, date: daysAgo(3), note: 'Stressed' },
      { id: 'm3', mood: 'okay' as MoodType, date: daysAgo(1) },
    ],
    streakCount: 3,
    totalXP: 100 + i * 10,
    level: 2,
    achievements: [],
    riskScore: {
      level: 'orange' as RiskLevel,
      score: 0.55 + i * 0.02,
      factors: ['Elevated stress', 'Mood concerns'],
      lastUpdated: daysAgo(1),
    },
  })),
];

// AI-generated case summaries for flagged students
export interface CaseSummary {
  studentId: string;
  summary: string;
  concerns: string[];
  conversationStarters: string[];
  lastUpdated: Date;
}

export const CASE_SUMMARIES: Record<string, CaseSummary> = {
  'student-red-1': {
    studentId: 'student-red-1',
    summary:
      'Aisha has shown a concerning pattern over the past week with consistently low mood scores and language indicating hopelessness. Her notes mention feeling overwhelmed, unable to sleep, and expressing thoughts like "don\'t see the point" and "feel like giving up." She has maintained check-in consistency (7-day streak) but missed recent exercise activities, suggesting declining engagement.',
    concerns: [
      'Expressions of hopelessness and giving up',
      'Sleep disturbance mentioned multiple times',
      'Social isolation ("nobody understands")',
      'Academic stress (exam anxiety)',
      'Declining engagement with coping exercises',
    ],
    conversationStarters: [
      '"I noticed you\'ve been checking in every day this week—that takes courage. How are you really doing?"',
      '"You mentioned feeling overwhelmed. Can we talk about what\'s weighing on you right now?"',
      '"I saw you\'re worried about exams. What support would help you feel more prepared?"',
      '"It sounds like sleep has been difficult. Let\'s explore what might help you rest better."',
    ],
    lastUpdated: daysAgo(1),
  },
  'student-orange-1': {
    studentId: 'student-orange-1',
    summary:
      'Marcus has experienced a gradual mood decline over 10 days, with recurring mentions of academic stress and parental expectations. His mood has fluctuated between "okay" and "low" with notes about difficulty focusing. Check-in pattern is less consistent (3-day streak), and engagement with mindfulness exercises has dropped.',
    concerns: [
      'Academic pressure and parental expectations',
      'Difficulty concentrating',
      'Inconsistent self-care engagement',
      'Stress about performance',
    ],
    conversationStarters: [
      '"You mentioned your parents were disappointed. How did that conversation go?"',
      '"Math seems to be on your mind. What would make it feel more manageable?"',
      '"You said it\'s hard to focus—what does that look like for you?"',
    ],
    lastUpdated: daysAgo(2),
  },
  'student-orange-2': {
    studentId: 'student-orange-2',
    summary:
      'Priya\'s mood has declined from "great" to "low" over 8 days, with all recent notes focused on friendship and social issues. She mentions "feeling left out" and "nobody talks to me anymore," indicating potential social isolation. Despite concerns, she maintains a 5-day check-in streak, showing engagement with self-care.',
    concerns: [
      'Social isolation and loneliness',
      'Friendship conflicts or exclusion',
      'Potential peer relationship issues',
    ],
    conversationStarters: [
      '"Friendships can be tough in secondary school. What\'s been happening lately?"',
      '"You mentioned feeling left out. Can you tell me more about that?"',
      '"I\'m glad you\'re still checking in daily. What helps you keep going?"',
    ],
    lastUpdated: daysAgo(1),
  },
};
