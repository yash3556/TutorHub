import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiChevronDown, FiClock, FiHome, FiMoreHorizontal, FiMonitor, FiRotateCcw, FiSend } from "react-icons/fi";
import TeacherTopControls from "../../components/teacher/TeacherTopControls";
import fallbackAvatar from "../../assets/student.jpg";
import { getTeacherRequests, updateRequestStatus } from "../../services/teacherService";
import "./Requests.css";

const statuses = ["all", "pending", "accepted", "completed", "declined"];
const labelFor = (status) => status === "all" ? "All Requests" : `${status.charAt(0).toUpperCase()}${status.slice(1)}`;
const dateLabel = (date) => date ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date)) : "—";
const modeLabel = (mode) => ({ online: "Online", offline: "Offline", both: "Online or offline" }[mode] || "Not specified");

function Requests() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requests, setRequests] = useState([]);
  const [activeFilter, setActiveFilter] = useState(searchParams.get("status") || "all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [expandedId, setExpandedId] = useState(searchParams.get("request") || "");

  const loadRequests = useCallback(async () => {
    setLoading(true); setError("");
    try { const data = await getTeacherRequests({ sort: sortOrder === "oldest" ? "oldest" : "latest" }); setRequests(data.requests || []); } catch (requestError) { setError(requestError.response?.data?.message || "Could not load student requests."); } finally { setLoading(false); }
  }, [sortOrder]);
  useEffect(() => { loadRequests(); }, [loadRequests]);
  useEffect(() => { const status = searchParams.get("status"); const request = searchParams.get("request"); if (statuses.includes(status)) setActiveFilter(status); if (request) setExpandedId(request); }, [searchParams]);
  const counts = useMemo(() => Object.fromEntries(statuses.map((status) => [status, status === "all" ? requests.length : requests.filter((request) => request.status === status).length])), [requests]);
  const visibleRequests = useMemo(() => activeFilter === "all" ? requests : requests.filter((request) => request.status === activeFilter), [activeFilter, requests]);
  const selectFilter = (status) => { setActiveFilter(status); setSearchParams(status === "all" ? {} : { status }, { replace: true }); };
  const updateStatus = async (id, status) => {
    setSavingId(id); setNotice("");
    try { const data = await updateRequestStatus(id, status); setRequests((current) => current.map((request) => request._id === id ? data.request : request)); setNotice(data.message); } catch (requestError) { setNotice(requestError.response?.data?.message || "Could not update this request."); } finally { setSavingId(""); }
  };

  return <div className="requests-page"><header className="requests-header"><div><p className="request-kicker">Tutor workspace</p><h1>Requests</h1><p>Manage and respond to student requests.</p></div><TeacherTopControls /></header><section className="requests-toolbar" aria-label="Request controls"><div className="request-filters">{statuses.map((status) => <button key={status} type="button" onClick={() => selectFilter(status)} className={activeFilter === status ? "active" : ""}>{labelFor(status)}<span>{counts[status]}</span></button>)}</div><label className="sort-control">Sort by:<span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="latest">Latest First</option><option value="oldest">Oldest First</option></select><FiChevronDown /></span></label></section>{notice && <div className="request-notice"><FiSend /> {notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}{error && <div className="request-notice text-red-700">{error}<button type="button" onClick={loadRequests}><FiRotateCcw /> Retry</button></div>}<main className="requests-list">{loading ? <p className="text-sm text-slate-500">Loading requests…</p> : visibleRequests.length ? visibleRequests.map((request) => <RequestCard key={request._id} request={request} expanded={expandedId === request._id} saving={savingId === request._id} onToggle={() => setExpandedId((current) => current === request._id ? "" : request._id)} onUpdate={updateStatus} />) : <div className="requests-empty"><FiMoreHorizontal /><h2>No {activeFilter === "all" ? "" : activeFilter} requests</h2><p>New student enquiries will appear here.</p></div>}</main><footer className="requests-footer"><p>Showing {visibleRequests.length} of {requests.length} requests</p></footer></div>;
}

function RequestCard({ request, expanded, saving, onToggle, onUpdate }) {
  const student = request.student || {};
  const isPending = request.status === "pending";
  const isAccepted = request.status === "accepted";
  const statusName = request.status.charAt(0).toUpperCase() + request.status.slice(1);
  return <article className="request-card"><div className="student-summary"><img src={student.avatarUrl || fallbackAvatar} alt={`${student.fullName || "Student"}'s profile`} className="student-avatar" onError={(event) => { event.currentTarget.src = fallbackAvatar; }} /><div className="student-info"><h2>{student.fullName || "Student"}</h2><div className="student-tags"><span className="level-tag">{request.classLevel}</span><span>{request.board}</span></div><p className="subject-line">{(request.subjects || []).join(" • ") || "No subjects specified"}</p><p className="student-description">{request.description || "No additional description provided."}</p></div></div><div className="request-preferences"><RequestDetail icon={<FiClock />} label="Preferred Time" value={request.preferredTime || "Not specified"} /><RequestDetail icon={request.preferredTeachingMode === "online" ? <FiMonitor /> : <FiHome />} label="Mode" value={modeLabel(request.preferredTeachingMode)} /></div><div className="request-budget"><small>Budget</small><strong>₹{request.budget}<span> /hr</span></strong><small>Duration</small><p><FiClock /> {request.duration || "Not specified"}</p></div><div className="request-actions"><span className={`status-pill ${request.status}`}>{statusName}</span><small>Requested on</small><strong>{dateLabel(request.createdAt)}</strong><div className="request-card-buttons">{isPending && <><button type="button" disabled={saving} className="outline-danger" onClick={() => onUpdate(request._id, "declined")}>Decline</button><button type="button" disabled={saving} className="primary-action" onClick={() => onUpdate(request._id, "accepted")}>{saving ? "Saving..." : "Accept"}</button></>}{isAccepted && <><button type="button" className="outline-action" onClick={onToggle}>{expanded ? "Hide Details" : "View Details"}</button><button type="button" disabled={saving} className="primary-action" onClick={() => onUpdate(request._id, "completed")}>{saving ? "Saving..." : "Mark Completed"}</button></>}{!isPending && !isAccepted && <button type="button" className="wide-outline" onClick={onToggle}>{expanded ? "Hide Details" : "View Details"}</button>}</div></div>{expanded && <div className="col-span-full mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"><strong>Student contact</strong><p className="mt-1">{student.email || "Email not available"}{student.phone ? ` · ${student.phone}` : ""}</p>{request.message && <><strong className="block mt-3">Tutor response</strong><p className="mt-1">{request.message}</p></>}</div>}</article>;
}

function RequestDetail({ icon, label, value }) { return <div className="request-detail"><span>{icon}</span><div><small>{label}</small><strong>{value}</strong></div></div>; }

export default Requests;
