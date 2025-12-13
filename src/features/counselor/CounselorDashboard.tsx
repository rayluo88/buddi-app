import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Student } from '../../types/student';
import { DEMO_STUDENTS, CASE_SUMMARIES } from '../../data/counselorData';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { PriorityQueue } from '../../components/PriorityQueue';
import { StudentDetailView } from '../../components/StudentDetailView';

export const CounselorDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Calculate statistics
  const totalStudents = DEMO_STUDENTS.length;
  const flaggedStudents = DEMO_STUDENTS.filter(s => s.riskScore.level !== 'green').length;
  const redFlagCount = DEMO_STUDENTS.filter(s => s.riskScore.level === 'red').length;
  const orangeFlagCount = DEMO_STUDENTS.filter(s => s.riskScore.level === 'orange').length;
  const yellowFlagCount = DEMO_STUDENTS.filter(s => s.riskScore.level === 'yellow').length;

  // Average engagement
  const avgStreak = DEMO_STUDENTS.reduce((sum, s) => sum + s.streakCount, 0) / DEMO_STUDENTS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">{t('appName')}</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" onClick={() => navigate('/')}>
              {t('switchRole')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome, Ms. Priya
          </h2>
          <p className="text-gray-600 text-lg">School Counselor • Class 2A Wellbeing Dashboard</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">Total Students</p>
              <p className="text-4xl font-bold text-blue-900">{totalStudents}</p>
              <p className="text-xs text-blue-600 mt-1">Class 2A</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div>
              <p className="text-sm text-orange-700 font-medium mb-1">Flagged Students</p>
              <p className="text-4xl font-bold text-orange-900">{flaggedStudents}</p>
              <p className="text-xs text-orange-600 mt-1">
                {redFlagCount} red • {orangeFlagCount} orange • {yellowFlagCount} yellow
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div>
              <p className="text-sm text-green-700 font-medium mb-1">Average Engagement</p>
              <p className="text-4xl font-bold text-green-900">{avgStreak.toFixed(1)}</p>
              <p className="text-xs text-green-600 mt-1">Day check-in streak</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div>
              <p className="text-sm text-purple-700 font-medium mb-1">Active This Week</p>
              <p className="text-4xl font-bold text-purple-900">
                {DEMO_STUDENTS.filter(s => s.streakCount > 0).length}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                {Math.round(
                  (DEMO_STUDENTS.filter(s => s.streakCount > 0).length / totalStudents) * 100
                )}
                % participation
              </p>
            </div>
          </Card>
        </div>

        {/* Priority Alerts */}
        {redFlagCount > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🚨</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-800 mb-2">Urgent Attention Needed</h3>
                <p className="text-red-700 mb-3">
                  {redFlagCount} {redFlagCount === 1 ? 'student has' : 'students have'} been flagged
                  as high-risk (RED) and require immediate follow-up.
                </p>
                <div className="flex gap-2">
                  <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                    Priority: Immediate
                  </span>
                  <span className="text-sm bg-white text-red-700 px-3 py-1 rounded-full border border-red-300">
                    Target: Within 24 hours
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Priority Queue */}
        <div>
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800">Priority Queue</h3>
            <p className="text-gray-600">
              Students sorted by AI-detected risk level (highest first)
            </p>
          </div>
          <PriorityQueue students={DEMO_STUDENTS} onSelectStudent={setSelectedStudent} />
        </div>

        {/* Info Banner */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">About the AI Risk Scoring</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                Risk scores are calculated using multiple signals: mood trend analysis (30%),
                keyword detection (25%), engagement patterns (20%), timing of check-ins (15%), and
                exercise completion (10%). The system is designed to assist counselor judgment, not
                replace it. All flags include explainable reasons and suggested conversation
                starters.
              </p>
            </div>
          </div>
        </Card>
      </main>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailView
          student={selectedStudent}
          caseSummary={CASE_SUMMARIES[selectedStudent.id]}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};
