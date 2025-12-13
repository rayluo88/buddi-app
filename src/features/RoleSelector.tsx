import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/Card';
import { DEMO_PERSONAS } from '../types';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const RoleSelector = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRoleSelect = (role: string) => {
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary-600 mb-2">{t('appName')}</h1>
          <p className="text-xl text-gray-600">{t('tagline')}</p>
          <div className="flex justify-center mt-4">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Demo Notice */}
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-warning-800 text-center">
            <strong>Demo Mode:</strong> Select a persona to explore different views
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_PERSONAS.map(persona => (
            <Card
              key={persona.id}
              className="cursor-pointer hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
              onClick={() => handleRoleSelect(persona.role)}
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-4xl font-bold">
                  {persona.name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{persona.name}</h3>
                <p className="text-gray-600 text-sm">{persona.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
