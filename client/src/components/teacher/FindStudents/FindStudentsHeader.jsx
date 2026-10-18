import { FaSearch } from "react-icons/fa";
import SearchBar from "../../../components/common/SearchBar";

function FindStudentsHeader({ search, onSearchChange, onSearch }) {
  return <nav className="w-full shadow-lg min-h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-50 px-3 py-3 sm:px-5 bg-white">
    <div><h1 className="text-lg sm:text-xl font-bold">Find Students</h1><p className="text-sm text-gray-600">Browse and connect with students who need your help.</p></div>
    <form onSubmit={onSearch} className="w-full sm:w-3/6 md:w-2/5 lg:w-1/4 bg-blue-100 h-9 sm:h-10 rounded-md flex items-center justify-start gap-2 px-2 sm:px-3"><FaSearch className="text-sm sm:text-base shrink-0" /><SearchBar type="search" name="search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search students..." className="outline-none w-full px-2 sm:px-3 py-2 bg-transparent text-sm sm:text-base" /></form>
  </nav>;
}

export default FindStudentsHeader;
