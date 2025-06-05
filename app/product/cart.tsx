"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { ImBin } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { urlFor } from "@/sanity/lib/image";
import {
  clearCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  setCartItems,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import Link from "next/link";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Load cart items from localStorage on first mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        dispatch(setCartItems(JSON.parse(savedCartItems)));
      }
    }
  }, [dispatch]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  // Calculate total payable amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.quantity ? item.price * item.quantity : 0),
    0
  );

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("🗑️ Cart cleared successfully !");
    localStorage.removeItem("cartItems");
  };

  return (
    <main>
      <DrawerContent className="z-[200]">
        {cartItems.length === 0 ? (
          <div className="flex flex-col space-y-5 text-xl font-bold items-center justify-center w-full h-[30rem]">
            <Image
              src="/emptycart.png"
              alt="empty cart"
              width={500}
              height={500}
              priority
              className="rounded w-60 h-60"
            />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex flex-col w-full h-[20rem] lg:h-[30rem]">
            <ul className="grid grid-cols-2 items-start px-2 py-10 overflow-auto w-full h-full">
              {cartItems.map((item) => (
                <li key={item.id} className="flex flex-col gap-5 p-2 w-full">
                  <div className="flex items-start justify-start p-2 pr-3 border border-zinc-700 rounded-md w-full">
                    <div className="w-28 lg:w-52 h-full lg:h-40">
                      <Image
                        src={urlFor(item.image)?.url() || "/emptycart.png"}
                        alt={item.title}
                        width={1000}
                        height={1000}
                        priority
                        className="rounded border w-full h-auto"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between pl-5 w-full h-full">
                      <DrawerTitle className="text-base sm:text-lg lg:text-2xl leading-none font-medium">
                        {item.title}
                      </DrawerTitle>
                      <DrawerDescription className="hidden lg:block text-xs xl:text-sm">
                        {item.description.slice(0, 260)}...
                      </DrawerDescription>
                      <DrawerDescription className="hidden md:block lg:hidden text-xs xl:text-sm mb-2">
                        {item.description.slice(0, 100)}...
                      </DrawerDescription>

                      <div className="flex flex-wrap lg:flex-row items-start lg:items-center justify-between gap-1 mt-2 md:mt-0 text-base font-medium w-full">
                        {item.size && <p className="text-sm lg:text-base">Size : {item.size}</p>}
                        {item.color && (
                          <div className="flex items-center text-sm lg:text-base">
                            Color :{" "}
                            <div
                              className="ml-2 border border-zinc-500 dark:border-zinc-800 rounded-full w-3 lg:w-4 h-3 lg:h-4"
                              style={{
                                backgroundColor: Array.isArray(item.color)
                                  ? item.color[0]
                                  : item.color,
                              }}
                            />
                          </div>
                        )}
                        <p className="text-sm lg:text-base">
                          {item.quantity} x ₹{item.price}
                        </p>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            className="border-zinc-800 hover:border-sky-400 hover:bg-sky-400 hover:text-white rounded-sm w-5 h-5 lg:w-9 lg:h-9"
                          >
                            <FaMinus className="w-2 h-2 lg:w-3 lg:h-3" />
                          </Button>
                          <span className="font-medium text-sm lg:text-base">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                            className="border-zinc-800 hover:border-sky-400 hover:bg-sky-400 hover:text-white rounded-sm w-5 h-5 lg:w-9 lg:h-9"
                          >
                            <FaPlus className="w-2 h-2 lg:w-3 lg:h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => dispatch(removeItem(item.id))}
                            className="border-zinc-800 hover:border-red-500 hover:text-red-500 rounded-sm w-5 h-5 lg:w-9 lg:h-9"
                          >
                            <ImBin className="w-2 h-2 lg:w-4 lg:h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 🏁 Checkout & Clear Cart Actions */}
        <div className="flex items-center p-3 lg:p-5 bg-zinc-200 dark:bg-zinc-900 w-full">
          <DrawerFooter>
            <DrawerClose className="absolute top-2 right-2">
              <Button
                variant="outline"
                size="icon"
                className="hover:text-white border-zinc-600 hover:bg-red-500 hover:border-red-500 p-1"
                asChild
              >
                <IoClose className="h-7 w-7" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <p className="text-base lg:text-xl font-bold">Total: ₹{totalAmount}</p>
            <div className="flex space-x-4">
              <Button
                asChild
                className={`flex items-center bg-sky-500 hover:bg-sky-600 text-sm lg:text-lg text-white lg:p-6 ${
                  cartItems.length === 0 ? "hidden" : "opacity-100"
                }`}
              >
                <Link href="/checkout" target="_blank">
                  <PiShoppingBagOpenDuotone className="mr-2 h-4 lg:h-6 w-4 lg:w-6" />
                  Checkout Now
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleClearCart}
                className={`text-sm lg:text-lg border-zinc-700 hover:bg-black hover:border-zinc-500 hover:text-white lg:p-6 ${
                  cartItems.length === 0
                    ? "opacity-20 hover:cursor-not-allowed bg-black text-white"
                    : "opacity-100"
                }`}
              >
                <ImBin className="mr-2 h-3 lg:h-5 w-3 lg:w-5" />
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </main>
  );
};

export default Cart;
