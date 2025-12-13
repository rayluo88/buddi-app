import { Routes, Route } from 'react-router-dom';
import { TeacherDashboard } from './TeacherDashboard';

export const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TeacherDashboard />} />
    </Routes>
  );
};
