"use client"; // only if you’re in the app router and using Framer Motion
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-gray-50 to-gray-200 p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-9xl font-bold text-blue-500"
      >
        😢
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold mt-4 text-gray-900"
      >
        Oops! Page Not Found
      </motion.h1>
      <p className="mt-4 text-gray-600 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="flex px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition"
        >
          <ArrowLeft /> Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
