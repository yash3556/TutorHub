import { FiStar } from "react-icons/fi";
import fallbackAvatar from "../../assets/student.jpg";

function RecentReviews({ review, onView }) {
  const student = review?.student || {};
  return <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 sm:p-4 border border-gray-200 rounded-xl">
    <div className="image h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-amber-400 shrink-0"><img src={student.avatarUrl || fallbackAvatar} alt={student.fullName || "Student"} className="object-cover w-full h-full" onError={(event) => { event.currentTarget.src = fallbackAvatar; }} /></div>
    <div className="name w-full sm:w-1/4 min-w-0"><h1 className="text-sm sm:text-base font-semibold truncate">{student.fullName || "Student"}</h1><p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1"><FiStar className="text-amber-500" /> {Number(review.rating || 0).toFixed(1)}</p></div>
    <div className="price w-full sm:w-1/2"><p className="text-xs sm:text-sm tracking-tighter text-gray-600 leading-relaxed">{review.comment}</p></div>
    <button type="button" onClick={onView} className="border border-yellow-500 rounded-md py-2 px-3 text-sm text-gray-700">View</button>
  </div>;
}

export default RecentReviews;
