"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "/mem1.jpeg",
  },
  {
    name: "Jane Smith",
    role: "Head of Operations",
    image: "/mem2.jpeg",
  },
  {
    name: "Alice Johnson",
    role: "Marketing Director",
    image: "/mem3.jpeg",
  },
  {
    name: "Michael Brown",
    role: "Lead Developer",
    image: "/mem4.jpeg",
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
    image: "/mem5.jpeg",
  },
  {
    name: "David Wilson",
    role: "UX Designer",
    image: "/mem6.jpeg",
  },
];

export const TeamMembers = () => {
  return (
    <section className="w-full py-16">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl pb-5 font-semibold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-tr from-sky-400 to-fuchsia-500">
        Meet the Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-sky-300 dark:border-sky-700"
          >
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-4">
              <Image
                src={member.image}
                alt={member.name}
                width={144}
                height={144}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-sky-500 dark:text-sky-400">
              {member.name}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
