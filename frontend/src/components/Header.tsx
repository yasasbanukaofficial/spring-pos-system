import React from "react";
import { Bell, ChevronRight, Sun, Moon } from "lucide-react";
import type { TabType } from "../@types";

interface HeaderProps {
  activeTab: TabType;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <header
      className="h-24 border-b flex items-center justify-between px-10 sticky top-0 z-10 backdrop-blur-md"
      style={{
        backgroundColor: isDarkMode
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        borderColor: isDarkMode
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]"
        style={{ color: isDarkMode ? "#6b6b6b" : "#4b5563" }}
      >
        ROOT <ChevronRight className="w-3 h-3 inline mx-1" /> {activeTab}
      </div>

      <div className="flex items-center gap-8">
        <button
          onClick={onToggleTheme}
          className="transition-colors"
          style={{ color: "#6b6b6b" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = isDarkMode ? "#ffffff" : "#000000")
          }
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        <button
          className="transition-colors relative"
          style={{ color: "#6b6b6b" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = isDarkMode ? "#ffffff" : "#000000")
          }
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
        >
          <Bell className="w-5 h-5" />
          <span
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: isDarkMode ? "#ffffff" : "#000000" }}
          ></span>
        </button>
        <div
          className="flex items-center gap-4 border-l pl-8"
          style={{
            borderColor: isDarkMode
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.12)",
          }}
        >
          <div className="text-right">
            <p
              className="text-xs font-black uppercase tracking-tighter"
              style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
            >
              Admin_Root
            </p>
            <p className="text-[9px] font-mono" style={{ color: "#6b6b6b" }}>
              SEC_LVL_01
            </p>
          </div>
          <div
            className="w-10 h-10 border flex items-center justify-center font-black"
            style={{
              borderColor: isDarkMode ? "#ffffff" : "#000000",
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            AR
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
