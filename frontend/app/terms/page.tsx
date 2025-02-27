"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Page = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-28"
      >
        <h1 className="text-4xl font-bold mb-6">📜 Terms of Service</h1>
        <p className="mb-6 opacity-70">
          By using our website, you agree to these Terms of Service. Please read
          them carefully.
        </p>

        {/* Accordion Sections */}
        <div className="space-y-6">
          {[
            {
              title: "✅ Acceptance of Terms",
              id: "acceptance",
              content:
                "🔹 By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy.",
            },
            {
              title: "👤 User Responsibilities",
              id: "responsibilities",
              content:
                "🔹 You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.",
            },
            {
              title: "📜 Intellectual Property",
              id: "intellectual-property",
              content:
                "🔹 All content on this website, including text, graphics, logos, and images, is the property of our company and is protected by intellectual property laws.",
            },
            {
              title: "⚠️ Limitation of Liability",
              id: "liability",
              content:
                "🔹 We are not liable for any damages arising from your use of this website or any third-party services linked to our website.",
            },
            {
              title: "⚖️ Governing Law",
              id: "governing-law",
              content:
                "🔹 These Terms of Service are governed by the laws of [Your Country/State]. Any disputes will be resolved in the courts of [Your Country/State].",
            },
          ].map((section) => (
            <div
              key={section.id}
              className="border-b border-zinc-300 dark:border-zinc-700 pb-5"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex justify-between items-center text-left focus:outline-none hover transition-all"
              >
                <h2 className="text-2xl font-semibold opacity-80">
                  {section.title}
                </h2>
                <motion.div
                  animate={{ rotate: openSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
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
                  className="mt-4 opacity-70"
                >
                  <p>{section.content}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">📞 Contact Us</h2>
          <p className="opacity-70 mb-4">
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <div className="space-y-2">
            <p>
              📩 Email:{" "}
              <a href="mailto:support@example.com" className="text-sky-500">
                support@example.com
              </a>
            </p>
            <p>
              📱 Phone:{" "}
              <a href="tel:+1234567890" className="text-sky-500">
                +1 (234) 567-890
              </a>
            </p>
          </div>
        </section>
      </motion.main>
    </>
  );
};

export default Page;
