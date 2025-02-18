"use client";
import React from "react";
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
import Link from "next/link";

const Cart = () => {

  return (
    <main>
      <DrawerContent>
          <div className="flex flex-col flex-wrap py-5 w-full h-[30rem]">
            <ul className="flex items-start p-3 overflow-auto h-full">
                <li className="flex flex-col gap-5 p-2 w-1/2">
                  <div className="flex items-start p-2 border border-zinc-700 rounded-md w-full">
                    <div className="w-56">
                      <Image
                        src="/card.png"
                        alt="image"
                        width={1000}
                        height={1000}
                        priority
                        className="rounded w-full"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between px-5 w-full h-40">
                      <DrawerTitle className="text-xl pt-2 font-medium">
                       Title
                      </DrawerTitle>
                      <DrawerDescription>
                        Description is an amazing product!
                      </DrawerDescription>

                      <div className="flex items-center justify-between text-sm mt-3 w-full">
                        <p>Size: M</p>
                          <div className="flex items-center">
                            Color:{" "}
                            <div
                              className="ml-2 border border-zinc-500 dark:border-zinc-800 rounded-full w-4 h-4"
                              style={{ backgroundColor: 'red' }}
                            />
                          </div>
                        <p>
                          1 x ₹200
                        </p>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-zinc-800 hover:border-sky-400 hover:bg-sky-400 hover:text-white rounded-sm p-2"
                          >
                            <FaMinus className="w-3 h-3" />
                          </Button>
                          <span className="font-medium">1</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-zinc-800 hover:border-sky-400 hover:bg-sky-400 hover:text-white rounded-sm p-2"
                          >
                            <FaPlus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-zinc-800 hover:border-red-500 hover:text-red-500 rounded-sm p-2"
                          >
                            <ImBin className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
            </ul>
          </div>

        {/* 🏁 Checkout & Clear Cart Actions */}
        <div className="flex items-center p-5 bg-zinc-200 dark:bg-zinc-900 w-full">
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
          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">Total: ₹2002</p>
            <div className="flex space-x-4">
              <Button
                asChild
                className="flex items-center bg-sky-500 hover:bg-sky-600 text-white"
              >
                <Link href="/checkout" target="_blank">
                  <PiShoppingBagOpenDuotone className="mr-3 h-5 w-5" />
                  Checkout Now
                </Link>
              </Button>
              <Button
                variant="outline"
                className="text-base border-zinc-700 hover:bg-black hover:border-zinc-500 hover:text-white"
              >
                <ImBin className="mr-3 h-5 w-4" />
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
