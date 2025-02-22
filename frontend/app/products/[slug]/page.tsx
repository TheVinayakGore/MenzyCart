"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  gallery: string[];
  tags: string[];
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
            const productData = {
              id: fetchedProduct.id,
              title: fetchedProduct.attributes.title,
              slug: fetchedProduct.attributes.slug,
              description: fetchedProduct.attributes.description,
              price: fetchedProduct.attributes.price,
              stock: fetchedProduct.attributes.stock,
              imageUrl: fetchedProduct.attributes.image?.data?.attributes?.url
                ? `http://localhost:1337${fetchedProduct.attributes.image.data.attributes.url}`
                : "",
              gallery: fetchedProduct.attributes.gallery?.data
                ? fetchedProduct.attributes.gallery.data.map(
                    (img: { attributes: { url: string } }) =>
                      `http://localhost:1337${img.attributes.url}`
                  )
                : [],
              tags: fetchedProduct.attributes.tags?.data
                ? fetchedProduct.attributes.tags.data.map(
                    (tag: { attributes: { name: string } }) =>
                      tag.attributes.name
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

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="flex flex-col items-start justify-start gap-5 max-w-6xl mx-auto py-40">
      <h1 className="text-4xl font-extrabold">{product.title || "Undefined"}</h1>

      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={1000}
          height={1000}
          priority
          className="w-full h-full rounded-xl border-2"
        />
      )}

      <p className="text-xs opacity-40">Price: ${product.price}</p>
      <p className="text-xs opacity-40">Stock: {product.stock} available</p>
      <p className="opacity-60">{product.description}</p>

      {/* Gallery */}
      {product.gallery.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.gallery.map((imgUrl, index) => (
            <Image
              key={index}
              src={imgUrl}
              alt={`Gallery Image ${index + 1}`}
              width={500}
              height={500}
              className="rounded-lg border"
            />
          ))}
        </div>
      )}

      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-4">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
