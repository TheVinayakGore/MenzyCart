"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "A",
      title: "📋 A. Information We Collect",
      content:
        "📝 We may collect personal information such as your name, email address, shipping address, and payment details when you place an order or create an account.",
    },
    {
      id: "B",
      title: "💡 B. How We Use Your Information",
      content:
        "🔧 We use your information to process orders, improve our services, and communicate with you about your account or orders.",
    },
    {
      id: "C",
      title: "🔐 C. Data Security",
      content:
        "🛡️ We implement industry-standard security measures to protect your data from unauthorized access or disclosure.",
    },
    {
      id: "D",
      title: "🌍 D. Third-Party Services",
      content:
        "⚙️ We may use third-party services (e.g., payment processors) that have their own privacy policies. We recommend reviewing their policies before providing your information.",
    },
    {
      id: "E",
      title: "🔄 E. Changes to This Policy",
      content:
        "📅 We may update this Privacy Policy from time to time. Any changes will be posted on this page.",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 sm:p-6 md:p-12 lg:p-24 mt-20 lg:mt-0"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">🔒 Privacy Policy</h1>
      <p className="mb-4 sm:mb-6 opacity-70 text-sm sm:text-base">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information when you use our
        website.
      </p>

      {/* Accordion Sections */}
      <div className="space-y-4 sm:space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border-b border-zinc-300 dark:border-zinc-700 pb-4 sm:pb-5"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold opacity-80">
                {section.title}
              </h2>
              <motion.div
                animate={{ rotate: openSection === section.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </button>
            {openSection === section.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-3 sm:mt-4 opacity-70 text-sm sm:text-base"
              >
                <p>{section.content}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Data Usage Table */}
      <section className="mt-8 sm:mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          📊 F. Data Usage Details
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-zinc-900 border border-sky-500 border-opacity-50 rounded-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-800 border-b border-sky-500 border-opacity-50">
                <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium">
                  🗂️ Data Type
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium">
                  🎯 Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  type: "👤 Name",
                  purpose: "📦 Order processing and communication",
                },
                {
                  type: "📧 Email",
                  purpose: "📜 Account management and updates",
                },
                { type: "🏡 Address", purpose: "🚚 Shipping and delivery" },
                {
                  type: "💳 Payment Details",
                  purpose: "💰 Transaction processing",
                },
              ].map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-sky-500 border-opacity-50 bg-white dark:bg-zinc-900"
                >
                  <td className="px-3 py-2 text-xs sm:text-sm opacity-70">{row.type}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm opacity-70">
                    {row.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-8 sm:mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">📞 G. Contact Us</h2>
        <p className="opacity-70 mb-3 sm:mb-4 text-sm sm:text-base">
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <div className="space-y-1 sm:space-y-2">
          <p className="text-sm sm:text-base">
            📩 Email :{" "}
            <a href="mailto:support@example.com" className="text-sky-500">
              support@example.com
            </a>
          </p>
          <p className="text-sm sm:text-base">
            📱 Phone :{" "}
            <a href="tel:+1234567890" className="text-sky-500">
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </section>
    </motion.main>
  );
};

export default PrivacyPolicy;