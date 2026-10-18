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

  return <nav className="w-full shadow-lg h-14 sm:h-15 flex items-center justify-center sticky top-0 z-50 px-3 sm:px-5">
    <form onSubmit={submitSearch} className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-blue-100 h-9 sm:h-10 rounded-md flex items-center justify-start gap-2 px-2 sm:px-3">
      <FaSearch className="text-sm sm:text-base shrink-0" />
      <SearchBar type="search" name="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students by name, class, or subject..." className="outline-none w-full px-2 sm:px-3 py-2 bg-transparent text-sm sm:text-base" />
    </form>
  </nav>;
}

export default WelcomeHeader;
