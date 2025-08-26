"use client";
import { motion } from "framer-motion";

export default function WarrantyPolicy() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-800 text-center mb-8"
      >
        Warranty Policy
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-2xl p-8 leading-relaxed text-gray-700 space-y-6"
      >
        <p>
          At <span className="font-semibold">MobileCare</span>, we are committed
          to delivering high-quality products and professional repair services.
          To give our customers peace of mind, we provide a limited warranty on
          both products and repair services. This Warranty Policy outlines the
          coverage, terms, and conditions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Warranty Coverage – Products
        </h2>
        <p>
          All mobile parts and accessories purchased from MobileCare are covered
          by a <span className="font-semibold">7 to 30 days warranty</span>{" "}
          depending on the product type. The warranty covers:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Defective or faulty items upon delivery</li>
          <li>Manufacturing defects in genuine parts</li>
          <li>Non-functioning accessories (e.g., chargers, earphones)</li>
        </ul>
        <p>
          Replacement will be provided for defective items if reported within
          the warranty period. Refunds are only applicable if replacement is not
          possible.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Warranty Coverage – Repair Services
        </h2>
        <p>
          Our repair services are covered by a{" "}
          <span className="font-semibold">15 to 90 days service warranty</span>,
          depending on the type of repair. The warranty covers only the
          <span className="font-semibold"> specific issue repaired</span> and
          the parts replaced by us.
        </p>
        <p>
          For example, if you replace your battery with us and it malfunctions
          within the warranty period, we will replace it at no additional cost.
          However, the warranty does not extend to unrelated issues that occur
          after the repair.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Exclusions from Warranty
        </h2>
        <p>The warranty will not apply in the following cases:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Physical damage, cracks, or water damage after delivery</li>
          <li>
            Damage caused by misuse, negligence, or unauthorized repair
            attempts
          </li>
          <li>Software issues unrelated to the original repair</li>
          <li>Normal wear and tear of accessories (e.g., cables, cases)</li>
          <li>
            Battery performance degradation due to normal usage over time
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Claiming a Warranty
        </h2>
        <p>
          To claim a warranty, please contact our support team with proof of
          purchase and details of the issue. Our team will inspect the product
          or service, and if eligible, a replacement or re-service will be
          provided.
        </p>
        <p>
          In some cases, we may request clear photos or the return of the item
          for inspection before approval.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Contact Us
        </h2>
        <p>
          For warranty claims or questions, you can reach us through the
          following:
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
          *This Warranty Policy is subject to change without prior notice. The
          warranty duration and coverage may vary based on the type of product
          or service.
        </p>
      </motion.div>
    </section>
  );
}
