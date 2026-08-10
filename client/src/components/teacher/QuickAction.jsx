import React from "react";
import {
  PiUsersThree,
  PiPlusCircle,
  PiCalendarCheck,
  PiFileText,
  PiArrowRight,
} from "react-icons/pi";

function QuickAction({
  title = "Find Students",
  description = "Browse student requirements",
  icon: Icon = PiUsersThree,
  color = "purple",
}) {
  return (


    <div className="w-full flexitems-center justify-between gap-3 p-3 sm:p-4 md:p-5 border rounded-xl
    ">
      <div className="shrink-0">
        <Icon
          size={22}
          color={color}
          className="sm:w-6 sm:h-6"
        />
      </div>
      
      <div className="
        flex-1
        min-w-0
        px-1
        sm:px-2
      ">
        <h1 className="
          text-sm
          sm:text-base
          md:text-lg
          font-semibold
          truncate
        ">
          {title}
        </h1>

        <p className="
          text-xs
          sm:text-sm
          md:text-base
          text-gray-500
          truncate
        ">
          {description}
        </p>
      </div>


      <div className="shrink-0">
        <PiArrowRight
          size={20}
          className="sm:w-6 sm:h-6"
        />
      </div>

    </div>
  );
}

export default QuickAction;