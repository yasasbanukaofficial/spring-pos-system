import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="w-full px-4 py-3 bg-black border border-white/20 rounded-none text-xs font-mono text-white focus:border-white focus:outline-none transition-all placeholder:text-gray-800"
        {...props}
      />
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  defaultValue,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 bg-black border border-white/20 rounded-none text-xs font-mono text-white focus:border-white focus:outline-none transition-all appearance-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
