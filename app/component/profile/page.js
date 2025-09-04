/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [deliveredItems, setDeliveredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🧰 helper: localStorage থেকে user বের করা
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

  const fetchUserOrders = async () => {
    const user = getCurrentUserFromLocalStorage();
    if (!user) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/order/get-ordered-items?phone=${user.phone}&email=${user.email}`
      );
      const data = await res.json();

      const cart = data.data.filter((item) => item.status === "cart");
      const orders = data.data.filter((item) => item.status === "ordered");
      const delivered = data.data.filter((item) => item.status === "delivered");

      setCartItems(cart);
      setOrderedItems(orders);
      setDeliveredItems(delivered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    const user = getCurrentUserFromLocalStorage();
    if (!user) return;

    // Cart থেকে product IDs নিয়ে যেই array backend এ পাঠানো হবে
    const productIds = cartItems.map((item) => item._id);

    try {
      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/order-items/buy-now`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: user.phone,
            email: user.email,
            productIds,
          }),
        }
      );

      if (res.ok) {
        alert("Order placed successfully!");
        fetchUserOrders(); // Cart এবং Ordered items update
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this item?")) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/order-items/delete/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setMessage("🗑️ Item deleted successfully!");
        setCartItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        setMessage("❌ Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("❌ Something went wrong!");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ✅ Success/Error Message */}
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-100 text-blue-700 font-medium text-center">
          {message}
        </div>
      )}

      {/* ✅ Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center mb-6">
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
      )}

      {/* Cart Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartItems.map((item, index) => {
              const unitPrice =
                item.product.discountPrice || item.product.price;
              const totalPrice = unitPrice * item.quantity;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow hover:shadow-2xl hover:shadow-primary transition transform hover:-translate-y-2 p-4 relative"
                >
                  {/* Product Image */}
                  <div className="w-full h-40 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="max-h-full object-contain"
                    />
                  </div>

                  {/* Product Title */}
                  <Link
                    key={index}
                    href={`/component/products/all_products/product_details/${item.product._id}`}
                  >
                    <h3 className="text-sm font-semibold mt-3 text-gray-800 line-clamp-2 hover:underline">
                      {item.product.title}
                    </h3>
                  </Link>

                  {/* Price & Qty */}
                  <div className="mt-2">
                    {item.product.price && (
                      <p className="text-gray-400 line-through text-sm">
                        {item.product.price} TK
                      </p>
                    )}
                    <p className="text-lg font-bold text-orange-600">
                      {unitPrice} TK
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">
                      Total: {totalPrice} TK
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-bold text-gray-800">
              Total Price:{" "}
              {cartItems.reduce(
                (acc, item) =>
                  acc +
                  (item.product.discountPrice || item.product.price) *
                    item.quantity,
                0
              )}{" "}
              TK
            </p>

            <button
              onClick={handleBuyNow}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}

      {/* Ordered Items Section */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-800">
        📦 Ordered Items
      </h2>
      {orderedItems.length === 0 ? (
        <p className="text-gray-500">No ordered items yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {orderedItems.map((item, index) => (
            <Link
              key={index}
              href={`/component/products/all_products/product_details/${item.product._id}`}
            >
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-2xl hover:shadow-primary transition transform hover:-translate-y-2 p-4 relative"
              >
                {/* Product Image */}
                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* Product Title */}
                <h3 className="text-sm font-semibold mt-3 text-gray-800 line-clamp-2">
                  {item.product.title}
                </h3>

                {/* Price & Qty */}
                <div className="mt-2">
                  {item.product.price && (
                    <p className="text-gray-400 line-through text-sm">
                      {item.product.price} TK
                    </p>
                  )}
                  <p className="text-lg font-bold text-orange-600">
                    {item.product.discountPrice || item.product.price} TK
                  </p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    Total:{" "}
                    {(item.product.discountPrice || item.product.price) *
                      item.quantity}{" "}
                    TK
                  </p>
                  <p className="text-sm text-gray-600">Status: {item.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Ordered Items Section */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-800">
        📦 Delivered Items
      </h2>
      {deliveredItems.length === 0 ? (
        <p className="text-gray-500">No ordered items yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deliveredItems.map((item, index) => (
            <Link
              key={index}
              href={`/component/products/all_products/product_details/${item.product._id}`}
            >
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-2xl hover:shadow-primary transition transform hover:-translate-y-2 p-4 relative"
              >
                {/* Product Image */}
                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* Product Title */}
                <h3 className="text-sm font-semibold mt-3 text-gray-800 line-clamp-2">
                  {item.product.title}
                </h3>

                {/* Price & Qty */}
                <div className="mt-2">
                  {item.product.price && (
                    <p className="text-gray-400 line-through text-sm">
                      {item.product.price} TK
                    </p>
                  )}
                  <p className="text-lg font-bold text-orange-600">
                    {item.product.discountPrice || item.product.price} TK
                  </p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    Total:{" "}
                    {(item.product.discountPrice || item.product.price) *
                      item.quantity}{" "}
                    TK
                  </p>
                  <p className="text-sm text-gray-600">Status: {item.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
