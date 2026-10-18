import { useEffect, useState } from "react";
import { getStudentRequests } from "../../services/studentService";

const statusClasses = { pending: "bg-amber-50 text-amber-700", accepted: "bg-emerald-50 text-emerald-700", declined: "bg-red-50 text-red-700", completed: "bg-blue-50 text-blue-700", cancelled: "bg-slate-100 text-slate-600" };

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { let active = true; getStudentRequests().then((data) => { if (active) setRequests(data.requests || []); }).catch((requestError) => { if (active) setError(requestError.response?.data?.message || "Could not load your requests."); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  return <section className="p-4 sm:p-8"><div className="mb-6"><p className="text-sm font-semibold text-amber-500">Student workspace</p><h1 className="text-3xl font-bold text-slate-900">My Requests</h1><p className="mt-1 text-slate-500">Track your tutor enquiries and confirmed sessions.</p></div>{error && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}{loading ? <p className="text-slate-500">Loading requests...</p> : requests.length ? <div className="space-y-4">{requests.map((request) => <article key={request._id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-semibold text-slate-900">{request.teacher?.fullName || "Tutor"}</h2><p className="mt-1 text-sm text-slate-500">{(request.subjects || []).join(", ") || "Subject not specified"} · {request.preferredTeachingMode || "Flexible"}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[request.status] || statusClasses.pending}`}>{request.status}</span></div><div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3"><span>Budget: ₹{request.budget}/hr</span><span>Preferred time: {request.preferredTime || "Not specified"}</span><span>Requested: {new Date(request.createdAt).toLocaleDateString("en-IN")}</span></div>{request.message && <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{request.message}</p>}</article>)}</div> : <div className="rounded-xl border border-dashed border-slate-300 bg-white py-14 text-center text-slate-500">You have not sent any tutor requests yet.</div>}</section>;
}

export default Requests;
