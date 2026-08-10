import React from 'react'
import { MdStar, MdPayments } from "react-icons/md";
import StatsCards from '../../components/teacher/StatsCards';
import RecentRequests from '../../components/teacher/RecentRequests';
import AvailabilityCalendar from '../../components/teacher/AvailabilityCalendar'
import QuickAction from '../../components/teacher/QuickAction'
import RecentReviews from '../../components/teacher/RecentReviews'
import WelcomeHeader from '../../components/teacher/WelcomeHeader'
import {
  FaUsers,
  FaUserGraduate,
  FaBookOpen,
  FaClock,
} from "react-icons/fa";
import {
  PiUsersThree,
  PiPlusCircle,
  PiCalendarCheck,
  PiFileText,
} from "react-icons/pi";

function Dashboard() {

  const dashboardStats = [
    {
      id: 1,
      title: "Students",
      value: 152,
      icon: FaUsers,
      color: "text-blue-500"
    },
    {
      id: 2,
      title: "Active Students",
      value: 94,
      icon: FaUserGraduate,
      color: "text-green-500"
    },
    {
      id: 3,
      title: "Courses",
      value: 8,
      icon: FaBookOpen,
      color: "text-purple-500"
    },
    {
      id: 4,
      title: "Pending Requests",
      value: 18,
      icon: FaClock,
      color: "text-orange-500"
    },
    {
      id: 5,
      title: "Rating",
      value: "4.9",
      icon: MdStar,
      color: "text-yellow-500"
    },
    {
      id: 6,
      title: "Monthly Earnings",
      value: "₹48.5K",
      icon: MdPayments,
      color: "text-emerald-500"
    }
  ];

  const actions = [
    {
      title: "Find Students",
      description: "Browse student requirements",
      icon: PiUsersThree,
    },
    {
      title: "Add Course",
      description: "Add a new course or subject",
      icon: PiPlusCircle,
    },
    {
      title: "Set Availability",
      description: "Update your available time",
      icon: PiCalendarCheck,
    },
    {
      title: "View Profile",
      description: "Preview your tutor profile",
      icon: PiFileText,
    },
  ];

  return (
    <div className='teacher-dashboard-container'>
      <WelcomeHeader />

      <main className="teacher-dashboard-content">
        <section className="dashboard-intro">
          <div>
            <span className="dashboard-kicker">Tutor Overview</span>
            <h1 className='dashboard-title'>Welcome back, Yash</h1>
          </div>
          <div className="dashboard-action-group">
            <button className="btn btn-primary dashboard-btn">+ Create Session</button>
            <button className="btn btn-secondary dashboard-btn">Manage Availability</button>
          </div>
        </section>

        <section className="statistics">
          <div className="stats-grid">
            {dashboardStats.map((item) => (
              <StatsCards
                key={item.id}
                data={item.value}
                name={item.title}
                logo={item.icon}
              />
            ))}
          </div>
        </section>

        <section className="content-row dashboard-panels">
          <article className="dashboard-panel requests-panel">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">Student Activity</span>
                <h2>Recent Requests</h2>
              </div>
              <button className="icon-button">View all</button>
            </div>
            <div className="panel-list request-list">
              <RecentRequests />
              <RecentRequests />
              <RecentRequests />
              <RecentRequests />
              <RecentRequests />
            </div>
          </article>

          <article className="dashboard-panel schedule-panel">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">Today</span>
                <h2>Today's Schedule</h2>
              </div>
              <button className="icon-button">Add</button>
            </div>
            <div className="panel-list schedule-list flex flex-col gap-6">
              <AvailabilityCalendar />
              <AvailabilityCalendar />
              <AvailabilityCalendar />
              <AvailabilityCalendar />
            </div>
          </article>
        </section>

        <section className="content-row bottom-row">
          <article className="dashboard-panel quick-panel">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">Quick Actions</span>
                <h2>Workspace</h2>
              </div>
            </div>
            <div className="quick-actions-grid">
              {actions.map((action, index) => (
                <QuickAction
                  key={index}
                  title={action.title}
                  description={action.description}
                  icon={action.icon}
                />
              ))}
            </div>
          </article>

          <article className="dashboard-panel reviews-panel">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">Feedback</span>
                <h2>Recent Reviews</h2>
              </div>
              <button className="icon-button">All reviews</button>
            </div>
            <div className="panel-list review-list">
              <RecentReviews />
              <RecentReviews />
              <RecentReviews />
              <RecentReviews />
              <RecentReviews />
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
