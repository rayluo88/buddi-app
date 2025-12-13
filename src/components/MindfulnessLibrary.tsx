import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MindfulnessSession } from '../data/mindfulness';
import { MINDFULNESS_SESSIONS } from '../data/mindfulness';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

interface CompletedSession {
  sessionId: string;
  completedAt: Date;
}

interface MindfulnessLibraryProps {
  completedSessions: CompletedSession[];
  onSelectSession: (session: MindfulnessSession) => void;
}

export const MindfulnessLibrary = ({
  completedSessions,
  onSelectSession,
}: MindfulnessLibraryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Sessions', icon: '🧘' },
    { id: 'breathing', label: 'Breathing', icon: '🌬️' },
    { id: 'body-scan', label: 'Body Scan', icon: '🧘' },
    { id: 'stress-relief', label: 'Stress Relief', icon: '📚' },
    { id: 'loving-kindness', label: 'Loving-Kindness', icon: '💝' },
    { id: 'visualization', label: 'Visualization', icon: '🌈' },
  ];

  const filteredSessions =
    selectedCategory === 'all'
      ? MINDFULNESS_SESSIONS
      : MINDFULNESS_SESSIONS.filter(session => session.category === selectedCategory);

  const getSessionCompletionCount = (sessionId: string): number => {
    return completedSessions.filter(cs => cs.sessionId === sessionId).length;
  };

  const wasCompletedToday = (sessionId: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return completedSessions.some(cs => {
      const completedDate = new Date(cs.completedAt);
      completedDate.setHours(0, 0, 0, 0);
      return cs.sessionId === sessionId && completedDate.getTime() === today.getTime();
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Guided Mindfulness Sessions</h2>
        <p className="text-gray-600">
          Take a moment to pause, breathe, and reconnect with yourself
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map(cat => (
          <motion.button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.icon} {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div>
            <p className="text-sm text-purple-700 font-medium">Total Sessions</p>
            <p className="text-3xl font-bold text-purple-900">{MINDFULNESS_SESSIONS.length}</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100">
          <div>
            <p className="text-sm text-indigo-700 font-medium">Completed</p>
            <p className="text-3xl font-bold text-indigo-900">{completedSessions.length}</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100">
          <div>
            <p className="text-sm text-pink-700 font-medium">Unique Sessions</p>
            <p className="text-3xl font-bold text-pink-900">
              {new Set(completedSessions.map(cs => cs.sessionId)).size}
            </p>
          </div>
        </Card>
      </div>

      {/* Session Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session, index) => {
          const completionCount = getSessionCompletionCount(session.id);
          const completedToday = wasCompletedToday(session.id);

          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full flex flex-col bg-gradient-to-br from-white to-purple-50">
                {/* Session Header */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">{session.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">{session.name}</h3>
                      {completedToday && (
                        <Badge variant="success" className="text-xs">
                          ✓ Today
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{session.description}</p>
                  </div>
                </div>

                {/* Session Details */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>⏱️ {session.duration}</span>
                  <span>⭐ +{session.xpReward} XP</span>
                </div>

                {completionCount > 0 && (
                  <p className="text-sm text-purple-600 font-medium mb-4">
                    Completed {completionCount}x
                  </p>
                )}

                {/* Category Badge */}
                <div className="mb-4">
                  <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                    {session.category.replace('-', ' ')}
                  </Badge>
                </div>

                {/* Start Button */}
                <div className="mt-auto">
                  <Button
                    variant={completedToday ? 'ghost' : 'primary'}
                    className={`w-full ${!completedToday && 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
                    onClick={() => onSelectSession(session)}
                  >
                    {completedToday ? 'Practice Again' : 'Start Session'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No sessions in this category yet</p>
        </div>
      )}
    </div>
  );
};

export type { CompletedSession };
