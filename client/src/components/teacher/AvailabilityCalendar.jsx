import React from 'react'

function AvailabilityCalendar() {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-xl bg-white">
      
  
      <div className="shrink-0">
        <h4 className="inline-block bg-amber-400 px-3 py-2 text-black text-sm sm:text-md rounded-md">
          4:00 PM
        </h4>
      </div>

 
      <div className="w-full sm:w-1/3">
        <h1 className="text-base sm:text-lg font-semibold text-gray-800">
          Mathematics Session
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Yash Kushwaha
          <span className="ml-2 text-sm text-gray-400">
            Class 10
          </span>
        </p>
      </div>

      <div className="shrink-0">
        <h1 className="inline-block text-green-700 bg-green-100 px-3 py-2 border border-green-300 rounded-md text-sm font-medium">
          Confirmed
        </h1>
      </div>

  
      <div className="w-full sm:w-auto">
        <button className="w-full sm:w-auto border border-yellow-500 rounded-md py-2 px-4 text-gray-700 hover:bg-yellow-50 transition">
          View
        </button>
      </div>

    </div>
  )
}

export default AvailabilityCalendar