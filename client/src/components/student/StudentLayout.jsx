import { NavLink, Outlet } from "react-router-dom";
import { FiClipboard, FiHome, FiMoon, FiSearch, FiSettings, FiSun, FiUser } from "react-icons/fi";
import { PiStudentFill } from "react-icons/pi";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const navigation = [
  { to: "/student", label: "Dashboard", icon: FiHome, end: true },
  { to: "/FindTutor", label: "Find Tutor", icon: FiSearch },
  { to: "/student/profile", label: "My Profile", icon: FiUser },
  { to: "/student/requests", label: "My Requests", icon: FiClipboard },
  { to: "/student/settings", label: "Settings", icon: FiSettings },
];

function StudentLayout() {
  const { user } = useAuth() || {};
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="student-workspace min-h-screen bg-slate-50 md:flex">
      <aside className="w-full shrink-0 border-b border-slate-200 bg-white md:sticky md:top-0 md:h-screen md:w-60 md:border-b-0 md:border-r lg:w-68">
        <div className="flex h-full flex-col px-3 py-4 sm:px-4 md:px-5 md:py-6">
          <div className="mb-4 flex items-center gap-2.5 md:mb-9">
            <PiStudentFill size={43} className="shrink-0 rounded-xl bg-amber-400 p-1.5 text-white shadow-sm shadow-amber-200" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Tutor<span className="text-primary">Hub</span></h1>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
            {navigation.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-primary-light text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                <Icon className="text-lg text-amber-500" />{label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
      <main className="student-main-content min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-8">
          <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Student workspace</p><p className="text-xl font-bold text-slate-900">{user?.fullName || "Student"}</p></div>
          <div className="flex items-center gap-3 sm:gap-5">
          <p className="hidden text-sm text-slate-500 sm:block">Learn with the right tutor</p>
            <button
              type="button"
              className="student-theme-toggle"
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              aria-pressed={isDark}
              onClick={() => setIsDark((current) => !current)}
            >
              {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
              <span>{isDark ? "Light theme" : "Dark theme"}</span>
            </button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;
