"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PiHeartFill } from "react-icons/pi";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  sizes: string[];
}

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [pincode, setPincode] = useState<string>("");
  const [service, setService] = useState<boolean | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [liked, setLiked] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `₹${latest.toFixed(2)}`);

  useEffect(() => {
    if (product?.price) {
      const controls = animate(count, product.price, {
        duration: 2, // Smooth animation
        ease: "easeOut",
      });

      return () => controls.stop(); // Cleanup animation
    }
  }, [product?.price, count]);

  useEffect(() => {
    if (service !== null) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setPincode(""); // Clear input after timeout
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [service]);

  const checkPincode = async () => {
    try {
      const response = await fetch("/api/pincode");
      const pincodejson: string[] = await response.json();
      setService(pincodejson.includes(pincode));
    } catch (error) {
      toast.error("Failed to check pincode :" + error);
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
              colors: fetchedProduct.colors || [], // Directly use colors array
              sizes: fetchedProduct.sizes || [], // Directly use sizes array
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

  useEffect(() => {
    // Load the liked state from localStorage
    const storedLiked = localStorage.getItem(`liked-${product?.id}`);
    if (storedLiked) {
      setLiked(JSON.parse(storedLiked));
    }
  }, [product?.id]);

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

  const handleLikeClick = async () => {
    const newLikedState = !liked;

    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setLiked(newLikedState);
          localStorage.setItem(
            `liked-${product?.id}`,
            JSON.stringify(newLikedState)
          );
          resolve(newLikedState);
        }, 1000); // Simulating async operation (you can remove this if unnecessary)
      }),
      {
        loading: newLikedState ? (
          <b className="text-lg px-5">Liking...</b>
        ) : (
          <b className="text-lg px-5">Unliking...</b>
        ),
        success: newLikedState ? (
          <b className="text-lg px-5">Liked ! 😍</b>
        ) : (
          <b className="text-lg px-5">Unliked ! 💔</b>
        ),
        error: <b className="text-lg px-5">Something went wrong !</b>,
      }
    );
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start py-32 px-16 w-full h-full"
      >
        <div className="flex items-start justify-start w-full h-full">
          {/* Image Section */}
          <motion.section
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            id="ID1"
            className="sticky top-0 flex flex-col items-start justify-start gap-3 w-[40%] h-full"
          >
            <div className="flex items-start justify-start gap-2 border dark:border-zinc-700 rounded-md p-2 w-full h-[36rem]">
              <div className="flex items-start w-full h-full">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={2000}
                  height={2000}
                  priority
                  className="rounded-md h-full w-full"
                />
                <motion.button
                  onClick={handleLikeClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="-ml-12 mt-2 border-none shadow-md"
                >
                  <PiHeartFill
                    className={`h-10 w-10 bg-white/[0.3] hover:text-rose-600 rounded-full p-2 ${
                      liked
                        ? "text-rose-600 shadow-lg"
                        : "text-zinc-300"
                    }`}
                  />
                </motion.button>
              </div>
              <div className="overflow-auto h-full">
                {product.gallery?.length > 0 && (
                  <ul className="flex flex-col items-start justify-start gap-3 pb-3 border-b-4 rounded-b-sm dark:border-zinc-700 overflow-x-auto w-full">
                    {product.gallery.map((image, index) => (
                      <li key={index}>
                        <button className="border dark:border-zinc-700 focus:bg-sky-400 p-1 rounded">
                          <Image
                            src={image}
                            alt={`Gallery image ${index + 1} of ${
                              product.title
                            }`}
                            width={1000}
                            height={1000}
                            priority
                            className="rounded-sm h-20 w-20"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex items-center gap-5 w-full h-full">
              <div className="w-full">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="outline"
                    className="text-lg font-medium dark:border-zinc-700 hover:bg-sky-500 hover:text-white h-14 w-full"
                  >
                    Add to Cart
                  </Button>
                </motion.div>
              </div>
              <div className="w-full">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="text-lg font-medium hover:bg-yellow-500 h-14 w-full">
                    Buy Now
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Product Details Section */}
          <motion.section
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            id="ID2"
            className="sticky top-20 overflow-auto pl-7 w-[60%] h-full"
          >
            {/* Product Title, Rating, Reviews, Description */}
            <div>
              <h1 className="text-black dark:text-white text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <div className="flex mb-3">
                <div className="flex items-center">
                  {[...Array(product.rating)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-lg" />
                  ))}
                  {[...Array(5 - product.rating)].map((_, index) => (
                    <FaRegStar
                      key={index}
                      className="text-yellow-400 text-lg"
                    />
                  ))}
                  <motion.span className="text-lg opacity-60 ml-3">
                    {product.reviews >= 1000
                      ? `${(product.reviews / 1000).toFixed(2)}K`
                      : product.reviews}{" "}
                    Reviews
                  </motion.span>
                </div>
              </div>
              <p className="leading-relaxed opacity-80">
                {product.description}
              </p>
            </div>

            {/* Color and Size Selectors */}
            <div className="flex my-6 items-center gap-10 w-full">
              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex items-center w-40">
                  <div className="relative w-full">
                    <Select>
                      <SelectTrigger className="border dark:border-zinc-700 w-full">
                        <SelectValue placeholder="M" />
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
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-1 w-full h-10">
                  <span className="mr-1">Colors :</span>
                  <motion.button
                    aria-label={`Color option None`}
                    onClick={() => setSelectedColor("")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative bg-transparent border border-zinc-500 dark:border-white mt-1 rounded-full shadow-lg w-5 h-5"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-red-500 transform rotate-45" />
                    </div>
                  </motion.button>
                  {product.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      aria-label={`Color option ${color}`}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`border border-zinc-500 dark:border-white mt-1 rounded-full shadow-lg ${
                        selectedColor === color ? "w-6 h-6" : "w-5 h-5"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Price and Pincode Checker */}
            <div className="flex items-center justify-between border-t border-b dark:border-zinc-700 my-5 w-full h-20">
              <motion.p className="text-3xl font-bold w-1/2">
                {rounded}
              </motion.p>
              <div className="w-full">
                <div className="flex items-center gap-2 w-full">
                  <Input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Check Pincode"
                    className="dark:border-zinc-700 w-full"
                    value={pincode}
                    onChange={onChangePincode}
                    maxLength={6}
                    required
                  />
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      onClick={checkPincode}
                      className="hover:bg-sky-400 hover:text-white w-28"
                    >
                      Check
                    </Button>
                  </motion.div>
                </div>
                {showMessage && service === false && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-xs text-start mt-1 leading-3"
                  >
                    Sorry, No service available at this pincode!
                  </motion.div>
                )}
                {showMessage && service === true && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-500 text-xs text-start mt-1 leading-3"
                  >
                    Yes, service available at this pincode!
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        </div>
      </motion.main>
    </>
  );
}
