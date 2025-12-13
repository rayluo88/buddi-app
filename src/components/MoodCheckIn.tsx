import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MoodType } from '../types/student';

interface MoodOption {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  { type: 'great', emoji: '😄', label: 'Great', color: 'bg-green-500' },
  { type: 'good', emoji: '🙂', label: 'Good', color: 'bg-blue-500' },
  { type: 'okay', emoji: '😐', label: 'Okay', color: 'bg-yellow-500' },
  { type: 'low', emoji: '😟', label: 'Low', color: 'bg-orange-500' },
  { type: 'struggling', emoji: '😢', label: 'Struggling', color: 'bg-red-500' },
];

interface MoodCheckInProps {
  onMoodSelected: (mood: MoodType, note?: string) => void;
  disabled?: boolean;
  showNote?: boolean;
}

export const MoodCheckIn = ({
  onMoodSelected,
  disabled = false,
  showNote = true,
}: MoodCheckInProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleMoodClick = (mood: MoodType) => {
    if (disabled) return;
    setSelectedMood(mood);
    if (showNote) {
      setShowNoteInput(true);
    } else {
      onMoodSelected(mood);
    }
  };

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelected(selectedMood, note || undefined);
      setNote('');
      setShowNoteInput(false);
    }
  };

  const handleSkipNote = () => {
    if (selectedMood) {
      onMoodSelected(selectedMood);
      setShowNoteInput(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">How are you feeling today?</h2>
        <p className="text-gray-600 mt-2">Select the emoji that best describes your mood</p>
      </div>

      {/* Mood Selector */}
      {!showNoteInput && (
        <div className="grid grid-cols-5 gap-4">
          {MOOD_OPTIONS.map((mood, index) => (
            <motion.button
              key={mood.type}
              onClick={() => handleMoodClick(mood.type)}
              disabled={disabled}
              className={`relative flex flex-col items-center p-4 rounded-2xl transition-all ${
                selectedMood === mood.type
                  ? `${mood.color} text-white shadow-lg scale-110`
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              whileHover={!disabled ? { scale: 1.1, y: -5 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
            >
              {/* Emoji */}
              <motion.span
                className="text-5xl mb-2"
                animate={selectedMood === mood.type ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {mood.emoji}
              </motion.span>

              {/* Label */}
              <span className="text-sm font-medium">{mood.label}</span>

              {/* Selection indicator */}
              <AnimatePresence>
                {selectedMood === mood.type && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <span className="text-green-600 text-sm">✓</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      )}

      {/* Note Input */}
      <AnimatePresence>
        {showNoteInput && selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Selected mood display */}
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl">
              <span className="text-4xl">
                {MOOD_OPTIONS.find(m => m.type === selectedMood)?.emoji}
              </span>
              <div>
                <p className="text-sm text-gray-600">You selected:</p>
                <p className="font-semibold text-gray-800">
                  {MOOD_OPTIONS.find(m => m.type === selectedMood)?.label}
                </p>
              </div>
            </div>

            {/* Note textarea */}
            <div>
              <label htmlFor="mood-note" className="block text-sm font-medium text-gray-700 mb-2">
                Want to share more? (Optional)
              </label>
              <textarea
                id="mood-note"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="What's on your mind today?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{note.length}/500 characters</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleSkipNote}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Skip
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Check-in
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
