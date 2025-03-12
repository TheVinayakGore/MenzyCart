"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  mrp: number;
  description: string;
  slug?: string; // Optional slug for the product link
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  mrp,
  description,
  slug,
}) => {
  return (
    <>
      <Link
        href={`/product/${slug}`}
        target="_blank"
        rel="noopener"
        className="group relative bg-white dark:bg-zinc-800 border-2 hover:border-sky-400 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:shadow-sky-200 dark:hover:shadow-sky-800 transition-shadow h-full"
      >
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="w-full h-auto object-cover transition-transform group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {name}
          </h3>
          <p className="text-base text-zinc-600 dark:text-zinc-400 mt-3">
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
          <div className="flex items-center justify-start gap-3 mt-6 w-full">
            <div className="flex items-center justify-start gap-1 text-sky-500 text-2xl">
              <span className="text-4xl">₹</span>{" "}
              <span className="font-bold">{price.toFixed(2)}</span>
            </div>
            <p className="text-lg opacity-60 font-light line-through">
            ₹{mrp.toFixed(2)}
            </p>
            <p className="text-xl font-semibold text-green-600">
              {((1 - price / mrp) * 100).toFixed(0)}% OFF
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
