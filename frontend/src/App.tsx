import { useState } from "react";
import {
  Users,
  Package,
  ClipboardList,
  LogOut,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";
import type { PageID } from "./@types";
import { Dashboard } from "./pages/Dashboard";
import { CustomersPage } from "./pages/Customers";
import { InventoryPage } from "./pages/Inventory";
import { OrdersPage } from "./pages/Orders";

// --- Main Application Shell ---
export default function App() {
  const [currentPage, setCurrentPage] = useState<PageID>("dashboard");

  const nav = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Overview" },
    { id: "customers", icon: <Users size={18} />, label: "Customers" },
    { id: "items", icon: <Package size={18} />, label: "Inventory" },
    { id: "orders", icon: <ClipboardList size={18} />, label: "Orders" },
  ];

  return (
    <div className="min-h-screen bg-black flex font-mono text-white">
      <aside className="w-72 border-r border-white flex flex-col p-8 h-screen sticky top-0">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 bg-white" />
          <div className="text-2xl font-black italic uppercase underline underline-offset-8">
            AquaShine
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {nav.map((p) => (
            <button
              key={p.id}
              onClick={() => setCurrentPage(p.id as PageID)}
              className={`w-full flex items-center justify-between px-4 py-4 text-xs uppercase font-black transition-all ${currentPage === p.id ? "bg-white text-black" : "text-gray-500 hover:text-white border border-transparent"}`}
            >
              <div className="flex items-center gap-4">
                {p.icon} <span>{p.label}</span>
              </div>
              {currentPage === p.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>
        <button className="flex items-center gap-3 text-gray-600 hover:text-white text-xs font-black uppercase">
          <LogOut size={18} /> Terminate
        </button>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-20 border-b border-white px-12 flex items-center justify-between bg-black/80 backdrop-blur-lg sticky top-0 z-10">
          <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
            SYS_ROOT <ChevronRight size={10} className="inline" /> {currentPage}
          </div>
          <div className="w-10 h-10 border-2 border-white flex items-center justify-center font-black italic">
            AS
          </div>
        </header>
        <div className="p-12 max-w-6xl mx-auto w-full">
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "customers" && <CustomersPage />}
          {currentPage === "items" && <InventoryPage />}
          {currentPage === "orders" && <OrdersPage />}
        </div>
      </main>
    </div>
  );
}
