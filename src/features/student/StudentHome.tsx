import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export const StudentHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('student');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">{t('appName', { ns: 'common' })}</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" onClick={() => navigate('/')}>
              {t('common.switchRole', { ns: 'common' })}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('greeting', { name: 'Wei Ling' })}</h2>
          <p className="text-gray-600">{t('common.welcome', { ns: 'common' })}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('streak.label')}</p>
                <p className="text-3xl font-bold text-primary-600">5 🔥</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm text-gray-600">{t('xp.label')}</p>
              <p className="text-3xl font-bold text-secondary-600">275 XP</p>
              <p className="text-xs text-gray-500">{t('xp.level', { level: 3 })}</p>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm text-gray-600">Total Check-ins</p>
              <p className="text-3xl font-bold text-success-600">12</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="primary" className="w-full py-4 text-lg">
              📝 {t('navigation.checkIn', { ns: 'common' })}
            </Button>
            <Button variant="secondary" className="w-full py-4 text-lg">
              🧘 {t('navigation.mindfulness', { ns: 'common' })}
            </Button>
            <Button variant="ghost" className="w-full py-4 text-lg">
              💪 {t('navigation.exercises', { ns: 'common' })}
            </Button>
            <Button variant="ghost" className="w-full py-4 text-lg">
              📊 {t('navigation.progress', { ns: 'common' })}
            </Button>
          </div>
        </Card>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h4 className="font-semibold text-primary-800 mb-2">Phase 0 Complete! 🎉</h4>
          <p className="text-sm text-primary-700">
            Project foundation is set up. Features will be implemented in upcoming phases.
          </p>
        </div>
      </main>
    </div>
  );
};
