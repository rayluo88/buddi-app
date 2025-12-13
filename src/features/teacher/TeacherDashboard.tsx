import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CLASS_2A_DATA, getMoodEmoji, getTrendEmoji } from '../../data/teacherData';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const classData = CLASS_2A_DATA;
  const currentWeek = classData.currentWeek;

  // Format chart data
  const chartData = classData.historicalTrends.map(week => ({
    week: format(week.weekStarting, 'MMM d'),
    mood: week.averageMood,
    participation: Math.round(week.participationRate * 100),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
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
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Welcome, Mr. Tan
          </h2>
          <p className="text-gray-600 text-lg">Form Teacher • Class 2A Wellbeing Dashboard</p>
        </div>

        {/* Privacy Notice */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 mb-1">Privacy Protected</h4>
              <p className="text-sm text-blue-800 leading-relaxed mb-2">
                Individual student data is not visible on this dashboard. All metrics shown are
                aggregated and anonymized to protect student privacy.
              </p>
              <p className="text-sm text-blue-800">
                For individual student concerns, please contact{' '}
                <span className="font-semibold">Ms. Priya (School Counselor)</span>.
              </p>
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="text-sm text-blue-600 hover:text-blue-800 underline mt-2"
              >
                How does privacy protection work?
              </button>
            </div>
          </div>
        </Card>

        {/* Class Wellbeing Pulse */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📊</span> CLASS 2A WELLBEING PULSE
          </h3>
          <p className="text-gray-600 mb-4">
            Week of {format(currentWeek.weekStarting, 'MMMM d, yyyy')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Average Mood */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <div>
                <p className="text-sm text-green-700 font-medium mb-1">Average Mood This Week</p>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-5xl">{getMoodEmoji(currentWeek.averageMood)}</span>
                  <div>
                    <p className="text-4xl font-bold text-green-900">
                      {currentWeek.averageMood.toFixed(1)}
                      <span className="text-xl text-green-700">/5.0</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl">{getTrendEmoji(currentWeek.trendFromLastWeek)}</span>
                  <span
                    className={`font-medium ${
                      currentWeek.trendFromLastWeek === 'up'
                        ? 'text-green-700'
                        : currentWeek.trendFromLastWeek === 'down'
                          ? 'text-orange-700'
                          : 'text-gray-700'
                    }`}
                  >
                    {currentWeek.trendFromLastWeek === 'up' ? '↑' : ''}
                    {currentWeek.trendFromLastWeek === 'down' ? '↓' : ''}
                    {Math.abs(currentWeek.changeAmount).toFixed(1)} from last week
                  </span>
                </div>
              </div>
            </Card>

            {/* Participation Rate */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <div>
                <p className="text-sm text-purple-700 font-medium mb-1">Participation Rate</p>
                <p className="text-4xl font-bold text-purple-900 mb-2">
                  {Math.round(currentWeek.participationRate * 100)}%
                </p>
                <p className="text-sm text-purple-700 mb-3">
                  {currentWeek.participatingStudents} of {classData.totalStudents} students
                </p>
                {/* Progress bar */}
                <div className="w-full bg-purple-200 rounded-full h-3">
                  <div
                    className="bg-purple-600 h-3 rounded-full transition-all"
                    style={{ width: `${currentWeek.participationRate * 100}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            {/* School Comparison */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <div>
                <p className="text-sm text-blue-700 font-medium mb-1">vs School Average</p>
                <p className="text-4xl font-bold text-blue-900 mb-2">
                  {currentWeek.averageMood > classData.schoolAverage.averageMood ? '↑' : '↓'}
                  {Math.abs(currentWeek.averageMood - classData.schoolAverage.averageMood).toFixed(
                    1
                  )}
                </p>
                <p className="text-sm text-blue-700 mb-1">
                  Class 2A: {currentWeek.averageMood.toFixed(1)}
                </p>
                <p className="text-sm text-blue-700">
                  School: {classData.schoolAverage.averageMood.toFixed(1)}
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  {currentWeek.averageMood > classData.schoolAverage.averageMood
                    ? 'Above school average ✓'
                    : 'Below school average'}
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Alerts */}
        {classData.alerts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Alerts & Insights</h3>
            <div className="space-y-3">
              {classData.alerts.map(alert => (
                <Card
                  key={alert.id}
                  className={`${
                    alert.type === 'positive'
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                      : alert.type === 'warning'
                        ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200'
                        : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {alert.type === 'positive' ? '✅' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                    </span>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold mb-1 ${
                          alert.type === 'positive'
                            ? 'text-green-800'
                            : alert.type === 'warning'
                              ? 'text-orange-800'
                              : 'text-blue-800'
                        }`}
                      >
                        {alert.title}
                      </h4>
                      <p
                        className={`text-sm mb-2 ${
                          alert.type === 'positive'
                            ? 'text-green-700'
                            : alert.type === 'warning'
                              ? 'text-orange-700'
                              : 'text-blue-700'
                        }`}
                      >
                        {alert.message}
                      </p>
                      {alert.suggestion && (
                        <p
                          className={`text-sm italic ${
                            alert.type === 'positive'
                              ? 'text-green-600'
                              : alert.type === 'warning'
                                ? 'text-orange-600'
                                : 'text-blue-600'
                          }`}
                        >
                          💡 {alert.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Mood Trend Chart */}
        <Card className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">8-Week Mood Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis
                yAxisId="left"
                domain={[1, 5]}
                label={{ value: 'Mood (1-5)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                label={{ value: 'Participation %', angle: 90, position: 'insideRight' }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="mood"
                stroke="#10b981"
                strokeWidth={3}
                name="Average Mood"
                dot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="participation"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Participation %"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Concerns */}
        <Card className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Top Concerns (Anonymous)</h3>
          <p className="text-sm text-gray-600 mb-4">
            Based on aggregated check-in data from students who opted to share context
          </p>
          <div className="space-y-3">
            {classData.topConcerns.map((concern, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800">{concern.concern}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{getTrendEmoji(concern.trend)}</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                    {concern.mentions} mentions
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            * Only concerns mentioned by 5+ students are shown to protect privacy
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="secondary" className="w-full">
            📚 View Resources
          </Button>
          <Button variant="secondary" className="w-full">
            📧 Contact Counselor
          </Button>
          <Button variant="ghost" className="w-full">
            📊 Download Report
          </Button>
        </div>
      </main>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl bg-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-800">How Privacy Protection Works</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">🔒 What You CAN See:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Aggregate class mood averages (no individual students)</li>
                  <li>Overall participation rates</li>
                  <li>Anonymous concerns (only if ≥5 students mentioned the same concern)</li>
                  <li>Historical trends for the class as a whole</li>
                  <li>Comparison to school-wide averages</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">🚫 What You CANNOT See:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Individual student mood scores</li>
                  <li>Specific journal entries or notes</li>
                  <li>Which students are flagged for counselor attention</li>
                  <li>Any data that could identify a specific student</li>
                  <li>Exercise or mindfulness activity completion by individual</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Why this matters:</strong> Student wellbeing data is highly sensitive.
                  This privacy-first approach ensures students feel safe sharing their feelings
                  while giving you useful class-level insights to support your students
                  collectively.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Need to help an individual student?</strong> Contact{' '}
                  <span className="font-semibold">Ms. Priya (School Counselor)</span>, who has
                  access to individual data and can coordinate appropriate support.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() => setShowPrivacyModal(false)}
                className="w-full"
              >
                Got it
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
