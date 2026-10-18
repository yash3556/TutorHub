import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/public/Home";
import FindTutor from "./pages/student/FindTutor";
import StudentLayout from "./components/student/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentRequests from "./pages/student/Requests";
import StudentSettings from "./pages/student/Settings";
import BecomeTutor from "./pages/teacher/BecomeTutor";
import Dashboard from "./pages/teacher/Dashboard";
import FindStudents from "./pages/teacher/FindStudents";
import MyProfile from "./pages/teacher/MyProfile";
import Requests from "./pages/teacher/Requests";
import Reviews from "./pages/teacher/Reviews";
import Settings from "./pages/teacher/Settings";
import TeacherStudentProfile from "./pages/teacher/StudentProfile";
import "./styles/global.css";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/FindTutor" element={<ProtectedRoute allowedRoles={["student"]}><FindTutor /></ProtectedRoute>} />
      <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentLayout /></ProtectedRoute>}>
        <Route index element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="requests" element={<StudentRequests />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>

      {/* Teacher workspace */}
      <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><BecomeTutor /></ProtectedRoute>}>

        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        <Route path="find-students" element={<FindStudents />} />
        <Route path="student/:id" element={<TeacherStudentProfile />} />

        {/* Profile */}
        <Route path="profile" element={<MyProfile />} />
        <Route path="requests" element={<Requests />} />

        {/* /teacher/reviews */}
        <Route path="reviews" element={<Reviews />} />
        <Route path="settings" element={<Settings />} />

      </Route>
      <Route path="/teachers/*" element={<Navigate to="/teacher" replace />} />

    </Routes>
  );
}

export default App;
