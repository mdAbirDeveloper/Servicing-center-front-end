/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // app router

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Admin check
  useEffect(() => {
    if (typeof window === "undefined") return; // ensure client
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (
      !storedUser ||
      storedUser.admin?.role !== "Admin" ||
      storedUser.admin.isApprove !== true
    ) {
      router.push("/component/authentication/login");
    } else {
      setUser(storedUser);
    }
  }, [router]);

  // 🟢 helper: localStorage থেকে user বের করা
  function getCurrentUserFromLocalStorage() {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const data = JSON.parse(raw);
      const u = data.user || data.data || data.admin || data;
      return {
        name: u.name || u.fullName || "",
        email: u.email || "",
        role: u.role || "",
        phone: u.phone || u.phoneNumber || "",
      };
    } catch {
      return null;
    }
  }

  // 🟢 fetch all orders
  useEffect(() => {
    if (typeof window === "undefined") return;

    const fetchOrders = async () => {
      try {
        const res = await fetch("https://servicing-center-server.vercel.app/api/v1/order/get-all-ordered-items");
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🟢 handle delivered
  const handleDelivered = async (orderId) => {
    const userData = getCurrentUserFromLocalStorage();
    if (!userData) return;

    try {
      const res = await fetch(`https://servicing-center-server.vercel.app/api/v1/order/${orderId}/delivered`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updatedBy: {
            name: userData.name,
            email: userData.email,
            role: userData.role,
          },
        }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: "delivered" } : o))
        );
      }
    } catch (err) {
      console.error("Failed to mark delivered", err);
    }
  };

  // 🟢 filter ordered/delivered
  const orderedOrders = orders.filter((o) => o.status === "ordered");

  let deliveredOrders = orders.filter((o) => o.status === "delivered");

  if (!showAll) {
    deliveredOrders = deliveredOrders.filter((o) => {
      const date = new Date(o.createdAt);
      return date.getFullYear() === selectedYear && date.getMonth() + 1 === selectedMonth;
    });
  }

  const years = Array.from({ length: 5 }, (_, i) => 2023 + i);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium">
 
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 overflow-x-auto">
      {/* Ordered Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">Ordered Items</h2>
        <table className="w-full border-collapse border border-gray-300 min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderedOrders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border p-2">
                  <img
                    src={order.product.image}
                    alt={order.product.title}
                    className="w-16 h-16 mx-auto"
                  />
                </td>
                <td className="border p-2">{order.product.title}</td>
                <td className="border p-2">
                  {order.user.name} <br /> {order.user.phone}
                </td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2">{order.totalPrice}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelivered(order._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivered Table */}
      <div>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-xl font-bold">Delivered Items</h2>
          <div className="flex gap-2 items-center flex-wrap">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border p-1 rounded"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="border p-1 rounded"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              {showAll ? "Show Filtered" : "Show All"}
            </button>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Delivered At</th>
            </tr>
          </thead>
          <tbody>
            {deliveredOrders.reverse().map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border p-2">
                  <img
                    src={order.product.image}
                    alt={order.product.title}
                    className="w-16 h-16 mx-auto"
                  />
                </td>
                <td className="border p-2">{order.product.title}</td>
                <td className="border p-2">
                  {order.user.name} <br /> {order.user.phone}
                </td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2">{order.totalPrice}</td>
                <td className="border p-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
