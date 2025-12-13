import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Exercise } from '../data/exercises';
import { Button } from './Button';
import { Card } from './Card';

interface ExercisePlayerProps {
  exercise: Exercise;
  onComplete: (responses: string[]) => void;
  onCancel: () => void;
}

export const ExercisePlayer = ({ exercise, onComplete, onCancel }: ExercisePlayerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');

  const step = exercise.steps[currentStep];
  const isLastStep = currentStep === exercise.steps.length - 1;
  const progress = ((currentStep + 1) / exercise.steps.length) * 100;

  const handleNext = () => {
    // Save current response
    const updatedResponses = [...responses, currentResponse];
    setResponses(updatedResponses);

    if (isLastStep) {
      // Complete exercise
      onComplete(updatedResponses);
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1);
      setCurrentResponse('');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Restore previous response
      setCurrentResponse(responses[currentStep - 1] || '');
      // Remove last response from array
      setResponses(responses.slice(0, -1));
    }
  };

  const canContinue = currentResponse.trim().length > 0 || step.type === 'reflection';

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            ← Back
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{exercise.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{exercise.name}</h1>
              <p className="text-gray-600">{exercise.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Step {currentStep + 1} of {exercise.steps.length}
          </p>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              {/* Instruction */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{step.instruction}</h2>

              {/* Input based on type */}
              {step.type === 'text' && (
                <textarea
                  value={currentResponse}
                  onChange={e => setCurrentResponse(e.target.value)}
                  placeholder={step.placeholder}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-lg"
                  autoFocus
                />
              )}

              {step.type === 'choice' && step.choices && (
                <div className="space-y-3">
                  {step.choices.map(choice => (
                    <motion.button
                      key={choice}
                      onClick={() => setCurrentResponse(choice)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        currentResponse === choice
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            currentResponse === choice
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-gray-400'
                          } flex items-center justify-center`}
                        >
                          {currentResponse === choice && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-white rounded-full"
                            />
                          )}
                        </div>
                        <span className="text-lg">{choice}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {step.type === 'reflection' && (
                <div className="space-y-4">
                  <textarea
                    value={currentResponse}
                    onChange={e => setCurrentResponse(e.target.value)}
                    placeholder={step.placeholder}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent resize-none text-lg"
                    autoFocus
                  />
                  <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
                    <p className="text-sm text-secondary-800">
                      💡 <strong>Reflection:</strong> Take your time to think about your experience.
                      There are no right or wrong answers.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 0 && (
                  <Button variant="ghost" onClick={handleBack} className="flex-1">
                    Back
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canContinue}
                  className={`flex-1 ${currentStep === 0 ? 'w-full' : ''}`}
                >
                  {isLastStep ? `Complete Exercise +${exercise.xpReward} XP` : 'Continue'}
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Encouragement Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600">
            🌟 Great job on taking time for yourself! This exercise helps build emotional
            resilience.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
