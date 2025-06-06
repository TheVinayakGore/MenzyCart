"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MdOutlineMenu } from "react-icons/md";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import Cart from "@/app/product/cart";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { HiOutlineShoppingCart, HiOutlineSun } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";
import { PiArrowUpRightBold } from "react-icons/pi";
import { Card, CardContent } from "@/components/ui/card";
import { BsInfoSquare } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";
import LoadingBar from "./LoadingBar";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Read cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartItems.length);

    // Optional: listen to cart changes from other components
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(updatedCart.length);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!mounted) return null;

  const handleNavLinkClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  const navLinkClass =
    "relative flex items-center space-x-1 pl-3 pr-2 hover:font-semibold hover:text-sky-500 relative transition-all duration-200 before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-[2px] before:bg-sky-400 dark:before:bg-sky-500 before:transition-all before:duration-300 before:-translate-x-1/2 hover:before:w-full hover:before:left-0 hover:before:translate-x-0 hover:before:bottom-[-4px]";

  return (
    <nav className="fixed top-0 z-[100] w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-md">
      {/* Loading Bar */}
      <LoadingBar loading={isLoading} />

      <div className="flex items-center justify-between px-5 sm:px-20 py-3">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleNavLinkClick}
          className="flex items-center font-bold"
        >
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <span className="ml-3 text-xl md:text-3xl font-bold">
            Menzy <span className="text-sky-400 italic">Cart</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center gap-6 flex-1 mx-8">
          {/* Links */}
          <div className="flex gap-4">
            <Link
              href="/about"
              onClick={handleNavLinkClick}
              className={navLinkClass}
            >
              About Us{" "}
              <PiArrowUpRightBold className="absolute top-0 -right-1.5 w-3 h-3" />
            </Link>
            <Link
              href="/help"
              onClick={handleNavLinkClick}
              className={navLinkClass}
            >
              Help{" "}
              <PiArrowUpRightBold className="absolute top-0 -right-1.5 w-3 h-3" />
            </Link>
          </div>

          {/* Search */}
          <div className="relative w-1/2">
            <Input
              type="text"
              placeholder="Search products"
              className="w-full rounded-lg border dark:border-zinc-700 focus-visible:ring-sky-400"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center p-3 rounded-r-lg border dark:border-zinc-700"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            {/* Cart */}
            <Drawer>
              <DrawerTrigger asChild>
                <button className="relative p-2 -mr-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/30 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <HiOutlineShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </button>
              </DrawerTrigger>
              <Cart />
            </Drawer>

            {/* User Auth */}
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "w-10 h-10 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-all",
                    userButtonPopoverCard:
                      "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xl",
                    userButtonPopoverActionButton:
                      "hover:bg-sky-100 dark:hover:bg-zinc-800 text-sm",
                    userButtonPopoverFooter: "hidden",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="text-base p-5 px-7 font-medium bg-sky-400 hover:bg-sky-500 text-white">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/30 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {theme === "dark" ? (
                <HiOutlineSun className="h-6 w-6" />
              ) : (
                <IoMoonOutline className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/30 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <MdOutlineMenu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent className="pt-8 z-[100]">
              <div className="flex flex-col gap-6">
                {/* User Info Card */}
                <Card className="w-full">
                  <CardContent className="pt-4 pb-4 px-4 flex items-center gap-4">
                    <UserButton />
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="hidden sm:block text-xs text-muted-foreground">
                        johndoe@email.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="text-sm px-6 font-medium bg-sky-400 hover:bg-sky-500 text-white">
                      Login
                    </Button>
                  </SignInButton>
                </SignedOut>

                {/* Navigation Links */}
                <Link
                  href="/about"
                  onClick={handleNavLinkClick}
                  className="flex items-center gap-3 w-full text-base font-medium p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/30 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <BsInfoSquare className="h-6 w-6" />
                  <span>About Us</span>
                </Link>
                <Link
                  href="/help"
                  onClick={handleNavLinkClick}
                  className="flex items-center gap-3 w-full text-base font-medium p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/30 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <TfiHelpAlt className="h-6 w-6" />
                  <span>Help</span>
                </Link>

                {/* Theme Switch */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-center gap-2 w-full text-base font-medium p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/30 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {theme === "dark" ? (
                    <div className="flex items-center gap-3 w-full">
                      <HiOutlineSun className="h-6 w-6" />
                      <span>Dark Mode</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 w-full">
                      <IoMoonOutline className="h-6 w-6" />
                      <span>Light Mode</span>
                    </div>
                  )}
                </button>

                {/* Cart Button */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <button className="relative flex items-center gap-3 w-full text-base font-medium p-3 -mr-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/30 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <HiOutlineShoppingCart className="h-6 w-6" />
                      <div className="flex items-center justify-between w-full">
                        <span>Check Cart</span>
                        <span>(3)</span>
                      </div>
                    </button>
                  </DrawerTrigger>
                  <Cart />
                </Drawer>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
