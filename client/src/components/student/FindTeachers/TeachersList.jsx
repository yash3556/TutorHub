import React from 'react'
import TeachersCard from "./TeachersCard";

function TeachersList({ teachers = [] }) {
  if (!teachers.length) return <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">No tutors found. Try adjusting your filters.</div>;

  return <div className="grid gap-4 xl:grid-cols-2">{teachers.map((teacher) => <TeachersCard key={teacher._id} teacher={teacher} />)}</div>;
}

export default TeachersList;
