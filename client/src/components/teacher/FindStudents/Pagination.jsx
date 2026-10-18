import React from 'react'

function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null

  const handlePageChange = (nextPage) => {
    if (nextPage >= 1 && nextPage <= totalPages && onPageChange) {
      onPageChange(nextPage)
    }
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    
    <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-4 sm:flex-row">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
            className={`h-9 min-w-9 rounded-md border px-3 text-sm font-medium ${
              page === currentPage
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
