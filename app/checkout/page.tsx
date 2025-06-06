"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  clearCart,
  setCartItems,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "@/redux/slices/cartSlice";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Load cart items from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        dispatch(setCartItems(JSON.parse(savedCartItems)));
      }
    }
  }, [dispatch]);

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.quantity ? item.price * item.quantity : 0),
    0
  );

  // User Details Form State
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Checkout
  const handleCheckout = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.address) {
      toast.error("🚨 Please fill in all the shipping details!");
      return;
    }

    toast.success("✅ Order placed successfully!");
    console.log("Order Details:", userDetails, cartItems);

    // Clear the form
    setUserDetails({ name: "", email: "", address: "" });

    // Clear the cart after successful checkout
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
  };

  return (
    <main className="flex flex-col items-start justify-center gap-6 md:gap-10 w-full min-h-screen p-5 md:p-14 lg:p-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl leading-none font-extrabold text-start mt-20 sm:mt-0">
        🛒 Checkout
      </h1>
      <div className="w-full bg-white dark:bg-zinc-900 p-4 sm:p-6 md:p-7 rounded-xl shadow-lg border border-zinc-300 dark:border-zinc-800">
        {/* 🚚 Shipping Details */}
        <div className="mb-6 md:mb-10">
          <h2 className="text-2xl sm:text-3xl font-medium mb-6 md:mb-10">
            🚚 Shipping Details
          </h2>
          <form className="space-y-3 md:space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userDetails.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-sm sm:text-base"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userDetails.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-sm sm:text-base"
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={userDetails.address}
              onChange={handleInputChange}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-sm sm:text-base"
            />
          </form>
        </div>

        {/* 🛍️ Order Summary */}
        <div className="my-6 md:my-10">
          <h2 className="text-2xl sm:text-3xl font-medium mb-6 md:mb-10">
            🛍️ Order Summary
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty 🛒</p>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 w-full">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start justify-between p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-800 w-full gap-3 md:gap-4"
                  >
                    <div className="w-full sm:w-auto h-full">
                      <Image
                        src={urlFor(item.image)?.url() || "/placeholder.png"}
                        alt={item.title}
                        width={2000}
                        height={2000}
                        className="w-full sm:w-40 md:w-80 h-auto xl:h-full border border-zinc-300 dark:border-zinc-700 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-between w-full h-full gap-2 sm:gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                          {item.title.length > 20
                            ? item.title.slice(0, 20) + "..."
                            : item.title}
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl text-green-500 font-bold sm:font-extrabold">
                          ₹{item.quantity * item.price}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm sm:text-base md:text-lg font-medium p-2 bg-zinc-200 dark:bg-zinc-700 rounded-md w-full">
                        <span>
                          {item.quantity} × ₹{item.price}
                        </span>
                        {item.size && (
                          <span className="ml-2">Size : {item.size}</span>
                        )}
                        {item.color && (
                          <span className="flex items-center ml-2">
                            Color :{" "}
                            <div
                              className="ml-2 w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: Array.isArray(item.color)
                                  ? item.color[0]
                                  : item.color,
                              }}
                            />
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                        {item.description
                          ? item.description.slice(0, 100) + "..."
                          : "No description available"}
                      </p>
                      <div className="flex items-center justify-end gap-2 sm:gap-3 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="border-zinc-800 hover:border-sky-400 hover:bg-sky-400 hover:text-white rounded-sm w-7 h-7 sm:w-10 sm:h-10"
                        >
                          <FaMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <span className="font-medium text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => dispatch(incrementQuantity(item.id))}
                          className="border-zinc-800 hover:border-sky-400 hover:bg-sky-400 hover:text-white rounded-sm w-7 h-7 sm:w-10 sm:h-10"
                        >
                          <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => dispatch(removeItem(item.id))}
                          className="border-zinc-800 hover:border-red-500 hover:text-red-500 rounded-sm w-7 h-7 sm:w-10 sm:h-10"
                        >
                          <ImBin className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center font-bold text-xl sm:text-2xl md:text-3xl border-t mt-6 md:mt-10 pt-4 md:pt-5 gap-2">
                <span>💸 Payable Amount</span>
                <span className="text-sky-500 text-2xl">₹{totalAmount}</span>
              </div>
            </>
          )}
        </div>

        {/* 🏁 Checkout & Clear Cart Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 mt-4 md:mt-6 w-full">
          <Button
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 md:py-6 px-4 rounded-md text-sm sm:text-base md:text-lg w-full"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            <FaShoppingCart className="mr-2 w-4 h-4" />
            Confirm Order
          </Button>
          <Button
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 sm:py-4 md:py-6 px-4 rounded-md text-sm sm:text-base md:text-lg w-full"
            onClick={() => {
              dispatch(clearCart());
              toast.success("🗑️ Cart cleared successfully!");
              localStorage.removeItem("cartItems");
            }}
            disabled={cartItems.length === 0}
          >
            <ImBin className="mr-2 w-4 h-4" />
            Clear Cart
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
