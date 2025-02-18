"use client";
import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
// import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { IoFilterOutline } from "react-icons/io5";

const ProductsList = () => {
  const filters = [
    "All",
    "Electronics",
    "Clothing",
    "Accessories",
    "Home",
    "Sports",
    "Clothing",
    "Accessories",
    "Home",
    "Sports",
    "Clothing",
    "Accessories",
    "Home",
    "Sports",
    "Clothing",
    "Accessories",
    "Home",
    "Sports",
  ];
  return (
    <>
      <main className="flex flex-col items-start w-full">
        <section className="border rounded-t-xl w-full">
          <div className="flex items-center gap-5 px-4 whitespace-nowrap">
            <div className="flex items-center px-3 gap-3">
              <IoFilterOutline />
              <span className="text-base font-medium">Filters</span>
            </div>
            <div className="flex items-start overflow-auto gap-5 py-5 px-2 w-full">
              {filters.map((filter, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="px-10 transition-all hover:bg-sky-500 dark:border-zinc-800 hover:text-white hover:scale-110"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </section>
        <section className="border border-t-0 rounded-b-xl overflow-auto w-full h-[100rem]">
          <HoverEffect items={products} />
        </section>
      </main>
    </>
  );
};

export default ProductsList;

export const products = [
  {
    title: "T-Shirt",
    description: "High-quality cotton t-shirt available in multiple colors.",
    link: "/",
    image: "/card.png",
    price: "19.99",
  },
  {
    title: "Cricket Bat",
    description: "Premium wooden cricket bat for professional play.",
    link: "/",
    image: "/card.png",
    price: "49.99",
  },
  {
    title: "Smart Watch",
    description: "Feature-rich smartwatch with heart rate monitoring.",
    link: "/",
    image: "/card.png",
    price: "129.99",
  },
  {
    title: "Running Shoes",
    description: "Comfortable and durable running shoes for all terrains.",
    link: "/",
    image: "/card.png",
    price: "79.99",
  },
  {
    title: "Backpack",
    description: "Stylish and spacious backpack for daily use.",
    link: "/",
    image: "/card.png",
    price: "39.99",
  },
  {
    title: "Sunglasses",
    description: "UV-protected sunglasses for a stylish look.",
    link: "/",
    image: "/card.png",
    price: "29.99",
  },
  {
    title: "Headphones",
    description: "Wireless headphones with noise cancellation.",
    link: "/",
    image: "/card.png",
    price: "99.99",
  },
  {
    title: "Leather Wallet",
    description: "Genuine leather wallet with multiple compartments.",
    link: "/",
    image: "/card.png",
    price: "25.99",
  },
  {
    title: "Laptop Bag",
    description: "Water-resistant laptop bag with extra padding.",
    link: "/",
    image: "/card.png",
    price: "59.99",
  },
  {
    title: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable buttons.",
    link: "/",
    image: "/card.png",
    price: "39.99",
  },
];
