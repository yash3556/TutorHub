import React from 'react'

function RecentReviews() {
  return (
    <div className='w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 sm:p-4 border border-gray-200 rounded-xl'>


      <div className="image h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-amber-400 shrink-0">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvt7bZ-VEJzkZ5HjDeqZruz9CC9xjVBRJi6QJrPd8E-Q&s"
          alt="pfp"
          className='object-cover w-full h-full'
        />
      </div>

      <div className="name w-full sm:w-1/3 min-w-0">
        <h1 className='text-sm sm:text-base font-semibold truncate'>
          Yash kushwaha
        </h1>

        <p className='text-xs sm:text-sm text-gray-500'>
          Class 10
          <span className='ml-2'>
            Mathematics
          </span>
        </p>
      </div>

      <div className="price w-full sm:w-1/2">
        <p className='text-xs sm:text-sm tracking-tighter text-gray-600 leading-relaxed'>
          Excelent way of teaching concepts are explained in such a simple manner
        </p>
      </div>

    </div>
  )
}

export default RecentReviews