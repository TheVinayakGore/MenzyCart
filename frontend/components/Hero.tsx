"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <main className="relative flex flex-col items-center justify-center gap-32 pt-40 min-h-screen w-full bg-sky-50 dark:bg-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-white to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-black"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center m-auto gap-10 relative max-w-7xl text-center px-6"
      >
        <h1 className="text-5xl font-extrabold sm:text-8xl">
          Elevate Your{" "}
          <span className="text-sky-500 dark:text-sky-400">Shopping</span>{" "}
          Experience
        </h1>
        <p className="m-5 text-lg opacity-60 max-w-xl mx-auto">
          Discover high-quality products at unbeatable prices. Start your
          journey with us today !
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 flex gap-4 justify-center"
        >
          <Link
            href="/shop"
            className="bg-sky-500 hover:bg-white border border-white hover:border-sky-500 text-white hover:text-sky-600 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg"
          >
            Shop Now
          </Link>
          <Link
            href="/categories"
            className="border border-zinc-700 dark:border-zinc-500 opacity-50 hover:opacity-100 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg"
          >
            Explore Categories
          </Link>
        </motion.div>
      </motion.div>

      <div className="overflow-hidden w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-full flex flex-col antialiased items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={products} // Use updated product array
            direction="right"
            speed="fast"
          />
          <InfiniteMovingCards
            items={products} // Use updated product array
            direction="left"
            speed="fast"
          />
        </motion.div>
      </div>
    </main>
  );
};

export default Hero;

const products = [
  {
    title: "Wireless Headphones",
    description:
      "Experience immersive, high-fidelity sound with advanced noise cancellation. \nPerfect for travel, work, and daily listening with extended battery life. \nErgonomic design ensures a comfortable fit for long hours of use.",
    price: "99.99",
    image: "/card.png",
  },
  {
    title: "Smartphone Pro Max",
    description:
      "The latest smartphone featuring an ultra-fast processor and a stunning display. \nCapture professional-quality photos with its advanced AI-powered camera system. \nLong-lasting battery and fast charging keep you connected all day.",
    price: "1199.00",
    image: "/card.png",
  },
  {
    title: "Gaming Laptop",
    description:
      "Built for high-performance gaming and seamless multitasking with a powerful GPU. \nEnjoy a stunning display with high refresh rates for ultra-smooth visuals. \nAdvanced cooling technology ensures optimal performance during intense gaming sessions.",
    price: "1899.99",
    image: "/card.png",
  },
  {
    title: "Smart Watch",
    description:
      "Stay connected with notifications, calls, and music control on your wrist. \nAdvanced fitness tracking, heart rate monitoring, and sleep analysis included. \nWater-resistant design makes it perfect for workouts and outdoor adventures.",
    price: "199.99",
    image: "/card.png",
  },
  {
    title: "Wireless Speaker",
    description:
      "Enjoy rich, crystal-clear audio with deep bass for an immersive experience. \nCompact and portable design makes it easy to carry anywhere. \nLong battery life ensures hours of uninterrupted music playback.",
    price: "129.99",
    image: "/card.png",
  },
];
