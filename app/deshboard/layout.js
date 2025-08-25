
// app/dashboard/layout.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Users,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Briefcase,
  Package,
  CheckCircle,
  Wrench,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [companyOpen, setCompanyOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // <-- মোবাইল সাইডবারের জন্য নতুন state
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return; // ensure client
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (
      !storedUser ||
      storedUser.admin?.role !== "Admin" ||
      storedUser.admin.isApprove !== true
    ) {
      router.push("/component/authentication/login"); // redirect
    }
  }, [router]);


  return (
    <div className="relative min-h-screen md:flex bg-gray-100 max-w-[1400px] mx-auto">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-opacity-50 z-20 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white shadow-lg p-5 flex flex-col min-h-screen fixed md:mt-0 mt-12 inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Admin Panel</h2>

        <nav className="flex flex-col gap-3 flex-grow">
          <div className="flex justify-between">
            <Link
              href="/deshboard/servicing"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
              onClick={() => setIsSidebarOpen(false)} // <-- লিঙ্কে ক্লিক করলে সাইডবার বন্ধ হবে
            >
              <Wrench className="w-5 h-5" /> Servicing
            </Link>
            <X
              className="block md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Company Dropdown */}
          <div>
            <button
              onClick={() => setCompanyOpen(!companyOpen)}
              className="flex justify-between items-center w-full gap-2 p-2 rounded hover:bg-gray-200"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Services
              </div>
              {companyOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {companyOpen && (
              <div className="ml-6 flex flex-col gap-1 mt-1">
                <Link
                  href="/deshboard/services/addCompany"
                  className="p-2 rounded hover:bg-gray-200 text-sm"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Company
                </Link>
                <Link
                  href="/deshboard/services/series"
                  className="p-2 rounded hover:bg-gray-200 text-sm"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Series
                </Link>
                <Link
                  href="/deshboard/services/model"
                  className="p-2 rounded hover:bg-gray-200 text-sm"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Model
                </Link>
              </div>
            )}
          </div>

          {/* Product Dropdown */}
          <div>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex justify-between items-center w-full gap-2 p-2 rounded hover:bg-gray-200"
            >
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" /> Products
              </div>
              {productsOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {productsOpen && (
              <div className="ml-6 flex flex-col gap-1 mt-1">
                <Link
                  href="/deshboard/product/add_product"
                  className="p-2 rounded hover:bg-gray-200 text-sm"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Add Product
                </Link>
                <Link
                  href="/deshboard/product/all_product"
                  className="p-2 rounded hover:bg-gray-200 text-sm"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  All Product
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/deshboard/users"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Users className="w-5 h-5" /> Users
          </Link>
          <Link
            href="/deshboard/servicing/completed"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <CheckCircle className="w-5 h-5" /> Completed Work
          </Link>
          <Link
            href="/deshboard/order/pending"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Package className="w-5 h-5" /> Orders
          </Link>
          <Link
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
            href="/deshboard/profile"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ShoppingCart className="w-5 h-5" /> My Cart
          </Link>
          <Link
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
            href="/deshboard/my_services"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Wrench className="w-5 h-5" /> My Servicing
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold md:block hidden">Admin Panel</h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
