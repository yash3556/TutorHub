import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiSearch, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { PiStudentFill } from "react-icons/pi";
import { useAuth } from "../../context/AuthContext";
import { getAvailableTeachers } from "../../services/studentService";
import TeachersList from "../../components/student/FindTeachers/TeachersList";

const emptyFilters = { search: "", subject: "", teachingMode: "" };
const navigation = [
  { to: "/student", label: "Dashboard", icon: FiHome, end: true },
  { to: "/FindTutor", label: "Find Tutor", icon: FiSearch },
  { to: "/student/profile", label: "My Profile", icon: FiUser },
  { to: "/student/requests", label: "My Requests", icon: FiUsers },
  { to: "/student/settings", label: "Settings", icon: FiSettings },
];

function FindTutor() {
  const { user } = useAuth() || {};
  const [filters, setFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
  const [teachers, setTeachers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pageSize = 10;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getAvailableTeachers({ ...appliedFilters, page, limit: pageSize })
      .then((response) => {
        if (!active) return;
        setTeachers(response.teachers || []);
        setTotal(response.total || 0);
      })
      .catch((requestError) => {
        if (!active) return;
        setTeachers([]);
        setTotal(0);
        setError(requestError.response?.data?.message || "Could not load tutors.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [appliedFilters, page]);

  const updateFilter = (event) => setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  const applyFilters = (event) => {
    event.preventDefault();
    setPage(1);
    setAppliedFilters({ ...filters, search: filters.search.trim() });
  };
  const resetFilters = () => {
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setPage(1);
  };
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <aside className="w-full shrink-0 border-b border-slate-200 bg-white md:sticky md:top-0 md:h-screen md:w-60 md:border-b-0 md:border-r lg:w-68">
        <div className="flex h-full flex-col px-3 py-4 sm:px-4 md:px-5 md:py-6">
          <div className="mb-4 flex items-center gap-2.5 md:mb-9">
            <PiStudentFill size={43} className="shrink-0 rounded-xl bg-amber-400 p-1.5 text-white shadow-sm shadow-amber-200" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Tutor<span className="text-primary">Hub</span></h1>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
            {navigation.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={label} to={to} end={end} className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-primary-light text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                <Icon className="text-lg text-amber-500" />{label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-8">
          <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Student workspace</p><h1 className="text-xl font-bold text-slate-900">Find a Tutor</h1></div>
          <div className="hidden text-right sm:block"><p className="text-sm font-semibold text-slate-800">{user?.fullName || "Student"}</p><p className="text-xs text-slate-500">Find the right tutor for you</p></div>
        </header>
        <section className="p-4 sm:p-8">
          <form onSubmit={applyFilters} className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr_220px_220px_auto]">
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3"><FiSearch className="text-slate-400" /><input name="search" value={filters.search} onChange={updateFilter} placeholder="Search by name, subject, or location" className="w-full py-2.5 text-sm outline-none" /></label>
              <select name="subject" value={filters.subject} onChange={updateFilter} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm"><option value="">All subjects</option><option>Mathematics</option><option>Science</option><option>English</option><option>History</option><option>Programming</option></select>
              <select name="teachingMode" value={filters.teachingMode} onChange={updateFilter} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm"><option value="">Any teaching mode</option><option value="online">Online</option><option value="offline">Offline</option></select>
              <div className="flex gap-2"><button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover">Search</button><button type="button" onClick={resetFilters} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Reset</button></div>
            </div>
          </form>
          <div className="mb-4"><h2 className="text-2xl font-bold text-slate-900"><span className="text-primary">{total}</span> Tutors Found</h2><p className="mt-1 text-sm text-slate-500">Browse verified tutor profiles and find help for your subjects.</p></div>
          {error && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {loading ? <p className="py-12 text-center text-sm text-slate-500">Loading tutors...</p> : <TeachersList teachers={teachers} />}
          {totalPages > 1 && <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm"><span className="text-slate-500">Page {page} of {totalPages}</span><div className="flex gap-2"><button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="rounded-md border px-3 py-2 disabled:opacity-40">Previous</button><button type="button" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-md border px-3 py-2 disabled:opacity-40">Next</button></div></div>}
        </section>
      </main>
    </div>
  );
}

export default FindTutor;
