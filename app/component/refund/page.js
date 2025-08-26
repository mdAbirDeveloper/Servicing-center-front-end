"use client";
import { motion } from "framer-motion";

export default function ReturnsRefunds() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-800 text-center mb-8"
      >
        Returns & Refunds Policy
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-2xl p-8 leading-relaxed text-gray-700 space-y-6"
      >
        <p>
          At <span className="font-semibold">MobileCare</span>, we value your
          satisfaction and strive to provide the highest quality repair services
          and genuine mobile products. If for any reason you are not completely
          satisfied with your purchase or service, our Returns & Refunds Policy
          is designed to ensure a fair and hassle-free process.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Product Returns
        </h2>
        <p>
          You may return any unused and unopened product within{" "}
          <span className="font-semibold">7 days</span> of purchase for a full
          refund or exchange. The product must be in its original condition and
          packaging, along with the purchase receipt. Products that have been
          installed, used, or damaged due to mishandling are not eligible for
          return.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Refund Process
        </h2>
        <p>
          Once your return is received and inspected, we will notify you of the
          approval or rejection of your refund. If approved, your refund will be
          processed within <span className="font-semibold">5–7 business days</span>{" "}
          and will automatically be credited back to your original method of
          payment. Please note that shipping charges are non-refundable.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Repair Services
        </h2>
        <p>
          For repair services, we offer a{" "}
          <span className="font-semibold">limited warranty</span> period (varies
          by service type) to cover any issues directly related to our repair
          work. However, refunds for completed repair services are not offered.
          If you face the same issue again within the warranty period, we will
          fix it at no additional cost.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Damaged or Defective Items
        </h2>
        <p>
          If you receive a defective or damaged product, please contact us
          immediately at{" "}
          <a
            href="mailto:support@mobilecare.com"
            className="text-blue-600 underline"
          >
            support@mobilecare.com
          </a>{" "}
          with your order details and clear photos of the item. We will arrange
          for a replacement or refund depending on the situation.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Non-Returnable Items
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Opened or used phone parts and accessories</li>
          <li>Software licenses or digital products</li>
          <li>Items damaged due to improper handling or installation</li>
          <li>Services that have already been completed</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          How to Initiate a Return
        </h2>
        <p>
          To start a return, please contact our support team via email or phone.
          Provide your order number, product details, and reason for the return.
          Once approved, you will receive instructions on how to send the item
          back to us.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Contact Us
        </h2>
        <p>
          If you have any questions about our Returns & Refunds Policy, please
          feel free to contact us at:
        </p>
        <ul className="space-y-2">
          <li>
            📧{" "}
            <a
              href="mailto:support@mobilecare.com"
              className="text-blue-600 underline"
            >
              support@mobilecare.com
            </a>
          </li>
          <li>
            📞{" "}
            <a href="tel:+8801234567890" className="text-blue-600 underline">
              +880 1791-421041
            </a>
          </li>
          <li>📍 Shah Ali Plaza, Mirpur-10, Dhaka, Bangladesh</li>
        </ul>

        <p className="mt-6 text-sm text-gray-500">
          *This policy is subject to change without prior notice. Please check
          this page regularly for updates.
        </p>
      </motion.div>
    </section>
  );
}
