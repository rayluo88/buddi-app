import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { Student } from '../../types/student';
import { ACHIEVEMENT_DEFINITIONS, type AchievementDefinition } from '../../data/achievements';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { AchievementBadge } from '../../components/AchievementBadge';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

type CategoryType =
  | 'all'
  | 'streak'
  | 'check-in'
  | 'exercise'
  | 'mindfulness'
  | 'social'
  | 'milestone';
type SortType = 'recent' | 'alphabetical' | 'xp' | 'progress';

export const AchievementsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('student');

  // Load student data from localStorage
  const [student, setStudent] = useState<Student | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [sortBy, setSortBy] = useState<SortType>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementDefinition | null>(
    null
  );

  useEffect(() => {
    const savedStudent = localStorage.getItem('demo-student');
    if (savedStudent) {
      const parsed = JSON.parse(savedStudent);
      parsed.moodHistory = parsed.moodHistory?.map((m: any) => ({
        ...m,
        date: new Date(m.date),
      }));
      if (parsed.riskScore?.lastUpdated) {
        parsed.riskScore.lastUpdated = new Date(parsed.riskScore.lastUpdated);
      }
      setStudent(parsed);
    }
  }, []);

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Calculate statistics
  const totalUnlocked = student.achievements.length;
  const totalXPFromAchievements = student.achievements.reduce(
    (sum, ach) => sum + (ach.xpReward || 0),
    0
  );

  const latestAchievement =
    student.achievements.length > 0 ? student.achievements[student.achievements.length - 1] : null;

  // Filter and sort achievements
  const filteredAchievements = ACHIEVEMENT_DEFINITIONS.filter(def => {
    // Category filter
    if (selectedCategory !== 'all' && def.category !== selectedCategory) {
      return false;
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        def.name.toLowerCase().includes(query) || def.description.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Sort achievements
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    const aUnlocked = student.achievements.find(ach => ach.id === a.id);
    const bUnlocked = student.achievements.find(ach => ach.id === b.id);

    switch (sortBy) {
      case 'recent':
        // Unlocked first, then by unlock date
        if (aUnlocked && !bUnlocked) return -1;
        if (!aUnlocked && bUnlocked) return 1;
        if (aUnlocked && bUnlocked) {
          const aDate = aUnlocked.unlockedAt || new Date(0);
          const bDate = bUnlocked.unlockedAt || new Date(0);
          return bDate.getTime() - aDate.getTime();
        }
        return 0;

      case 'alphabetical':
        return a.name.localeCompare(b.name);

      case 'xp':
        return b.xpReward - a.xpReward;

      case 'progress':
        // Unlocked last, then by progress
        if (aUnlocked && !bUnlocked) return 1;
        if (!aUnlocked && bUnlocked) return -1;
        return 0;

      default:
        return 0;
    }
  });

  // Category counts
  const categoryCounts = {
    all: ACHIEVEMENT_DEFINITIONS.length,
    streak: ACHIEVEMENT_DEFINITIONS.filter(a => a.category === 'streak').length,
    'check-in': ACHIEVEMENT_DEFINITIONS.filter(a => a.category === 'check-in').length,
    exercise: ACHIEVEMENT_DEFINITIONS.filter(a => a.category === 'exercise').length,
    mindfulness: ACHIEVEMENT_DEFINITIONS.filter(a => a.category === 'mindfulness').length,
    social: ACHIEVEMENT_DEFINITIONS.filter(a => a.category === 'social').length,
    milestone: ACHIEVEMENT_DEFINITIONS.filter(a => a.category === 'milestone').length,
  };

  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: '🏆' },
    { id: 'streak', label: 'Streak', icon: '🔥' },
    { id: 'check-in', label: 'Check-in', icon: '📝' },
    { id: 'exercise', label: 'Exercise', icon: '💪' },
    { id: 'mindfulness', label: 'Mindfulness', icon: '🧘' },
    { id: 'social', label: 'Social', icon: '👥' },
    { id: 'milestone', label: 'Milestone', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/student')}>
                ← Back
              </Button>
              <h1 className="text-2xl font-bold text-primary-600">
                {t('achievements.title', { defaultValue: 'Achievements' })}
              </h1>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Unlocked</p>
                <p className="text-4xl font-bold text-secondary-600">
                  {totalUnlocked}
                  <span className="text-2xl text-gray-500">/{ACHIEVEMENT_DEFINITIONS.length}</span>
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total XP Earned</p>
                <p className="text-4xl font-bold text-primary-600">{totalXPFromAchievements}</p>
                <p className="text-xs text-gray-500">from achievements</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Latest Achievement</p>
                {latestAchievement ? (
                  <>
                    <p className="text-lg font-semibold text-gray-800">
                      {ACHIEVEMENT_DEFINITIONS.find(d => d.id === latestAchievement.id)?.icon}{' '}
                      {ACHIEVEMENT_DEFINITIONS.find(d => d.id === latestAchievement.id)?.name}
                    </p>
                    {latestAchievement.unlockedAt && (
                      <p className="text-xs text-gray-500">
                        {new Date(latestAchievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500">None yet</p>
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                <p className="text-4xl font-bold text-success-600">
                  {Math.round((totalUnlocked / ACHIEVEMENT_DEFINITIONS.length) * 100)}%
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters and Sort */}
        <div className="mb-6 space-y-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const isActive = selectedCategory === category.id;
              const count = categoryCounts[category.id];

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category.icon} {category.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortType)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="recent">Sort: Recently Unlocked</option>
              <option value="alphabetical">Sort: Alphabetical</option>
              <option value="xp">Sort: XP Reward</option>
              <option value="progress">Sort: Progress</option>
            </select>
          </div>
        </div>

        {/* Achievement Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
        >
          {sortedAchievements.map((achDef, index) => {
            const unlocked = student.achievements.find(a => a.id === achDef.id);

            return (
              <motion.div
                key={achDef.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => setSelectedAchievement(achDef)}
              >
                <AchievementBadge
                  achievement={unlocked ? { ...achDef, ...unlocked } : achDef}
                  size="lg"
                  showName={true}
                  locked={!unlocked}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* No results */}
        {sortedAchievements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No achievements found</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAchievement(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            {(() => {
              const unlocked = student.achievements.find(a => a.id === selectedAchievement.id);

              return (
                <>
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{selectedAchievement.icon}</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedAchievement.name}
                    </h2>
                    {unlocked ? (
                      <Badge variant="success">Unlocked</Badge>
                    ) : (
                      <Badge variant="info">Locked</Badge>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Description</p>
                      <p className="text-gray-800">{selectedAchievement.description}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Category</p>
                      <p className="text-gray-800 capitalize">{selectedAchievement.category}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">XP Reward</p>
                      <p className="text-gray-800 font-bold text-xl text-primary-600">
                        +{selectedAchievement.xpReward} XP
                      </p>
                    </div>

                    {unlocked && unlocked.unlockedAt && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Unlocked On</p>
                        <p className="text-gray-800">
                          {new Date(unlocked.unlockedAt).toLocaleString()}
                        </p>
                      </div>
                    )}

                    {!unlocked && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">How to Unlock</p>
                        <p className="text-gray-800">
                          {selectedAchievement.requirement.type === 'streak' &&
                            `Maintain a ${selectedAchievement.requirement.value}-day streak`}
                          {selectedAchievement.requirement.type === 'check-in-count' &&
                            `Complete ${selectedAchievement.requirement.value} check-ins`}
                          {selectedAchievement.requirement.type === 'exercise-count' &&
                            `Complete ${selectedAchievement.requirement.value} exercises`}
                          {selectedAchievement.requirement.type === 'mindfulness-count' &&
                            `Complete ${selectedAchievement.requirement.value} mindfulness sessions`}
                          {selectedAchievement.requirement.type === 'xp-total' &&
                            `Reach ${selectedAchievement.requirement.value} total XP`}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => setSelectedAchievement(null)}
                    >
                      Close
                    </Button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      )}
    </div>
  );
};
