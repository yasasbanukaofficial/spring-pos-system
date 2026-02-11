import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Input } from "../components/Input";
import type { Item } from "../@types";

export const InventoryPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [modal, setModal] = useState<{ open: boolean; edit: Item | null }>({
    open: false,
    edit: null,
  });

  const URL = "http://localhost:8080/api/v1/items";

  // 1. Fetch Method
  const fetchItems = async () => {
    try {
      const result = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const items = await result.json();
      setItems(items);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 2. Add/Edit Method
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      unitPrice: parseFloat(formData.get("unitPrice") as string),
      quantity: parseInt(formData.get("quantity") as string),
    };

    try {
      if (modal.edit) {
        // Update existing item
        const result = await fetch(`${URL}/${modal.edit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (result.ok) {
          await fetchItems();
        }
      } else {
        // Create new item
        const result = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (result.ok) {
          await fetchItems();
        }
      }
      setModal({ open: false, edit: null });
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  };

  // 3. Delete Method
  const handleDelete = async (id: string) => {
    if (!confirm("Purge resource from manifest?")) return;
    try {
      const result = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      if (result.ok) {
        await fetchItems();
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white pb-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Inventory_Log
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-[0.3em]">
            Module // Resource_Mgmt
          </p>
        </div>
        <button
          onClick={() => setModal({ open: true, edit: null })}
          className="bg-white text-black px-6 py-3 text-xs font-black uppercase"
        >
          New_Item
        </button>
      </div>

      <table className="w-full text-xs font-mono text-left">
        <thead className="bg-white text-black">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4 text-right">Unit Price</th>
            <th className="p-4 text-right">Quantity</th>
            <th className="p-4 text-right">Ops</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {items.map((i) => (
            <tr key={i.id} className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-gray-400">{i.id}</td>
              <td className="p-4 font-black uppercase">{i.name}</td>
              <td className="p-4 text-gray-400">{i.description}</td>
              <td className="p-4 text-right">${i.unitPrice.toFixed(2)}</td>
              <td className="p-4 text-right">{i.quantity}</td>
              <td className="p-4 text-right">
                <button
                  onClick={() => setModal({ open: true, edit: i })}
                  className="mr-4 text-gray-600 hover:text-white"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(i.id)}
                  className="text-gray-600 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal.open && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSave}
            className="bg-black border border-white w-full max-w-md p-8 space-y-4 shadow-2xl"
          >
            <h2 className="text-xl font-black uppercase italic border-b border-white pb-4">
              {modal.edit ? "Edit_Item" : "New_Item"}
            </h2>
            <Input
              label="Item_ID"
              name="id"
              defaultValue={modal.edit?.id}
              required
              disabled={!!modal.edit}
            />
            <Input
              label="Item_Name"
              name="name"
              defaultValue={modal.edit?.name}
              required
            />
            <Input
              label="Description"
              name="description"
              defaultValue={modal.edit?.description}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Unit_Price"
                name="unitPrice"
                type="number"
                step="0.01"
                min="0"
                defaultValue={modal.edit?.unitPrice}
                required
              />
              <Input
                label="Quantity"
                name="quantity"
                type="number"
                min="0"
                defaultValue={modal.edit?.quantity}
                required
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setModal({ open: false, edit: null })}
                className="flex-1 py-3 border border-white text-xs font-black uppercase"
              >
                Abort
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-white text-black text-xs font-black uppercase"
              >
                Commit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
