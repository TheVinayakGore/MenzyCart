"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { FaYoutube, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 w-full"
    >
      {/* Newsletter + Branding */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 border-b border-zinc-200 dark:border-zinc-800 p-10">
        <div className="w-full md:w-1/2 space-y-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="logo"
              width={48}
              height={48}
              className="rounded-lg w-10 h-10"
            />
            <h1 className="text-2xl font-bold tracking-tight">
              Menzy<span className="italic text-sky-500">Cart</span>
            </h1>
          </Link>
          <p className="text-sm opacity-70 max-w-sm">
            Discover premium <strong>men is fashion</strong> and accessories for
            every occasion. Join our newsletter for exclusive updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full max-w-md">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 dark:bg-zinc-900"
            />
            <Button className="bg-sky-500 hover:bg-sky-600 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm p-10 gap-4 border-t border-zinc-200 dark:border-zinc-800">
        <p className="opacity-70 text-center sm:text-left">
          © {new Date().getFullYear()} MenzyCart. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <Link
            href="/privacy"
            className="hover:text-sky-500 opacity-70 hover:opacity-100 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-sky-500 opacity-70 hover:opacity-100 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition-opacity opacity-70 hover:opacity-100"
          >
            <FaYoutube className="w-5 h-5" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition-opacity opacity-70 hover:opacity-100"
          >
            <FaXTwitter className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
