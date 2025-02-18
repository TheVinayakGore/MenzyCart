"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState, useRef, useCallback } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    description: string;
    price: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 overflow-hidden w-full", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-10 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="flex flex-col items-start justify-between w-[350px] max-w-full relative rounded-xl border dark:border-zinc-800 flex-shrink-0 md:w-[25rem] bg-white dark:bg-zinc-800 shadow-xl h-[23rem]"
            key={idx}
          >
            <div className="flex flex-col items-start gap-2 w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                width={2000}
                height={2000}
                className="w-full h-auto rounded-t-xl"
              />
              <div className="flex flex-col items-start gap-2 p-4 w-full">
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-xs opacity-50">
                  {item.description.slice(0, 110)}...
                </p>
              </div>
            </div>
            <p className="p-4 pt-0 text-base font-medium text-sky-500 dark:text-sky-400">
              ${item.price}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
