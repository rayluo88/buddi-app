import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Exercise } from '../data/exercises';
import { CBT_EXERCISES } from '../data/exercises';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

interface CompletedExercise {
  exerciseId: string;
  completedAt: Date;
  responses: string[];
}

interface ExerciseLibraryProps {
  completedExercises: CompletedExercise[];
  onSelectExercise: (exercise: Exercise) => void;
}

export const ExerciseLibrary = ({ completedExercises, onSelectExercise }: ExerciseLibraryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Exercises', icon: '📚' },
    { id: 'thought-reframing', label: 'Thought Reframing', icon: '🔄' },
    { id: 'gratitude', label: 'Gratitude', icon: '🏺' },
    { id: 'worry-management', label: 'Worry Management', icon: '📦' },
    { id: 'behavioral-activation', label: 'Energy Boost', icon: '⚡' },
    { id: 'self-compassion', label: 'Self-Compassion', icon: '💌' },
  ];

  const filteredExercises =
    selectedCategory === 'all'
      ? CBT_EXERCISES
      : CBT_EXERCISES.filter(ex => ex.category === selectedCategory);

  const getExerciseCompletionCount = (exerciseId: string): number => {
    return completedExercises.filter(ce => ce.exerciseId === exerciseId).length;
  };

  const wasCompletedToday = (exerciseId: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return completedExercises.some(ce => {
      const completedDate = new Date(ce.completedAt);
      completedDate.setHours(0, 0, 0, 0);
      return ce.exerciseId === exerciseId && completedDate.getTime() === today.getTime();
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">CBT Micro-Exercises</h2>
        <p className="text-gray-600">
          Evidence-based exercises to help you manage thoughts and emotions
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
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-500'
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
        <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100">
          <div>
            <p className="text-sm text-secondary-700 font-medium">Total Exercises</p>
            <p className="text-3xl font-bold text-secondary-900">{CBT_EXERCISES.length}</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
          <div>
            <p className="text-sm text-primary-700 font-medium">Completed</p>
            <p className="text-3xl font-bold text-primary-900">{completedExercises.length}</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div>
            <p className="text-sm text-green-700 font-medium">Unique Exercises</p>
            <p className="text-3xl font-bold text-green-900">
              {new Set(completedExercises.map(ce => ce.exerciseId)).size}
            </p>
          </div>
        </Card>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExercises.map((exercise, index) => {
          const completionCount = getExerciseCompletionCount(exercise.id);
          const completedToday = wasCompletedToday(exercise.id);

          return (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                {/* Exercise Header */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">{exercise.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">{exercise.name}</h3>
                      {completedToday && (
                        <Badge variant="success" className="text-xs">
                          ✓ Today
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{exercise.description}</p>
                  </div>
                </div>

                {/* Exercise Details */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>⏱️ {exercise.duration}</span>
                  <span>⭐ +{exercise.xpReward} XP</span>
                  {completionCount > 0 && (
                    <span className="text-primary-600 font-medium">
                      Completed {completionCount}x
                    </span>
                  )}
                </div>

                {/* Start Button */}
                <div className="mt-auto">
                  <Button
                    variant={completedToday ? 'ghost' : 'primary'}
                    className="w-full"
                    onClick={() => onSelectExercise(exercise)}
                  >
                    {completedToday ? 'Practice Again' : 'Start Exercise'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No exercises in this category yet</p>
        </div>
      )}
    </div>
  );
};

export type { CompletedExercise };
