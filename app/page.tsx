import React from "react";
import Hero from "@/components/Hero";
import ProductsList from "@/components/ProductsList";
import Testimonials from "@/components/Testimonials";

const page = () => {
  return (
    <>
      <Hero />
      <main className="flex flex-col items-center gap-5 sm:gap-10 md:gap-20 p-10 m-auto w-full h-full">
        <ProductsList />
        <Testimonials />
      </main>
    </>
  );
};

export default page;
