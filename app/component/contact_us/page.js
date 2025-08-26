/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch(
        "https://servicing-center-server.vercel.app/api/v1/contact/create-message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setSuccess("✅ Message sent successfully!");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      setSuccess(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Left side image */}
      <div className="md:w-1/2 w-full mb-6 md:mb-0 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1521791055366-0d553872125f"
          alt="Contact Us"
          className="rounded-2xl shadow-lg w-full md:w-4/5"
        />
      </div>

      {/* Right side form */}
      <div className="md:w-1/2 w-full bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-sm">
            <MapPin className="text-blue-600 mb-2" size={28} />
            <h3 className="font-semibold">Address</h3>
            <a
              href="https://www.google.com/maps?q=Shah+Ali+plaza,+Mirpur-10,+Dhaka,+Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 text-center"
            >
              <span>Shah Ali plaza, Mirpur-10, Dhaka, Bangladesh</span>
            </a>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-sm">
            <Mail className="text-blue-600 mb-2" size={28} />
            <h3 className="font-semibold">Email</h3>
            <a
              href="mailto:support@example.com"
              className="text-sm text-gray-600 text-center hover:text-blue-600 transition"
            >
              support@example.com
            </a>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-sm">
            <Phone className="text-blue-600 mb-2" size={28} />
            <h3 className="font-semibold">Phone</h3>
            <a
              href="tel:+8801234567890"
              className="text-sm text-gray-600 text-center hover:text-blue-600 transition"
            >
              +880 1791-421041
            </a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-center text-sm font-medium text-green-600">
            {success}
          </p>
        )}
      </div>
    </div>
  );
}
