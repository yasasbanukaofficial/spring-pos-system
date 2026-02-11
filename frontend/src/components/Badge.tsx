import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-transparent text-gray-500 border border-white/10",
    success: "bg-white text-black border border-white font-black",
    warning: "bg-transparent text-white border border-white/40",
    danger: "bg-transparent text-white border border-white font-bold",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-none text-[9px] uppercase tracking-[0.15em] ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
