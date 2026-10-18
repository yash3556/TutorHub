function QuickFilters({ onFilterChange, currentFilters }) {
  const filters = [
    { id: "high-budget", label: "High budget (₹500+)", values: { minBudget: "500" } },
    { id: "weekdays", label: "Weekday availability", values: { availability: "Weekday" } },
    { id: "weekends", label: "Weekend availability", values: { availability: "Weekend" } },
    { id: "online", label: "Online preferred", values: { preferredTeachingMode: "online" } },
  ];
  return <div className="flex items-center justify-start gap-4 mt-6 flex-wrap"><h2 className="text-blue-500 text-sm font-semibold">Quick filters:</h2><div className="flex flex-wrap gap-3">{filters.map((filter) => {
    const selected = Object.entries(filter.values).every(([key, value]) => currentFilters[key] === value);
    return <button type="button" key={filter.id} onClick={() => onFilterChange({ ...currentFilters, ...filter.values })} className={`rounded-lg px-4 py-2 text-sm font-medium transition ${selected ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>{filter.label}</button>;
  })}</div></div>;
}

export default QuickFilters;
