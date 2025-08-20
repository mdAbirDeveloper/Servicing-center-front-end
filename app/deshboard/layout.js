// app/dashboard/layout.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, LayoutDashboard, Users, Settings, ChevronDown, ChevronUp } from "lucide-react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [companyOpen, setCompanyOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/component/authentication/login");
  };

  return (
    <div className="h-screen flex bg-gray-100 max-w-[1400px] mx-auto">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-3 flex-grow">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>

          {/* Company Dropdown */}
          <div>
            <button
              onClick={() => setCompanyOpen(!companyOpen)}
              className="flex justify-between items-center w-full gap-2 p-2 rounded hover:bg-gray-200"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" /> Services
              </div>
              {companyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {companyOpen && (
              <div className="ml-6 flex flex-col gap-1 mt-1">
                <Link
                  href="/deshboard/services/addCompany"
                  className="p-2 rounded hover:bg-gray-200 text-sm"
                >
                  Company
                </Link>
                <Link
                  href="/deshboard/services/series"
                  className="p-2 rounded hover:bg-gray-200 text-sm"
                >
                  Series
                </Link>
                <Link
                  href="/deshboard/services/model"
                  className="p-2 rounded hover:bg-gray-200 text-sm"
                >
                  MOdel
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-auto bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
