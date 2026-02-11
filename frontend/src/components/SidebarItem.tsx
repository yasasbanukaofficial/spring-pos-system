import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 group relative ${
        active
          ? "bg-white text-black font-black"
          : "text-gray-600 hover:text-white"
      }`}
    >
      <span className="z-10">{icon}</span>
      <span className="font-black text-xs uppercase tracking-widest z-10">
        {label}
      </span>
      {active && (
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white -mr-0.5"></div>
      )}
    </button>
  );
};

export default SidebarItem;
