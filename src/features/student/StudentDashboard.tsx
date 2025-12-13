import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { MoodType, MoodEntry, Student, Achievement } from '../../types/student';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { MoodCheckIn } from '../../components/MoodCheckIn';
import { MoodHistory } from '../../components/MoodHistory';
import { XPDisplay } from '../../components/XPDisplay';
import { XPFloatingText } from '../../components/XPFloatingText';
import { LevelUpModal } from '../../components/LevelUpModal';
import { StreakIndicator } from '../../components/StreakIndicator';
import { AchievementBadge } from '../../components/AchievementBadge';
import { AchievementUnlockModal } from '../../components/AchievementUnlockModal';
import { calculateLevel, calculateXPReward, willLevelUp } from '../../utils/xp';
import {
  calculateStreak,
  calculateFreezeTokens,
  hasCheckedInToday,
  getCurrentDateSG,
} from '../../utils/streak';
import { ACHIEVEMENT_DEFINITIONS, checkNewAchievements } from '../../data/achievements';

// Demo student data
const DEMO_STUDENT: Student = {
  id: 'student-1',
  name: 'Wei Ling',
  class: '2A',
  moodHistory: [
    {
      id: 'mood-1',
      mood: 'good',
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      note: 'Feeling energized today!',
    },
    {
      id: 'mood-2',
      mood: 'great',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      note: 'Aced my math test!',
    },
    {
      id: 'mood-3',
      mood: 'okay',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'mood-4',
      mood: 'good',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'mood-5',
      mood: 'good',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      note: 'Had fun at recess with friends',
    },
    {
      id: 'mood-6',
      mood: 'great',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ],
  streakCount: 6,
  totalXP: 175,
  level: 2,
  achievements: [],
  riskScore: {
    score: 0.15,
    level: 'green',
    lastUpdated: new Date(),
  },
};

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('student');

  // Student state
  const [student, setStudent] = useState<Student>(DEMO_STUDENT);
  const [showCheckIn, setShowCheckIn] = useState(false);
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

  // Check if already checked in today
  const alreadyCheckedIn =
    student.moodHistory.length > 0 &&
    hasCheckedInToday(student.moodHistory[student.moodHistory.length - 1].date);

  // Calculate freeze tokens
  const freezeTokens = calculateFreezeTokens(student.streakCount);

  // Handle mood check-in
  const handleMoodCheckIn = (mood: MoodType, note?: string) => {
    // Calculate XP reward
    const hasStreak = student.streakCount > 0;
    const xpReward = calculateXPReward('mood-check-in', hasStreak);

    // Check if will level up
    const willLevel = willLevelUp(student.totalXP, xpReward);
    const newLevel = calculateLevel(student.totalXP + xpReward);

    // Calculate new streak
    const lastCheckIn =
      student.moodHistory.length > 0
        ? student.moodHistory[student.moodHistory.length - 1].date
        : new Date(0);
    const newStreak = calculateStreak(student.streakCount, lastCheckIn, alreadyCheckedIn);

    // Create new mood entry
    const newMoodEntry: MoodEntry = {
      id: `mood-${Date.now()}`,
      mood,
      date: getCurrentDateSG(),
      note,
    };

    // Update student state
    const updatedStudent: Student = {
      ...student,
      moodHistory: [...student.moodHistory, newMoodEntry],
      totalXP: student.totalXP + xpReward,
      level: newLevel,
      streakCount: newStreak,
    };

    // Check for new achievements
    const stats = {
      totalXP: updatedStudent.totalXP,
      streakCount: updatedStudent.streakCount,
      checkInCount: updatedStudent.moodHistory.length,
    };
    const newAchievements = checkNewAchievements(student.achievements, stats);

    if (newAchievements.length > 0) {
      updatedStudent.achievements = [...student.achievements, ...newAchievements];
      updatedStudent.totalXP += newAchievements.reduce((sum, ach) => sum + (ach.xpReward || 0), 0);
    }

    setStudent(updatedStudent);

    // Show XP animation
    setXpAnimation({ amount: xpReward, show: true });
    setTimeout(() => setXpAnimation({ amount: 0, show: false }), 2000);

    // Show level-up modal if leveled up
    if (willLevel) {
      setTimeout(() => {
        setLevelUpModal({ show: true, level: newLevel });
      }, 500);
    }

    // Show achievement unlock modal for first new achievement
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

    // Close check-in form
    setShowCheckIn(false);
  };

  // Load student data from localStorage on mount
  useEffect(() => {
    const savedStudent = localStorage.getItem('demo-student');
    if (savedStudent) {
      const parsed = JSON.parse(savedStudent);
      // Parse date strings back to Date objects
      parsed.moodHistory = parsed.moodHistory.map((m: MoodEntry) => ({
        ...m,
        date: new Date(m.date),
      }));
      parsed.riskScore.lastUpdated = new Date(parsed.riskScore.lastUpdated);
      setStudent(parsed);
    }
  }, []);

  // Save student data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('demo-student', JSON.stringify(student));
  }, [student]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">{t('appName', { ns: 'common' })}</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" onClick={() => navigate('/')}>
              {t('common.switchRole', { ns: 'common' })}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {t('greeting', { name: student.name })}
          </h2>
          <p className="text-gray-600 text-lg">{t('common.welcome', { ns: 'common' })}</p>
        </div>

        {/* Gamification Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* XP & Level */}
          <Card className="relative overflow-hidden">
            <XPDisplay totalXP={student.totalXP} size="lg" />
            {xpAnimation.show && <XPFloatingText amount={xpAnimation.amount} />}
          </Card>

          {/* Streak */}
          <Card className="flex items-center justify-center">
            <StreakIndicator
              streakCount={student.streakCount}
              freezeTokens={freezeTokens}
              size="md"
            />
          </Card>

          {/* Achievements */}
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Achievements Unlocked</p>
              <p className="text-4xl font-bold text-secondary-600">
                {student.achievements.length}
                <span className="text-2xl text-gray-500">/{ACHIEVEMENT_DEFINITIONS.length}</span>
              </p>
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                {student.achievements.slice(-3).map(ach => {
                  const def = ACHIEVEMENT_DEFINITIONS.find(d => d.id === ach.id);
                  if (!def) return null;
                  return (
                    <span key={ach.id} className="text-2xl" title={def.name}>
                      {def.icon}
                    </span>
                  );
                })}
                {student.achievements.length > 3 && (
                  <span className="text-gray-400 text-sm self-center">
                    +{student.achievements.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Mood Check-in Section */}
        <div className="mb-8">
          {!showCheckIn && !alreadyCheckedIn && (
            <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready for your daily check-in?</h3>
                  <p className="opacity-90">Take 2 minutes to track how you're feeling</p>
                </div>
                <Button
                  variant="ghost"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                  onClick={() => setShowCheckIn(true)}
                >
                  Start Check-in +10 XP
                </Button>
              </div>
            </Card>
          )}

          {showCheckIn && (
            <Card>
              <MoodCheckIn onMoodSelected={handleMoodCheckIn} />
            </Card>
          )}

          {alreadyCheckedIn && !showCheckIn && (
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">✓</span>
                  <div>
                    <h3 className="text-xl font-bold text-green-800">You've checked in today!</h3>
                    <p className="text-green-700">
                      Your {student.streakCount}-day streak is going strong! 🔥
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Mood History */}
        {student.moodHistory.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Your Mood Journey</h3>
            <Card>
              <MoodHistory moodHistory={student.moodHistory} daysToShow={7} />
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <Card className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Explore Buddi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="secondary"
              className="w-full py-4 text-lg"
              onClick={() => navigate('/student/exercises')}
            >
              💪 CBT Exercises <span className="text-sm ml-2">+20 XP</span>
            </Button>
            <Button
              variant="secondary"
              className="w-full py-4 text-lg"
              onClick={() => navigate('/student/mindfulness')}
            >
              🧘 Mindfulness Sessions <span className="text-sm ml-2">+50 XP</span>
            </Button>
            <Button variant="ghost" className="w-full py-4 text-lg">
              🏆 View All Achievements
            </Button>
            <Button variant="ghost" className="w-full py-4 text-lg">
              💬 Chat with Buddi AI
            </Button>
          </div>
        </Card>

        {/* Achievement Gallery Preview */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Recent Achievements</h3>
            <Button variant="ghost" className="text-sm">
              View All →
            </Button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {ACHIEVEMENT_DEFINITIONS.slice(0, 6).map(achDef => {
              const unlocked = student.achievements.find(a => a.id === achDef.id);
              return (
                <AchievementBadge
                  key={achDef.id}
                  achievement={unlocked ? { ...achDef, ...unlocked } : achDef}
                  size="md"
                  showName={false}
                  locked={!unlocked}
                />
              );
            })}
          </div>
        </Card>
      </main>

      {/* Level-Up Modal */}
      <LevelUpModal
        isOpen={levelUpModal.show}
        level={levelUpModal.level}
        onClose={() => setLevelUpModal({ show: false, level: 0 })}
      />

      {/* Achievement Unlock Modal */}
      {achievementModal.achievement && (
        <AchievementUnlockModal
          achievement={achievementModal.achievement}
          isOpen={achievementModal.show}
          onClose={() => setAchievementModal({ show: false, achievement: null })}
        />
      )}
    </div>
  );
};
