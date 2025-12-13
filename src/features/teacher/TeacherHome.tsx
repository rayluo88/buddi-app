import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export const TeacherHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">{t('teacher.title')}</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" onClick={() => navigate('/')}>
              {t('common.switchRole')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-2">Welcome, Mr. Tan</h2>
        <p className="text-gray-600 mb-8">Form Teacher - Class 2A</p>

        <Card>
          <h3 className="text-xl font-semibold mb-4">
            {t('teacher.class_pulse.title', { className: '2A' })}
          </h3>
          <p className="text-gray-600 mb-4">Aggregate class wellbeing metrics</p>
          <div className="text-center py-12 text-gray-500">
            Class dashboard and analytics coming in Phase 5
          </div>
        </Card>

        <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-sm text-primary-800">
            <strong>{t('teacher.privacy.notice')}</strong>
            <br />
            {t('teacher.privacy.subtitle')}
          </p>
        </div>
      </main>
    </div>
  );
};
