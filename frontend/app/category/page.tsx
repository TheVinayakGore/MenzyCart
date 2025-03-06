"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RxCross2 } from "react-icons/rx";
import { Products } from "./Products";

// Define the API response structure
interface ProductAPIResponse {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  };
  slug: string;
  description: string;
  price: number;
  mrp: number;
  stock: string;
  image?: {
    id: number;
    url: string;
    alternativeText: string;
  };
  gallery?: { url: string }[];
  tags: string;
}

// Utility function to fetch products
const fetchProducts = async (API_URL: string) => {
  const response = await axios.get<{ data: ProductAPIResponse[] }>(
    `${API_URL}/api/products?populate=*`
  );
  return response.data.data.map((product) => ({
    title: product.title || "Untitled Product",
    category: product.category?.name || "Uncategorized",
    description:
      Array.isArray(product.description) &&
      product.description[0]?.children[0]?.text
        ? product.description[0].children[0].text
        : "No description",
    link: `/products/${product.slug || "no-slug"}`,
    image: product.image?.url
      ? `${API_URL}${product.image.url}`
      : "/noimage.png",
    price: product.price?.toString() || "0",
    mrp: product.mrp?.toString() || "0",
    tags: product.tags || "",
  }));
};

// Loading Component
const Loading = () => (
  <p className="text-center p-40 text-lg">Loading products...</p>
);

const sidebarVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const filterOptions = [
  {
    id: "category",
    label: "Category",
    options: [
      "Electronics",
      "Clothing",
      "Home & Kitchen",
      "Sports & Outdoors",
      "Beauty & Personal Care",
    ],
  },
  { id: "price", label: "Price Range", type: "slider" },
  {
    id: "rating",
    label: "Rating",
    options: ["4 Stars & Up", "3 Stars & Up", "2 Stars & Up", "1 Star & Up"],
  },
  {
    id: "availability",
    label: "Availability",
    options: ["In Stock", "Out of Stock", "Pre-Order"],
  },
  {
    id: "brand",
    label: "Brand",
    options: ["Apple", "Samsung", "Nike", "Adidas", "Sony"],
  },
  {
    id: "color",
    label: "Color",
    options: ["Red", "Blue", "Green", "Black", "White", "Yellow"],
  },
  {
    id: "size",
    label: "Size",
    options: ["Small", "Medium", "Large", "XL", "XXL"],
  },
  {
    id: "material",
    label: "Material",
    options: ["Cotton", "Polyester", "Leather", "Silk", "Wool"],
  },
  {
    id: "discount",
    label: "Discount",
    options: [
      "10% Off or More",
      "20% Off or More",
      "30% Off or More",
      "50% Off or More",
    ],
  },
  {
    id: "shipping",
    label: "Shipping",
    options: ["Free Shipping", "Express Shipping", "Local Pickup"],
  },
];

const Category = () => {
  const [products, setProducts] = useState<
    {
      title: string;
      category: string;
      description: string;
      link: string;
      image: string;
      price: string;
      mrp: string;
      tags: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(API_URL);
        if (isMounted) {
          setProducts(fetchedProducts);
          setLoading(false);
        }
      } catch (error) {
        alert("Error fetching products:" + error);
        if (isMounted) setLoading(false);
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  if (loading) return <Loading />;

  return (
    <>
      <main id="explore" className="flex items-start pt-16 w-full h-full">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
          className="pt-5 border border-l-0 w-[25rem] h-full"
        >
          <div className="flex flex-col items-start gap-5 py-5 px-7 w-full">
            <h1 className="text-xl font-semibold">Filter Your Products</h1>
            <Button
              variant="outline"
              className="py-5 uppercase rounded-none w-40"
            >
              <span className="text-base mr-3">CLEAR ALL</span>
              <RxCross2 />
            </Button>
          </div>

          {/* Accordion for Filters */}
          <Accordion
            type="multiple"
            defaultValue={filterOptions.map((filter) => filter.id)} // Open all accordions by default
            className="border-t border-b-0 w-full"
          >
            {filterOptions.map((filter) => (
              <AccordionItem
                key={filter.id}
                value={filter.id}
                className="py-3 px-7 w-full"
              >
                <AccordionTrigger className="text-base font-semibold uppercase no-underline hover:no-underline">
                  {filter.label}
                </AccordionTrigger>
                <AccordionContent>
                  {filter.type === "slider" ? (
                    <div className="space-y-3 px-1">
                      <Slider
                        defaultValue={priceRange}
                        max={10000}
                        step={1}
                        onValueChange={(value) => {
                          console.log("Slider value :", value);
                          setPriceRange(value);
                        }}
                        className="py-3 w-full"
                      />
                      <div className="flex justify-between text-sm">
                        <span>₹{priceRange[0].toLocaleString()}</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  ) : (
                    filter.options?.map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox id={option} />
                        <Label htmlFor={option} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>

        <section className="flex flex-col items-start p-10 w-full h-full">
          {/* Explore Products Section */}
          <div className="flex flex-col items-start gap-5 px-3 w-full">
            {/* Heading with Motion Animation */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl font-semibold"
            >
              Explore Products
            </motion.h1>

            {/* Paragraph with Motion Animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-gray-700 dark:text-gray-300"
            >
              Discover a wide range of high-quality products tailored to meet
              your needs. From stylish clothing and comfortable footwear to
              essential accessories and grooming products, we offer everything
              you need to elevate your lifestyle. Our collection is carefully
              curated to ensure the best in design, functionality, and
              affordability. Whether you are looking for the latest trends or
              timeless classics, you will find it here. Start exploring now and
              find the perfect products for you!
            </motion.p>
          </div>

          {/* Products Section */}
          <div className="w-full h-full mt-8">
            <Products items={products} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Category;
