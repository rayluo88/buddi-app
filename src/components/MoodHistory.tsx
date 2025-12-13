import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import type { MoodEntry, MoodType } from '../types/student';

interface MoodHistoryProps {
  moodHistory: MoodEntry[];
  daysToShow?: number;
  showChart?: boolean;
}

const MOOD_CONFIG: Record<
  MoodType,
  { emoji: string; label: string; color: string; value: number }
> = {
  great: { emoji: '😄', label: 'Great', color: 'bg-green-500', value: 5 },
  good: { emoji: '🙂', label: 'Good', color: 'bg-blue-500', value: 4 },
  okay: { emoji: '😐', label: 'Okay', color: 'bg-yellow-500', value: 3 },
  low: { emoji: '😟', label: 'Low', color: 'bg-orange-500', value: 2 },
  struggling: { emoji: '😢', label: 'Struggling', color: 'bg-red-500', value: 1 },
};

export const MoodHistory = ({
  moodHistory,
  daysToShow = 7,
  showChart = true,
}: MoodHistoryProps) => {
  // Get last N days of mood data
  const recentMoods = moodHistory.slice(-daysToShow).reverse();

  // Calculate mood statistics
  const moodCounts = moodHistory.reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    },
    {} as Record<MoodType, number>
  );

  const totalEntries = moodHistory.length;
  const averageMood =
    moodHistory.length > 0
      ? moodHistory.reduce((sum, entry) => sum + MOOD_CONFIG[entry.mood].value, 0) /
        moodHistory.length
      : 0;

  // Get mood label from average
  const getAverageMoodLabel = (avg: number): string => {
    if (avg >= 4.5) return 'Great';
    if (avg >= 3.5) return 'Good';
    if (avg >= 2.5) return 'Okay';
    if (avg >= 1.5) return 'Low';
    return 'Struggling';
  };

  if (moodHistory.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <span className="text-6xl mb-4 block">📊</span>
        <p className="text-gray-600">No mood history yet</p>
        <p className="text-sm text-gray-500 mt-2">Start tracking your mood to see trends!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Summary */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-primary-700 font-medium">Total Check-ins</p>
          <p className="text-3xl font-bold text-primary-900 mt-1">{totalEntries}</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm text-secondary-700 font-medium">Average Mood</p>
          <p className="text-3xl font-bold text-secondary-900 mt-1">
            {getAverageMoodLabel(averageMood)}
          </p>
        </motion.div>
      </div>

      {/* Mood Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Mood Distribution</h3>
        <div className="space-y-3">
          {(Object.entries(MOOD_CONFIG) as [MoodType, (typeof MOOD_CONFIG)[MoodType]][]).map(
            ([mood, config], index) => {
              const count = moodCounts[mood] || 0;
              const percentage = totalEntries > 0 ? (count / totalEntries) * 100 : 0;

              return (
                <motion.div
                  key={mood}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{config.emoji}</span>
                      <span className="text-sm font-medium text-gray-700">{config.label}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`${config.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>

      {/* Recent Mood Timeline */}
      {showChart && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Last {daysToShow} Days</h3>
          <div className="space-y-3">
            {recentMoods.map((entry, index) => {
              const config = MOOD_CONFIG[entry.mood];
              const date = typeof entry.date === 'string' ? parseISO(entry.date) : entry.date;

              return (
                <motion.div
                  key={entry.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Date */}
                  <div className="w-20 text-sm text-gray-600">
                    {format(date, 'MMM dd')}
                    <div className="text-xs text-gray-400">{format(date, 'EEE')}</div>
                  </div>

                  {/* Mood */}
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-3xl">{config.emoji}</span>
                    <div>
                      <p className="font-medium text-gray-800">{config.label}</p>
                      {entry.note && (
                        <p className="text-sm text-gray-600 line-clamp-1 mt-1">{entry.note}</p>
                      )}
                    </div>
                  </div>

                  {/* Mood indicator bar */}
                  <div className="w-24">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${config.color} h-2 rounded-full`}
                        style={{ width: `${(config.value / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
