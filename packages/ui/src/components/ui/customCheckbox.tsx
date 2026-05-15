import React from "react";

interface CheckboxProps {
  checked: boolean;
  className: string;
  onChange: (checked: boolean) => void;
  label?: string;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({
  checked,
  className,
  onChange,
  label,
}) => {
  return (
    <label
      className={`flex items-center space-x-2 cursor-pointer ${className}`}
    >
      <div
        className={`w-5 h-5 flex items-center justify-center border rounded ${
          checked
            ? "bg-blue-500 border-blue-500"
            : "bg-gray-100 border-gray-300"
        } transition-all duration-150`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      {label && (
        <span className="text-xs font-medium text-gray-700">{label}</span>
      )}
    </label>
  );
};

export default CustomCheckbox;
