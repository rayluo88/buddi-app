import { Routes, Route } from 'react-router-dom';
import { CounselorDashboard } from './CounselorDashboard';

export const CounselorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CounselorDashboard />} />
    </Routes>
  );
};
