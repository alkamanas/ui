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
            ? "bg-primary border-primary"
            : "bg-muted border-border"
        } transition-all duration-150`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-primary-foreground"
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
        <span className="text-xs font-medium text-foreground">{label}</span>
      )}
    </label>
  );
};

export default CustomCheckbox;
