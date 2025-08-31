/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ এটা লাগবে

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();

  // ✅ localStorage থেকে user + token শুধু client-side এ পড়া হবে
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (
      !storedUser ||
      storedUser.admin?.role !== "Admin" ||
      storedUser.admin?.isApprove !== true
    ) {
      router.push("/component/authentication/login");
    } else {
      setUser(storedUser);
      setToken(storedUser.token || null);
    }
  }, [router]);

  // ✅ token available হলে users ফেচ করবো
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://servicing-center-server.vercel.app/api/v1/users/get-all-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {u.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {u.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {u.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
