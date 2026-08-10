import React from "react";
import { Link, Outlet } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";

function BecomeTutor() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col md:flex-row">

  
      <aside className="w-full md:w-60 lg:w-64 md:min-h-screen bg-white md:border-r border-gray-200">

        <div className="p-3 sm:p-4 md:p-5">

          <div className="flex items-center gap-2 mb-3 md:mb-8">

            <PiStudentFill
              size={40}
              className="text-white bg-yellow-400 p-1 rounded-md shrink-0"
            />

            <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
              Tutor<span className="text-yellow-400">Hub</span>
            </h1>

          </div>

          <nav className="
            flex
            gap-1
            overflow-x-auto
            md:flex-col
            md:overflow-visible
            pb-1
          ">

            <Link
              to="/teacher"
              className="whitespace-nowrap px-3 py-2 rounded-md hover:bg-blue-100 text-sm sm:text-base"
            >
              Dashboard
            </Link>

            <Link
              to="/teacher/find-students"
              className="whitespace-nowrap px-3 py-2 rounded-md hover:bg-blue-100 text-sm sm:text-base"
            >
              Find Students
            </Link>

            <Link
              to="/teacher/profile"
              className="whitespace-nowrap px-3 py-2 rounded-md hover:bg-blue-100 text-sm sm:text-base"
            >
              My Profile
            </Link>

            <Link
              to="/teacher/requests"
              className="whitespace-nowrap px-3 py-2 rounded-md hover:bg-blue-100 text-sm sm:text-base"
            >
              Requests
            </Link>

            <Link
              to="/teacher/reviews"
              className="whitespace-nowrap px-3 py-2 rounded-md hover:bg-blue-100 text-sm sm:text-base"
            >
              Reviews
            </Link>

            <Link
              to="/teacher/settings"
              className="whitespace-nowrap px-3 py-2 rounded-md hover:bg-blue-100 text-sm sm:text-base"
            >
              Settings
            </Link>

          </nav>

        </div>
      </aside>


      <main className="w-full min-w-0 flex-1">
        <Outlet />
      </main>

    </div>
  );
}

export default BecomeTutor;