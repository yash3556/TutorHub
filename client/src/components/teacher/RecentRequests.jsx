import fallbackAvatar from "../../assets/student.jpg";

function RecentRequests({ request, onView }) {
  const student = request?.student || {};
  return <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-2 border-gray-200 rounded-xl box-border">
    <div className="image h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-amber-400 shrink-0"><img src={student.avatarUrl || fallbackAvatar} alt={student.fullName || "Student"} className="object-cover w-full h-full" onError={(event) => { event.currentTarget.src = fallbackAvatar; }} /></div>
    <div className="name w-full sm:w-1/3 min-w-0"><h1 className="text-sm sm:text-base font-semibold truncate">{student.fullName || "Student"}</h1><p className="text-xs sm:text-sm text-gray-500">{request.classLevel}<span className="ml-2">{(request.subjects || []).join(", ")}</span></p></div>
    <div className="price shrink-0"><h1 className="text-sm sm:text-base font-medium">₹{request.budget}/hr</h1></div>
    <div className="button w-full sm:w-auto"><button type="button" onClick={onView} className="w-full sm:w-auto border border-yellow-500 rounded-md py-2 px-3 text-sm text-gray-700">View</button></div>
  </div>;
}

export default RecentRequests;
