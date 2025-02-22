"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product"; // Import the Product interface

// Define the API response structure
interface ProductAPIResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: string;
  image?: {
    id: number;
    url: string;
    alternativeText: string;
  };
  gallery?: { url: string }[];
  tags?: string[];
}

// Utility function to fetch products
const fetchProducts = async (API_URL: string) => {
  const response = await axios.get<{ data: ProductAPIResponse[] }>(
    `${API_URL}/api/products?populate=*`
  );
  return response.data.data.map((product) => ({
    id: product.id,
    title: product.title || "Untitled Product",
    slug: product.slug || "no-slug",
    description: Array.isArray(product.description)
      ? product.description[0]?.children[0]?.text || "No description"
      : "No description",
    price: product.price ?? 0,
    stock: product.stock ? Number(product.stock) : 0,
    imageUrl: product.image?.url ? `${API_URL}${product.image.url}` : "",
    gallery: product.gallery?.map((img) => img.url) || [],
    tags: product.tags || [],
  }));
};

// Product Card Component
const ProductCard = ({ product }: { product: Product }) => (
  <Link
    href={`/products/${product.slug}`}
    target="_blank"
    className="p-6 shadow-lg rounded-lg bg-white dark:bg-zinc-900 border transition-transform hover:scale-105 hover:shadow-2xl"
  >
    {product.imageUrl && (
      <Image
        src={product.imageUrl}
        alt={product.title}
        width={500}
        height={300}
        priority
        className="w-full h-48 object-cover rounded-md"
      />
    )}
    <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
    <p className="text-sm opacity-60 mt-1">${product.price.toFixed(2)}</p>
    <p className="text-xs opacity-30 mt-1">
      {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
    </p>
    <div className="mt-4">
      <p className="text-sm opacity-50">
        {product.description.length > 100
          ? `${product.description.slice(0, 100)}...`
          : product.description}
      </p>
    </div>
    <div className="mt-2 flex flex-wrap gap-2">
      {product.tags?.map((tag, index) => (
        <span
          key={index}
          className="text-xs bg-gray-200 dark:bg-zinc-800 px-2 py-1 rounded-md"
        >
          {tag}
        </span>
      ))}
    </div>
  </Link>
);

// Loading Component
const Loading = () => (
  <p className="text-center py-10 text-lg">Loading products...</p>
);

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(API_URL);
        if (isMounted) {
          setProducts(fetchedProducts);
          setLoading(false);
        }
      } catch (error) {
        alert("Error fetching products:" + error);
        if (isMounted) setLoading(false);
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  if (loading) return <Loading />;

  return (
    <main className="flex flex-col items-center justify-center gap-10 max-w-6xl mx-auto py-36">
      <h1 className="text-6xl font-extrabold">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Page;
