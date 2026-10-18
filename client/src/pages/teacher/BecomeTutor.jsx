import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { FiClipboard, FiEdit3, FiHome, FiMoon, FiSearch, FiSettings, FiStar, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import "./TeacherWorkspace.css";

const navigation = [
  { to: "/teacher", label: "Dashboard", icon: FiHome, end: true },
  { to: "/teacher/find-students", label: "Find Students", icon: FiSearch },
  { to: "/teacher/profile", label: "My Profile", icon: FiEdit3 },
  { to: "/teacher/requests", label: "Requests", icon: FiClipboard },
  { to: "/teacher/reviews", label: "Reviews", icon: FiStar },
  { to: "/teacher/settings", label: "Settings", icon: FiSettings },
];

function BecomeTutor() {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="teacher-workspace-layout min-h-screen w-full bg-slate-50 md:flex">
      <aside className="teacher-workspace-sidebar w-full border-b border-slate-200 bg-white md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:border-b-0 md:border-r lg:w-68">
        <div className="flex h-full flex-col px-3 py-4 sm:px-4 md:px-5 md:py-6">
          <div className="teacher-workspace-brand mb-4 flex items-center gap-2.5 md:mb-9">
            <PiStudentFill size={43} className="shrink-0 rounded-xl bg-amber-400 p-1.5 text-white shadow-sm shadow-amber-200" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Tutor<span className="text-primary">Hub</span></h1>
          </div>
          <nav className="teacher-workspace-navigation flex gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
            {navigation.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-primary-light text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <Icon className="text-lg text-amber-500" />
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="workspace-theme-toggle"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            aria-pressed={isDark}
            onClick={() => setIsDark((current) => !current)}
          >
            {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            <span>{isDark ? "Light theme" : "Dark theme"}</span>
          </button>
        </div>
      </aside>
      <main className="w-full min-w-0 flex-1">
        <Outlet />
      </main>

    </div>
  );
}

export default BecomeTutor;
