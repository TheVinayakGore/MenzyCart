"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";

interface ImagesSliderProps {
  images: string[];
  children: React.ReactNode;
  overlay?: boolean;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}

export const ImagesSlider: React.FC<ImagesSliderProps> = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoized handlers to prevent unnecessary re-renders
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  // Load Images
  useEffect(() => {
    setLoading(true);
    const loadImage = (image: string) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = (e) => {
          console.error(`Error loading image: ${image}`, e);
          reject(`Failed to load ${image}`);
        };
      });
    };

    Promise.all(images.map(loadImage))
      .then((loaded) => setLoadedImages(loaded))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [images]);

  // Keyboard Navigation & Autoplay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrevious();
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval: NodeJS.Timeout | null = null;
    if (autoplay) {
      interval = setInterval(handleNext, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [handleNext, handlePrevious, autoplay]);

  // Framer Motion Variants
  const slideVariants = {
    initial: { scale: 0, opacity: 0, rotateX: 45 },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1.0] },
    },
    exit: {
      opacity: 1,
      y: direction === "up" ? "-150%" : "150%",
      transition: { duration: 1 },
    },
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden h-full w-full",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {!loading && loadedImages.length > 0 && children}

      {!loading && overlay && (
        <div className={cn("absolute inset-0 z-40", overlayClassName)} />
      )}

      <AnimatePresence>
        {!loading && loadedImages.length > 0 && (
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            width={5000}
            height={5000}
            className="absolute inset-0 h-full w-full"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
