export type PageID = "dashboard" | "customers" | "items" | "orders";

export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderDate: string;
  total?: number;
  customer?: Customer;
  customerId?: string;
  orderDetails?: Array<{
    id: string;
    itemCode: string;
    qty: number;
    unitPrice: number;
  }>;
}

export interface OrderItem {
  id: string;
  item: Item;
  quantity: number;
  price: number;
}
