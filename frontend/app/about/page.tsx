"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FAQ from "@/components/FAQ";

const page = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-32 m-auto p-28 w-full"
    >
      {/* Hero Section */}
      <section className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-9xl font-bold mb-5"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg max-w-5xl mx-auto"
        >
          We are a passionate team dedicated to providing the best products and
          services to our customers. Our mission is to make online shopping
          seamless, enjoyable, and accessible for everyone.
        </motion.p>
      </section>

      {/* Our Story Section */}
      <section className="flex items-start justify-start gap-14 w-full">
        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-full w-full rounded-2xl overflow-hidden"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="rounded-2xl border shadow-2xl w-full h-full object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-6 w-1/2"
        >
          <h2 className="text-6xl md:text-7xl font-bold -mt-3">Our Story</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Founded in 2020, our journey began with a simple idea: to create an
            eCommerce platform that prioritizes quality, affordability, and
            customer satisfaction. Over the years, we have grown into a trusted
            brand, serving thousands of happy customers worldwide.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our team is made up of passionate individuals who are committed to
            innovation and excellence. We believe in the power of technology to
            transform the way people shop, and we are constantly working to
            improve your experience.
          </p>
          <Button className="p-6 text-lg bg-sky-500 hover:bg-sky-600 text-white hover:shadow-lg transition duration-300 hover:scale-110 w-44">
            Learn More
          </Button>
        </motion.div>
      </section>

      {/* Mission and Values Section */}
      <section className="w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-20"
        >
          Our Mission & Values
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Customer First",
              description:
                "We prioritize our customers' needs and strive to deliver exceptional service.",
              icon: "🤝", // Updated emoji
              stats: "10M+ Happy Customers",
              animation: "fadeIn",
              additionalInfo: "24/7 Customer Support",
            },
            {
              title: "Innovation",
              description:
                "We embrace new technologies and ideas to stay ahead in the eCommerce industry.",
              icon: "🚀", // Updated emoji
              stats: "50+ Industry Awards",
              animation: "fadeIn",
              additionalInfo: "Cutting-Edge Technology",
            },
            {
              title: "Sustainability",
              description:
                "We are committed to eco-friendly practices and reducing our environmental impact.",
              icon: "🌍", // Updated emoji
              stats: "100% Carbon Neutral",
              animation: "fadeIn",
              additionalInfo: "Eco-Friendly Packaging",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: 2 }} // Slight rotation on hover
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700 text-center hover:shadow-xl transition-shadow"
            >
              {/* Icon with Animation */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-6xl mb-6"
              >
                {item.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {item.description}
              </p>

              {/* Stats */}
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {item.stats}
              </p>

              {/* Additional Info */}
              <p className="text-sm text-sky-500 dark:text-sky-400 font-medium">
                {item.additionalInfo}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-20"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "John Doe",
              role: "CEO & Founder",
              image: "/mem1.jpeg", // Replace with your image path
              email: "john.doe@example.com",
              rating: 5,
              comment:
                "“Leadership is about making others better as a result of your presence.”",
            },
            {
              name: "Jane Smith",
              role: "Head of Operations",
              image: "/mem2.jpeg", // Replace with your image path
              email: "jane.smith@example.com",
              rating: 4.5,
              comment:
                "“Efficiency is doing things right; effectiveness is doing the right things.”",
            },
            {
              name: "Alex Johnson",
              role: "Lead Developer",
              image: "/mem3.jpeg", // Replace with your image path
              email: "alex.johnson@example.com",
              rating: 4.8,
              comment:
                "“Innovation distinguishes between a leader and a follower.”",
            },
            {
              name: "Emily Brown",
              role: "Marketing Manager",
              image: "/mem4.jpeg", // Replace with your image path
              email: "emily.brown@example.com",
              rating: 4.7,
              comment:
                "“Marketing is no longer about the stuff you make, but the stories you tell.”",
            },
            {
              name: "Michael Lee",
              role: "Product Designer",
              image: "/mem5.jpeg", // Replace with your image path
              email: "michael.lee@example.com",
              rating: 4.9,
              comment:
                "“Design is not just what it looks like, it is how it works.”",
            },
            {
              name: "Sarah Wilson",
              role: "Customer Support",
              image: "/mem6.jpeg", // Replace with your image path
              email: "sarah.wilson@example.com",
              rating: 4.6,
              comment:
                "“Customers do not expect you to be perfect, they expect you to care.”",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-zinc-900 p-10 rounded-xl shadow-xl border dark:border-zinc-700 text-center cursor-pointer"
            >
              {/* Team Member Image */}
              <div className="relative h-32 w-32 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={2000}
                  height={2000}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>

              {/* Team Member Name and Role */}
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="opacity-60 mb-2">{member.role}</p>

              {/* Email Address */}
              <a
                href={`mailto:${member.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {member.email}
              </a>

              {/* Rating */}
              <div className="flex justify-center items-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(member.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.445a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.445a1 1 0 00-1.176 0l-3.366 2.445c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.51 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {member.rating}
                </span>
              </div>

              {/* Short Comment with Quotes */}
              <blockquote className="mt-4 text-gray-600 dark:text-gray-400 italic">
                {member.comment}
              </blockquote>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full h-full">
        <FAQ />
      </section>
    </motion.main>
  );
};

export default page;
