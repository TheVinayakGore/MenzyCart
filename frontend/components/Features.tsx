"use client";
import React from "react";
import {
  Box,
  Lock,
  Search,
  Settings,
  Sparkles,
  Shield,
  Truck,
  Tag,
  Heart,
} from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";
import { motion } from "framer-motion";
import Image from "next/image";

const Features = () => {
  return (
    <main className="">
      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        <GridItem
          icon={<Box className="h-6 w-6 text-sky-500" />}
          title="Premium Quality"
          description={
            <>
              <video
                src="/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="mb-5 border object-cover rounded-lg h-64 w-full"
              />
              <span>
                Experience the finest in men fashion with our premium quality
                products. Crafted with precision and using the best materials,
                our collections ensure long-lasting durability and unparalleled
                comfort. Elevate your wardrobe with timeless designs and
                top-tier craftsmanship.
              </span>
            </>
          }
          className="md:row-span-2"
        />

        <GridItem
          icon={<Settings className="h-6 w-6 text-sky-500" />}
          title="Tailored Fit"
          description="Our products are designed to offer the perfect fit for every man. 
      Whether you prefer a slim, regular, or relaxed fit, our clothing adapts to your style and body type. 
      Experience comfort without compromising on aesthetics, ensuring you look sharp in every outfit."
          className="md:col-span-2"
        />

        <GridItem
          icon={<Lock className="h-6 w-6 text-sky-500" />}
          title="Secure Shopping"
          description="Shop with confidence knowing your transactions are secure. 
      We use state-of-the-art encryption and fraud prevention technology to protect your personal information. 
      Your privacy and security are our top priorities."
        />

        <GridItem
          icon={<Sparkles className="h-6 w-6 text-sky-500" />}
          title="Exclusive Designs"
          description="Discover unique designs that set you apart from the crowd. 
      Our exclusive collections are crafted by top designers, ensuring each piece is stylish, modern, and timeless. 
      Stand out with fashion that speaks to your personality."
        />

        <GridItem
          icon={<Search className="h-6 w-6 text-sky-500" />}
          title="Easy Navigation"
          description="Find exactly what you're looking for with our intuitive search and navigation. 
      Our website is designed for seamless browsing, allowing you to filter by size, color, style, and more. 
      Enjoy a hassle-free shopping experience that saves you time and effort."
          className="md:col-span-2"
        />

        <GridItem
          icon={<Shield className="h-6 w-6 text-sky-500" />}
          title="100% Guarantee"
          description={
            <>
              <Image
                src="/earphone.webp"
                alt="Premium Quality"
                width={2000}
                height={2000}
                className="my-5 border object-cover rounded-lg h-[30rem]"
              />
              <span>
                We stand by our products with a full satisfaction guarantee. If
                you are not completely happy with your purchase, we offer
                hassle-free returns and exchanges. Our commitment to quality
                ensures that you always get the best value for your money.
              </span>
            </>
          }
          className="md:row-span-3"
        />

        <GridItem
          icon={<Truck className="h-6 w-6 text-sky-500" />}
          title="Fast Shipping"
          description="Get your orders delivered quickly and efficiently to your doorstep. 
      We partner with trusted courier services to ensure timely and safe deliveries, 
      so you never have to wait too long for your favorite fashion pieces."
        />

        <GridItem
          icon={<Tag className="h-6 w-6 text-sky-500" />}
          title="Best Deals"
          description="Enjoy competitive prices and the best deals available. 
      We regularly offer discounts, seasonal sales, and exclusive promotions, 
      ensuring you get premium fashion at unbeatable prices."
        />

        <GridItem
          icon={<Heart className="h-6 w-6 text-sky-500" />}
          title="Customer Favorites"
          description="Shop top-rated and best-loved products by our customers. 
      Based on thousands of reviews and recommendations, we highlight the products that 
      our customers love the most, making it easier for you to choose the best items."
          className="md:col-span-2"
        />
      </ul>
    </main>
  );
};

export default Features;

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
}

const GridItem = ({
  icon,
  title,
  description,
  className = "",
}: GridItemProps) => {
  return (
    <motion.li
      className={`min-h-[14rem] list-none ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-full rounded-2xl border border-sky-400 dark:border-sky-700 p-4 shadow-sm hover:shadow-md transition-shadow">
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={60}
          glow={true}
          disabled={false}
          proximity={40}
          inactiveZone={0.05}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-lg p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-2">
            <div className="space-y-3">
              <div className="w-fit rounded-lg border border-sky-400 dark:border-sky-700 p-2 bg-sky-100 dark:bg-sky-950">
                {icon}
              </div>
              <h3 className="text-2xl font-semibold">{title}</h3>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.li>
  );
};
