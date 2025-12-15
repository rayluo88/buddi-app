/**
 * Mock AI responses for demo mode
 *
 * These pre-scripted responses are used when:
 * - VITE_CHAT_DEMO_MODE=true (demo/presentation mode)
 * - DeepSeek API fails or is unavailable (fallback)
 *
 * Responses are contextual to each topic and designed to sound natural.
 */

export const MOCK_RESPONSES: Record<string, string[]> = {
  'exam-stress': [
    'I understand exam stress can feel overwhelming. What specific aspect worries you most?',
    "It's normal to feel anxious. Have you tried breaking study time into smaller chunks?",
    "Remember, your worth isn't defined by grades. What helps you relax during study breaks?",
    "Let's work on a study plan together. When is your next exam?",
    'Deep breaths can help calm exam nerves. Have you practiced any relaxation techniques?',
    'How are you sleeping? Rest is super important for memory and focus.',
    'What subject do you feel most confident about? We can build from there.',
    'Have you talked to your teacher about what will be on the exam?',
  ],
  friendship: [
    "Friendship challenges can be tough. Can you share what's bothering you?",
    'It sounds like you care about this friendship. Have you tried talking to them?',
    'Sometimes friends need space. How are you taking care of yourself?',
    'What do you value most in a friendship?',
    'Conflict is normal. What resolution would feel good to you?',
    'How long have you known this friend? Sometimes relationships change over time.',
    'Do you have other friends you can talk to about this?',
    'Remember, you deserve friends who treat you with kindness and respect.',
  ],
  'academic-pressure': [
    'Academic pressure is real. How are you managing your workload?',
    "It's okay to ask for help. Have you talked to your teacher?",
    'What does success mean to you, beyond grades?',
    "Let's think about balance. What activities bring you joy?",
    "You're doing your best, and that's what matters. What's one subject you enjoy?",
    'Have you considered making a daily schedule to manage your time better?',
    "What's the hardest part of school for you right now?",
    'Remember to take breaks! Your brain needs rest to learn effectively.',
  ],
  family: [
    "Family situations can be complex. I'm here to listen.",
    'Your feelings are valid. How long has this been bothering you?',
    'Have you been able to talk to anyone about this?',
    'What would help you feel more supported at home?',
    "It's brave to share this. What's one thing that brings you comfort?",
    'Sometimes family dynamics are challenging. How are you coping?',
    'Is there a trusted adult at school you could talk to?',
    "Remember, you're not alone in this. Many students face family challenges.",
  ],
  'self-confidence': [
    "Building confidence takes time. What's one thing you're good at?",
    "Self-doubt is common, but it doesn't define you. What makes you unique?",
    "Let's celebrate a recent achievement. What's something you're proud of?",
    'Positive self-talk matters. What kind words would you say to a friend?',
    'Your strengths are there, even if hard to see. What do others appreciate about you?',
    "What's something new you'd like to try?",
    'Confidence grows through practice. What small step could you take today?',
    "Remember, everyone has doubts sometimes. You're not alone in feeling this way.",
  ],
};

/**
 * Get a mock response based on topic and message index
 *
 * @param topicId - The conversation topic ID
 * @param messageIndex - Current message count (for cycling through responses)
 * @returns A contextual mock response
 */
export function getMockResponse(topicId: string, messageIndex: number): string {
  const responses = MOCK_RESPONSES[topicId] || MOCK_RESPONSES['exam-stress'];
  return responses[messageIndex % responses.length];
}
