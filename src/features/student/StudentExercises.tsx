import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Exercise } from '../../data/exercises';
import { ExerciseLibrary, type CompletedExercise } from '../../components/ExerciseLibrary';
import { ExercisePlayer } from '../../components/ExercisePlayer';
import { XPFloatingText } from '../../components/XPFloatingText';
import { LevelUpModal } from '../../components/LevelUpModal';
import { AchievementUnlockModal } from '../../components/AchievementUnlockModal';
import { calculateLevel, willLevelUp } from '../../utils/xp';
import { ACHIEVEMENT_DEFINITIONS, checkNewAchievements } from '../../data/achievements';
import type { Student, Achievement } from '../../types/student';

export const StudentExercises = () => {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<CompletedExercise[]>([]);
  const [student, setStudent] = useState<Student | null>(null);
  const [xpAnimation, setXpAnimation] = useState<{ amount: number; show: boolean }>({
    amount: 0,
    show: false,
  });
  const [levelUpModal, setLevelUpModal] = useState<{ show: boolean; level: number }>({
    show: false,
    level: 0,
  });
  const [achievementModal, setAchievementModal] = useState<{
    show: boolean;
    achievement: Achievement | null;
  }>({ show: false, achievement: null });

  // Load student data
  useEffect(() => {
    const savedStudent = localStorage.getItem('demo-student');
    if (savedStudent) {
      const parsed = JSON.parse(savedStudent);
      parsed.moodHistory = parsed.moodHistory.map((m: any) => ({
        ...m,
        date: new Date(m.date),
      }));
      parsed.riskScore.lastUpdated = new Date(parsed.riskScore.lastUpdated);
      setStudent(parsed);
    }

    const savedExercises = localStorage.getItem('completed-exercises');
    if (savedExercises) {
      const parsed = JSON.parse(savedExercises);
      setCompletedExercises(
        parsed.map((ce: any) => ({ ...ce, completedAt: new Date(ce.completedAt) }))
      );
    }
  }, []);

  // Handle exercise completion
  const handleExerciseComplete = (responses: string[]) => {
    if (!selectedExercise || !student) return;

    const xpReward = selectedExercise.xpReward;

    // Check if will level up
    const willLevel = willLevelUp(student.totalXP, xpReward);
    const newLevel = calculateLevel(student.totalXP + xpReward);

    // Calculate exercise stats
    const exerciseCount = completedExercises.length + 1;
    const uniqueExercises = new Set([
      ...completedExercises.map(ce => ce.exerciseId),
      selectedExercise.id,
    ]).size;

    // Update student
    const updatedStudent: Student = {
      ...student,
      totalXP: student.totalXP + xpReward,
      level: newLevel,
    };

    // Check for new achievements
    const stats = {
      totalXP: updatedStudent.totalXP,
      streakCount: updatedStudent.streakCount,
      checkInCount: updatedStudent.moodHistory.length,
      exerciseCount: exerciseCount,
      uniqueExercises: uniqueExercises,
      mindfulnessCount: 0,
    };

    const newAchievements = checkNewAchievements(student.achievements, stats);

    if (newAchievements.length > 0) {
      updatedStudent.achievements = [...student.achievements, ...newAchievements];
      updatedStudent.totalXP += newAchievements.reduce((sum, ach) => sum + (ach.xpReward || 0), 0);
    }

    // Save completed exercise
    const newCompletion: CompletedExercise = {
      exerciseId: selectedExercise.id,
      completedAt: new Date(),
      responses,
    };
    const updatedCompletions = [...completedExercises, newCompletion];

    // Update localStorage
    localStorage.setItem('demo-student', JSON.stringify(updatedStudent));
    localStorage.setItem('completed-exercises', JSON.stringify(updatedCompletions));

    // Update state
    setStudent(updatedStudent);
    setCompletedExercises(updatedCompletions);
    setSelectedExercise(null);

    // Show XP animation
    setXpAnimation({ amount: xpReward, show: true });
    setTimeout(() => setXpAnimation({ amount: 0, show: false }), 2000);

    // Show level-up modal
    if (willLevel) {
      setTimeout(() => {
        setLevelUpModal({ show: true, level: newLevel });
      }, 500);
    }

    // Show achievement modal
    if (newAchievements.length > 0) {
      setTimeout(
        () => {
          const achievementDef = ACHIEVEMENT_DEFINITIONS.find(a => a.id === newAchievements[0].id);
          if (achievementDef) {
            setAchievementModal({
              show: true,
              achievement: { ...achievementDef, ...newAchievements[0] },
            });
          }
        },
        willLevel ? 3000 : 1000
      );
    }
  };

  if (selectedExercise) {
    return (
      <>
        <ExercisePlayer
          exercise={selectedExercise}
          onComplete={handleExerciseComplete}
          onCancel={() => setSelectedExercise(null)}
        />
        {/* XP Animation */}
        {xpAnimation.show && (
          <div className="fixed top-20 right-8 z-50">
            <XPFloatingText amount={xpAnimation.amount} />
          </div>
        )}
        {/* Modals */}
        <LevelUpModal
          isOpen={levelUpModal.show}
          level={levelUpModal.level}
          onClose={() => setLevelUpModal({ show: false, level: 0 })}
        />
        {achievementModal.achievement && (
          <AchievementUnlockModal
            achievement={achievementModal.achievement}
            isOpen={achievementModal.show}
            onClose={() => setAchievementModal({ show: false, achievement: null })}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/student')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Exercises</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ExerciseLibrary
          completedExercises={completedExercises}
          onSelectExercise={setSelectedExercise}
        />
      </main>
    </div>
  );
};
