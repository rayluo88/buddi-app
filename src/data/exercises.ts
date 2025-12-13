export interface ExerciseStep {
  instruction: string;
  placeholder?: string;
  type: 'text' | 'choice' | 'reflection';
  choices?: string[];
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string; // e.g., "5 min"
  category:
    | 'thought-reframing'
    | 'gratitude'
    | 'worry-management'
    | 'behavioral-activation'
    | 'self-compassion';
  xpReward: number;
  steps: ExerciseStep[];
}

export const CBT_EXERCISES: Exercise[] = [
  {
    id: 'thought-flipper',
    name: 'Thought Flipper',
    description: 'Transform negative thoughts into balanced perspectives',
    icon: '🔄',
    duration: '5 min',
    category: 'thought-reframing',
    xpReward: 20,
    steps: [
      {
        instruction:
          'Think of a negative thought that has been bothering you lately. Write it down.',
        placeholder: 'e.g., "I always mess up on tests"',
        type: 'text',
      },
      {
        instruction: 'Is this thought 100% true all the time?',
        type: 'choice',
        choices: ['Yes, always true', 'Not always true', 'Rarely true'],
      },
      {
        instruction:
          'What evidence do you have that challenges this thought? Think of times when the opposite was true.',
        placeholder: 'e.g., "I did well on my math quiz last week"',
        type: 'text',
      },
      {
        instruction: 'Now rewrite your thought in a more balanced, realistic way.',
        placeholder: 'e.g., "Sometimes I struggle on tests, but I can also do well when I prepare"',
        type: 'text',
      },
      {
        instruction: 'How do you feel after reframing your thought?',
        placeholder: 'Reflect on any changes in how you feel...',
        type: 'reflection',
      },
    ],
  },
  {
    id: 'gratitude-jar',
    name: 'Gratitude Jar',
    description: 'Collect moments of gratitude to boost positive emotions',
    icon: '🏺',
    duration: '3 min',
    category: 'gratitude',
    xpReward: 20,
    steps: [
      {
        instruction:
          'Think of 3 things that happened today (or recently) that you are grateful for. They can be big or small!',
        placeholder: 'e.g., "My friend shared their lunch with me"',
        type: 'text',
      },
      {
        instruction: 'Why are you grateful for the first thing?',
        placeholder: 'It made me feel cared for and happy...',
        type: 'text',
      },
      {
        instruction: 'Think of a person who has helped you recently. What did they do?',
        placeholder: 'e.g., "My teacher stayed after class to explain the lesson"',
        type: 'text',
      },
      {
        instruction: 'How can you show appreciation to that person?',
        type: 'choice',
        choices: [
          'Say thank you in person',
          'Write a thank you note',
          'Do something kind for them',
          'Just remember their kindness',
        ],
      },
      {
        instruction: 'Take a moment to appreciate yourself. What is something you did well today?',
        placeholder: 'I was kind to a classmate, I tried my best on my homework...',
        type: 'reflection',
      },
    ],
  },
  {
    id: 'worry-box',
    name: 'Worry Box',
    description: 'Put your worries aside and focus on what you can control',
    icon: '📦',
    duration: '5 min',
    category: 'worry-management',
    xpReward: 20,
    steps: [
      {
        instruction: 'What is one worry that has been on your mind?',
        placeholder: 'e.g., "I am worried about my upcoming presentation"',
        type: 'text',
      },
      {
        instruction:
          'Is this worry about something happening right now, or something in the future?',
        type: 'choice',
        choices: ['Happening now', 'In the future', 'Both'],
      },
      {
        instruction: 'Can you control or change this situation?',
        type: 'choice',
        choices: [
          'Yes, I can control it',
          'Partially - some parts I can control',
          'No, it is out of my control',
        ],
      },
      {
        instruction: 'What is ONE small action you can take today to address this worry?',
        placeholder: 'e.g., "I can practice my presentation for 10 minutes"',
        type: 'text',
      },
      {
        instruction:
          'Imagine putting this worry in a box and setting it aside for now. How does that feel?',
        placeholder: 'Reflect on the feeling of letting go...',
        type: 'reflection',
      },
    ],
  },
  {
    id: 'energy-boost',
    name: 'Energy Boost',
    description: 'Combat low energy with small, achievable activities',
    icon: '⚡',
    duration: '4 min',
    category: 'behavioral-activation',
    xpReward: 20,
    steps: [
      {
        instruction: 'How is your energy level right now?',
        type: 'choice',
        choices: ['Very low', 'Low', 'Medium', 'Good', 'High'],
      },
      {
        instruction: 'Pick ONE small activity that usually makes you feel a bit better:',
        type: 'choice',
        choices: [
          'Listen to a favorite song',
          'Take a short walk',
          'Chat with a friend',
          'Do a fun hobby for 5 minutes',
          'Stretch or move your body',
          'Drink water or have a snack',
        ],
      },
      {
        instruction: 'Great! When can you do this activity today?',
        placeholder: 'e.g., "After school" or "In 10 minutes"',
        type: 'text',
      },
      {
        instruction: 'What else brings you joy or energy, even in small amounts?',
        placeholder: 'Drawing, playing with my pet, watching funny videos...',
        type: 'text',
      },
      {
        instruction: 'Commit to yourself: I will do this small activity today to boost my energy.',
        type: 'choice',
        choices: ['Yes, I commit!', 'I will try my best'],
      },
    ],
  },
  {
    id: 'self-compassion-letter',
    name: 'Self-Compassion Letter',
    description: 'Practice being kind to yourself during difficult times',
    icon: '💌',
    duration: '6 min',
    category: 'self-compassion',
    xpReward: 20,
    steps: [
      {
        instruction: 'Think of a situation where you have been hard on yourself. What happened?',
        placeholder: 'e.g., "I made a mistake in front of the class"',
        type: 'text',
      },
      {
        instruction: 'What did you say to yourself in that moment?',
        placeholder: 'e.g., "I am so stupid, everyone is judging me"',
        type: 'text',
      },
      {
        instruction:
          'Imagine your best friend was in this situation. What kind words would you say to comfort them?',
        placeholder: 'e.g., "Everyone makes mistakes, you are brave for trying"',
        type: 'text',
      },
      {
        instruction: 'Now write those same kind words to YOURSELF. You deserve compassion too.',
        placeholder: 'Dear [your name], I want you to know that...',
        type: 'text',
      },
      {
        instruction: 'How does it feel to speak to yourself with kindness?',
        placeholder: 'Reflect on this new way of treating yourself...',
        type: 'reflection',
      },
    ],
  },
];
