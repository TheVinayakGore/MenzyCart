"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
// import Image from "next/image";

const stats = [
  {
    label: "Global Reach",
    target: 110,
    prefix: "+",
    emoji: "🌍",
    description: "Serving customers in over 110 countries worldwide.",
  },
  {
    label: "Products in Stock",
    target: 25000,
    prefix: "+",
    emoji: "🛍️",
    description: "Explore our vast collection of 25,000+ products.",
  },
  {
    label: "Satisfaction Rate",
    target: 98,
    suffix: "%",
    emoji: "⭐",
    description: "98% of our customers love their shopping experience.",
  },
  {
    label: "Happy Customers",
    target: 150,
    prefix: "+",
    suffix: "K",
    emoji: "😊",
    description: "Join 150,000+ happy customers who trust us.",
  },
  {
    label: "Safe Deliveries in a Day",
    target: 250,
    prefix: "+",
    suffix: "K",
    emoji: "📦",
    description: "250,000+ packages delivered safely within 24 hours.",
  },
  {
    label: "Years of Experience",
    target: 10,
    prefix: "+",
    emoji: "⏳",
    description: "Over a decade of trusted service and expertise.",
  },
];

export const Stats = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full py-16 gap-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl pb-5 font-semibold text-center bg-clip-text text-transparent bg-gradient-to-tr from-sky-400 to-fuchsia-500">
        Why Choose Us?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-zinc-900 hover:bg-sky-200/50 dark:hover:bg-sky-950/50 hover:border-sky-500 p-6 border rounded-xl shadow-lg text-center"
          >
            <div className="flex flex-col items-center gap-4 font-bold text-sky-500 dark:text-sky-400">
              <span className="text-4xl sm:text-5xl">{stat.emoji}</span>
              <AnimatedCounter
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
                duration={2000}
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mt-4">{stat.label}</h3>
            <p className="text-sm sm:text-base opacity-70 mt-2">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};