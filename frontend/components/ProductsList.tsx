"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HoverEffect } from "./ui/card-hover-effect";
import { motion } from "framer-motion";
import Link from "next/link";

// Define the API response structure
interface ProductAPIResponse {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  };
  slug: string;
  description: string;
  price: number;
  mrp: number;
  stock: string;
  image?: {
    id: number;
    url: string;
    alternativeText: string;
  };
  gallery?: { url: string }[];
  tags: string;
}

// Utility function to fetch products
const fetchProducts = async (API_URL: string) => {
  const response = await axios.get<{ data: ProductAPIResponse[] }>(
    `${API_URL}/api/products?populate=*`
  );
  return response.data.data.map((product) => ({
    title: product.title || "Untitled Product",
    category: product.category?.name || "Uncategorized",
    description:
      Array.isArray(product.description) &&
      product.description[0]?.children[0]?.text
        ? product.description[0].children[0].text
        : "No description",
    link: `/products/${product.slug || "no-slug"}`,
    image: product.image?.url
      ? `${API_URL}${product.image.url}`
      : "/noimage.png",
    price: product.price?.toString() || "0",
    mrp: product.mrp?.toString() || "0",
    tags: product.tags || "",
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
      category: string;
      description: string;
      link: string;
      image: string;
      price: string;
      mrp: string;
      tags: string;
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

  // Filter products to show only one product per category
  const getUniqueCategoryProducts = (
    products: {
      title: string;
      category: string;
      description: string;
      link: string;
      image: string;
      price: string;
      mrp: string;
      tags: string;
    }[]
  ) => {
    const categoryMap = new Map();
    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, product);
      }
    });
    return Array.from(categoryMap.values());
  };

  const uniqueCategoryProducts = getUniqueCategoryProducts(products);

  if (loading) return <Loading />;

  return (
    <>
      <main id="explore" className="flex flex-col items-start w-full">
        {/* Explore Products Section */}
        <section className="flex flex-col items-start gap-5 w-full">
          {/* Heading with Motion Animation */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold"
          >
            Explore Products
          </motion.h1>

          {/* Paragraph with Motion Animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300"
          >
            Discover a wide range of high-quality products tailored to meet your
            needs. From stylish clothing and comfortable footwear to essential
            accessories and grooming products, we offer everything you need to
            elevate your lifestyle. Our collection is carefully curated to
            ensure the best in design, functionality, and affordability. Whether
            you are looking for the latest trends or timeless classics, you will
            find it here. Start exploring now and find the perfect products for
            you!
          </motion.p>
        </section>

        {/* Products Section */}
        <section className="w-full h-full mt-8">
          <HoverEffect items={uniqueCategoryProducts} />
        </section>

        <Link
          href="/category"
          target="_blank"
          className="p-2 px-10 text-xl bg-sky-400 hover:bg-sky-500 text-white rounded-lg"
        >
          Check me
        </Link>
      </main>
    </>
  );
};

export default ProductsList;
