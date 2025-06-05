"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  brand: string;
  tag: string;
  price: number;
  mrp: number;
  description: string;
  slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  brand,
  tag,
  price,
  mrp,
  description,
  slug,
}) => {
  return (
    <Link
      href={`/product/${slug}`}
      target="_blank"
      rel="noopener"
      className="group relative bg-white dark:bg-zinc-800 border hover:border-sky-400 rounded-lg overflow-hidden shadow-xl hover:shadow-sky-200 dark:hover:shadow-sky-800 transition-shadow h-full flex flex-col"
    >
      {/* Responsive Image */}
      <div className="w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[5/3] relative border-b">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 1000px) 100vw, 33vw"
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Tag */}
      {tag && (
        <div
          className={`absolute top-0 left-0 uppercase ${
            tag === "Best Seller" ? "bg-sky-500" : "bg-teal-500"
          } text-xs sm:text-sm text-white p-1 sm:p-2 px-3 sm:px-5 rounded-tl-md rounded-br-xl`}
        >
          {tag}
        </div>
      )}

      {/* Card Content */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        <span className="text-xs sm:text-sm uppercase opacity-50">{brand}</span>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
          {name}
        </h3>
        <p className="text-sm sm:text-base opacity-60 mt-2 line-clamp-3">
          {description}
        </p>

        {/* Pricing */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <div className="flex items-center gap-1 text-sky-500 text-xl sm:text-2xl">
            <span className="text-2xl sm:text-3xl">₹</span>
            <span className="font-bold">{price.toFixed(2)}</span>
          </div>
          <p className="text-sm sm:text-lg opacity-60 font-light line-through">
            ₹{mrp.toFixed(2)}
          </p>
          <p className="text-sm sm:text-xl font-semibold text-green-600">
            {((1 - price / mrp) * 100).toFixed(0)}% OFF
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
