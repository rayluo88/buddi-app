import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export const CounselorHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">{t('counselor.title')}</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" onClick={() => navigate('/')}>
              {t('switchRole')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-2">Welcome, Ms. Priya</h2>
        <p className="text-gray-600 mb-8">School Counselor Dashboard</p>

        <Card>
          <h3 className="text-xl font-semibold mb-4">{t('counselor.priority_queue.title')}</h3>
          <p className="text-gray-600 mb-4">{t('counselor.priority_queue.subtitle')}</p>
          <div className="text-center py-12 text-gray-500">
            Priority queue and student management features coming in Phase 4
          </div>
        </Card>
      </main>
    </div>
  );
};
