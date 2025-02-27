"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PiHeartFill } from "react-icons/pi";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  gallery: string[];
  rating: number;
  reviews: number;
  colors: string[];
  // sizes: string[];
}

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [pincode, setPincode] = useState<string>("");
  const [service, setService] = useState<boolean | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [liked, setLiked] = useState(false);

  const checkPincode = async () => {
    try {
      const response = await fetch("/api/pincode");
      const pincodejson: string[] = await response.json();
      setService(pincodejson.includes(pincode));
    } catch (error) {
      console.error("Failed to check pincode:", error);
    }
  };

  const onChangePincode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setPincode(value);
    }
  };

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
              stock: parseInt(fetchedProduct.stock, 10) || 0,
              imageUrl: fetchedProduct.image?.url
                ? `http://localhost:1337${fetchedProduct.image.url}`
                : "/placeholder.jpg",
              gallery: fetchedProduct.gallery
                ? fetchedProduct.gallery.map(
                    (img: { url: string }) => `http://localhost:1337${img.url}`
                  )
                : [],
              rating: fetchedProduct.rating || 0,
              reviews: fetchedProduct.reviews || 0,
              colors: fetchedProduct.colors?.data
                ? fetchedProduct.colors.data.map(
                    (color: { name: string } ) => color
                  )
                : [],
              // sizes: fetchedProduct.attributes.sizes?.data
              //   ? fetchedProduct.attributes.sizes.data.map(
              //       (size: { attributes: { name: string } }) => size
              //     )
              //   : [],
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

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
    toast.success(liked ? "Unliked!" : "Liked!");
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start py-32 px-10 w-full h-full"
      >
        <div className="flex items-start justify-between gap-5 w-full h-full">
          {/* Image Section */}
          <section
            id="ID1"
            className="sticky top-24 flex items-start justify-start gap-5 w-full h-full"
          >
            <ul className="flex flex-col items-start justify-start gap-2 overflow-auto h-[30rem]">
              <li>
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={600}
                  height={200}
                  priority
                  className="object-cover rounded-md border dark:border-zinc-700 shadow-lg h-28 w-40"
                />
              </li>
            </ul>
            <div className="flex flex-col items-center gap-3 w-full h-full">
              <div className="flex items-start w-full h-full">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={600}
                  height={200}
                  priority
                  className="object-cover rounded-lg border dark:border-zinc-700 shadow-lg h-[30rem] w-full"
                />
                <button
                  onClick={handleLikeClick}
                  className="-ml-12 mt-2 border-none shadow-md rounded-full bg-white p-2"
                >
                  <PiHeartFill
                    className={`h-6 w-6 ${
                      liked
                        ? "text-rose-500"
                        : "text-zinc-300 hover:text-red-500"
                    }`}
                  />
                </button>
              </div>
              {/* Quantity Selector and Buttons */}
              <div className="flex items-center space-x-3 py-5 mt-5 border-t dark:border-zinc-700 w-full h-full">
                <div className="w-full">
                  <Button
                    variant="outline"
                    className="text-lg font-medium dark:border-zinc-700 hover:bg-sky-500 hover:text-white h-14 w-full"
                  >
                    Add to Cart
                  </Button>
                </div>
                <div className="w-full">
                  <Button className="text-lg font-medium hover:bg-yellow-500 h-14 w-full">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Product Details Section */}
          <section
            id="ID2"
            className="sticky top-0 overflow-auto px-5 w-full h-full"
          >
            <div>
              <h1 className="text-black dark:text-white text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <div className="flex mb-3">
                <span className="flex items-center">
                  {[...Array(product.rating)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-lg" />
                  ))}
                  {[...Array(5 - product.rating)].map((_, index) => (
                    <FaRegStar
                      key={index}
                      className="text-yellow-400 text-lg"
                    />
                  ))}
                  <span className="ml-3 text-lg">
                    {product.reviews} Reviews
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
            </div>

            {/* Color and Size Selectors */}
            <div className="flex my-6 items-center space-x-10 w-full">
              {/* {product.sizes.length > 0 && (
                <div className="flex items-center w-40">
                  <div className="relative w-full">
                    <Select>
                      <SelectTrigger className="dark:border-zinc-700 w-full">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.sizes.map((size, index) => (
                          <SelectItem key={index} value={size}>
                            {size.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )} */}

              {/* Color Selector */}
              <div className="flex items-center w-full h-10">
                <span className="mr-2">Colors :</span>
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    aria-label={`Color option ${color}`}
                    onClick={() => setSelectedColor(color)}
                    className={`border border-zinc-800 dark:border-zinc-800 rounded-full w-6 h-6 ${
                      selectedColor === color ? "ring-2 ring-blue-500" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Price and Pincode Checker */}
            <div className="flex items-center justify-between border-t border-b dark:border-zinc-700 py-4 my-5 w-full">
              <p className="flex items-end space-x-3 title-font font-medium text-2xl text-black dark:text-white">
                ${product.price.toFixed(2)}
              </p>
              <div className="w-1/2">
                <div className="flex max-w-sm items-center space-x-2 w-full">
                  <Input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Check Pincode"
                    className="dark:border-zinc-700"
                    value={pincode}
                    onChange={onChangePincode}
                    maxLength={6}
                    required
                  />
                  <Button
                    onClick={checkPincode}
                    className="hover:bg-sky-400 hover:text-white w-40"
                  >
                    Check
                  </Button>
                </div>
                {service === false && (
                  <div className="text-red-500 text-xs text-start mt-1 leading-3">
                    Sorry, No service available at this pincode!
                  </div>
                )}
                {service === true && (
                  <div className="text-green-500 text-xs text-start mt-1 leading-3">
                    Yes, service available at this pincode!
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </motion.main>
    </>
  );
}
