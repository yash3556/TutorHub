import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FindStudentsHeader from "../../components/teacher/FindStudents/FindStudentsHeader";
import StudentFilters from "../../components/teacher/FindStudents/StudentFilters";
import QuickFilters from "../../components/teacher/FindStudents/QuickFilters";
import StudentsList from "../../components/teacher/FindStudents/StudentsList";
import Pagination from "../../components/teacher/FindStudents/Pagination";
import { getAvailableStudents } from "../../services/teacherService";
import Loader from "../../components/common/Loader";

const emptyFilters = { classLevel: "", subject: "", board: "", search: "", minBudget: "", maxBudget: "", availability: "", preferredTeachingMode: "" };

function FindStudents() {
  const pageSize = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [filters, setFilters] = useState(() => ({ ...emptyFilters, search: searchParams.get("search") || "" }));
  const [appliedFilters, setAppliedFilters] = useState(() => ({ ...emptyFilters, search: searchParams.get("search") || "" }));

  useEffect(() => {
    const querySearch = searchParams.get("search") || "";
    setFilters((current) => current.search === querySearch ? current : { ...current, search: querySearch });
    setAppliedFilters((current) => current.search === querySearch ? current : { ...current, search: querySearch });
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getAvailableStudents({ ...appliedFilters, page: currentPage, limit: pageSize })
      .then((response) => { if (active) { setStudents(response.students || []); setTotalStudents(response.total || 0); } })
      .catch((requestError) => { if (active) { setError(requestError.response?.data?.message || "Failed to fetch students"); setStudents([]); setTotalStudents(0); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [appliedFilters, currentPage]);

  const applyFilters = (event) => {
    event?.preventDefault();
    setCurrentPage(1);
    setAppliedFilters(filters);
    const next = new URLSearchParams();
    if (filters.search.trim()) next.set("search", filters.search.trim());
    setSearchParams(next, { replace: true });
  };
  const resetFilters = () => {
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };
  const totalPages = Math.ceil(totalStudents / pageSize);
  const startStudent = totalStudents === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endStudent = Math.min(currentPage * pageSize, totalStudents);

  return <div className="flex flex-col gap-6 p-4 sm:p-10">
    <FindStudentsHeader search={filters.search} onSearchChange={(search) => setFilters((current) => ({ ...current, search }))} onSearch={applyFilters} />
    <form onSubmit={applyFilters} className="w-full rounded-xl border border-gray-200 bg-white p-7 shadow-sm"><StudentFilters onFilterChange={setFilters} currentFilters={filters} /><QuickFilters onFilterChange={setFilters} currentFilters={filters} /><div className="btn flex items-center justify-end gap-5 mt-6"><button type="button" onClick={resetFilters} className="border rounded-sm px-3 py-2 hover:bg-gray-100">Reset</button><button type="submit" className="rounded-sm bg-primary px-3 py-2 text-white hover:bg-primary-hover">Apply Filters</button></div></form>
    {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}
    <div className="number"><h1 className="font-bold text-2xl"><span className="text-yellow-500">{totalStudents}</span> Students Found</h1><p className="text-gray-500 tracking-tight">{totalStudents === 0 ? "No students found matching your criteria" : `Showing ${startStudent}-${endStudent} of ${totalStudents} students`}</p></div>
    {loading ? <div className="flex justify-center items-center py-12"><Loader /></div> : <><StudentsList students={students} pageSize={pageSize} />{totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}</>}
  </div>;
}

export default FindStudents;
