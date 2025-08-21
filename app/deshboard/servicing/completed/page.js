/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Completed = () => {
  const router = useRouter();
  const [completedData, setCompletedData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const res = await fetch("http://localhost:5000/api/v1/repair/completed", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setCompletedData(data.data); // backend থেকে delivered request list
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Completed Requests</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Company</th>
            <th className="border p-2">Series</th>
            <th className="border p-2">Model</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Service_By</th>
            <th className="border p-2">Delivered Time</th>
          </tr>
        </thead>
        <tbody>
          {completedData.length > 0 ? (
            completedData.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.device.company}</td>
                <td className="border p-2">{item.device.series}</td>
                <td className="border p-2">{item.device.model}</td>
                <td className="border p-2">{item.customerData.name}</td>
                <td className="border p-2">{item.customerData.phone}</td>
                <td className="border p-2">{item.updatedBy.name}</td>
                <td className="border p-2">{new Date(item.updatedAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-4">
                No completed requests
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Completed;
