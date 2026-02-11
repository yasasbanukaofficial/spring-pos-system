import React from "react";
import {
  Users,
  Package,
  ClipboardList,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import type { TabType } from "../@types";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-72 border-r border-white flex flex-col p-8 sticky top-0 h-screen">
      <div className="flex items-center gap-2 mb-16">
        <div className="w-8 h-8 bg-white flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-black"></div>
        </div>
        <span className="text-2xl font-black italic tracking-tighter uppercase underline decoration-2 underline-offset-4">
          AquaShine
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-6">
          Database_Access
        </p>
        <SidebarItem
          icon={<Users className="w-4 h-4" />}
          label="Customers"
          active={activeTab === "customers"}
          onClick={() => onTabChange("customers")}
        />
        <SidebarItem
          icon={<Package className="w-4 h-4" />}
          label="Inventory"
          active={activeTab === "items"}
          onClick={() => onTabChange("items")}
        />
        <SidebarItem
          icon={<ClipboardList className="w-4 h-4" />}
          label="Orders"
          active={activeTab === "orders"}
          onClick={() => onTabChange("orders")}
        />

        <div className="pt-12">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-6">
            Sys_Config
          </p>
          <SidebarItem
            icon={<Settings className="w-4 h-4" />}
            label="Terminal"
          />
          <SidebarItem icon={<HelpCircle className="w-4 h-4" />} label="Logs" />
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-white/20">
        <button className="flex items-center gap-3 text-gray-600 hover:text-white transition-colors w-full uppercase font-black text-xs tracking-widest">
          <LogOut className="w-4 h-4" />
          <span>Terminate</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
