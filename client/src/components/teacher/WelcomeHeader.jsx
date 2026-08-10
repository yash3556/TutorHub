import React from 'react'
import { FaSearch } from "react-icons/fa";
import SearchBar from '../../components/common/SearchBar'

function WelcomeHeader() {
  return (
    <nav className='w-full shadow-lg h-14 sm:h-15 flex items-center justify-center sticky top-0 z-50 px-3 sm:px-5'>


      <div className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-blue-100 h-9 sm:h-10 rounded-md flex items-center justify-start gap-2 px-2 sm:px-3'>

        <FaSearch className='text-sm sm:text-base shrink-0' />


        <SearchBar
          type="text"
          name="search"
          placeholder="Search..."
          className='outline-none w-full px-2 sm:px-3 py-2 bg-transparent text-sm sm:text-base'
        />

      </div>

    </nav>
  )
}

export default WelcomeHeader