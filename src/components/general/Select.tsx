import React from "react";

type SelectProps = {
  name: string;
  idHtmlFor: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required: boolean;
  disabled: boolean;
  className?: string;
};

const Select = ({
  name,
  idHtmlFor,
  value,
  options,
  onChange,
  required,
  disabled,
  className = "",
}: SelectProps) => {
  return (
    <>
      <select
        name={name}
        id={idHtmlFor}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 border text-sm border-[#e5e7eb] text-theme-gray rounded focus:outline-none focus:border-theme-blue ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        } ${className}`}>
        {options.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
