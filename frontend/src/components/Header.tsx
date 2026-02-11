import React from "react";
import { Bell, ChevronRight } from "lucide-react";
import type { TabType } from "../@types";

interface HeaderProps {
  activeTab: TabType;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  return (
    <header className="h-24 border-b border-white flex items-center justify-between px-10 sticky top-0 z-10 bg-black/80 backdrop-blur-md">
      <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
        ROOT <ChevronRight className="w-3 h-3 inline mx-1" /> {activeTab}
      </div>

      <div className="flex items-center gap-8">
        <button className="text-gray-600 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></span>
        </button>
        <div className="flex items-center gap-4 border-l border-white/20 pl-8">
          <div className="text-right">
            <p className="text-xs font-black uppercase tracking-tighter">
              Admin_Root
            </p>
            <p className="text-[9px] text-gray-500 font-mono">SEC_LVL_01</p>
          </div>
          <div className="w-10 h-10 border border-white flex items-center justify-center font-black">
            AR
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
