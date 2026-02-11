import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ManagementView from "./components/ManagementView";
import Modal from "./components/Modal";
import Badge from "./components/Badge";
import type { Customer, InventoryItem, Order, TabType } from "./@types";

// --- Initial Data ---

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "555-0101",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-0102",
    status: "Inactive",
  },
];

const INITIAL_ITEMS: InventoryItem[] = [
  { id: "1", name: "Premium Soap", stock: 45, unit: "Liters", price: 12.5 },
  {
    id: "2",
    name: "Microfiber Towels",
    stock: 120,
    unit: "Pieces",
    price: 2.0,
  },
  { id: "3", name: "Car Wax", stock: 8, unit: "Cans", price: 25.0 },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    service: "Full Body Wash",
    amount: 25.0,
    status: "Completed",
    date: "2023-10-25",
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    service: "Interior Detailing",
    amount: 45.0,
    status: "Ongoing",
    date: "2023-10-26",
  },
];

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("customers");
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // UI State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // CRUD Actions
  const handleSave = (type: TabType, data: any) => {
    if (editingItem) {
      if (type === "customers")
        setCustomers((prev) =>
          prev.map((i) =>
            i.id === editingItem.id ? { ...data, id: i.id } : i,
          ),
        );
      if (type === "items")
        setItems((prev) =>
          prev.map((i) =>
            i.id === editingItem.id ? { ...data, id: i.id } : i,
          ),
        );
      if (type === "orders")
        setOrders((prev) =>
          prev.map((i) =>
            i.id === editingItem.id ? { ...data, id: i.id } : i,
          ),
        );
    } else {
      const newId = Math.random().toString(36).substr(2, 9);
      if (type === "customers")
        setCustomers((prev) => [...prev, { ...data, id: newId }]);
      if (type === "items")
        setItems((prev) => [...prev, { ...data, id: newId }]);
      if (type === "orders")
        setOrders((prev) => [
          ...prev,
          { ...data, id: `ORD-${newId.toUpperCase()}` },
        ]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (type: TabType, id: string) => {
    if (type === "customers")
      setCustomers((prev) => prev.filter((i) => i.id !== id));
    if (type === "items") setItems((prev) => prev.filter((i) => i.id !== id));
    if (type === "orders") setOrders((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-black flex font-mono text-white selection:bg-white selection:text-black">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        <Header activeTab={activeTab} />

        {/* Dynamic Content Area */}
        <div className="p-12 max-w-6xl w-full mx-auto">
          {activeTab === "customers" && (
            <ManagementView
              title="Customers"
              type="customers"
              data={customers}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAdd={() => {
                setEditingItem(null);
                setIsModalOpen(true);
              }}
              onEdit={(item) => {
                setEditingItem(item);
                setIsModalOpen(true);
              }}
              onDelete={(id) => handleDelete("customers", id)}
              columns={[
                {
                  key: "name",
                  label: "Identity",
                  render: (val) => (
                    <span className="font-black text-white uppercase">
                      {val}
                    </span>
                  ),
                },
                { key: "email", label: "E-Mail" },
                { key: "phone", label: "Comms" },
                {
                  key: "status",
                  label: "Access",
                  render: (val) => (
                    <Badge variant={val === "Active" ? "success" : "default"}>
                      {val}
                    </Badge>
                  ),
                },
              ]}
            />
          )}

          {activeTab === "items" && (
            <ManagementView
              title="Inventory"
              type="items"
              data={items}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAdd={() => {
                setEditingItem(null);
                setIsModalOpen(true);
              }}
              onEdit={(item) => {
                setEditingItem(item);
                setIsModalOpen(true);
              }}
              onDelete={(id) => handleDelete("items", id)}
              columns={[
                {
                  key: "name",
                  label: "Resource",
                  render: (val) => (
                    <span className="font-black text-white uppercase">
                      {val}
                    </span>
                  ),
                },
                {
                  key: "stock",
                  label: "Quantity",
                  render: (val, item) => (
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          val < 10
                            ? "underline decoration-dotted underline-offset-4 text-white font-black"
                            : ""
                        }
                      >
                        {val} {item.unit}
                      </span>
                      {val < 10 && (
                        <AlertTriangle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  ),
                },
                {
                  key: "price",
                  label: "Value",
                  render: (val) => `$${val.toFixed(2)}`,
                },
              ]}
            />
          )}

          {activeTab === "orders" && (
            <ManagementView
              title="Orders"
              type="orders"
              data={orders}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAdd={() => {
                setEditingItem(null);
                setIsModalOpen(true);
              }}
              onEdit={(item) => {
                setEditingItem(item);
                setIsModalOpen(true);
              }}
              onDelete={(id) => handleDelete("orders", id)}
              columns={[
                {
                  key: "id",
                  label: "Hash",
                  render: (val) => (
                    <span className="text-[10px] text-gray-600">{val}</span>
                  ),
                },
                { key: "customerName", label: "Subject" },
                { key: "service", label: "Action" },
                {
                  key: "amount",
                  label: "Cost",
                  render: (val) => (
                    <span className="font-black text-white underline">
                      ${val.toFixed(2)}
                    </span>
                  ),
                },
                {
                  key: "status",
                  label: "State",
                  render: (val) => (
                    <Badge
                      variant={val === "Completed" ? "success" : "warning"}
                    >
                      {val}
                    </Badge>
                  ),
                },
              ]}
            />
          )}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        activeTab={activeTab}
        editingItem={editingItem}
        onSave={handleSave}
      />
    </div>
  );
}
