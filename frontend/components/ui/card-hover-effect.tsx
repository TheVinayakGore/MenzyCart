"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    image: string;
    price: string;
    tags: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-5",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={item?.link}
          target="_blank"
          className="flex-col items-start justify-between m-auto relative group block p-3 h-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-sky-100 dark:bg-sky-950 block rounded-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="flex flex-col items-start justify-between border-sky-300 dark:border-sky-700 relative rounded-lg w-full h-full">
            <div className="w-full">
              <Image
                src={item.image}
                alt={item.title}
                width={2000}
                height={2000}
                className="rounded-md border w-full h-full"
              />
            </div>
            <div className="flex flex-col items-start justify-between pt-3 h-full">
              <CardTitle>{item.title}</CardTitle>
              <b className="text-xl text-sky-500 dark:text-sky-400">
                ₹{item.price}
              </b>
              {/* {item.tags && (
                <div
                  className={`absolute top-0 left-0 m-4 ${
                    item.tags && "bg-sky-400"
                  } text-sm font-medium text-white p-2 px-7 rounded-tl-md rounded-br-xl`}
                >
                  {item.tags}
                </div>
              )} */}
            </div>
          </Card>
        </Link>
      ))}
    </main>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "h-full rounded-xl overflow-hidden bg-white dark:bg-zinc-950 border relative z-20",
        className
      )}
    >
      <div className="relative z-50 h-full">
        <div className="flex flex-col items-start justify-between h-full p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1 className={cn("text-2xl tracking-wide my-2", className)}>
      {children}
    </h1>
  );
};