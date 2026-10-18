import { useEffect, useRef, useState } from "react";
import { FiBookOpen, FiEdit3, FiMail, FiMapPin, FiPhone, FiUploadCloud, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { getStudentProfile, updateStudentAvatar, updateStudentInfo } from "../../services/studentService";

const blankProfile = { classLevel: "", board: "CBSE", subjects: [], bio: "", location: "", preferredTeachingMode: "both", budget: 0, seekingTutorFor: "regular tuition", availability: "" };

function StudentProfile() {
  const { setUser } = useAuth() || {};
  const uploadRef = useRef(null);
  const [user, setLocalUser] = useState({});
  const [profile, setProfile] = useState(blankProfile);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    getStudentProfile().then((data) => { if (active) { setLocalUser(data.user || {}); setProfile({ ...blankProfile, ...(data.profile || {}) }); } }).catch((error) => { if (active) setNotice(error.response?.data?.message || "Could not load your profile."); });
    return () => { active = false; };
  }, []);

  const updateUser = (event) => setLocalUser((current) => ({ ...current, [event.target.name]: event.target.value }));
  const updateProfile = (event) => setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  const save = async () => {
    setSaving("profile"); setNotice("");
    try { const data = await updateStudentInfo({ fullName: user.fullName, email: user.email, phone: user.phone, ...profile, budget: Number(profile.budget) || 0 }); setLocalUser(data.user); setProfile({ ...blankProfile, ...data.profile }); setUser?.((current) => ({ ...(current || {}), ...data.user, id: data.user._id || current?.id })); setEditing(false); setNotice(data.message); } catch (error) { setNotice(error.response?.data?.message || "Could not save your profile."); } finally { setSaving(""); }
  };
  const upload = async (event) => {
    const file = event.target.files?.[0]; event.target.value = "";
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/.test(file.type) || file.size > 2 * 1024 * 1024) { setNotice("Choose a PNG, JPG, or WEBP photo that is 2 MB or smaller."); return; }
    setSaving("avatar");
    try { const avatarData = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); }); const data = await updateStudentAvatar(avatarData); setLocalUser((current) => ({ ...current, ...data.user })); setUser?.((current) => ({ ...(current || {}), ...data.user })); setNotice(data.message); } catch (error) { setNotice(error.response?.data?.message || "Could not update your photo."); } finally { setSaving(""); }
  };

  return <section className="p-4 sm:p-8"><div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold text-amber-500">Student workspace</p><h1 className="text-3xl font-bold text-slate-900">My Profile</h1><p className="mt-1 text-slate-500">Keep your learning details up to date for tutors.</p></div><button type="button" onClick={() => setEditing((current) => !current)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"><FiEdit3 />{editing ? "Cancel" : "Edit details"}</button></div>{notice && <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{notice}</p>}<div className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center gap-5 border-b border-slate-100 pb-6"><div className="relative"><img src={user.avatarUrl || "/logo.png"} alt={user.fullName || "Student"} className="h-20 w-20 rounded-full bg-amber-100 object-cover" onError={(event) => { event.currentTarget.src = "/logo.png"; }} /><input ref={uploadRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={upload} /><button type="button" onClick={() => uploadRef.current?.click()} disabled={saving === "avatar"} className="absolute -bottom-1 -right-1 rounded-full bg-amber-400 p-2 text-slate-900"><FiUploadCloud /></button></div><div><h2 className="text-xl font-bold text-slate-900">{user.fullName || "Student"}</h2><p className="text-sm text-slate-500">Student account · {profile.classLevel || "Class not added"}</p></div></div>{editing ? <div className="mt-6 grid gap-4 md:grid-cols-2"><Field label="Full name" name="fullName" value={user.fullName} onChange={updateUser} /><Field label="Email" name="email" value={user.email} onChange={updateUser} /><Field label="Phone" name="phone" value={user.phone} onChange={updateUser} /><Field label="Class / grade" name="classLevel" value={profile.classLevel} onChange={updateProfile} /><Field label="Location" name="location" value={profile.location} onChange={updateProfile} /><Field label="Budget per hour" name="budget" type="number" value={profile.budget} onChange={updateProfile} /><label className="grid gap-1 text-sm text-slate-600">Board<select name="board" value={profile.board} onChange={updateProfile} className="rounded-lg border border-slate-200 px-3 py-2.5"><option>CBSE</option><option>ICSE</option><option>State Board</option><option>IB</option><option>University</option></select></label><label className="grid gap-1 text-sm text-slate-600">Preferred mode<select name="preferredTeachingMode" value={profile.preferredTeachingMode} onChange={updateProfile} className="rounded-lg border border-slate-200 px-3 py-2.5"><option value="both">Online or offline</option><option value="online">Online</option><option value="offline">Offline</option></select></label><Field label="Subjects (comma separated)" name="subjects" value={profile.subjects.join(", ")} onChange={(event) => setProfile((current) => ({ ...current, subjects: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) }))} /><label className="grid gap-1 text-sm text-slate-600 md:col-span-2">About your learning goals<textarea name="bio" value={profile.bio} onChange={updateProfile} rows="4" className="rounded-lg border border-slate-200 p-3" /></label><button type="button" onClick={save} disabled={saving === "profile"} className="rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-900 md:col-span-2">{saving === "profile" ? "Saving..." : "Save profile"}</button></div> : <div className="mt-6 grid gap-5 sm:grid-cols-2"><Info icon={<FiUser />} label="Full name" value={user.fullName} /><Info icon={<FiMail />} label="Email" value={user.email} /><Info icon={<FiPhone />} label="Phone" value={user.phone} /><Info icon={<FiMapPin />} label="Location" value={profile.location || "Not added"} /><Info icon={<FiBookOpen />} label="Subjects" value={profile.subjects.join(", ") || "Not added"} /><Info icon={<FiUser />} label="Learning budget" value={profile.budget ? `₹${profile.budget}/hr` : "Not added"} /></div>}</div></section>;
}
function Field({ label, ...props }) { return <label className="grid gap-1 text-sm text-slate-600">{label}<input {...props} className="rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:border-amber-400" /></label>; }
function Info({ icon, label, value }) { return <div className="flex gap-3"><span className="text-amber-500">{icon}</span><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm text-slate-800">{value || "Not added"}</p></div></div>; }
export default StudentProfile;
