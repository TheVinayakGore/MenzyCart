"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className={`cursor-pointer text-lg font-medium relative transition-all duration-200 ${
          active === item
            ? "before:w-full before:left-0 before:translate-x-0 before:bottom-[-4px]"
            : "before:w-0 before:left-1/2 before:-translate-x-1/2"
        } before:absolute before:-bottom-1 before:h-[2px] before:bg-sky-400 before:transition-all before:duration-300`}
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-3">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-lg overflow-hidden border border-sky-500 shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-2"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative flex items-center justify-between m-auto border border-sky-500 rounded-full max-w-7xl px-10 p-5 shadow-lg animate-shimmer bg-[linear-gradient(110deg,#bae6fd,45%,#90d9ff,55%,#bae6fd)] dark:bg-[linear-gradient(110deg,#082f49,45%,#0c4a6e,55%,#082f49)] bg-[length:200%_100%]"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link
      href={href}
      className="flex items-start justify-start space-x-2 hover:bg-sky-100 dark:hover:bg-sky-900 border border-transparent hover:border-sky-500 rounded p-1 w-full h-full"
    >
      <Image
        src={src}
        alt={title}
        width={200}
        height={200}
        className="flex-shrink-0 border border-black/[0.2] dark:border-white/[0.2] rounded-sm w-20 h-24"
      />
      <div>
        <h4 className="text-lg font-medium mb-1 -mt-1">{title}</h4>
        <p className="text-xs font-light max-w-[7rem]">{description}</p>
      </div>
    </Link>
  );
};
