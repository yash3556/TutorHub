import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/public/Home";
import FindTutor from "./pages/student/FindTutor";

import BecomeTutor from "./pages/teacher/BecomeTutor";
import Dashboard from "./pages/teacher/Dashboard";
import FindStudents from "./pages/teacher/FindStudents";
import MyProfile from "./pages/teacher/MyProfile";

import "./styles/global.css";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/FindTutor" element={<FindTutor />} />

      {/* Teacher Layout */}
      <Route path="/teacher" element={<BecomeTutor />}>

        {/* /teacher → Dashboard */}
        <Route index element={<Dashboard />} />

        {/* /teacher/find-students */}
        <Route path="find-students" element={<FindStudents />} />

        {/* /teacher/profile */}
        <Route path="profile" element={<MyProfile />} />

      </Route>

    </Routes>
  );
}

export default App;