/**
 * Content Moderation Utility
 * Detects crisis keywords and concerning content in student messages
 */

/**
 * Crisis keywords that require immediate escalation
 */
const CRISIS_KEYWORDS_EN = [
  'suicide',
  'kill myself',
  'end my life',
  'want to die',
  'better off dead',
  'self harm',
  'hurt myself',
  'cut myself',
  'suicidal',
  'no reason to live',
];

const CRISIS_KEYWORDS_ZH = [
  '自杀',
  '想死',
  '了结生命',
  '活不下去',
  '自残',
  '伤害自己',
  '割腕',
  '结束生命',
  '不想活',
  '没有意义',
];

/**
 * Warning-level keywords that indicate distress
 */
const WARNING_KEYWORDS_EN = [
  'depressed',
  'hopeless',
  'worthless',
  'nobody cares',
  'hate myself',
  'give up',
  'cant take it',
  'too much',
  'exhausted',
  'overwhelmed',
];

const WARNING_KEYWORDS_ZH = [
  '抑郁',
  '绝望',
  '没价值',
  '没人关心',
  '讨厌自己',
  '放弃',
  '受不了',
  '太累了',
  '压力太大',
  '崩溃',
];

/**
 * Severity levels for detected content
 */
export type ModerationSeverity = 'safe' | 'warning' | 'crisis';

/**
 * Result of content moderation
 */
export interface ModerationResult {
  severity: ModerationSeverity;
  matchedKeywords: string[];
  requiresEscalation: boolean;
  message?: string;
}

/**
 * Check if text contains any keywords from a list (case-insensitive)
 */
const containsKeywords = (text: string, keywords: string[]): string[] => {
  const lowerText = text.toLowerCase();
  const matched: string[] = [];

  for (const keyword of keywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      matched.push(keyword);
    }
  }

  return matched;
};

/**
 * Moderate user message content for crisis or concerning language
 */
export const moderateContent = (
  content: string,
  language: 'en' | 'zh' = 'en'
): ModerationResult => {
  // Select appropriate keyword sets based on language
  const crisisKeywords = language === 'zh' ? CRISIS_KEYWORDS_ZH : CRISIS_KEYWORDS_EN;
  const warningKeywords = language === 'zh' ? WARNING_KEYWORDS_ZH : WARNING_KEYWORDS_EN;

  // Check for crisis keywords first (highest priority)
  const crisisMatches = containsKeywords(content, crisisKeywords);
  if (crisisMatches.length > 0) {
    return {
      severity: 'crisis',
      matchedKeywords: crisisMatches,
      requiresEscalation: true,
      message:
        language === 'zh'
          ? '检测到危机内容。请立即联系学校辅导员。'
          : 'Crisis content detected. Please contact a school counselor immediately.',
    };
  }

  // Check for warning-level keywords
  const warningMatches = containsKeywords(content, warningKeywords);
  if (warningMatches.length > 0) {
    return {
      severity: 'warning',
      matchedKeywords: warningMatches,
      requiresEscalation: false,
      message:
        language === 'zh'
          ? '检测到关注内容。建议与辅导员交流。'
          : 'Concerning content detected. Consider reaching out to a counselor.',
    };
  }

  // Content is safe
  return {
    severity: 'safe',
    matchedKeywords: [],
    requiresEscalation: false,
  };
};

/**
 * Check if message requires immediate counselor notification
 */
export const requiresCounselorAlert = (content: string, language: 'en' | 'zh' = 'en'): boolean => {
  const result = moderateContent(content, language);
  return result.requiresEscalation;
};

/**
 * Get crisis helpline message for display to student
 */
export const getCrisisHelplineMessage = (language: 'en' | 'zh' = 'en'): string => {
  if (language === 'zh') {
    return `如果你正在经历危机，请立即寻求帮助：

📞 新加坡援人协会 (Samaritans of Singapore): 1-767
📞 新加坡关怀热线 (Care Corner Singapore): 1800-353-5800
📞 IMH心理健康热线: 6389-2222

你并不孤单。`;
  }

  return `If you're experiencing a crisis, please seek help immediately:

📞 Samaritans of Singapore: 1-767
📞 Care Corner Singapore: 1800-353-5800
📞 IMH Mental Health Helpline: 6389-2222

You are not alone.`;
};
