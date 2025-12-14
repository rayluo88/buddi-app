import { Routes, Route } from 'react-router-dom';
import { StudentDashboard } from './StudentDashboard';
import { StudentExercises } from './StudentExercises';
import { StudentMindfulness } from './StudentMindfulness';
import { AchievementsPage } from './AchievementsPage';

export const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/check-in" element={<div>Daily Check-in (Integrated in Dashboard)</div>} />
      <Route path="/exercises" element={<StudentExercises />} />
      <Route path="/mindfulness" element={<StudentMindfulness />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/progress" element={<div>Progress (Coming Soon)</div>} />
    </Routes>
  );
};
