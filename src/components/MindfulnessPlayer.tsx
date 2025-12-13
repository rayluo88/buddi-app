import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MindfulnessSession } from '../data/mindfulness';
import { Button } from './Button';
import { Card } from './Card';

interface MindfulnessPlayerProps {
  session: MindfulnessSession;
  onComplete: () => void;
  onCancel: () => void;
}

export const MindfulnessPlayer = ({ session, onComplete, onCancel }: MindfulnessPlayerProps) => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const totalSegments = session.transcript.length;
  const progress = ((currentSegment + 1) / totalSegments) * 100;
  const isLastSegment = currentSegment === totalSegments - 1;

  // Auto-advance to next segment (simulating narration timing)
  useEffect(() => {
    if (!isPlaying || !autoAdvance) return;

    // Estimate reading time based on text length (avg 150 words per minute)
    const text = session.transcript[currentSegment];
    const words = text.split(' ').length;
    const readingTimeMs = (words / 150) * 60 * 1000;
    const displayTime = Math.max(3000, Math.min(readingTimeMs + 2000, 10000)); // 3-10 seconds

    const timer = setTimeout(() => {
      if (currentSegment < totalSegments - 1) {
        setCurrentSegment(currentSegment + 1);
      } else {
        // Session complete
        setIsPlaying(false);
      }
    }, displayTime);

    return () => clearTimeout(timer);
  }, [isPlaying, currentSegment, autoAdvance, session.transcript, totalSegments]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentSegment < totalSegments - 1) {
      setCurrentSegment(currentSegment + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onCancel} className="mb-4 text-white hover:bg-white/20">
            ← Exit Session
          </Button>
          <div className="flex items-center gap-4 mb-4 text-white">
            <span className="text-5xl">{session.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{session.name}</h1>
              <p className="text-purple-200">{session.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <p className="text-sm text-purple-200 mt-2">
            Segment {currentSegment + 1} of {totalSegments}
          </p>
        </div>

        {/* Transcript Display */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-12 mb-6 min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSegment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl text-white leading-relaxed font-light">
                {session.transcript[currentSegment]}
              </p>
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          {/* Playback Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentSegment === 0}
              className="text-white hover:bg-white/20 disabled:opacity-30"
            >
              ⏮️ Previous
            </Button>

            <motion.button
              onClick={handlePlayPause}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
                isPlaying
                  ? 'bg-white/20 hover:bg-white/30'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg'
              } transition-all`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </motion.button>

            <Button
              variant="ghost"
              onClick={handleNext}
              disabled={currentSegment === totalSegments - 1}
              className="text-white hover:bg-white/20 disabled:opacity-30"
            >
              Next ⏭️
            </Button>
          </div>

          {/* Auto-advance toggle */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={e => setAutoAdvance(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <span className="text-sm">Auto-advance</span>
            </label>
          </div>

          {/* Complete Button (shown on last segment) */}
          {isLastSegment && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md"
            >
              <Button
                variant="primary"
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg py-4"
              >
                Complete Session +{session.xpReward} XP ✨
              </Button>
            </motion.div>
          )}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-purple-200 text-sm">
            🎧 Tip: Find a quiet space and use headphones for the best experience
          </p>
        </motion.div>
      </div>
    </div>
  );
};
