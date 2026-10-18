import { useEffect, useMemo, useState } from "react";
import { FiAward, FiCalendar, FiCheckCircle, FiChevronDown, FiCopy, FiSend, FiSmile, FiStar } from "react-icons/fi";
import TeacherTopControls from "../../components/teacher/TeacherTopControls";
import fallbackAvatar from "../../assets/student.jpg";
import { getTeacherReviews } from "../../services/teacherService";
import "./Reviews.css";
import "./TeacherWorkspace.css";

const dateLabel = (date) => date ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date)) : "—";

function Reviews() {
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ averageRating: 0, ratingBreakdown: {}, count: 0 });
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    getTeacherReviews({ timeFilter }).then((data) => { if (active) { setReviews(data.reviews || []); setSummary({ averageRating: Number(data.averageRating || 0), ratingBreakdown: data.ratingBreakdown || {}, count: data.count || 0 }); } }).catch((requestError) => { if (active) setError(requestError.response?.data?.message || "Could not load reviews."); });
    return () => { active = false; };
  }, [timeFilter]);
  const tagScores = useMemo(() => {
    const values = new Map();
    reviews.forEach((review) => (review.tags || []).forEach((tag) => { const current = values.get(tag) || { total: 0, count: 0 }; values.set(tag, { total: current.total + Number(review.rating || 0), count: current.count + 1 }); }));
    return [...values.entries()].map(([label, value]) => ({ label, score: (value.total / value.count).toFixed(1) })).sort((a, b) => Number(b.score) - Number(a.score)).slice(0, 5);
  }, [reviews]);
  const profileUrl = `${window.location.origin}/teacher/profile`;
  const copyProfile = async () => { try { await navigator.clipboard.writeText(profileUrl); } catch { /* Clipboard can be unavailable in local HTTP previews. */ } setCopied(true); window.setTimeout(() => setCopied(false), 2200); };

  return <div className="reviews-page"><header className="reviews-header"><div><p className="reviews-kicker">Tutor workspace</p><h1>Reviews</h1><p>See feedback students have left after real sessions.</p></div><TeacherTopControls /></header><div className="reviews-filter"><label><FiCalendar /> Filter:<span><select value={timeFilter} onChange={(event) => setTimeFilter(event.target.value)}><option>All Time</option><option>Last 30 days</option><option>Last 90 days</option></select><FiChevronDown /></span></label></div>{error && <p className="text-sm text-red-700">{error}</p>}<section className="rating-summary"><div className="overall-rating"><p>Overall Rating</p><div className="rating-number">{summary.count ? summary.averageRating.toFixed(1) : "—"} <FiStar /></div><StarRating rating={summary.averageRating} large /><span>( {summary.count} Review{summary.count === 1 ? "" : "s"} )</span></div><div className="rating-breakdown">{[5, 4, 3, 2, 1].map((star) => { const count = summary.ratingBreakdown[`${star} Star${star === 1 ? "" : "s"}`] || 0; return <div key={star}><span>{star} Stars</span><i><b style={{ width: `${summary.count ? (count / summary.count) * 100 : 0}%` }} /></i><strong>{count}</strong></div>; })}</div><SummaryMetric icon={<FiSmile />} value={summary.count} label="Total Reviews" tone="violet" /><SummaryMetric icon={<FiAward />} value={summary.count ? summary.averageRating.toFixed(1) : "—"} label="Average Rating" tone="blue" /><SummaryMetric icon={<FiCheckCircle />} value={tagScores.length} label="Feedback Tags" tone="green" /></section><div className="reviews-content"><main className="reviews-main"><h2>Recent Reviews</h2><div className="review-list">{reviews.length ? reviews.map((review) => <ReviewCard key={review._id} review={review} />) : <p className="text-sm text-slate-500">No reviews for this period.</p>}</div></main><aside className="reviews-aside"><section className="review-side-card students-love"><h2>What Students Mention</h2>{tagScores.length ? tagScores.map((tag) => <div key={tag.label}><span><FiCheckCircle /> {tag.label}</span><b>{tag.score}</b></div>) : <p className="text-sm text-slate-500">Student feedback tags will appear here.</p>}</section><section className="review-side-card share-card"><h2>Copy Your Profile Link</h2><p>Use your profile link when sharing TutorHub with students.</p><div className="profile-link"><span>{profileUrl}</span><button type="button" onClick={copyProfile} aria-label="Copy profile link"><FiCopy /></button></div><button type="button" className="share-button" onClick={copyProfile}><FiSend /> {copied ? "Link Copied" : "Copy Profile Link"}</button></section></aside></div></div>;
}

function StarRating({ rating, large = false }) { return <div className={`star-rating ${large ? "large" : ""}`}>{[1, 2, 3, 4, 5].map((star) => <FiStar key={star} className={star <= Math.floor(rating) ? "filled" : star - rating < 1 ? "partial" : ""} />)}</div>; }
function SummaryMetric({ icon, value, label, tone }) { return <div className="review-metric"><span className={tone}>{icon}</span><strong>{value}</strong><small>{label}</small></div>; }
function ReviewCard({ review }) { const student = review.student || {}; return <article className="review-card"><img src={student.avatarUrl || fallbackAvatar} alt={`${student.fullName || "Student"}'s profile`} className="review-avatar" onError={(event) => { event.currentTarget.src = fallbackAvatar; }} /><div className="review-copy"><div className="review-title"><div><h3>{review.isAnonymous ? "Anonymous student" : student.fullName || "Student"}</h3><span>{review.classInfo || "Student feedback"}</span></div><time>{dateLabel(review.createdAt)}</time></div><div className="review-score"><StarRating rating={review.rating} /><strong>{Number(review.rating || 0).toFixed(1)}</strong></div><p>{review.comment}</p>{review.tags?.length > 0 && <div className="review-tags">{review.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}</div></article>; }

export default Reviews;
