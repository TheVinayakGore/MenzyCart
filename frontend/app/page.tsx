import React from "react";
import Hero from "@/components/Hero";
import ProductsList from "@/components/ProductsList";
import Features from "@/components/Features";

const page = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center m-auto w-full">
        <Hero />
        <section className="flex flex-col items-center justify-center m-auto gap-40 py-40 max-w-[90rem] px-10 md:px-0 w-full mx-auto">
          <Features />
          <ProductsList />
        </section>
      </main>
    </>
  );
};

export default page;
