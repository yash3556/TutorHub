import React from 'react'
import { useNavigate } from 'react-router-dom'
import fallbackAvatar from "../../../assets/student.jpg";

function StudentsCard({ student = {} }) {
  const navigate = useNavigate()
  
  const {
    user = {},
    classLevel = "Not specified",
    board = "Not specified",
    subjects = [],
    budget = 0,
    profileImageUrl = "",
  } = student;

  const handleViewProfile = () => {
    navigate(`/teacher/student/${student._id}`, { state: { student } })
  }

  const displayName = user?.fullName || "Student"
  const displayImage = profileImageUrl || user?.avatarUrl || fallbackAvatar

  return (
    <div className='w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-2 border-gray-200 rounded-xl box-border hover:border-yellow-400 transition'>
      <div className="image h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-amber-400 shrink-0">
        <img
          src={displayImage}
          alt={displayName}
          className='object-cover w-full h-full'
          onError={(e) => {
            e.target.src = fallbackAvatar
          }}
        />
      </div>

      <div className="name w-full sm:w-1/3 min-w-0">
        <h1 className='text-sm sm:text-base font-semibold truncate'>
          {displayName}
        </h1>
        <p className='text-xs sm:text-sm text-gray-500'>
          {classLevel}
          {board && <span className='ml-2'>{board}</span>}
        </p>
        {subjects.length > 0 && (
          <p className='text-xs text-purple-600 mt-1'>
            {subjects.slice(0, 2).join(", ")}
          </p>
        )}
      </div>

      <div className="price shrink-0">
        <h1 className='text-sm sm:text-base font-medium'>
          &#x20B9;{budget}/hr
        </h1>
      </div>

      <div className="button w-full sm:w-auto">
        <button 
          onClick={handleViewProfile}
          className='w-full sm:w-auto border border-yellow-500 rounded-md py-2 px-3 text-sm text-gray-700 hover:bg-yellow-50 transition'
        >
          View
        </button>
      </div>
    </div>
  )
}

export default StudentsCard
