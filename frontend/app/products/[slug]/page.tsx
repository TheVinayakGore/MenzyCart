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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  title: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  brand: string;
  tags: string;
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
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const count = useMotionValue(0);
  const animatedPrice = useTransform(
    count,
    (latest) => `₹${latest.toFixed(2)}`
  );

  useEffect(() => {
    if (product?.price) {
      const controls = animate(count, product.price, {
        duration: 2.5, // Smooth animation
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
              tags: fetchedProduct.tags,
              category: fetchedProduct.category || "Uncategorized",
              brand: fetchedProduct.brand || "Unknown Brand",
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
                : "/card.png",
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
            setSelectedImage(productData.imageUrl);
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    toast
      .promise(
        new Promise<string>((resolve, reject) => {
          if (!formData.fullName || !formData.email || !formData.address) {
            reject("Any field is empty, please try again !");
            return;
          }

          setTimeout(() => {
            resolve("Payment successful !");
          }, 2000);
        }),
        {
          loading: "Processing your payment...",
          success: (message) => (
            <b className="text-lg font-semibold">{message} 🎉</b>
          ),
          error: (message) => (
            <b className="text-lg font-semibold">{message} 😢</b>
          ),
        }
      )
      .then(() => {
        // Clear the form after successful payment
        setFormData({ fullName: "", email: "", address: "" });
      })
      .catch(() => {}); // Prevent unhandled promise rejection warning
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
                  src={selectedImage}
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
                  className="-ml-12 mt-2 border-none shadow-md rounded-full"
                >
                  <PiHeartFill
                    className={`h-10 w-10 bg-white/[0.3] hover:text-rose-600 rounded-full p-2 ${
                      liked ? "text-rose-600 shadow-lg" : "text-zinc-300"
                    }`}
                  />
                </motion.button>
                {product.tags && (
                  <div
                    className={`absolute top-0 left-0 ${
                      product.tags && "bg-sky-400"
                    } text-lg text-white p-2 px-7 rounded-tl-md rounded-br-xl`}
                  >
                    {product.tags}
                  </div>
                )}
              </div>
              <div className="overflow-auto h-full">
                {product.gallery?.length > 0 && (
                  <ul className="flex flex-col items-start justify-start gap-3 pb-3 border-b-4 rounded-b-sm dark:border-zinc-700 overflow-x-auto w-full">
                    {product.gallery.map((image, index) => (
                      <li key={index}>
                        <button
                          className="border dark:border-zinc-700 focus:bg-sky-400 p-1 rounded"
                          onClick={() => setSelectedImage(image)} // Update the selected image on click
                        >
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
              <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                <Button
                  variant="outline"
                  className="text-lg font-medium dark:border-zinc-700 hover:bg-sky-500 hover:text-white h-14 w-full"
                >
                  Add to Cart
                </Button>
              </motion.div>
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                    <Button className="text-lg font-medium hover:bg-yellow-500 h-14 w-full">
                      Buy Now
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-semibold">
                      Product Preview
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-start justify-start gap-5 m-auto w-full">
                      <Image
                        src={selectedImage}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="rounded-md border w-1/2"
                      />
                      <div className="flex flex-col items-start -mt-2 w-1/2">
                        <h1 className="text-3xl title-font font-semibold">
                          {product.title}
                        </h1>
                        <div className="flex items-center justify-start gap-2 -ml-1 text-sm uppercase w-full h-5 mb-1">
                          <p className="text-sky-400">
                            {product.category?.name.slice(2)}
                          </p>
                          <span className="mb-1 opacity-30">|</span>
                          <p className="opacity-40">{product.brand}</p>
                        </div>
                        <div className="flex">
                          <div className="flex items-center">
                            {[...Array(product.rating)].map((_, index) => (
                              <FaStar
                                key={index}
                                className="text-yellow-400 text-base"
                              />
                            ))}
                            {[...Array(5 - product.rating)].map((_, index) => (
                              <FaRegStar
                                key={index}
                                className="text-yellow-400 text-base"
                              />
                            ))}
                            <motion.span className="text-base opacity-60 ml-3">
                              {product.reviews >= 1000
                                ? `${(product.reviews / 1000).toFixed(2)}K`
                                : product.reviews}{" "}
                              Reviews
                            </motion.span>
                          </div>
                        </div>
                        <p className="leading-relaxed text-base opacity-80 my-2">
                          {product.description.slice(0, 190)}...
                        </p>
                        <p className="text-2xl text-sky-400 font-bold">
                          ₹{product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="opacity-50">
                      Complete your purchase by providing your details below.
                    </p>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      required
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Shipping Address"
                      value={formData.address}
                      onChange={handleFormChange}
                      required
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <DialogClose asChild>
                      <Button
                        onClick={handlePayment}
                        type="button"
                        className="text-base py-5 font-medium w-full bg-sky-400 hover:bg-sky-500"
                      >
                        Proceed to Payment
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
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
              <h1 className="text-4xl title-font font-semibold mb-2">
                {product.title}
              </h1>
              <div className="flex items-center justify-start gap-2 text-base uppercase w-full h-5 mb-1">
                <p className="text-sky-400">
                  {product.category?.name.slice(2)}
                </p>
                <span className="mb-1 opacity-30">|</span>
                <p className="opacity-40">{product.brand}</p>
              </div>
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
                      <SelectTrigger className="border dark:border-zinc-700 w-40">
                        <SelectValue placeholder="Select The Size" />
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
            <div className="flex items-center justify-between border-t border-b dark:border-zinc-700 mt-5 w-full h-20">
              <motion.p className="text-3xl text-sky-400 font-bold w-1/2">
                {animatedPrice}
              </motion.p>
              <div className="w-full">
                <div className="flex items-center gap-2 w-full">
                  <Input
                    type="number"
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
