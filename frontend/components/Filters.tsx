"use client";
import React, { useEffect, useState } from "react";
import { Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { motion } from "framer-motion";

interface ApiCategory {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  items: ApiItem[];
}

interface ApiItem {
  id: number;
  title: string;
  href: string;
  image: ImageData | null;
  description: string;
}

interface ImageData {
  url?: string;
}

interface Category {
  id: number;
  name: string;
  items: Item[];
}

interface Item {
  id: number;
  title: string;
  href: string;
  image: string;
  description: string;
}

const Filters = () => {
  const [active, setActive] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/categories?populate=items.image"
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch categories - Status: ${response.status}`
          );
        }

        const responseData: { data: ApiCategory[] } = await response.json();

        // Transform API response into our expected structure
        const formattedCategories: Category[] = responseData.data.map(
          (category) => ({
            id: category.id,
            name: category.name,
            items: category.items.map((item) => ({
              id: item.id,
              title: item.title,
              href: item.href,
              image: item.image?.url
              ? `http://localhost:1337${item.image.url}`
              : "/card.png",            
              description: item.description,
            })),
          })
        );

        setCategories(formattedCategories);
      } catch (error) {
        setError((error as Error).message);
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <motion.main
        initial={{ filter: "blur(20px)", opacity: 0, rotateX: 1440, y: -130 }}
        animate={{ filter: "blur(0px)", opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 4 }}
        className="z-50 w-full"
      >
        {error && <p className="text-red-500">{error}</p>}
        <Menu setActive={setActive}>
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              setActive={setActive}
              active={active}
              item={category.name}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 gap-1"
              >
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                  >
                    <ProductItem
                      title={item.title}
                      href={item.href}
                      src={item.image}
                      description={item.description}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </MenuItem>
          ))}
        </Menu>
      </motion.main>
    </>
  );
};

export default Filters;
