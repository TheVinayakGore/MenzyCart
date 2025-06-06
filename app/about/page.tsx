"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Stats } from "@/components/Stats";
import Link from "next/link";
import { TeamMembers } from "@/components/TeamMembers";

const About = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center m-auto gap-10 sm:gap-16 md:gap-24 px-10 py-24 mt-0 md:mt-5 w-full h-full"
    >
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-12 bg-transparent shadow-none border-none w-full">
        {/* Left Section: Video */}
        <div className="hidden lg:block lg:w-1/2">
          <video
            src="/about.mp4"
            className="rounded-xl shadow-lg w-full h-auto"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Right Section: Text */}
        <div className="flex flex-col items-start justify-center gap-4 sm:gap-6 w-full lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl md:-mt-4 font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-500">
            Hello folks!
          </h1>

          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>
              We are committed to providing you with the best online shopping
              experience. With a wide selection of top-quality products,
              unbeatable prices, and a customer-first approach, we aim to be
              your one-stop destination for all your shopping needs.
            </p>
            <p>
              Thank you for choosing{" "}
              <span className="font-semibold text-sky-500 dark:text-sky-400">
                Menzy Cart!
              </span>{" "}
              We are excited to serve you and make your shopping journey
              memorable.
            </p>
          </div>

          <Button
            className="mt-4 sm:mt-6 bg-sky-500 hover:bg-sky-600 text-white px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 hover:scale-[1.02]"
            asChild
          >
            <Link href="/about" target="_blank">
              Learn More
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        className="w-full"
      >
        <Stats />
      </motion.div>

      {/* Team Member Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        className="w-full"
      >
        <TeamMembers />
      </motion.div>
    </motion.main>
  );
};

export default About;
