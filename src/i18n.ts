import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import English translations
import enCommon from './i18n/en/common.json';
import enStudent from './i18n/en/student.json';
import enCounselor from './i18n/en/counselor.json';
import enTeacher from './i18n/en/teacher.json';
import enExercises from './i18n/en/exercises.json';

// Import Chinese translations
import zhCommon from './i18n/zh/common.json';
import zhStudent from './i18n/zh/student.json';
import zhCounselor from './i18n/zh/counselor.json';
import zhTeacher from './i18n/zh/teacher.json';
import zhExercises from './i18n/zh/exercises.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      student: enStudent,
      counselor: enCounselor,
      teacher: enTeacher,
      exercises: enExercises,
    },
    zh: {
      common: zhCommon,
      student: zhStudent,
      counselor: zhCounselor,
      teacher: zhTeacher,
      exercises: zhExercises,
    },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'student', 'counselor', 'teacher', 'exercises'],
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
