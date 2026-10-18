import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiCheckCircle, FiChevronDown, FiClock, FiCreditCard, FiEye, FiLock, FiMapPin, FiSliders, FiTrash2, FiUploadCloud, FiUser } from "react-icons/fi";
import TeacherTopControls from "../../components/teacher/TeacherTopControls";
import fallbackAvatar from "../../assets/teacher.jpg";
import { useAuth } from "../../context/AuthContext";
import { deleteTeacherAccount, getProfileSettings, updateAvailability, updatePassword, updateTeacherAvatar, updateTeacherInfo } from "../../services/teacherService";
import "./Settings.css";
import "./TeacherWorkspace.css";

const settingLinks = [
  { id: "profile", icon: FiUser, title: "Profile Settings", text: "Update your personal details" },
  { id: "account", icon: FiLock, title: "Account Settings", text: "Email, password and security" },
  { id: "notifications", icon: FiBell, title: "Notification Settings", text: "Manage email and alerts" },
  { id: "availability", icon: FiClock, title: "Availability Settings", text: "Set your teaching availability" },
  { id: "privacy", icon: FiEye, title: "Privacy Settings", text: "Control your privacy" },
  { id: "payment", icon: FiCreditCard, title: "Payment Settings", text: "Manage payout and bank details" },
  { id: "preferences", icon: FiSliders, title: "Teaching Preferences", text: "Set subjects and experience" },
  { id: "danger", icon: FiTrash2, title: "Danger Zone", text: "Delete your account" },
];
const dayNames = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" };
const timeRanges = { morning: { start: "06:00", end: "12:00" }, afternoon: { start: "12:00", end: "16:00" }, evening: { start: "16:00", end: "21:00" }, night: { start: "21:00", end: "23:59" } };
const blankProfile = { location: "", availability: { timezone: "Asia/Kolkata", teachingMode: "both", weeklySchedule: [] }, preferences: { notifications: { requests: true, messages: true, reminders: true, promotions: false }, privacy: { showPhone: false, showEmail: false, visibility: "public" } } };

function Settings() {
  const refs = useRef({});
  const uploadRef = useRef(null);
  const navigate = useNavigate();
  const { user: contextUser, setUser: setContextUser, logout } = useAuth() || {};
  const [activeSection, setActiveSection] = useState("profile");
  const [notice, setNotice] = useState("");
  const [user, setUser] = useState(contextUser || {});
  const [profile, setProfile] = useState(blankProfile);
  const [days, setDays] = useState([]);
  const [slots, setSlots] = useState({ morning: false, afternoon: false, evening: false, night: false });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState("");

  const applyProfileResponse = useCallback((data) => {
    if (data.user) { setUser(data.user); setContextUser((current) => ({ ...(current || {}), ...data.user, id: data.user._id || current?.id })); }
    if (data.profile) {
      const saved = data.profile;
      const availability = { ...blankProfile.availability, ...(saved.availability || {}) };
      const preferences = { notifications: { ...blankProfile.preferences.notifications, ...(saved.preferences?.notifications || {}) }, privacy: { ...blankProfile.preferences.privacy, ...(saved.preferences?.privacy || {}) } };
      setProfile({ ...blankProfile, ...saved, availability, preferences });
      const selectedDays = Object.entries(dayNames).filter(([, longName]) => availability.weeklySchedule?.find((entry) => entry.day === longName)?.enabled).map(([shortName]) => shortName);
      setDays(selectedDays);
      const allSlots = availability.weeklySchedule?.flatMap((entry) => entry.slots || []) || [];
      setSlots({ morning: allSlots.some((slot) => slot.start === "06:00" && slot.end === "12:00"), afternoon: allSlots.some((slot) => slot.start === "12:00" && slot.end === "16:00"), evening: allSlots.some((slot) => slot.start === "16:00" && slot.end === "21:00"), night: allSlots.some((slot) => slot.start === "21:00" && slot.end === "23:59") });
    }
  }, [setContextUser]);
  useEffect(() => { let active = true; getProfileSettings().then((data) => { if (active) applyProfileResponse(data); }).catch((error) => { if (active) setNotice(error.response?.data?.message || "Could not load settings."); }); return () => { active = false; }; }, [applyProfileResponse]);
  const saveNotice = (message) => { setNotice(message); window.setTimeout(() => setNotice(""), 4500); };
  const focusSection = (id) => {
    setActiveSection(id);
    if (id === "payment") { navigate("/teacher/profile?tab=Bank%20Details"); return; }
    if (id === "preferences") { navigate("/teacher/profile?tab=Teaching%20Details"); return; }
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const updateUser = (event) => setUser((current) => ({ ...current, [event.target.name]: event.target.value }));
  const uploadAvatar = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/.test(file.type) || file.size > 2 * 1024 * 1024) { saveNotice("Choose a PNG, JPG, or WEBP photo that is 2 MB or smaller."); return; }
    setSaving("avatar");
    try { const avatarData = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); }); const data = await updateTeacherAvatar(avatarData); applyProfileResponse(data); saveNotice(data.message); } catch (error) { saveNotice(error.response?.data?.message || "Could not update profile photo."); } finally { setSaving(""); }
  };
  const saveProfile = async () => {
    setSaving("profile");
    try { const data = await updateTeacherInfo({ fullName: user.fullName, phone: user.phone, email: user.email, location: profile.location }); applyProfileResponse(data); saveNotice(data.message); } catch (error) { saveNotice(error.response?.data?.message || "Could not save profile settings."); } finally { setSaving(""); }
  };
  const savePreferences = async (key) => {
    setSaving(key);
    try { const data = await updateTeacherInfo({ preferences: profile.preferences }); applyProfileResponse(data); saveNotice(data.message); } catch (error) { saveNotice(error.response?.data?.message || "Could not save preferences."); } finally { setSaving(""); }
  };
  const persistAvailability = async () => {
    setSaving("availability");
    const selectedSlots = Object.entries(slots).filter(([, enabled]) => enabled).map(([key]) => timeRanges[key]);
    const weeklySchedule = Object.entries(dayNames).map(([shortName, day]) => ({ day, enabled: days.includes(shortName), slots: days.includes(shortName) ? selectedSlots : [] }));
    try { const data = await updateAvailability({ timezone: profile.availability.timezone || "Asia/Kolkata", teachingMode: profile.availability.teachingMode || "both", weeklySchedule }); setProfile((current) => ({ ...current, availability: data.availability })); saveNotice(data.message); } catch (error) { saveNotice(error.response?.data?.message || "Availability could not be saved."); } finally { setSaving(""); }
  };
  const savePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) { saveNotice("New password and confirmation do not match."); return; }
    setSaving("password");
    try { const data = await updatePassword({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword }); setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" }); saveNotice(data.message); } catch (error) { saveNotice(error.response?.data?.message || "Could not update password."); } finally { setSaving(""); }
  };
  const requestDelete = async () => {
    if (!window.confirm("Are you sure? This permanently deletes your tutor profile, requests, and reviews.")) return;
    setSaving("delete");
    try { await deleteTeacherAccount(); await logout(); navigate("/"); } catch (error) { saveNotice(error.response?.data?.message || "Could not delete your account."); } finally { setSaving(""); }
  };

  return <div className="settings-page"><header className="settings-header"><div><p className="settings-kicker">Tutor workspace</p><h1>Settings</h1><p>Manage your account, preferences and notifications.</p></div><TeacherTopControls /></header>{notice && <div className="settings-notice"><FiCheckCircle /> {notice}</div>}<div className="settings-layout"><aside className="settings-navigation">{settingLinks.map(({ id, icon: Icon, title, text }) => <button key={id} type="button" className={activeSection === id ? "active" : ""} onClick={() => focusSection(id)}><Icon /><span><strong>{title}</strong><small>{text}</small></span></button>)}</aside><main className="settings-main"><section className="settings-card profile-settings" id="profile" ref={(element) => { refs.current.profile = element; }}><SectionHeading title="Profile Settings" text="Update the information shown in your profile." /><div className="settings-fields"><SettingInput label="Full Name" name="fullName" value={user.fullName || ""} onChange={updateUser} /><SettingInput label="Phone Number" name="phone" value={user.phone || ""} onChange={updateUser} /><SettingInput label="Email Address" name="email" type="email" value={user.email || ""} onChange={updateUser} /><SettingInput label="Location" name="location" value={profile.location || ""} onChange={(event) => setProfile((current) => ({ ...current, location: event.target.value }))} icon={<FiMapPin />} /></div><div className="photo-setting"><img src={user.avatarUrl || fallbackAvatar} alt="Tutor profile" onError={(event) => { event.currentTarget.src = fallbackAvatar; }} /><div><span>Profile Photo</span><input ref={uploadRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadAvatar} hidden /><button type="button" disabled={saving === "avatar"} onClick={() => uploadRef.current?.click()}><FiUploadCloud /> {saving === "avatar" ? "Uploading..." : "Upload New Photo"}</button><small>JPG, PNG or WEBP. Max size 2MB</small></div></div><button type="button" disabled={saving === "profile"} className="settings-save profile-save" onClick={saveProfile}>{saving === "profile" ? "Saving..." : "Save Changes"}</button></section><section className="settings-card" id="account" ref={(element) => { refs.current.account = element; }}><SectionHeading title="Account Settings" text="Update your password securely." /><div className="account-row"><div><small>Email Address</small><strong>{user.email || "Not added"}</strong><em>{user.emailVerified ? "Verified" : "Not verified"}</em></div><button type="button" className="settings-outline" onClick={() => focusSection("profile")}>Edit email</button></div><div className="settings-fields mt-5"><SettingInput label="Current password" type="password" value={passwords.currentPassword} onChange={(event) => setPasswords((current) => ({ ...current, currentPassword: event.target.value }))} /><SettingInput label="New password" type="password" value={passwords.newPassword} onChange={(event) => setPasswords((current) => ({ ...current, newPassword: event.target.value }))} /><SettingInput label="Confirm new password" type="password" value={passwords.confirmPassword} onChange={(event) => setPasswords((current) => ({ ...current, confirmPassword: event.target.value }))} /></div><button type="button" disabled={saving === "password"} className="settings-save" onClick={savePassword}>{saving === "password" ? "Updating..." : "Update Password"}</button></section><section className="settings-card" id="privacy" ref={(element) => { refs.current.privacy = element; }}><SectionHeading title="Privacy Settings" text="Manage your profile visibility and contact details." /><div className="privacy-row"><div><strong>Profile Visibility</strong><small>Control who can find your profile</small></div><label className="settings-select"><select value={profile.preferences.privacy.visibility} onChange={(event) => setProfile((current) => ({ ...current, preferences: { ...current.preferences, privacy: { ...current.preferences.privacy, visibility: event.target.value } } }))}><option value="public">Public</option><option value="students">Students only</option><option value="private">Private</option></select><FiChevronDown /></label></div><ToggleRow label="Show Phone Number" text="Display your phone number on your public profile" checked={profile.preferences.privacy.showPhone} onChange={() => setProfile((current) => ({ ...current, preferences: { ...current.preferences, privacy: { ...current.preferences.privacy, showPhone: !current.preferences.privacy.showPhone } } }))} /><ToggleRow label="Show Email Address" text="Display your email address on your public profile" checked={profile.preferences.privacy.showEmail} onChange={() => setProfile((current) => ({ ...current, preferences: { ...current.preferences, privacy: { ...current.preferences.privacy, showEmail: !current.preferences.privacy.showEmail } } }))} /><button type="button" disabled={saving === "privacy"} className="settings-save" onClick={() => savePreferences("privacy")}>{saving === "privacy" ? "Saving..." : "Save Privacy"}</button></section></main><aside className="settings-side"><section className="settings-card" id="availability" ref={(element) => { refs.current.availability = element; }}><SectionHeading title="Availability Settings" text="Set when you are available to teach." /><div className="setting-group"><strong>Preferred Days</strong><div className="day-options">{Object.keys(dayNames).map((day) => <button type="button" key={day} className={days.includes(day) ? "selected" : ""} onClick={() => setDays((current) => current.includes(day) ? current.filter((item) => item !== day) : [...current, day])}>{day}</button>)}</div></div><div className="setting-group"><strong>Preferred Time Slots</strong>{[["morning", "Morning (6 AM - 12 PM)"], ["afternoon", "Afternoon (12 PM - 4 PM)"], ["evening", "Evening (4 PM - 9 PM)"], ["night", "Night (9 PM - 12 AM)"]].map(([key, label]) => <CheckRow key={key} label={label} checked={slots[key]} onChange={() => setSlots((current) => ({ ...current, [key]: !current[key] }))} />)}</div><button type="button" className="settings-save" disabled={saving === "availability"} onClick={persistAvailability}>{saving === "availability" ? "Saving..." : "Save Changes"}</button></section><section className="settings-card" id="notifications" ref={(element) => { refs.current.notifications = element; }}><SectionHeading title="Notification Settings" text="Choose what you want to be notified about." />{[["requests", "New student requests"], ["messages", "Messages from students"], ["reminders", "Session reminders"], ["promotions", "Promotions and updates"]].map(([key, label]) => <ToggleRow key={key} label={label} checked={profile.preferences.notifications[key]} onChange={() => setProfile((current) => ({ ...current, preferences: { ...current.preferences, notifications: { ...current.preferences.notifications, [key]: !current.preferences.notifications[key] } } }))} />)}<button type="button" disabled={saving === "notifications"} className="settings-save" onClick={() => savePreferences("notifications")}>{saving === "notifications" ? "Saving..." : "Save Preferences"}</button></section><section className="settings-card" id="payment" ref={(element) => { refs.current.payment = element; }}><SectionHeading title="Payment Settings" text="Bank details are managed securely in your profile." /><button type="button" className="settings-outline" onClick={() => navigate("/teacher/profile?tab=Bank%20Details")}>Manage Bank Details</button></section><section className="settings-card" id="preferences" ref={(element) => { refs.current.preferences = element; }}><SectionHeading title="Teaching Preferences" text="Update your subjects, headline, and experience." /><button type="button" className="settings-outline" onClick={() => navigate("/teacher/profile?tab=Teaching%20Details")}>Manage Teaching Profile</button></section><section className="settings-card danger-card" id="danger" ref={(element) => { refs.current.danger = element; }}><SectionHeading title="Danger Zone" text="This action cannot be undone." /><button type="button" disabled={saving === "delete"} className="delete-account" onClick={requestDelete}>{saving === "delete" ? "Deleting..." : "Delete Account"}</button></section></aside></div></div>;
}

function SectionHeading({ title, text }) { return <div className="settings-card-heading"><h2>{title}</h2><p>{text}</p></div>; }
function SettingInput({ label, icon, ...props }) { return <label className="setting-input"><span>{label}</span><div>{icon}<input {...props} /></div></label>; }
function ToggleRow({ label, text, checked, onChange }) { return <label className="toggle-row"><span><strong>{label}</strong>{text && <small>{text}</small>}</span><input type="checkbox" checked={Boolean(checked)} onChange={onChange} /><i><b /></i></label>; }
function CheckRow({ label, checked, onChange }) { return <label className="check-row"><input type="checkbox" checked={Boolean(checked)} onChange={onChange} /><i><FiCheckCircle /></i><span>{label}</span></label>; }

export default Settings;
