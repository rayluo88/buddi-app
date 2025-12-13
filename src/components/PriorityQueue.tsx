import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Student, RiskLevel } from '../types/student';
import { Card } from './Card';
import { RiskScoreBadge } from './RiskScoreBadge';

interface PriorityQueueProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export const PriorityQueue = ({ students, onSelectStudent }: PriorityQueueProps) => {
  const [filterRisk, setFilterRisk] = useState<RiskLevel | 'all'>('all');

  // Sort students by risk score (highest first)
  const sortedStudents = [...students].sort((a, b) => b.riskScore.score - a.riskScore.score);

  // Filter by risk level
  const filteredStudents =
    filterRisk === 'all'
      ? sortedStudents
      : sortedStudents.filter(s => s.riskScore.level === filterRisk);

  // Count by risk level
  const riskCounts = {
    red: students.filter(s => s.riskScore.level === 'red').length,
    orange: students.filter(s => s.riskScore.level === 'orange').length,
    yellow: students.filter(s => s.riskScore.level === 'yellow').length,
    green: students.filter(s => s.riskScore.level === 'green').length,
  };

  const filters: Array<{ value: RiskLevel | 'all'; label: string; count?: number }> = [
    { value: 'all', label: 'All Students', count: students.length },
    { value: 'red', label: 'Red', count: riskCounts.red },
    { value: 'orange', label: 'Orange', count: riskCounts.orange },
    { value: 'yellow', label: 'Yellow', count: riskCounts.yellow },
    { value: 'green', label: 'Green', count: riskCounts.green },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map(filter => {
          const isActive = filterRisk === filter.value;
          return (
            <motion.button
              key={filter.value}
              onClick={() => setFilterRisk(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-500'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter.label}
              {filter.count !== undefined && (
                <span className={`ml-2 ${isActive ? 'opacity-90' : 'text-gray-500'}`}>
                  ({filter.count})
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Priority Queue List */}
      <div className="space-y-3">
        {filteredStudents.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-gray-600">No students in this category</p>
          </Card>
        )}

        {filteredStudents.map((student, index) => {
          const lastMood = student.moodHistory[student.moodHistory.length - 1];
          const daysSinceUpdate = Math.floor(
            (Date.now() - new Date(student.riskScore.lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
                style={{
                  borderLeftColor:
                    student.riskScore.level === 'red'
                      ? '#ef4444'
                      : student.riskScore.level === 'orange'
                        ? '#f97316'
                        : student.riskScore.level === 'yellow'
                          ? '#eab308'
                          : '#22c55e',
                }}
                onClick={() => onSelectStudent(student)}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Student Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                      <RiskScoreBadge
                        level={student.riskScore.level}
                        score={student.riskScore.score}
                        size="sm"
                      />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>Class {student.class}</span>
                      <span>•</span>
                      <span>
                        {student.streakCount} day{student.streakCount !== 1 ? 's' : ''} streak
                      </span>
                      <span>•</span>
                      <span>
                        Level {student.level} ({student.totalXP} XP)
                      </span>
                    </div>

                    {/* Latest Mood */}
                    {lastMood && (
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span className="text-gray-500">Latest mood:</span>
                        <span className="font-medium">
                          {lastMood.mood.charAt(0).toUpperCase() + lastMood.mood.slice(1)}
                        </span>
                        {lastMood.note && (
                          <>
                            <span className="text-gray-400">-</span>
                            <span className="text-gray-600 italic line-clamp-1">
                              &quot;{lastMood.note}&quot;
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Risk Factors */}
                    {student.riskScore.factors && student.riskScore.factors.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {student.riskScore.factors.slice(0, 3).map((factor, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                          >
                            {factor}
                          </span>
                        ))}
                        {student.riskScore.factors.length > 3 && (
                          <span className="text-xs px-2 py-1 text-gray-500">
                            +{student.riskScore.factors.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Last Updated */}
                  <div className="text-right text-xs text-gray-500">
                    <div>Updated</div>
                    <div className="font-medium">
                      {daysSinceUpdate === 0
                        ? 'Today'
                        : daysSinceUpdate === 1
                          ? 'Yesterday'
                          : `${daysSinceUpdate}d ago`}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
