import React from "react";

function StatsCards({ data, name, logo: Icon }) {
  return (

    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-5 border border-gray-200 rounded-lg sm:rounded-xl">

     
      <div className="w-6 h-6 flex items-center justify-center mb-1 sm:mb-2">
        {Icon && (
          <Icon
            size={20}
            className="text-purple-600"
          />
        )}
      </div>


      <h4 className="text-lg sm:text-2xl font-bold text-center leading-tight">
        {data}
      </h4>


      <h6 className="text-[10px] sm:text-sm text-center text-gray-600 mt-1 leading-tight">
        {name}
      </h6>

    </div>
  );
}

export default StatsCards;