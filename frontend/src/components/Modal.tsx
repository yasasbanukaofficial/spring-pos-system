import React from "react";
import { X } from "lucide-react";
import { Input, Select } from "./FormControls";
import type { TabType } from "../@types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  editingItem: any | null;
  onSave: (type: TabType, data: any) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  editingItem,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-white rounded-none w-full max-w-md shadow-[0_0_50px_rgba(255,255,255,0.1)]">
        <div className="flex items-center justify-between p-8 border-b border-white">
          <h2 className="text-xl font-black uppercase tracking-tighter italic">
            {editingItem ? "Update" : "Initialize"} {activeTab.slice(0, -1)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data: any = Object.fromEntries(formData);
            if (data.stock) data.stock = Number(data.stock);
            if (data.price) data.price = Number(data.price);
            if (data.amount) data.amount = Number(data.amount);
            onSave(activeTab, data);
          }}
          className="p-8 space-y-6"
        >
          {activeTab === "customers" && (
            <>
              <Input
                label="Name_String"
                name="name"
                defaultValue={editingItem?.name}
                required
              />
              <Input
                label="Email_Addr"
                name="email"
                type="email"
                defaultValue={editingItem?.email}
                required
              />
              <Input
                label="Phone_Line"
                name="phone"
                defaultValue={editingItem?.phone}
              />
              <Select
                label="Status_Enum"
                name="status"
                options={["Active", "Inactive"]}
                defaultValue={editingItem?.status}
              />
            </>
          )}
          {activeTab === "items" && (
            <>
              <Input
                label="Resource_Label"
                name="name"
                defaultValue={editingItem?.name}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Qty_Int"
                  name="stock"
                  type="number"
                  defaultValue={editingItem?.stock}
                  required
                />
                <Input
                  label="Unit_Type"
                  name="unit"
                  placeholder="L / PCS"
                  defaultValue={editingItem?.unit}
                  required
                />
              </div>
              <Input
                label="Val_Float"
                name="price"
                type="number"
                step="0.01"
                defaultValue={editingItem?.price}
                required
              />
            </>
          )}
          {activeTab === "orders" && (
            <>
              <Input
                label="Client_ID"
                name="customerName"
                defaultValue={editingItem?.customerName}
                required
              />
              <Input
                label="Task_Type"
                name="service"
                defaultValue={editingItem?.service}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Cost_Val"
                  name="amount"
                  type="number"
                  step="0.01"
                  defaultValue={editingItem?.amount}
                  required
                />
                <Input
                  label="Timestamp"
                  name="date"
                  type="date"
                  defaultValue={
                    editingItem?.date || new Date().toISOString().split("T")[0]
                  }
                  required
                />
              </div>
              <Select
                label="State_Enum"
                name="status"
                options={["Ongoing", "Completed"]}
                defaultValue={editingItem?.status}
              />
            </>
          )}
          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-white text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Abort
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-white text-black font-black uppercase text-xs tracking-widest hover:invert transition-all"
            >
              Execute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
