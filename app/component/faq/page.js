"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you provide both hardware and software solutions?",
    answer:
      "Yes! We provide complete repair and solution services for both hardware and software issues on Apple and Android devices.",
  },
  {
    question: "Do you sell original phone parts and accessories?",
    answer:
      "Absolutely. We sell high-quality and genuine parts, accessories, and related products with warranty.",
  },
  {
    question: "How long does it take to repair a phone?",
    answer:
      "It depends on the issue. Most common repairs like screen replacement or battery change are done within 1-2 hours.",
  },
  {
    question: "Do you provide a warranty on repairs?",
    answer:
      "Yes, we provide a limited-time warranty for both hardware and software repairs depending on the service.",
  },
  {
    question: "Can I book an appointment online?",
    answer:
      "Yes, you can book a service appointment online through our website or contact us directly via phone/WhatsApp.",
  },
  {
    question: "Do you offer doorstep pickup & delivery?",
    answer:
      "Yes, we offer pickup and delivery services in selected areas. Please contact us to check availability in your location.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border p-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">{faq.question}</h3>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
