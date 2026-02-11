import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, X } from "lucide-react";
import { Input, Select } from "../components/Input";
import type { Order, Customer, Item } from "../@types";

interface OrderItemEntry {
  itemId: string;
  quantity: number;
  price: number;
}

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItemEntry[]>([]);
  const [modal, setModal] = useState<{ open: boolean; edit: Order | null }>({
    open: false,
    edit: null,
  });

  const ORDER_URL = "http://localhost:8080/api/v1/orders";
  const CUSTOMER_URL = "http://localhost:8080/api/v1/customers";
  const ITEM_URL = "http://localhost:8080/api/v1/items";

  // 1. Fetch Methods
  const fetchOrders = async () => {
    try {
      const result = await fetch(ORDER_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const ordersData = await result.json();
      // Map orders to include customer object and calculate total
      const ordersWithDetails = ordersData.map((order: Order) => ({
        ...order,
        customer: customers.find((c) => c.id === order.customerId),
        total: order.orderDetails?.reduce(
          (sum, detail) => sum + detail.qty * detail.unitPrice,
          0
        ) || 0,
      }));
      setOrders(ordersWithDetails);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const result = await fetch(CUSTOMER_URL, {
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

  const fetchItems = async () => {
    try {
      const result = await fetch(ITEM_URL, {
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
    void fetchCustomers();
    void fetchItems();
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      void fetchOrders();
    }
  }, [customers]);

  // Add Item to Order
  const handleAddItem = () => {
    setOrderItems([...orderItems, { itemId: "", quantity: 1, price: 0 }]);
  };

  // Remove Item from Order
  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  // Update Item in Order
  const handleItemChange = (
    index: number,
    field: keyof OrderItemEntry,
    value: string | number,
  ) => {
    const updated = [...orderItems];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-fill price when item is selected
    if (field === "itemId" && typeof value === "string") {
      const selectedItem = items.find((item) => item.id === value);
      if (selectedItem) {
        updated[index].price = selectedItem.unitPrice;
      }
    }

    setOrderItems(updated);
  };

  // Calculate Total
  const calculateTotal = () => {
    return orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
  };

  // 2. Add/Edit Method
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const customerId = formData.get("customerId") as string;
    const selectedCustomer = customers.find((c) => c.id === customerId);

    // Validation
    if (!customerId || !selectedCustomer) {
      alert("Please select a customer");
      return;
    }

    if (orderItems.length === 0) {
      alert("Please add at least one item to the order");
      return;
    }

    // Validate all items have been selected
    const hasEmptyItems = orderItems.some((item) => !item.itemId);
    if (hasEmptyItems) {
      alert("Please select an item for all order items");
      return;
    }

    // Validate quantities and prices
    const hasInvalidValues = orderItems.some(
      (item) =>
        !item.quantity ||
        item.quantity <= 0 ||
        item.price === undefined ||
        item.price === null ||
        item.price < 0,
    );
    if (hasInvalidValues) {
      alert("All items must have valid quantity and price");
      return;
    }

    // Map order items to orderDetails matching backend DTO structure
    // Generate unique IDs for each order detail
    const orderDetails = orderItems.map((orderItem, index) => ({
      id: `${formData.get("id")}-${index + 1}`,
      itemCode: orderItem.itemId,
      qty: Number(orderItem.quantity),
      unitPrice: Number(orderItem.price),
    }));

    const payload = {
      id: formData.get("id") as string,
      customerId: customerId,
      orderDate: formData.get("orderDate") as string,
      orderDetails: orderDetails,
    };

    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    try {
      if (modal.edit) {
        // Update existing order
        const result = await fetch(`${ORDER_URL}/${modal.edit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (result.ok) {
          await fetchOrders();
        }
      } else {
        // Create new order
        const result = await fetch(ORDER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (result.ok) {
          await fetchOrders();
        }
      }
      setModal({ open: false, edit: null });
      setOrderItems([]);
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  // Open Modal Handler
  const handleOpenModal = (edit: Order | null = null) => {
    setModal({ open: true, edit });
    setOrderItems([]);
  };

  // Close Modal Handler
  const handleCloseModal = () => {
    setModal({ open: false, edit: null });
    setOrderItems([]);
  };

  // 3. Delete Method
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this order?")) return;
    try {
      const result = await fetch(`${ORDER_URL}/${id}`, {
        method: "DELETE",
      });
      if (result.ok) {
        await fetchOrders();
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white pb-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Order_System
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-[0.3em]">
            Module // Sales_Flow
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-white text-black px-6 py-3 text-xs font-black uppercase"
        >
          Create_Order
        </button>
      </div>

      <table className="w-full text-xs font-mono text-left">
        <thead className="bg-white text-black">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Order Date</th>
            <th className="p-4">Customer</th>
            <th className="p-4 text-right">Total</th>
            <th className="p-4 text-right">Ops</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {orders.map((o) => (
            <tr key={o.id} className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-gray-400">{o.id}</td>
              <td className="p-4">{o.orderDate}</td>
              <td className="p-4 font-black">{o.customer?.name || "Unknown"}</td>
              <td className="p-4 text-right">${(o.total || 0).toFixed(2)}</td>
              <td className="p-4 text-right">
                <button
                  onClick={() => handleOpenModal(o)}
                  className="mr-4 text-gray-600 hover:text-white"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(o.id)}
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
            className="bg-black border border-white w-full max-w-2xl p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-black uppercase italic border-b border-white pb-4">
              {modal.edit ? "Edit_Order" : "New_Order"}
            </h2>
            <Input
              label="Order_ID"
              name="id"
              defaultValue={modal.edit?.id}
              required
              disabled={!!modal.edit}
            />
            <Input
              label="Order_Date"
              name="orderDate"
              type="date"
              defaultValue={modal.edit?.orderDate}
              required
            />
            <Select
              label="Customer"
              name="customerId"
              options={customers.map((c) => ({
                value: c.id,
                label: `${c.name} (${c.email})`,
              }))}
              defaultValue={modal.edit?.customer?.id}
              required
            />

            {/* Order Items Section */}
            <div className="border-t border-white/20 pt-4 mt-4">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-black text-gray-500 uppercase">
                  Order_Items
                </label>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-white hover:text-gray-300 flex items-center gap-1 text-xs"
                >
                  <Plus size={14} /> Add_Item
                </button>
              </div>

              {orderItems.map((orderItem, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 mb-2 items-end"
                >
                  <div className="col-span-5">
                    <Select
                      label={index === 0 ? "Item" : ""}
                      name={`item-${index}`}
                      options={items.map((item) => ({
                        value: item.id,
                        label: `${item.name} - $${item.unitPrice.toFixed(2)}`,
                      }))}
                      value={orderItem.itemId}
                      onChange={(e) =>
                        handleItemChange(index, "itemId", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      label={index === 0 ? "Qty" : ""}
                      name={`quantity-${index}`}
                      type="number"
                      min="1"
                      value={orderItem.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 1,
                        )
                      }
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      label={index === 0 ? "Price" : ""}
                      name={`price-${index}`}
                      type="number"
                      step="0.01"
                      min="0"
                      value={orderItem.price}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "price",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      required
                    />
                  </div>
                  <div className="col-span-1 pb-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-gray-600 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {orderItems.length === 0 && (
                <p className="text-xs text-gray-500 italic text-center py-2">
                  No items added yet
                </p>
              )}
            </div>

            {/* Total Display */}
            <div className="border-t border-white/20 pt-4 flex justify-between items-center">
              <span className="text-xs font-black text-gray-500 uppercase">
                Total_Amount
              </span>
              <span className="text-2xl font-black italic">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
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
