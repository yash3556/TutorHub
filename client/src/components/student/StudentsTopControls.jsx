import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiCheck, FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { getTeacherRequests } from "../../services/teacherService";
import fallbackAvatar from "../../assets/teacher.jpg";
import "./TeacherTopControls.css";

const timeAgo = (date) => {
  const difference = Date.now() - new Date(date).getTime();
  const minutes = Math.max(0, Math.floor(difference / 60000));
  if (minutes < 60) return `${minutes || 1} min ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hr ago`;
  return `${Math.floor(minutes / 1440)} days ago`;
};

function TeacherTopControls() {
  const navigate = useNavigate();
  const { user, logout } = useAuth() || {};
  const containerRef = useRef(null);
  const [menu, setMenu] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [read, setRead] = useState(false);

  useEffect(() => {
    let active = true;
    getTeacherRequests({ status: "pending", sort: "latest" })
      .then(({ requests = [] }) => { if (active) setNotifications(requests.slice(0, 5)); })
      .catch(() => { if (active) setNotifications([]); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setMenu("");
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const visibleNotifications = read ? [] : notifications;
  const avatar = user?.avatarUrl || fallbackAvatar;
  const openNotification = () => {
    setRead(true);
    setMenu("");
    navigate("/teacher/requests?status=pending");
  };
  const signOut = async () => {
    try { await logout(); } finally { navigate("/"); }
  };

  return <div className="teacher-top-controls" ref={containerRef}>
    <button type="button" className="teacher-notification-toggle" aria-label="Open notifications" aria-expanded={menu === "notifications"} onClick={() => setMenu((current) => current === "notifications" ? "" : "notifications")}>
      <FiBell />{visibleNotifications.length > 0 && <span>{visibleNotifications.length}</span>}
    </button>
    <button type="button" className="teacher-account-toggle" aria-label="Open account menu" aria-expanded={menu === "account"} onClick={() => setMenu((current) => current === "account" ? "" : "account")}>
      <img src={avatar} alt={user?.fullName || "Your profile"} onError={(event) => { event.currentTarget.src = fallbackAvatar; }} />
      <span><strong>{user?.fullName || "Tutor"}</strong><small>{user?.role === "teacher" ? "Tutor" : "Account"}</small></span><FiChevronDown className={menu === "account" ? "open" : ""} />
    </button>
    {menu === "notifications" && <section className="teacher-popover notifications-popover">
      <header><div><strong>Notifications</strong><small>{visibleNotifications.length ? `${visibleNotifications.length} pending request${visibleNotifications.length === 1 ? "" : "s"}` : "You're all caught up"}</small></div>{visibleNotifications.length > 0 && <button type="button" onClick={() => setRead(true)}><FiCheck /> Mark all read</button>}</header>
      {visibleNotifications.length ? <div className="teacher-notification-list">{visibleNotifications.map((request) => <button type="button" key={request._id} onClick={openNotification}><span className="notification-dot" /><span><strong>New student request</strong><small>{request.student?.fullName || "A student"} needs help with {(request.subjects || []).join(", ") || "a subject"}.</small><em>{timeAgo(request.createdAt)}</em></span></button>)}</div> : <p className="empty-notifications">No new notifications.</p>}
    </section>}
    {menu === "account" && <section className="teacher-popover account-popover">
      <div className="account-popover-heading"><img src={avatar} alt="" onError={(event) => { event.currentTarget.src = fallbackAvatar; }} /><span><strong>{user?.fullName || "Tutor"}</strong><small>Tutor account</small></span></div>
      <button type="button" onClick={() => { setMenu(""); navigate("/teacher/profile"); }}><FiUser /> My Profile</button>
      <button type="button" onClick={() => { setMenu(""); navigate("/teacher/settings"); }}><FiSettings /> Account Settings</button>
      <button type="button" className="sign-out" onClick={signOut}><FiLogOut /> Sign out</button>
    </section>}
  </div>;
}

export default TeacherTopControls;
