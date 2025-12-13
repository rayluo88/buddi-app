// Teacher Dashboard Data - Class 2A Aggregate Statistics
// Privacy-protected: NO individual student data visible to teachers

// Helper function to create dates in the past
const weeksAgo = (weeks: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - weeks * 7);
  return date;
};

export interface WeeklyMoodData {
  weekStarting: Date;
  averageMood: number; // 1.0 (struggling) to 5.0 (great)
  participationRate: number; // 0.0 to 1.0
  participatingStudents: number;
  totalStudents: number;
}

export interface ConcernMention {
  concern: string;
  mentions: number; // Number of anonymous students who mentioned this
  trend: 'up' | 'down' | 'stable'; // Compared to last week
}

export interface ClassAlert {
  id: string;
  type: 'warning' | 'info' | 'positive';
  title: string;
  message: string;
  suggestion?: string;
  dateCreated: Date;
}

export interface ClassAggregateData {
  classId: string;
  className: string;
  totalStudents: number;
  currentWeek: {
    weekStarting: Date;
    averageMood: number;
    participationRate: number;
    participatingStudents: number;
    trendFromLastWeek: 'up' | 'down' | 'stable';
    changeAmount: number;
  };
  historicalTrends: WeeklyMoodData[];
  topConcerns: ConcernMention[];
  alerts: ClassAlert[];
  schoolAverage: {
    averageMood: number;
    participationRate: number;
  };
}

// Class 2A aggregate data (35 students)
export const CLASS_2A_DATA: ClassAggregateData = {
  classId: 'class-2a',
  className: 'Class 2A',
  totalStudents: 35,

  currentWeek: {
    weekStarting: weeksAgo(0),
    averageMood: 3.8,
    participationRate: 0.77, // 27/35 students
    participatingStudents: 27,
    trendFromLastWeek: 'up',
    changeAmount: 0.3, // up from 3.5 last week
  },

  // Last 8 weeks of historical data
  historicalTrends: [
    {
      weekStarting: weeksAgo(7),
      averageMood: 3.9,
      participationRate: 0.74,
      participatingStudents: 26,
      totalStudents: 35,
    },
    {
      weekStarting: weeksAgo(6),
      averageMood: 3.7,
      participationRate: 0.71,
      participatingStudents: 25,
      totalStudents: 35,
    },
    {
      weekStarting: weeksAgo(5),
      averageMood: 3.6,
      participationRate: 0.69,
      participatingStudents: 24,
      totalStudents: 35,
    },
    {
      weekStarting: weeksAgo(4),
      averageMood: 3.4, // Exam period dip
      participationRate: 0.8,
      participatingStudents: 28,
      totalStudents: 35,
    },
    {
      weekStarting: weeksAgo(3),
      averageMood: 3.3, // Lowest point (exams)
      participationRate: 0.83,
      participatingStudents: 29,
      totalStudents: 35,
    },
    {
      weekStarting: weeksAgo(2),
      averageMood: 3.6, // Recovery post-exams
      participationRate: 0.8,
      participatingStudents: 28,
      totalStudents: 35,
    },
    {
      weekStarting: weeksAgo(1),
      averageMood: 3.5,
      participationRate: 0.74,
      participatingStudents: 26,
      totalStudents: 35,
    },
    {
      weekStarting: weeksAgo(0),
      averageMood: 3.8, // Current week - improving
      participationRate: 0.77,
      participatingStudents: 27,
      totalStudents: 35,
    },
  ],

  // Top concerns (aggregate, anonymous)
  // Only shown if ≥5 students mentioned
  topConcerns: [
    {
      concern: 'School workload',
      mentions: 12,
      trend: 'stable',
    },
    {
      concern: 'Exam stress',
      mentions: 8,
      trend: 'down', // Decreased post-exams
    },
    {
      concern: 'Sleep & rest',
      mentions: 7,
      trend: 'stable',
    },
    {
      concern: 'Friendship issues',
      mentions: 5,
      trend: 'up',
    },
  ],

  // Alerts for teacher attention
  alerts: [
    {
      id: 'alert-1',
      type: 'positive',
      title: 'Class mood improving',
      message: 'Class 2A average mood has increased by 0.3 points this week.',
      suggestion: 'Great time to reinforce positive practices!',
      dateCreated: weeksAgo(0),
    },
    {
      id: 'alert-2',
      type: 'info',
      title: 'Friendship mentions increased',
      message: '5 students mentioned friendship concerns this week (up from 3 last week).',
      suggestion: 'Consider group activities or ice-breaker exercises to strengthen bonds.',
      dateCreated: weeksAgo(0),
    },
  ],

  // School-wide average for comparison
  schoolAverage: {
    averageMood: 3.7,
    participationRate: 0.65,
  },
};

// Privacy threshold check
export const PRIVACY_THRESHOLD = 5; // Minimum students needed to show aggregate data

export const canShowData = (count: number): boolean => {
  return count >= PRIVACY_THRESHOLD;
};

// Get mood emoji based on average score
export const getMoodEmoji = (averageMood: number): string => {
  if (averageMood >= 4.5) return '😄';
  if (averageMood >= 3.8) return '🙂';
  if (averageMood >= 3.0) return '😐';
  if (averageMood >= 2.0) return '😟';
  return '😢';
};

// Get trend emoji
export const getTrendEmoji = (trend: 'up' | 'down' | 'stable'): string => {
  if (trend === 'up') return '📈';
  if (trend === 'down') return '📉';
  return '➡️';
};
