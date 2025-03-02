"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImagesSlider } from "./ui/images-slider";

// Define the type for a gallery item
interface GalleryItem {
  id: number;
  name: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
  };
}

// Define the type for an item in the `data` array
interface BannerItem {
  id: number;
  gallery: GalleryItem[];
}

// Define the type for the API response
interface ApiResponse {
  data: BannerItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const Banners = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/banners?&populate=*"
        );
        const data: ApiResponse = await response.json();

        if (data.data && data.data.length > 0) {
          const BASE_URL = "http://localhost:1337";

          const imageUrls = data.data.flatMap(
            (item) =>
              item.gallery?.map(
                (galleryItem) =>
                  galleryItem.formats?.large?.url
                    ? `${BASE_URL}${galleryItem.formats.large.url}` // Large format if available
                    : galleryItem.formats?.medium?.url
                    ? `${BASE_URL}${galleryItem.formats.medium.url}` // Medium format fallback
                    : `${BASE_URL}/uploads/${galleryItem.name}` // Default fallback
              ) || []
          );

          setImages(imageUrls);
        } else {
          console.warn("No images found in the API response");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className="z-50 w-full h-full">
      {/* Ensure `images` is an array before passing it to `ImagesSlider` */}
      {images.length > 0 ? (
        <ImagesSlider className="h-[30rem] w-full" images={images}>
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
            className="z-50 flex flex-col justify-center items-center border-t border-b w-full h-full"
          ></motion.div>
        </ImagesSlider>
      ) : (
        <div>Loading images...</div>
      )}
    </main>
  );
};

export default Banners;
