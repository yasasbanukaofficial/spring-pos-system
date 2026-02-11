interface BadgeProps {
  text: string;
  active?: boolean;
}

export const Badge = ({ text, active }: BadgeProps) => (
  <span
    className={`px-2 py-0.5 text-[9px] uppercase tracking-widest border ${active ? "bg-white text-black border-white font-black" : "border-white/10 text-gray-500"}`}
  >
    {text}
  </span>
);
