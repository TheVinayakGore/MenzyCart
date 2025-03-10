"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { ImBin } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";

const Cart = () => {
  return (
    <>
      <main>
        <DrawerContent>
          <section className="flex flex-col flex-wrap py-5 w-full h-[30rem]">
            <ul className="flex flex-col p-3 overflow-auto h-full">
              <li className="flex flex-col gap-5 p-2 w-1/2">
                <div className="flex items-start p-2 border border-zinc-700 rounded-md w-full">
                  <div className="w-1/2 h-full">
                    <Image
                      src="/card.png"
                      alt="product"
                      width={1000}
                      height={1000}
                      priority
                      className="rounded border dark:border-zinc-700 w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-between pl-5 w-full h-full">
                    <div className="flex flex-col items-start justify-start gap-2 w-full">
                      <DrawerTitle className="text-xl font-medium">
                        Sample Product
                      </DrawerTitle>
                      <DrawerDescription>
                        Tshirt is an amazing product !
                      </DrawerDescription>
                    </div>

                    <div className="flex items-center justify-between text-base mt-3 w-full">
                      <p>Size : {"M"}</p>
                      <div className="flex items-center text-center">
                        Color : <div className="flex items-center mt-1 ml-2 border border-zinc-500 dark:border-zinc-800 rounded-full w-5 h-5" />
                      </div>
                      <b>1 x $299</b>
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
          </section>

          {/* 🏁 Checkout & Clear Cart Actions */}
          <section className="flex items-center p-3 bg-zinc-200 dark:bg-zinc-900 w-full">
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
              <p className="text-xl font-bold">Total : $299</p>
              <div className="flex space-x-4">
                <Button
                  asChild
                  className="flex items-center py-5 text-base bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Link href="/checkout" target="_blank">
                    <PiShoppingBagOpenDuotone className="mr-3 h-7 w-7" />
                    Checkout Now
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="text-base py-5 border-zinc-700 hover:bg-black hover:border-zinc-500 hover:text-white"
                >
                  <ImBin className="mr-3 h-5 w-4" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </section>
        </DrawerContent>
      </main>
    </>
  );
};

export default Cart;
