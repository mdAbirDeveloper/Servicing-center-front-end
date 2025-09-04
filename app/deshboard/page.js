"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // App router
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, DollarSign, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const [counts, setCounts] = useState({
    totalOrders: 0,
    cart: 0,
    ordered: 0,
    delivered: 0,
  });

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
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Orders fetch
        const ordersRes = await fetch(
          "https://servicing-center-server.vercel.app/api/v1/order/get-all-ordered-items"
        );
        const ordersData = await ordersRes.json();
        const allOrders = ordersData.data || [];
        setOrders(allOrders);

        // Status counts
        const totalOrders = allOrders.length;
        const cart = allOrders.filter((o) => o.status === "cart").length;
        const ordered = allOrders.filter((o) => o.status === "ordered").length;
        const delivered = allOrders.filter(
          (o) => o.status === "delivered"
        ).length;
        setCounts({ totalOrders, cart, ordered, delivered });

        // Users fetch
        const usersRes = await fetch(
          "https://servicing-center-server.vercel.app/api/v1/users/get-all-users",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const usersData = await usersRes.json();
        setTotalUsers(usersData.data.length || 0);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex justify-center items-center h-64">
          {/* Modern Stylish Loading Spinner */}
          <div className="flex justify-center items-center h-64">
            <div className="relative flex justify-center items-center">
              {/* Outer Ring */}
              <div className="w-12 h-12 border-4 border-transparent border-t-primary border-l-primary rounded-full animate-spin"></div>

              {/* Inner Ring */}
              <div className="absolute w-8 h-8 border-4 border-transparent border-b-primary border-r-primary rounded-full animate-spin-slow"></div>

              {/* Dot Pulse in Center */}
              <div className="absolute w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Delivered orders revenue
  const revenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((acc, o) => acc + Number(o.totalPrice), 0);

  // Recent ordered orders
  const recentOrders = orders
    .filter((o) => o.status === "ordered")
    .slice(-10)
    .reverse();

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <Button className="rounded-2xl shadow-md"><Link href={"/deshboard/product/add_product"}>+ Add New</Link></Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="rounded-2xl shadow hover:shadow-lg transition">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <h2 className="text-2xl font-bold">{counts.totalOrders}</h2>
              <p className="text-sm text-gray-500 mt-1">
                🛒 Cart: {counts.cart} | 📦 Ordered: {counts.ordered} | ✅
                Delivered: {counts.delivered}
              </p>
            </div>
            <ShoppingCart className="text-blue-500 w-10 h-10" />
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow hover:shadow-lg transition">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Revenue</p>
              <h2 className="text-2xl font-bold">৳{revenue}</h2>
            </div>
            <DollarSign className="text-green-500 w-10 h-10" />
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow hover:shadow-lg transition">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Users</p>
              <h2 className="text-2xl font-bold">{totalUsers}</h2>
            </div>
            <Users className="text-purple-500 w-10 h-10" />
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow hover:shadow-lg transition">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Growth</p>
              <h2 className="text-2xl font-bold">+12%</h2>
            </div>
            <TrendingUp className="text-pink-500 w-10 h-10" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const { _id, user, product, quantity, totalPrice } = order;
                return (
                  <tr key={_id} className="hover:bg-gray-50">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.phone}</td>
                    <td className="p-4">
                      {product.title} - ৳
                      {product.discountPrice
                        ? product.discountPrice
                        : product.price}
                    </td>
                    <td className="p-4">{quantity}</td>
                    <td className="p-4">৳{totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
