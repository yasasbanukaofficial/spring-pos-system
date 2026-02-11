import React from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import type { TabType } from "../@types";

interface Column {
  key: string;
  label: string;
  render?: (val: any, item: any) => React.ReactNode;
}

interface ManagementViewProps {
  title: string;
  type: TabType;
  data: any[];
  columns: Column[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

const ManagementView: React.FC<ManagementViewProps> = ({
  title,
  type,
  data,
  columns,
  searchQuery,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
}) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white pb-6">
      <div>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          {title}
        </h1>
        <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mt-1">
          Directory / {type}
        </p>
      </div>
      <button
        onClick={onAdd}
        className="bg-white text-black px-6 py-3 rounded-none text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
      >
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Entry
        </div>
      </button>
    </div>

    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
        <input
          type="text"
          placeholder="FILTER_DATABASE..."
          className="w-full pl-12 pr-4 py-4 bg-transparent border border-white/20 rounded-none text-xs font-mono text-white focus:border-white focus:outline-none placeholder:text-gray-700 uppercase"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-white text-black">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 font-black uppercase tracking-tighter"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-right font-black uppercase tracking-tighter">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 border-b border-white/10">
            {data
              .filter((item) =>
                Object.values(item).some((val) =>
                  val
                    ?.toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                ),
              )
              .map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/5 transition-colors group border-x border-transparent hover:border-white/20"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-5 text-gray-400 group-hover:text-white transition-colors"
                    >
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-gray-600 hover:text-white transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-gray-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default ManagementView;
