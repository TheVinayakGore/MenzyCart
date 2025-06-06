"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import Image from "next/image";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { PiHeartFill } from "react-icons/pi";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import LoadingBar from "@/components/LoadingBar";
import Cart from "@/app/product/cart";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Product {
  _id: string;
  category: string;
  brand: string;
  tag: string;
  title: string;
  rating: number;
  review: number;
  description: string;
  color: string[];
  size: string[];
  price: number;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  gallery: {
    asset: {
      _id: string;
      url: string;
    };
  }[];
  likes: number;
}

const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [pincode, setPincode] = useState<string>("");
  const [service, setService] = useState<boolean | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState<string>("");
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
    (latest) => `₹ ${latest.toFixed(2)}`
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
        setLoading(true);
        const productData = await client.fetch<Product>(
          `*[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );
        setProduct(productData);
        setLoading(false);
      };
      fetchProduct();
    }
  }, [slug]);

  useEffect(() => {
    // Load the liked state from localStorage
    const storedLiked = localStorage.getItem(`liked-${product?._id}`);
    if (storedLiked) {
      setLiked(JSON.parse(storedLiked));
    }
  }, [product?._id]);

  if (loading) return <LoadingBar loading={loading} />;

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

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: 1,
        image: product.image,
        color: selectedColor, // Pass the selected color
        size: selectedSize, // Pass the selected size
      };
      dispatch(addItem(cartItem));
      toast.success("Added to cart!");
    }
  };

  const handleLikeClick = async () => {
    const newLikedState = !liked;

    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setLiked(newLikedState);
          localStorage.setItem(
            `liked-${product?._id}`,
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
        className="flex flex-col items-start py-32 px-5 sm:px-20 w-full h-full"
      >
        <div className="flex flex-col md:flex-row items-start justify-start w-full h-full">
          {/* Image Section */}
          <motion.section
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            id="ID1"
            className="lg:sticky top-0 flex flex-col items-start justify-start gap-3 w-full lg:w-[50%] xl:w-[40%] h-full"
          >
            <div className="flex items-start justify-start gap-2 border dark:border-zinc-700 rounded-md p-2 w-full h-auto">
              <div className="flex items-start w-full h-full">
                <div className="flex relative w-full h-full">
                  <Image
                    src={
                      !selectedImage
                        ? urlFor(product.gallery[0]).url()
                        : selectedImage
                    }
                    alt={product.title}
                    width={2000}
                    height={2000}
                    priority
                    className="rounded-md h-full w-full"
                  />
                  {product.tag && (
                    <div
                      className={`absolute top-0 left-0 uppercase ${
                        product.tag === "Best Seller"
                          ? "bg-sky-500"
                          : "bg-teal-500"
                      } text-sm lg:text-lg text-white p-1 lg:p-2 px-4 lg:px-7 rounded-tl-md rounded-br-xl`}
                    >
                      {product.tag}
                    </div>
                  )}
                </div>
                <motion.button
                  onClick={handleLikeClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="-ml-12 mt-2 border-none shadow-md rounded-full z-50"
                >
                  <PiHeartFill
                    className={`h-10 w-10 bg-white/[0.3] hover:text-rose-600 rounded-full p-2 ${
                      liked ? "text-rose-600 shadow-lg" : "text-zinc-300"
                    }`}
                  />
                </motion.button>
              </div>
              <div className="overflow-auto h-full">
                {product.gallery?.length > 0 && (
                  <ul className="flex flex-col items-start justify-start gap-3 pb-3 border-b-4 rounded-b-sm dark:border-zinc-700 overflow-x-auto w-full">
                    {product.gallery.map((image, index) => (
                      <li key={index}>
                        <button
                          className="border dark:border-zinc-700 focus:bg-sky-400 p-1 rounded"
                          onClick={() => setSelectedImage(urlFor(image).url())} // Update this line
                        >
                          <Image
                            src={urlFor(image).url()} // Ensure this is a string
                            alt={`Gallery image ${index + 1} of ${product.title}`}
                            width={1000}
                            height={1000}
                            priority
                            className="rounded-sm h-auto w-20"
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
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={handleAddToCart}
                      className="text-base lg:text-lg border dark:border-zinc-700 hover:bg-sky-500 hover:text-white h-12 lg:h-14 w-full"
                    >
                      Add to Cart
                    </Button>
                  </DrawerTrigger>
                  <Cart />
                </Drawer>
              </motion.div>
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                    <Button className="text-base lg:text-lg font-medium hover:bg-yellow-500 h-12 lg:h-14 w-full">
                      Buy Now
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl mt-10 border border-sky-500">
                  <DialogHeader>
                    <DialogTitle className="text-3xl leading-none font-semibold">
                      Product Preview
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-start gap-7 m-auto w-full h-80">
                      <div className="relative w-1/2 h-full">
                        <Image
                          src={urlFor(product.gallery[0]).url()}
                          alt={product.title}
                          width={200}
                          height={200}
                          className="rounded-md border border-sky-500 w-full h-full"
                        />
                        {product.tag && (
                          <div
                            className={`absolute top-0 left-0 uppercase ${
                              product.tag === "Best Seller"
                                ? "bg-sky-500"
                                : "bg-teal-500"
                            } text-sm text-white p-2 px-5 rounded-tl-md rounded-br-xl`}
                          >
                            {product.tag}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-between w-1/2 h-full">
                        <div className="flex flex-col w-full">
                          <h1 className="text-3xl title-font font-semibold leading-none">
                            {product.title.length > 17
                              ? product.title.slice(0, 17) + "..."
                              : product.title}
                          </h1>
                          <div className="flex items-center justify-start gap-2 py-1 text-sm font-normal uppercase w-full">
                            <p className="text-sky-500 font-medium">
                              {product.category}
                            </p>
                            <span className="mb-1 opacity-50">|</span>
                            <p className="uppercase opacity-60">
                              {product.brand}
                            </p>
                          </div>
                          <div className="flex">
                            <div className="flex items-center">
                              {[...Array(product.rating)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  className="text-yellow-400 text-base"
                                />
                              ))}
                              {[...Array(5 - product.rating)].map(
                                (_, index) => (
                                  <FaRegStar
                                    key={index}
                                    className="text-yellow-400 text-base"
                                  />
                                )
                              )}
                              <motion.span className="text-base opacity-60 ml-3">
                                {product.review >= 1000
                                  ? `${(product.review / 1000).toFixed(2)}K`
                                  : product.review}{" "}
                                Reviews
                              </motion.span>
                            </div>
                          </div>
                          <p className="leading-relaxed text-base opacity-80 my-2">
                            {product.description.slice(0, 100)}...
                          </p>
                        </div>
                        <div className="flex flex-col items-center border border-sky-500 rounded-md w-full">
                          <div className="flex items-center justify-between px-3 py-2 border-b border-sky-500 w-full">
                            {selectedSize && (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-medium">
                                  Size :
                                </span>
                                <motion.button
                                  aria-label={`Size option ${selectedSize}`}
                                  onClick={() => setSelectedSize(selectedSize)}
                                  whileHover={{ scale: 0.75 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="rounded-md w-8 h-8 border border-sky-400 flex items-center justify-center"
                                >
                                  {selectedSize}
                                </motion.button>
                              </div>
                            )}
                            {selectedColor && (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-medium">
                                  Color :
                                </span>
                                <motion.button
                                  aria-label={`Color option ${selectedColor}`}
                                  onClick={() =>
                                    setSelectedColor(selectedColor)
                                  }
                                  whileHover={{ scale: 0.75 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="rounded-md w-8 h-8 border border-sky-400"
                                  style={{ backgroundColor: selectedColor }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between px-3 py-2 text-xl font-medium w-full">
                            <div className="flex items-center gap-2">
                              <span className="text-4xl">₹</span>
                              <span>{product.price.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-start gap-3">
                              <Button
                                size="icon"
                                className="text-lg font-bold bg-sky-400 hover:bg-sky-500 text-white hover:text-white"
                              >
                                -
                              </Button>
                              <span className="">1</span>
                              <Button
                                size="icon"
                                className="text-lg font-bold bg-sky-400 hover:bg-sky-500 text-white hover:text-white"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="opacity-70">
                      Complete your purchase by providing your details below.
                    </p>
                    <div className="flex items-center gap-5 w-full">
                      <Input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        required
                        className="w-full py-5 text-base font-medium border-sky-500"
                      />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full py-5 text-base font-medium border-sky-500"
                      />
                    </div>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Shipping Address"
                      value={formData.address}
                      onChange={handleFormChange}
                      required
                      className="w-full py-5 text-base font-medium border-sky-500"
                    />
                    <DialogClose asChild>
                      <Button
                        onClick={handlePayment}
                        type="button"
                        className="text-lg py-6 font-medium w-full text-white bg-sky-500 hover:bg-sky-600"
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
            className="lg:sticky top-20 overflow-auto py-10 md:p-0 md:pl-10 w-full lg:w-[50%] xl:w-[60%] h-auto"
          >
            {/* Product Title, Rating, Reviews, Description */}
            <div>
              <h1 className="text-2xl lg:text-4xl title-font font-semibold mb-2">
                {product.title}
              </h1>
              <div className="flex items-center justify-start gap-2 pb-1 text-base font-normal uppercase w-full">
                <p className="text-sm md:text-base text-sky-500 font-medium">
                  {product.category}
                </p>
                <span className="mb-1 opacity-50">|</span>
                <p className="uppercase text-sm md:text-base opacity-60">
                  {product.brand}
                </p>
              </div>
              <div className="flex mb-3">
                <div className="flex items-center">
                  {[...Array(product.rating)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-lg" />
                  ))}
                  {[...Array(5 - product.rating)].map((_, index) => (
                    <FaRegStar
                      key={index}
                      className="text-yellow-400 text-sm md:text-lg"
                    />
                  ))}
                  <motion.span className="text-sm md:text-lg opacity-60 ml-3">
                    {product.review >= 1000
                      ? `${(product.review / 1000).toFixed(2)}K`
                      : product.review}{" "}
                    Reviews
                  </motion.span>
                </div>
              </div>
              <p className="text-sm lg:text-base leading-relaxed opacity-80">
                {product.description}
              </p>
            </div>

            {/* Color and Size Selectors */}
            <div className="flex items-center my-5 w-full">
              {product.size && product.size.length > 0 && (
                <div className="flex items-center gap-3 overflow-auto w-full">
                  {product.size.map((item, index) => (
                    <Button
                      key={index}
                      value={item}
                      variant="outline"
                      onClick={() => setSelectedSize(item)} // Add this line
                      className={`text-sm lg:text-base font-normal border-zinc-300 dark:border-zinc-600 hover:border-2 hover:border-sky-400 dark:hover:border-sky-500 w-10 lg:w-14 h-10 lg:h-14 hover:scale-75 transition duration-300 ${
                        selectedSize === item
                          ? "border-2 border-sky-500 dark:border-sky-500"
                          : ""
                      }`}
                    >
                      {item.toUpperCase()}
                    </Button>
                  ))}
                </div>
              )}

              {/* Color Selector */}
              {product.color && product.color.length > 0 && (
                <div className="flex items-center gap-2 pr-2">
                  <motion.button
                    aria-label={`Color option None`}
                    onClick={() => setSelectedColor("")}
                    whileHover={{ scale: 0.75 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative bg-transparent border border-zinc-300 dark:border-zinc-600 rounded-full w-6 lg:w-10 h-6 lg:h-10"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-red-500 transform rotate-45" />
                    </div>
                  </motion.button>
                  {product.color.map((item, index) => (
                    <motion.button
                      key={index}
                      aria-label={`Color option ${item}`}
                      onClick={() => setSelectedColor(item)}
                      whileHover={{ scale: 0.75 }}
                      whileTap={{ scale: 0.9 }}
                      className={`rounded-full w-6 lg:w-10 h-6 lg:h-10 ${
                        selectedColor === item
                          ? "border-2 border-sky-400"
                          : "border border-zinc-300 dark:border-zinc-600 hover:border-2 hover:border-sky-400 dark:hover:border-sky-500"
                      }`}
                      style={{ backgroundColor: item }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Price and Pincode Checker */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 border-t border-b dark:border-zinc-700 mt-5 w-full py-5">
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
            <div className="pt-5">
              <p className="text-sm lg:text-base">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga,
                earum. Eveniet quis, reprehenderit alias impedit laudantium vel
                rem fugit labore iste fuga unde saepe animi exercitationem
                itaque aliquid rerum quam nostrum quisquam dolore consequuntur
                maiores soluta quod. Perferendis qui vel obcaecati velit,
                quisquam a quibusdam, perspiciatis quas, molestias fugit labore
                !
              </p>
            </div>
          </motion.section>
        </div>
      </motion.main>
    </>
  );
};

export default ProductDetails;
