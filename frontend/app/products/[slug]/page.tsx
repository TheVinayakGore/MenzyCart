"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  gallery: string[];
}

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*`
          );

          const fetchedProduct =
            response.data.data.length > 0 ? response.data.data[0] : null;

          if (fetchedProduct) {
            interface ProductDescriptionBlock {
              children: { text: string }[];
            }

            const productData: Product = {
              id: fetchedProduct.id,
              title: fetchedProduct.title,
              description: fetchedProduct.description
                ? fetchedProduct.description
                    .map((block: ProductDescriptionBlock) =>
                      block.children.map((child) => child.text).join("")
                    )
                    .join("\n")
                : "No description available.",
              price: fetchedProduct.price,
              stock: parseInt(fetchedProduct.stock, 10) || 0, // Ensure stock is a number
              imageUrl: fetchedProduct.image?.url
                ? `http://localhost:1337${fetchedProduct.image.url}`
                : "/placeholder.jpg",
              gallery: fetchedProduct.gallery
                ? fetchedProduct.gallery.map(
                    (img: { url: string }) => `http://localhost:1337${img.url}`
                  )
                : [],
            };
            setProduct(productData);
          }
        } catch (error) {
          toast.error("Error fetching product: " + error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [slug]);

  if (loading)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-40 text-center text-gray-600"
      >
        Loading product...
      </motion.p>
    );
  if (!product)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-40 text-center text-gray-600"
      >
        Product not found
      </motion.p>
    );

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-start justify-start gap-8 max-w-6xl mx-auto py-20 px-4"
    >
      {/* Product Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl font-bold text-gray-900"
      >
        {product.title || "Undefined"}
      </motion.h1>

      {/* Product Image */}
      {product.imageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full h-auto rounded-xl overflow-hidden shadow-lg"
        >
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={1000}
            height={1000}
            priority
            className="w-full h-auto object-cover"
          />
        </motion.div>
      )}

      {/* Price and Stock */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <p className="text-2xl font-semibold text-gray-800">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          {product.stock > 0
            ? `${product.stock} available in stock`
            : "Out of stock"}
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-lg text-gray-700 whitespace-pre-line"
      >
        {product.description}
      </motion.p>

      {/* Gallery */}
      {product.gallery.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          {product.gallery.map((imgUrl, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg overflow-hidden shadow-md cursor-pointer"
            >
              <Image
                src={imgUrl}
                alt={`Gallery Image ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.main>
  );
}
