interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...p }: InputProps) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-gray-500 uppercase">
      {label}
    </label>
    <input
      {...p}
      className="w-full px-4 py-2 bg-black border border-white/20 text-xs font-mono outline-none focus:border-white transition-colors"
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select = ({ label, options, ...p }: SelectProps) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-gray-500 uppercase">
      {label}
    </label>
    <select
      {...p}
      className="w-full px-4 py-2 bg-black border border-white/20 text-xs font-mono outline-none focus:border-white transition-colors"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
