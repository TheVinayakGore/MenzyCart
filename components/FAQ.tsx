"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused and unopened items. Please contact our support team for further assistance.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 3-5 business days within the continental US. International shipping may take longer.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay.",
    },
    {
      question: "Can I cancel or modify my order after placing it?",
      answer:
        "You can cancel or modify your order within 1 hour of placing it. After that, the order will be processed and cannot be changed.",
    },
    {
      question: "Do you offer discounts or promotions?",
      answer:
        "Yes, we frequently run discounts and promotions. Subscribe to our newsletter to stay updated on the latest deals.",
    },
    {
      question: "What should I do if I receive a damaged product?",
      answer:
        "If you receive a damaged product, please contact our support team within 48 hours with photos of the damage. We will assist you with a replacement or refund.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@example.com or by calling +1-800-123-4567. We are available 24/7.",
    },
    {
      question: "Do you have a physical store?",
      answer:
        "Yes, we have a physical store located at 123 Main Street, New York, NY. Visit us for an in-person shopping experience.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto max-w-5xl"
    >
      <h1 className="text-center pb-14 text-4xl sm:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-500 h-full">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden"
      >
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border-b last:border-b-0"
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="text-base sm:text-lg md:text-2xl font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 p-4 md:p-7 w-full text-left flex items-center justify-between hover:no-underline hover:text-sky-500">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base md:text-xl p-4 md:p-7 bg-sky-200 dark:bg-sky-900">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default FAQ;
