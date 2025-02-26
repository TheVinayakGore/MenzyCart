"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HoverEffect } from "./ui/card-hover-effect";
import { Button } from "./ui/button";
import { IoFilterOutline } from "react-icons/io5";

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
    title: product.title || "Untitled Product",
    description:
      Array.isArray(product.description) &&
      product.description[0]?.children[0]?.text
        ? product.description[0].children[0].text.slice(0, 165) + "..."
        : "No description",
    link: `/products/${product.slug || "no-slug"}`,
    image: product.image?.url
      ? `${API_URL}${product.image.url}`
      : "/noimage.png",
    price: product.price?.toString() || "0",
    tags: product.tags || [], // Fetch tags from API
  }));
};

// Loading Component
const Loading = () => (
  <p className="text-center p-40 text-lg">Loading products...</p>
);

const ProductsList = () => {
  const [products, setProducts] = useState<
    {
      title: string;
      description: string;
      link: string;
      image: string;
      price: string;
      tags: string[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

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
