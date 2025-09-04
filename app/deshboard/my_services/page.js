
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🧰 localStorage থেকে user info
  function getCurrentUserFromLocalStorage() {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const data = JSON.parse(raw);
      const u = data.user || data.data || data.admin || data;
      return {
        name: u.name || u.fullName || "",
        email: u.email || "",
        phone: u.phone || u.phoneNumber || "",
      };
    } catch {
      return null;
    }
  }

  const fetchRequests = async () => {
    const user = getCurrentUserFromLocalStorage();
    if (!user) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/repair/my_serviching_request?phone=${user.phone}&email=${user.email}`
      );
      const data = await res.json();
      setRequests(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statuses = ["pending", "received", "inService", "delivered"];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Service Requests
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
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
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No service requests found. You can submit a request from our{" "}
          <Link href="/component/requests/submit" className="text-blue-500 underline">
            Request Page
          </Link>
          .
        </p>
      ) : (
        statuses.map((status) => {
          const filtered = requests.filter((r) => r.status === status);
          if (filtered.length === 0) return null;

          return (
            <div key={status} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                {status} Requests
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-2 p-5 relative"
                  >
                    <p
                      className={`absolute top-3 right-3 px-2 py-1 rounded text-sm font-semibold ${
                        status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : status === "received"
                          ? "bg-blue-100 text-blue-800"
                          : status === "inService"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {status.toUpperCase()}
                    </p>

                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {item.device.company} - {item.device.series}
                    </h3>
                    <p className="text-gray-600">
                      <span className="font-semibold">Model:</span> {item.device.model}
                    </p>
                    <p className="text-gray-600 mt-1">
                      <span className="font-semibold">Problem:</span> {item.problem}
                    </p>
                    {item.notes && (
                      <p className="text-gray-600 mt-1">
                        <span className="font-semibold">Notes:</span> {item.notes}
                      </p>
                    )}
                    <p className="text-gray-400 mt-2 text-sm">
                      Submitted on: {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Extra Info / CTA */}
      <div className="mt-12 text-center bg-gray-50 p-6 rounded-xl shadow-inner">
        <p className="text-gray-700 text-lg mb-4">
          Thank you for trusting our service! Please be patient while our team
          works to resolve your issues.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          If you need urgent support, you can{" "}
          <a href="tel:+8801832822560" className="text-blue-500 underline">
            contact us
          </a>{" "}
          or visit our nearest store.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link
            href="/component/products/all_products"
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Visit Store
          </Link>
          <Link
            href="/component/products/all_products"
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
