import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Input } from "../components/Input";
import type { Customer } from "../@types";

export const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [modal, setModal] = useState<{ open: boolean; edit: Customer | null }>({
    open: false,
    edit: null,
  });

  const URL = "http://localhost:8080/api/v1/customers";

  // 1. Fetch Method
  const fetchCustomers = async () => {
    try {
      const result = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const customers = await result.json();
      setCustomers(customers);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 2. Add/Edit Method
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      id: modal.edit ? modal.edit.id : (formData.get("id") as string),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    };

    try {
      if (modal.edit) {
        // Update existing customer
        const result = await fetch(URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (result.ok) {
          await fetchCustomers();
        }
      } else {
        // Create new customer
        const result = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (result.ok) {
          await fetchCustomers();
        }
      }
      setModal({ open: false, edit: null });
    } catch (error) {
      console.error("Failed to save customer:", error);
    }
  };

  // 3. Delete Method
  const handleDelete = async (id: string) => {
    if (!confirm("Terminate customer record?")) return;
    try {
      const result = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      if (result.ok) {
        await fetchCustomers();
      }
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white pb-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Customer_Registry
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-[0.3em]">
            Module // Users_Core
          </p>
        </div>
        <button
          onClick={() => setModal({ open: true, edit: null })}
          className="bg-white text-black px-6 py-3 text-xs font-black uppercase"
        >
          Add_Entry
        </button>
      </div>

      <table className="w-full text-xs font-mono text-left">
        <thead className="bg-white text-black">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4 text-right">Ops</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-gray-400">{c.id}</td>
              <td className="p-4 font-black">{c.name}</td>
              <td className="p-4 text-gray-400">{c.email}</td>
              <td className="p-4 text-right">
                <button
                  onClick={() => setModal({ open: true, edit: c })}
                  className="mr-4 text-gray-600 hover:text-white"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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
              {modal.edit ? "Edit_Customer" : "New_Customer"}
            </h2>
            <Input
              label="Customer_ID"
              name="id"
              defaultValue={modal.edit?.id}
              required
              disabled={!!modal.edit}
            />
            <Input
              label="Customer_Name"
              name="name"
              defaultValue={modal.edit?.name}
              required
            />
            <Input
              label="Email_Address"
              name="email"
              type="email"
              defaultValue={modal.edit?.email}
              required
            />
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
                Execute
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
