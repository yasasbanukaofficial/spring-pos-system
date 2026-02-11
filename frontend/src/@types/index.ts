export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  service: string;
  amount: number;
  status: "Completed" | "Ongoing";
  date: string;
}

export type TabType = "customers" | "items" | "orders";
