export type UserRole = 'student' | 'counselor' | 'teacher';

export interface DemoPersona {
  id: string;
  role: UserRole;
  name: string;
  avatar?: string;
  description: string;
  data?: StudentData | CounselorData | TeacherData;
}

export interface StudentData {
  studentId: string;
  class: string;
  streakCount: number;
  level: number;
  xp: number;
}

export interface CounselorData {
  counselorId: string;
  totalStudents: number;
  flaggedStudents: number;
}

export interface TeacherData {
  teacherId: string;
  class: string;
  totalStudents: number;
}

// Demo personas
export const DEMO_PERSONAS: DemoPersona[] = [
  {
    id: 'wei-ling',
    role: 'student',
    name: 'Wei Ling',
    description: 'Student, 14, Secondary 2',
    data: {
      studentId: 'wei-ling',
      class: '2A',
      streakCount: 5,
      level: 3,
      xp: 275,
    },
  },
  {
    id: 'ms-priya',
    role: 'counselor',
    name: 'Ms. Priya',
    description: 'School Counselor',
    data: {
      counselorId: 'ms-priya',
      totalStudents: 1200,
      flaggedStudents: 3,
    },
  },
  {
    id: 'mr-tan',
    role: 'teacher',
    name: 'Mr. Tan',
    description: 'Form Teacher, Class 2A',
    data: {
      teacherId: 'mr-tan',
      class: '2A',
      totalStudents: 35,
    },
  },
];
