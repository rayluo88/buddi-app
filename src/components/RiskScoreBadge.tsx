import type { RiskLevel } from '../types/student';

interface RiskScoreBadgeProps {
  level: RiskLevel;
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

const RISK_CONFIG: Record<
  RiskLevel,
  {
    color: string;
    bgColor: string;
    label: string;
    icon: string;
  }
> = {
  green: {
    color: 'text-green-700',
    bgColor: 'bg-green-100 border-green-300',
    label: 'Green',
    icon: '✓',
  },
  yellow: {
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100 border-yellow-300',
    label: 'Yellow',
    icon: '⚠',
  },
  orange: {
    color: 'text-orange-700',
    bgColor: 'bg-orange-100 border-orange-300',
    label: 'Orange',
    icon: '⚠',
  },
  red: {
    color: 'text-red-700',
    bgColor: 'bg-red-100 border-red-300',
    label: 'Red',
    icon: '🚨',
  },
};

export const RiskScoreBadge = ({
  level,
  score,
  size = 'md',
  showScore = true,
}: RiskScoreBadgeProps) => {
  const config = RISK_CONFIG[level];

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border-2 font-semibold ${config.bgColor} ${config.color} ${sizeClasses[size]}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
      {showScore && <span className="font-normal">({Math.round(score * 100)}%)</span>}
    </div>
  );
};
