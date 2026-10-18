import React from 'react'
import StudentsCard from './StudentsCard'

function StudentsList({ students = [], pageSize = 10 }) {
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No students found. Try adjusting your filters.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {students.map((student) => (
        <StudentsCard key={student._id} student={student} />
      ))}
    </div>
  )
}

export default StudentsList
