import React from "react";
import Hero from "@/components/Hero";
import ProductsList from "@/components/ProductsList";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

const page = () => {
  return (
    <>
      <Hero />
      <main className="flex flex-col items-center gap-5 sm:gap-10 md:gap-28 px-5 sm:px-20 py-20 m-auto w-full h-full">
        <ProductsList />
        <Testimonials />
        <FAQ />
      </main>
    </>
  );
};

export default page;
