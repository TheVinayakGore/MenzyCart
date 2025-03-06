"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Products = ({
  items,
  className,
}: {
  items: {
    title: string;
    category: string;
    description: string;
    link: string;
    image: string;
    price: string;
    mrp: string;
    tags: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-5 w-full h-full",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={item?.link}
          target="_blank"
          className="flex-col items-start justify-between m-auto relative group block p-3 w-full h-full"
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
            <div className="w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                width={2000}
                height={2000}
                className="rounded-md border w-full h-full"
              />
            </div>
            <div className="flex flex-col items-start gap-1 pt-3 h-full">
              <p className="text-xs text-green-500 font-medium uppercase tracking-wide">
                {item.category.slice(2)}
              </p>
              <CardTitle>{item.title}</CardTitle>
              <div className="flex items-center justify-start gap-3">
                <b className="text-lg text-sky-500 dark:text-sky-400">
                  ₹{item.price}
                </b>{" "}
                <span className="line-through text-base opacity-50">
                  ₹{item.mrp}
                </span>
                <b className="text-lg text-green-500">
                  {Math.round(
                    ((parseFloat(item.mrp) - parseFloat(item.price)) /
                      parseFloat(item.mrp)) *
                      100
                  )}
                  % off
                </b>
              </div>
              {item.tags && (
                <div
                  className={`absolute top-0 left-0 m-4 ${
                    item.tags && "bg-sky-400"
                  } text-sm font-medium text-white p-2 px-7 rounded-tl-md rounded-br-xl`}
                >
                  {item.tags}
                </div>
              )}
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
  return <h1 className={cn("text-xl", className)}>{children}</h1>;
};
