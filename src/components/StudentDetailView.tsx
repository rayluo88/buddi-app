import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { Student } from '../types/student';
import type { CaseSummary } from '../data/counselorData';
import { Card } from './Card';
import { Button } from './Button';
import { RiskScoreBadge } from './RiskScoreBadge';

interface StudentDetailViewProps {
  student: Student;
  caseSummary?: CaseSummary;
  onClose: () => void;
}

const MOOD_EMOJI: Record<string, string> = {
  great: '😄',
  good: '🙂',
  okay: '😐',
  low: '😟',
  struggling: '😢',
};

const MOOD_COLOR: Record<string, string> = {
  great: 'bg-green-500',
  good: 'bg-blue-500',
  okay: 'bg-yellow-500',
  low: 'bg-orange-500',
  struggling: 'bg-red-500',
};

export const StudentDetailView = ({ student, caseSummary, onClose }: StudentDetailViewProps) => {
  const sortedMoodHistory = [...student.moodHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto my-8"
        >
          <Card className="bg-white">
            {/* Header */}
            <div className="border-b pb-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{student.name}</h2>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>Class {student.class}</span>
                    <span>•</span>
                    <span>Student ID: {student.id}</span>
                  </div>
                </div>
                <Button variant="ghost" onClick={onClose}>
                  ✕ Close
                </Button>
              </div>

              {/* Risk Score & Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                  <RiskScoreBadge
                    level={student.riskScore.level}
                    score={student.riskScore.score}
                    size="lg"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Engagement</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {student.streakCount} day{student.streakCount !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-gray-500">Check-in streak</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Progress</p>
                  <p className="text-2xl font-bold text-secondary-600">Level {student.level}</p>
                  <p className="text-xs text-gray-500">{student.totalXP} total XP</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Check-ins</p>
                  <p className="text-2xl font-bold text-gray-800">{student.moodHistory.length}</p>
                  <p className="text-xs text-gray-500">Total recorded</p>
                </div>
              </div>
            </div>

            {/* AI Case Summary */}
            {caseSummary && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🤖</span> AI-Generated Case Summary
                </h3>
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <p className="text-gray-800 leading-relaxed mb-4">{caseSummary.summary}</p>

                  {/* Concerns */}
                  <div className="mb-4">
                    <p className="font-semibold text-gray-700 mb-2">Key Concerns:</p>
                    <ul className="space-y-1">
                      {caseSummary.concerns.map((concern, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-orange-500 mt-0.5">⚠</span>
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Conversation Starters */}
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Conversation Starters:</p>
                    <div className="space-y-2">
                      {caseSummary.conversationStarters.map((starter, i) => (
                        <div
                          key={i}
                          className="text-sm bg-white bg-opacity-60 rounded-lg p-3 border border-blue-200"
                        >
                          <p className="text-gray-700 italic">{starter}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                    Last updated: {format(caseSummary.lastUpdated, 'MMM d, yyyy h:mm a')}
                  </p>
                </Card>
              </div>
            )}

            {/* Explainable AI Flags */}
            {student.riskScore.factors && student.riskScore.factors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🔍</span> Why This Student Was Flagged
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {student.riskScore.factors.map((factor, i) => (
                    <Card
                      key={i}
                      className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">
                          {i === 0 ? '🚨' : i === 1 ? '📊' : i === 2 ? '📉' : '💬'}
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">{factor}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Mood Timeline */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>📊</span> Mood Timeline
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {sortedMoodHistory.map((entry, index) => {
                  const date = new Date(entry.date);
                  const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          {/* Mood Indicator */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${MOOD_COLOR[entry.mood]}`}
                            >
                              {MOOD_EMOJI[entry.mood]}
                            </div>
                            <div
                              className={`w-1 h-8 ${index < sortedMoodHistory.length - 1 ? 'bg-gray-200' : 'bg-transparent'} mt-2`}
                            ></div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-baseline justify-between mb-1">
                              <p className="font-semibold text-gray-800 capitalize">{entry.mood}</p>
                              <p className="text-xs text-gray-500">
                                {daysAgo === 0
                                  ? 'Today'
                                  : daysAgo === 1
                                    ? 'Yesterday'
                                    : `${daysAgo} days ago`}
                                {' • '}
                                {format(date, 'MMM d, h:mm a')}
                              </p>
                            </div>
                            {entry.note && (
                              <p className="text-sm text-gray-700 bg-gray-50 rounded p-2 italic">
                                &quot;{entry.note}&quot;
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-6">
              <div className="flex gap-3">
                <Button variant="primary" className="flex-1">
                  📝 Add Case Note
                </Button>
                <Button variant="secondary" className="flex-1">
                  📅 Schedule Follow-up
                </Button>
                <Button variant="ghost" className="flex-1">
                  📧 Contact Parents
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
