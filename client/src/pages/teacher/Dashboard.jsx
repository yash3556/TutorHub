import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdStar } from "react-icons/md";
import { FaBookOpen, FaClock, FaUserGraduate, FaUsers } from "react-icons/fa";
import { PiCalendarCheck, PiFileText, PiPlusCircle, PiUsersThree } from "react-icons/pi";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import StatsCards from "../../components/teacher/StatsCards";
import RecentRequests from "../../components/teacher/RecentRequests";
import AvailabilityCalendar from "../../components/teacher/AvailabilityCalendar";
import QuickAction from "../../components/teacher/QuickAction";
import RecentReviews from "../../components/teacher/RecentReviews";
import WelcomeHeader from "../../components/teacher/WelcomeHeader";
import { getDashboardStats, getTeacherRequests, getTeacherReviews } from "../../services/teacherService";
import { useAuth } from "../../context/AuthContext";
import "./TeacherWorkspace.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [requests, setRequests] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([getDashboardStats(), getTeacherRequests({ sort: "latest" }), getTeacherReviews({ timeFilter: "All Time" })])
      .then(([statsResponse, requestsResponse, reviewsResponse]) => {
        if (!active) return;
        setStats(statsResponse.stats);
        setRequests(requestsResponse.requests || []);
        setReviews(reviewsResponse.reviews || []);
      })
      .catch((requestError) => { if (active) setError(requestError.response?.data?.message || "Could not load your dashboard."); });
    return () => { active = false; };
  }, []);

  const dashboardStats = useMemo(() => [
    { id: "active", title: "Active Students", value: stats?.activeStudents ?? "—", icon: FaUsers },
    { id: "accepted", title: "Accepted Sessions", value: stats?.acceptedRequests ?? "—", icon: FaUserGraduate },
    { id: "subjects", title: "Subjects", value: stats?.subjects ?? "—", icon: FaBookOpen },
    { id: "pending", title: "Pending Requests", value: stats?.pendingRequests ?? "—", icon: FaClock },
    { id: "completed", title: "Completed Sessions", value: stats?.completedRequests ?? "—", icon: PiCalendarCheck },
    { id: "rating", title: stats?.reviewCount ? "Average Rating" : "Reviews", value: stats?.reviewCount ? stats.averageRating.toFixed(1) : "—", icon: MdStar },
  ], [stats]);

  const actions = [
    { title: "Find Students", description: "Browse student requirements", icon: PiUsersThree, to: "/teacher/find-students" },
    { title: "Add Subject", description: "Update subjects you teach", icon: PiPlusCircle, to: "/teacher/profile?tab=Teaching%20Details" },
    { title: "Set Availability", description: "Update your available time", icon: PiCalendarCheck, to: "/teacher/profile?tab=Availability" },
    { title: "View Profile", description: "Edit your tutor profile", icon: PiFileText, to: "/teacher/profile" },
  ];
  const recentRequests = requests.slice(0, 4);
  const acceptedRequests = requests.filter((request) => request.status === "accepted").slice(0, 3);

  return <div className="teacher-dashboard-container">
    <WelcomeHeader />
    <main className="teacher-dashboard-content">
      <section className="dashboard-intro">
        <div className="dashboard-intro-copy">
          <span className="dashboard-kicker">Your teaching overview</span>
          <h1 className="dashboard-title">Welcome back, {user?.fullName || "Tutor"}</h1>
          <p className="dashboard-subtitle">Keep your requests moving and make time for your next great student match.</p>
          <div className="dashboard-status-line">
            <span><FiCheckCircle aria-hidden="true" /> Your workspace is ready</span>
            {stats?.pendingRequests > 0 && (
              <button type="button" onClick={() => navigate("/teacher/requests?status=pending")}>
                {stats.pendingRequests} request{stats.pendingRequests === 1 ? "" : "s"} need attention
                <FiArrowUpRight aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <div className="dashboard-action-group">
          <button type="button" onClick={() => navigate("/teacher/requests?status=accepted")} className="btn btn-primary dashboard-btn">View Sessions</button>
          <button type="button" onClick={() => navigate("/teacher/profile?tab=Availability")} className="btn btn-secondary dashboard-btn">Manage Availability</button>
        </div>
      </section>
      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <section className="statistics"><div className="stats-grid">{dashboardStats.map((item) => <StatsCards key={item.id} data={item.value} name={item.title} logo={item.icon} />)}</div></section>
      <section className="content-row dashboard-panels">
        <article className="dashboard-panel requests-panel"><div className="panel-header"><div><span className="panel-eyebrow">Student Activity</span><h2>Recent Requests</h2></div><button type="button" onClick={() => navigate("/teacher/requests")} className="icon-button">View all</button></div><div className="panel-list request-list">{recentRequests.length ? recentRequests.map((request) => <RecentRequests key={request._id} request={request} onView={() => navigate(`/teacher/requests?request=${request._id}`)} />) : <p className="text-sm text-gray-500">No student requests yet.</p>}</div></article>
        <article className="dashboard-panel schedule-panel"><div className="panel-header"><div><span className="panel-eyebrow">Confirmed</span><h2>Upcoming Sessions</h2></div><button type="button" onClick={() => navigate("/teacher/requests?status=accepted")} className="icon-button">View all</button></div><div className="panel-list schedule-list flex flex-col gap-6">{acceptedRequests.length ? acceptedRequests.map((request) => <AvailabilityCalendar key={request._id} request={request} onView={() => navigate(`/teacher/requests?request=${request._id}`)} />) : <p className="text-sm text-gray-500">Accepted student requests will appear here.</p>}</div></article>
      </section>
      <section className="content-row bottom-row">
        <article className="dashboard-panel quick-panel"><div className="panel-header"><div><span className="panel-eyebrow">Quick Actions</span><h2>Workspace</h2></div></div><div className="quick-actions-grid">{actions.map((action) => <QuickAction key={action.title} {...action} onClick={() => navigate(action.to)} />)}</div></article>
        <article className="dashboard-panel reviews-panel"><div className="panel-header"><div><span className="panel-eyebrow">Feedback</span><h2>Recent Reviews</h2></div><button type="button" onClick={() => navigate("/teacher/reviews")} className="icon-button">All reviews</button></div><div className="panel-list review-list">{reviews.slice(0, 4).length ? reviews.slice(0, 4).map((review) => <RecentReviews key={review._id} review={review} onView={() => navigate("/teacher/reviews")} />) : <p className="text-sm text-gray-500">No reviews yet.</p>}</div></article>
      </section>
    </main>
  </div>;
}

export default Dashboard;
