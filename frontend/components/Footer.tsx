"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  // Links for each column
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  const customerServiceLinks = [
    { name: "FAQs", href: "/faqs" },
    { name: "Shipping Information", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Order Tracking", href: "/track-order" },
    { name: "Size Guide", href: "/size-guide" },
  ];

  const companyLinks = [
    { name: "Careers", href: "/careers" },
    { name: "Our Story", href: "/our-story" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Press", href: "/press" },
    { name: "Affiliates", href: "/affiliates" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-zinc-100 dark:bg-zinc-900 py-12"
    >
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-24 pb-8 border-b dark:border-zinc-800">
          {/* Logo & Newsletter */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="w-8 h-8" />
              <h1 className="text-2xl font-medium">
                Menzy<span className="italic text-sky-400">Cart</span>
              </h1>
            </Link>
            <p className="mt-4 text-sm opacity-60">
              Discover premium UI components & templates for your next project.
            </p>
            <div className="mt-4 flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 dark:bg-zinc-800 dark:border-zinc-700"
              />
              <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="col-span-3 flex items-start justify-between w-full">
            {/* Quick Links */}
            <div className="w-full">
              <h3 className="text-lg font-medium pl-5">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target="_blank"
                      className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service Links */}
            <div className="w-full">
              <h3 className="text-lg font-medium pl-5">Customer Service</h3>
              <ul className="mt-4 space-y-2">
                {customerServiceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="w-full">
              <h3 className="text-lg font-medium pl-5">Company</h3>
              <ul className="mt-4 space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="opacity-60">
            © {new Date().getFullYear()} MenzyCart. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacyPolicy"
              target="_blank"
              className="hover:text-sky-500 opacity-60 hover:opacity-100"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              target="_blank"
              className="hover:text-sky-500 opacity-60 hover:opacity-100"
            >
              Terms of Service
            </Link>
            <Link
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 opacity-60 hover:opacity-100"
            >
              <FaYoutube className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 opacity-60 hover:opacity-100"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
