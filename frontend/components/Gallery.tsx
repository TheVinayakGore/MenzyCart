"use client";
import React from "react";
import { motion } from "framer-motion";
import { ImagesSlider } from "./ui/images-slider";

const Gallery = () => {
  const images = ["/card.png", "/card.png", "/card.png", "/card.png"];

  return (
    <>
      <main className="w-full">
        <ImagesSlider className="rounded-3xl border h-[45rem] w-full" images={images}>
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col justify-center items-center w-full h-full"
          ></motion.div>
        </ImagesSlider>
      </main>
    </>
  );
};

export default Gallery;
