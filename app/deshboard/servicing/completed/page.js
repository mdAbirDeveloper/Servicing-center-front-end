/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Completed = () => {
  const router = useRouter();
  const [completedData, setCompletedData] = useState([]); // <-- সব ডেটার মূল সোর্স
  const [filteredData, setFilteredData] = useState([]); // <-- ফিল্টার করা ডেটা দেখানোর জন্য
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [availableYears, setAvailableYears] = useState([]);

  // Admin access check
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser || storedUser.admin?.role !== "Admin" || storedUser.admin?.isApprove !== true) {
      router.push("/component/authentication/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  // Fetch delivered requests
  useEffect(() => {
    if (!user) return;

    const fetchCompleted = async () => {
      try {
        const res = await fetch("https://servicing-center-server.vercel.app/api/v1/repair/completed", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          const fetchedData = data.data;
          setCompletedData(fetchedData);
          setFilteredData(fetchedData); // প্রাথমিকভাবে সব ডেটা দেখানো হবে

          // Available years-গুলো সেট করা
          const years = [...new Set(fetchedData.map(item => new Date(item.updatedAt).getFullYear()))];
          setAvailableYears(years.sort((a, b) => b - a)); // নতুন থেকে পুরোনো বছর 순
        } else {
          console.error(data.message || "Failed to fetch completed requests");
        }
      } catch (err) {
        console.error("Error fetching completed requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleted();
  }, [user]);

  // Filtering logic
  useEffect(() => {
    let filtered = [...completedData];

    if (selectedYear) {
      filtered = filtered.filter(item => new Date(item.updatedAt).getFullYear() === parseInt(selectedYear));
    }

    if (selectedMonth) {
      // getMonth() is 0-indexed (Jan=0, Feb=1, ...)
      filtered = filtered.filter(item => new Date(item.updatedAt).getMonth() === parseInt(selectedMonth));
    }

    setFilteredData(filtered);
  }, [selectedYear, selectedMonth, completedData]);

  const handleResetFilters = () => {
    setSelectedYear("");
    setSelectedMonth("");
    setFilteredData(completedData);
  };
  
  const months = [
    { value: "0", name: "January" }, { value: "1", name: "February" },
    { value: "2", name: "March" }, { value: "3", name: "April" },
    { value: "4", name: "May" }, { value: "5", name: "June" },
    { value: "6", name: "July" }, { value: "7", name: "August" },
    { value: "8", name: "September" }, { value: "9", name: "October" },
    { value: "10", name: "November" }, { value: "11", name: "December" },
  ];

  if (loading) return <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium">
 
          </p>
        </div>
      </div>;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">Completed Requests</h2>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 bg-white rounded-lg shadow">
        <div className="flex-1">
          <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700">Filter by Year</label>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700">Filter by Month</label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Months</option>
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
           <button 
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
           >
             Reset
           </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-b p-3 text-left">Company</th>
              <th className="border-b p-3 text-left">Series</th>
              <th className="border-b p-3 text-left">Model</th>
              <th className="border-b p-3 text-left">Customer Name</th>
              <th className="border-b p-3 text-left">Phone</th>
              <th className="border-b p-3 text-left">Service_By</th>
              <th className="border-b p-3 text-left">Delivered Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="border-b p-3">{item.device.company}</td>
                  <td className="border-b p-3">{item.device.series}</td>
                  <td className="border-b p-3">{item.device.model}</td>
                  <td className="border-b p-3">{item.customerData.name}</td>
                  <td className="border-b p-3">{item.customerData.phone}</td>
                  <td className="border-b p-3">{item.updatedBy.name}</td>
                  <td className="border-b p-3">{new Date(item.updatedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-500">
                  No completed requests found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Completed;