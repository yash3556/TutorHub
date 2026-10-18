function TeachersFilters({ onFilterChange, currentFilters = {} }) {
  const update = (event) => {
    const { name, value } = event.target;
    onFilterChange({ ...currentFilters, [name]: value });
  };
  const selects = [
    { name: "subject", label: "Subject", placeholder: "All subjects", options: ["Mathematics", "Science", "English", "History", "Geography", "Programming", "DSA"] },
    { name: "classLevel", label: "Class / Grade", placeholder: "All classes", options: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "BCA 1st Year", "BCA 2nd Year", "BCA 3rd Year"] },
    { name: "board", label: "Board", placeholder: "All boards", options: ["CBSE", "ICSE", "State Board", "IB", "University"] },
    { name: "availability", label: "Availability", placeholder: "Any availability", options: ["Weekday", "Weekend"] },
    { name: "preferredTeachingMode", label: "Teaching mode", placeholder: "Any mode", options: [["online", "Online"], ["offline", "Offline"], ["both", "Either"]] },
  ];
  return <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">{selects.map((filter) => <label key={filter.name} className="flex flex-col gap-2"><span className="text-sm font-medium text-gray-700">{filter.label}</span><select name={filter.name} value={currentFilters[filter.name] || ""} onChange={update} className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-500"><option value="">{filter.placeholder}</option>{filter.options.map((option) => { const [value, label] = Array.isArray(option) ? option : [option, option]; return <option key={value} value={value}>{label}</option>; })}</select></label>)}<label className="flex flex-col gap-2"><span className="text-sm font-medium text-gray-700">Budget (₹ / hr)</span><div className="flex gap-2"><input type="number" min="0" name="minBudget" value={currentFilters.minBudget || ""} onChange={update} placeholder="Min" className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-500" /><input type="number" min="0" name="maxBudget" value={currentFilters.maxBudget || ""} onChange={update} placeholder="Max" className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-500" /></div></label></div>;
}

export default TeachersFilters;
