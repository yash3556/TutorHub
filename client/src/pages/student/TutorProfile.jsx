import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiMapPin, FiMonitor, FiPhone } from "react-icons/fi";
import { getStudentDetails } from "../../services/teacherService";
import fallbackAvatar from "../../assets/student.jpg";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [student, setStudent] = useState(location.state?.student || null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getStudentDetails(id).then((data) => { if (active) setStudent(data.student); }).catch((requestError) => { if (active) setError(requestError.response?.data?.message || "Could not load student profile."); });
    return () => { active = false; };
  }, [id]);

  if (error) return <div className="p-8"><button type="button" className="text-violet-700" onClick={() => navigate("/teacher/find-students")}><FiArrowLeft className="inline" /> Back to students</button><p className="mt-5 text-red-700">{error}</p></div>;
  if (!student) return <div className="p-8 text-slate-500">Loading student profile…</div>;
  const user = student.user || {};
  return <main className="mx-auto max-w-4xl p-5 sm:p-10"><button type="button" className="mb-6 text-sm font-semibold text-violet-700" onClick={() => navigate("/teacher/find-students")}><FiArrowLeft className="inline mr-1" /> Back to students</button><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><img src={student.profileImageUrl || user.avatarUrl || fallbackAvatar} alt={user.fullName || "Student"} className="h-24 w-24 rounded-full object-cover" onError={(event) => { event.currentTarget.src = fallbackAvatar; }} /><div><h1 className="text-2xl font-bold text-slate-900">{user.fullName || "Student"}</h1><p className="mt-1 text-slate-600">{student.classLevel} · {student.board}</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><FiMapPin /> {student.location || "Location not added"}</p></div></div><div className="mt-7 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2"><Info icon={<FiBookOpen />} label="Subjects" value={(student.subjects || []).join(", ") || "Not specified"} /><Info icon={<FiMonitor />} label="Preferred mode" value={student.preferredTeachingMode || "Not specified"} /><Info icon={<FiPhone />} label="Availability" value={student.availability || "Not specified"} /><Info label="Budget" value={student.budget ? `₹${student.budget}/hr` : "Not specified"} /></div>{student.bio && <div className="mt-6 rounded-xl bg-slate-50 p-4"><h2 className="font-semibold">Learning requirement</h2><p className="mt-2 text-sm leading-6 text-slate-600">{student.bio}</p></div>}</section></main>;
}

function Info({ icon, label, value }) { return <div className="flex gap-3"><span className="mt-0.5 text-violet-600">{icon}</span><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 text-sm text-slate-800">{value}</p></div></div>; }

export default StudentProfile;
