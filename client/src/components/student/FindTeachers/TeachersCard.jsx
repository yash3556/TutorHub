import fallbackAvatar from "../../../assets/teacher.jpg";

function TeachersCard({ teacher = {} }) {
  const user = teacher.user || {};
  const name = user.fullName || "Tutor";
  const mode = teacher.availability?.teachingMode;
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-400 hover:shadow-md">
      <div className="flex items-start gap-4">
        <img src={user.avatarUrl || fallbackAvatar} alt={name} className="h-16 w-16 shrink-0 rounded-full object-cover" onError={(event) => { event.currentTarget.src = fallbackAvatar; }} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-slate-900">{name}</h3>
          <p className="mt-1 text-sm text-slate-500">{teacher.headline || "Experienced tutor"}{teacher.location ? ` · ${teacher.location}` : ""}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{(teacher.subjects || []).slice(0, 4).map((subject) => <span key={subject} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">{subject}</span>)}</div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500"><span>{teacher.experienceYears || 0} years experience</span><span>{mode === "both" ? "Online or offline" : mode || "Flexible mode"}</span></div>
    </article>
  );
}

export default TeachersCard;
