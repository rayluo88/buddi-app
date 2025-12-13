import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RoleSelector } from './features/RoleSelector';
import { StudentRoutes } from './features/student/StudentRoutes';
import { CounselorRoutes } from './features/counselor/CounselorRoutes';
import { TeacherRoutes } from './features/teacher/TeacherRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/counselor/*" element={<CounselorRoutes />} />
        <Route path="/teacher/*" element={<TeacherRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
