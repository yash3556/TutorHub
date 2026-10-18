import React from "react";

function Input({
  type = "text",
  name,
  label,
  options = [],
  placeholder,
  value,
  onChange,
  className = "",
  id = name,
  required = false,
  maxLength,
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {type === "dropdown" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 ${className}`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={`w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 ${className}`}
        />
      )}
    </div>
  );
}

export default Input;