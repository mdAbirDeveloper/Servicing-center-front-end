"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Servicing = () => {
  const [servicingData, setServicingData] = useState([]);
  const router = useRouter();
  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  //admin check
  const [user, setUser] = useState(null);
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
    }
  }, []);

  // এখানে API থেকে ডেটা ফেচ করা হবে
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://servicing-center-server.vercel.app/api/v1/repair/pending-repair"
        );
        const data = await res.json();
        setServicingData(data.data);
      } catch (error) {
        console.error("Error fetching servicing data:", error);
      }
    };
    fetchData();
  }, []);

  // === Confirmed Action Handler ===
  const handleConfirm = async () => {
    if (!selectedId || !modalAction) return;

    let endpoint = "";
    let status = "";

    if (modalAction === "recived") {
      endpoint = `https://servicing-center-server.vercel.app/api/v1/repair/recived/${selectedId}`;
      status = "received";
    } else if (modalAction === "inService") {
      endpoint = `https://servicing-center-server.vercel.app/api/v1/repair/inService/${selectedId}`;
      status = "inService";
    } else if (modalAction === "delivered") {
      endpoint = `https://servicing-center-server.vercel.app/api/v1/repair/delivered/${selectedId}`;
      status = "delivered";
    }

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          updatedBy: {
            name: user.admin.name,
            email: user.admin.email,
            role: user.admin.role,
          },
        }),
      });

      if (res.ok) {
        setServicingData((prev) =>
          prev.map((item) =>
            item._id === selectedId ? { ...item, status } : item
          )
        );
        setOpenModal(false);
        setSelectedId(null);
        setModalAction(null);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // === Modal Open ===
  const openConfirmModal = (id, action) => {
    setSelectedId(id);
    setModalAction(action);
    setOpenModal(true);
  };

  const pendingData = servicingData.filter((item) => item.status === "pending");
  const receivedData = servicingData.filter(
    (item) => item.status === "received"
  );
  const inServiceData = servicingData.filter(
    (item) => item.status === "inService"
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold bg-red-500 text-center py-2 text-white rounded">
        Pending {"Phone's"}
      </h2>
      <table className="w-full border mb-10">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border p-2">Company</th>
            <th className="border p-2">Series</th>
            <th className="border p-2">Model</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Uploaded Time</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingData.length > 0 ? (
            pendingData.map((item) => (
              <tr key={item._id} className="">
                <td className="border p-2 border-primary">{item.device.company}</td>
                <td className="border p-2 border-primary">{item.device.series}</td>
                <td className="border p-2 border-primary">{item.device.model}</td>
                <td className="border p-2 border-primary">{item.customerData.name}</td>
                <td className="border p-2 border-primary">{item.customerData.phone}</td>
                <td className="border p-2 border-primary">{item.customerData.email}</td>
                <td className="border p-2 border-primary">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="border p-2 border-primary">
                  <button
                    onClick={() => openConfirmModal(item._id, "recived")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Received
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No Pending {"Phone's"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="text-xl font-bold bg-yellow-500 text-center py-2 text-white rounded">
        Received {"Phone's"}
      </h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border p-2">Company</th>
            <th className="border p-2">Series</th>
            <th className="border p-2">Model</th>
            <th className="border p-2">Customer_Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Uploaded Time</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {receivedData.length > 0 ? (
            receivedData.map((item) => (
              <tr key={item._id}>
                <td className="border p-2 border-primary">{item.device.company}</td>
                <td className="border p-2 border-primary">{item.device.series}</td>
                <td className="border p-2 border-primary">{item.device.model}</td>
                <td className="border p-2 border-primary">{item.customerData.name}</td>
                <td className="border p-2 border-primary">{item.customerData.phone}</td>
                <td className="border p-2 border-primary">{item.customerData.email}</td>
                <td className="border p-2 border-primary">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="border p-2 border-primary">
                  {item.status === "received" ? (
                    <button
                      onClick={() => openConfirmModal(item._id, "inService")}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      InService
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      {item.status}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No Received {"Phone's"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="text-xl font-bold bg-green-500 text-center py-2 text-white rounded mt-10">
        In Service {"Phone's"}
      </h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border p-2">Company</th>
            <th className="border p-2">Series</th>
            <th className="border p-2">Model</th>
            <th className="border p-2 text-md">Customer Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Uploaded Time</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {inServiceData.length > 0 ? (
            inServiceData.map((item) => (
              <tr key={item._id}>
                <td className="border p-2 border-primary">{item.device.company}</td>
                <td className="border p-2 border-primary">{item.device.series}</td>
                <td className="border p-2 border-primary">{item.device.model}</td>
                <td className="border p-2 border-primary">{item.customerData.name}</td>
                <td className="border p-2 border-primary">{item.customerData.phone}</td>
                <td className="border p-2 border-primary">{item.customerData.email}</td>
                <td className="border p-2 border-primary">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="border p-2 border-primary">
                  {item.status === "inService" ? (
                    <button
                      onClick={() => openConfirmModal(item._id, "delivered")}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Delivered
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      {item.status}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No In Service {"Phone's"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* === Confirmation Modal === */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Action
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to mark this request as{" "}
              <span className="font-semibold text-blue-600 uppercase">
                {modalAction}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicing;
