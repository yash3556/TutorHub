import { useNavigate } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheckCircle,
  FiClipboard,
  FiSearch,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

const actions = [
  {
    title: "Find a tutor",
    text: "Explore tutors who match your subjects and learning style.",
    label: "Start exploring",
    icon: FiSearch,
    to: "/FindTutor",
    theme: "gold",
  },
  {
    title: "My requests",
    text: "Check responses and keep track of your tutor requests.",
    label: "Track requests",
    icon: FiClipboard,
    to: "/student/requests",
    theme: "blue",
  },
  {
    title: "My profile",
    text: "Keep your learning goals and contact details up to date.",
    label: "Edit profile",
    icon: FiUser,
    to: "/student/profile",
    theme: "purple",
  },
  {
    title: "Settings",
    text: "Manage your account, notifications, and privacy.",
    label: "Manage settings",
    icon: FiSettings,
    to: "/student/settings",
    theme: "green",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth() || {};

  return (
    <section className="student-dashboard">
      <div className="student-dashboard-hero">
        <div className="student-dashboard-hero-copy">
          <span className="student-dashboard-kicker">
            <FiBookOpen aria-hidden="true" /> Your learning space
          </span>
          <h1>Welcome back, {user?.fullName || "Student"}!</h1>
          <p>
            Your next learning breakthrough starts here. Find the right tutor,
            follow your requests, and make this space your own.
          </p>
          <button
            type="button"
            className="student-dashboard-primary"
            onClick={() => navigate("/FindTutor")}
          >
            Find your tutor <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>
        <div className="student-dashboard-hero-art" aria-hidden="true">
          <span className="student-dashboard-orbit student-dashboard-orbit-one" />
          <span className="student-dashboard-orbit student-dashboard-orbit-two" />
          <span className="student-dashboard-book"><FiBookOpen /></span>
          <span className="student-dashboard-art-check"><FiCheckCircle /></span>
        </div>
      </div>

      <div className="student-dashboard-section-heading">
        <div>
          <span className="student-dashboard-section-label">Your workspace</span>
          <h2>What would you like to do?</h2>
        </div>
        <p>Everything you need, just a click away.</p>
      </div>

      <div className="student-dashboard-actions">
        {actions.map(({ title, text, label, icon: Icon, to, theme }) => (
          <button
            type="button"
            key={title}
            className={`student-dashboard-card student-dashboard-card-${theme}`}
            onClick={() => navigate(to)}
          >
            <span className="student-dashboard-card-icon">
              <Icon aria-hidden="true" />
            </span>
            <span className="student-dashboard-card-title">{title}</span>
            <span className="student-dashboard-card-description">{text}</span>
            <span className="student-dashboard-card-link">
              {label} <FiArrowUpRight aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
