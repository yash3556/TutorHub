import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../../components/common/SearchBar";

function WelcomeHeader() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const submitSearch = (event) => {
    event.preventDefault();
    const value = search.trim();
    navigate(`/teacher/find-students${value ? `?search=${encodeURIComponent(value)}` : ""}`);
  };

  return <nav className="teacher-dashboard-topbar sticky top-0 z-50 flex h-14 w-full items-center justify-center px-3 sm:h-15 sm:px-5">
    <form onSubmit={submitSearch} className="teacher-search-form flex h-10 w-full items-center gap-2 rounded-xl px-3 sm:w-3/4 md:w-2/3 lg:w-1/2 sm:px-4">
      <FaSearch className="teacher-search-icon shrink-0 text-sm sm:text-base" />
      <SearchBar type="search" name="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students by name, class, or subject..." className="outline-none w-full px-2 sm:px-3 py-2 bg-transparent text-sm sm:text-base" />
    </form>
  </nav>;
}

export default WelcomeHeader;
