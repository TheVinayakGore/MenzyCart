"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineSun } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import Cart from "@/app/products/Cart";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <nav className="fixed top-0 z-[100] bg-white/[0.8] dark:bg-zinc-900/[0.8] backdrop-blur-lg shadow-md w-full">
      <ul className="flex items-center justify-between p-3 px-10 w-full">
        <li>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-medium">
              Menzy<span className="italic text-sky-400">Cart</span>
            </h1>
          </Link>
        </li>
        <li className="relative flex-1 max-w-2xl mx-8">
          <div>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        </li>
        <li className="flex items-center gap-4">
          <Drawer>
            <DrawerTrigger asChild>
              <button className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200">
                <HiOutlineShoppingCart className="h-7 w-7" />
                <span className="absolute top-0 right-0 bg-sky-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  3 {/* Replace with dynamic cart count */}
                </span>
              </button>
            </DrawerTrigger>
            <Cart />
          </Drawer>
          <Button className="px-7 text-sm font-medium bg-sky-400 hover:bg-sky-500 text-white">
            Login
          </Button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/[0.3] dark:bg-zinc-900/[0.3] backdrop-blur-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
          >
            {theme === "dark" ? (
              <HiOutlineSun className="h-6 w-6" />
            ) : (
              <IoMoonOutline className="h-6 w-6" />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
