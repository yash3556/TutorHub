import { PiArrowRight, PiUsersThree } from "react-icons/pi";

function QuickAction({ title = "Find Students", description = "Browse student requirements", icon: Icon = PiUsersThree, color = "purple", onClick }) {
  return <button type="button" onClick={onClick} className="w-full flex items-center justify-between gap-3 p-3 sm:p-4 md:p-5 border rounded-xl text-left transition hover:border-violet-400 hover:bg-violet-50">
    <div className="shrink-0"><Icon size={22} color={color} className="sm:w-6 sm:h-6" /></div>
    <div className="flex-1 min-w-0 px-1 sm:px-2"><h1 className="text-sm sm:text-base md:text-lg font-semibold truncate">{title}</h1><p className="text-xs sm:text-sm md:text-base text-gray-500 truncate">{description}</p></div>
    <PiArrowRight size={20} className="sm:w-6 sm:h-6 shrink-0" />
  </button>;
}

export default QuickAction;
