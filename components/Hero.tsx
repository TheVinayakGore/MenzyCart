"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";

const colors = [
  "text-amber-400",
  "text-sky-400",
  "text-fuchsia-400",
  "text-green-400",
  "text-purple-400",
  "text-red-400",
  "text-yellow-400",
];

export default function Hero() {
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="animate-fade-in delay-50 flex flex-col items-center justify-center m-auto pt-32 w-full">
      <section className="flex flex-col items-center justify-center text-center gap-10 w-full">
        <h1 className="text-5xl md:text-9xl xl:text-[12rem] font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-500 h-full pb-5">
          Shop the latest <br />
          <span
            className={`font-semibold transition-colors duration-1000 ${currentColor}`}
          >
            <Typewriter
              words={[
                "Trends",
                "Deals",
                "Fashion",
                "Electronics",
                "Accessories",
                "Essentials",
                "Luxury",
                "Gadgets",
                "Home Goods",
                "Beauty",
              ]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={3000}
            />
          </span>
        </h1>
        <div className="flex flex-col items-center gap-5 mt-5">
          <Link href="/#products">
            <Button className="flex items-center gap-2 text-base lg:text-xl bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 hover:from-sky-600 hover:via-purple-600 hover:to-pink-600 text-white px-7 lg:px-12 py-5 lg:py-7 border-2 border-sky-400 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              Start Shopping
            </Button>
          </Link>
          <MdKeyboardDoubleArrowDown className="text-4xl lg:text-7xl animate-bounce text-sky-500 dark:text-sky-400" />
        </div>
      </section>
    </main>
  );
}
