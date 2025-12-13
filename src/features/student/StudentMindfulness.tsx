import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MindfulnessSession } from '../../data/mindfulness';
import { MindfulnessLibrary, type CompletedSession } from '../../components/MindfulnessLibrary';
import { MindfulnessPlayer } from '../../components/MindfulnessPlayer';
import { XPFloatingText } from '../../components/XPFloatingText';
import { LevelUpModal } from '../../components/LevelUpModal';
import { AchievementUnlockModal } from '../../components/AchievementUnlockModal';
import { calculateLevel, willLevelUp } from '../../utils/xp';
import { ACHIEVEMENT_DEFINITIONS, checkNewAchievements } from '../../data/achievements';
import type { Student, Achievement } from '../../types/student';

export const StudentMindfulness = () => {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState<MindfulnessSession | null>(null);
  const [completedSessions, setCompletedSessions] = useState<CompletedSession[]>([]);
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

    const savedSessions = localStorage.getItem('completed-mindfulness');
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions);
      setCompletedSessions(
        parsed.map((cs: any) => ({ ...cs, completedAt: new Date(cs.completedAt) }))
      );
    }
  }, []);

  // Handle session completion
  const handleSessionComplete = () => {
    if (!selectedSession || !student) return;

    const xpReward = selectedSession.xpReward;

    // Check if will level up
    const willLevel = willLevelUp(student.totalXP, xpReward);
    const newLevel = calculateLevel(student.totalXP + xpReward);

    // Calculate mindfulness stats
    const mindfulnessCount = completedSessions.length + 1;

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
      exerciseCount: 0,
      mindfulnessCount: mindfulnessCount,
      completedMindfulnessTypes: Array.from(
        new Set([
          ...completedSessions.map(
            cs => cs.sessionId.split('-')[0] // Get category from ID
          ),
          selectedSession.category,
        ])
      ),
    };

    const newAchievements = checkNewAchievements(student.achievements, stats);

    if (newAchievements.length > 0) {
      updatedStudent.achievements = [...student.achievements, ...newAchievements];
      updatedStudent.totalXP += newAchievements.reduce((sum, ach) => sum + (ach.xpReward || 0), 0);
    }

    // Save completed session
    const newCompletion: CompletedSession = {
      sessionId: selectedSession.id,
      completedAt: new Date(),
    };
    const updatedCompletions = [...completedSessions, newCompletion];

    // Update localStorage
    localStorage.setItem('demo-student', JSON.stringify(updatedStudent));
    localStorage.setItem('completed-mindfulness', JSON.stringify(updatedCompletions));

    // Update state
    setStudent(updatedStudent);
    setCompletedSessions(updatedCompletions);
    setSelectedSession(null);

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

  if (selectedSession) {
    return (
      <>
        <MindfulnessPlayer
          session={selectedSession}
          onComplete={handleSessionComplete}
          onCancel={() => setSelectedSession(null)}
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/student')}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Mindfulness</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <MindfulnessLibrary
          completedSessions={completedSessions}
          onSelectSession={setSelectedSession}
        />
      </main>
    </div>
  );
};
