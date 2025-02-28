"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import toast from "react-hot-toast";

// Updated Product type
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  tag: string;
  image: string;
  gallery: string[];
  stock: number;
  slug: string;
  rating: number;
  reviews: string[];
  colors: string[];
  sizes: string[];
};

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    tag: "",
    image: "",
    gallery: [],
    stock: 0,
    slug: "",
    rating: 0,
    reviews: [],
    colors: [],
    sizes: [],
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCardContentVisible, setIsCardContentVisible] = useState(true);

  // Save products to localStorage whenever products state changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
      console.log("Saved products:", products);
    }
  }, [products]);

  // Load products from localStorage when the component mounts
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
          console.log("Loaded products:", parsedProducts); // Debugging
        } else {
          console.error("Parsed data is not an array:", parsedProducts);
        }
      } catch (error) {
        console.error("Error parsing products:", error);
        toast.error("Error parsing products from localStorage");
      }
    }
  }, []);

  // Log the current products state for debugging
  useEffect(() => {
    console.log("Current products state:", products);
  }, [products]);

  // Create a new product
  const handleCreateProduct = () => {
    const productWithId = { ...newProduct, id: Date.now() }; // Use a unique ID
    console.log("Adding product:", productWithId); // Debugging
    setProducts([...products, productWithId]);
    setNewProduct({
      id: 0,
      title: "",
      description: "",
      price: 0,
      tag: "",
      image: "",
      gallery: [],
      stock: 0,
      slug: "",
      rating: 0,
      reviews: [],
      colors: [],
      sizes: [],
    });
  };

  // Update a product
  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
      setEditingProduct(null);
    }
  };

  // Delete a product
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Handle array inputs (gallery, colors, sizes, reviews)
  const handleArrayInputChange = (
    field: "gallery" | "reviews" | "colors" | "sizes", // Narrow the type of field
    value: string,
    index?: number
  ) => {
    if (editingProduct) {
      const updatedArray = [...editingProduct[field]];
      if (index !== undefined) {
        updatedArray[index] = value;
      } else {
        updatedArray.push(value);
      }
      setEditingProduct({ ...editingProduct, [field]: updatedArray });
    } else {
      const updatedArray = [...newProduct[field]];
      if (index !== undefined) {
        updatedArray[index] = value;
      } else {
        updatedArray.push(value);
      }
      setNewProduct({ ...newProduct, [field]: updatedArray });
    }
  };

  // Toggle function to show/hide CardContent
  const toggleCardContent = () => {
    setIsCardContentVisible((prev) => !prev);
  };

  return (
    <main className="p-28">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        Admin Panel
      </motion.h1>

      {/* Create/Edit Product Form */}
      <Card className="mb-8 shadow-xl">
        <CardHeader className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-col gap-2">
            <CardTitle>
              {editingProduct ? "Edit Product" : "Create New Product"}
            </CardTitle>
            <CardDescription>
              {editingProduct
                ? "Update the product details"
                : "Add a new product to your store"}
            </CardDescription>
          </div>
          <button onClick={toggleCardContent}>
            {isCardContentVisible ? (
              <GoPlus className="border p-2 rounded-full w-10 h-10" />
            ) : (
              <HiMiniMinusSmall className="border p-2 rounded-full w-10 h-10" />
            )}
          </button>
        </CardHeader>
        {!isCardContentVisible && (
          <section className="pt-10 border-t">
            <CardContent>
              <section className="flex flex-col items-start gap-6 w-full">
                <ul className="flex items-start gap-10 w-full">
                  <li className="flex flex-col gap-3 w-full">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      placeholder="Title"
                      value={
                        editingProduct ? editingProduct.title : newProduct.title
                      }
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              title: e.target.value,
                            })
                          : setNewProduct({
                              ...newProduct,
                              title: e.target.value,
                            })
                      }
                    />
                  </li>
                  <li className="flex flex-col gap-3 w-full">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      placeholder="Slug"
                      value={
                        editingProduct ? editingProduct.slug : newProduct.slug
                      }
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              slug: e.target.value,
                            })
                          : setNewProduct({
                              ...newProduct,
                              slug: e.target.value,
                            })
                      }
                    />
                  </li>
                  <li className="flex flex-col gap-3 w-full">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={
                        editingProduct ? editingProduct.price : newProduct.price
                      }
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              price: parseFloat(e.target.value),
                            })
                          : setNewProduct({
                              ...newProduct,
                              price: parseFloat(e.target.value),
                            })
                      }
                    />
                  </li>
                </ul>
                <div className="flex flex-col gap-3 w-full">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description..."
                    rows={5}
                    value={
                      editingProduct
                        ? editingProduct.description
                        : newProduct.description
                    }
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                    }
                  />
                </div>
                <ul className="flex items-start gap-10 w-full">
                  <li className="flex flex-col gap-3 w-full">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      placeholder="Image URL"
                      value={
                        editingProduct ? editingProduct.image : newProduct.image
                      }
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              image: e.target.value,
                            })
                          : setNewProduct({
                              ...newProduct,
                              image: e.target.value,
                            })
                      }
                    />
                  </li>
                  <li className="flex flex-col gap-3 w-full">
                    <Label htmlFor="gallery">Gallery (Image URLs)</Label>
                    {(editingProduct
                      ? editingProduct.gallery
                      : newProduct.gallery
                    ).map((url, index) => (
                      <Input
                        key={index}
                        placeholder={`Gallery Image URL ${index + 1}`}
                        value={url}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "gallery",
                            e.target.value,
                            index
                          )
                        }
                      />
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handleArrayInputChange("gallery", "")}
                    >
                      Add Gallery Image
                    </Button>
                  </li>
                  <li className="flex flex-col gap-3 w-full">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      type="number"
                      placeholder="Stock"
                      value={
                        editingProduct ? editingProduct.stock : newProduct.stock
                      }
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              stock: parseInt(e.target.value),
                            })
                          : setNewProduct({
                              ...newProduct,
                              stock: parseInt(e.target.value),
                            })
                      }
                    />
                  </li>
                </ul>
                <ul className="flex items-start gap-10 w-full">
                  <li className="flex flex-col gap-3 w-full">
                    <Label htmlFor="tag">Tag</Label>
                    <Input
                      placeholder="Tag"
                      value={
                        editingProduct ? editingProduct.tag : newProduct.tag
                      }
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              tag: e.target.value,
                            })
                          : setNewProduct({
                              ...newProduct,
                              tag: e.target.value,
                            })
                      }
                    />
                  </li>
                  <li className="flex flex-col gap-3 w-full">
                    <Label htmlFor="colors">Colors</Label>
                    {(editingProduct
                      ? editingProduct.colors
                      : newProduct.colors
                    ).map((color, index) => (
                      <Input
                        key={index}
                        placeholder={`Color ${index + 1}`}
                        value={color}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "colors",
                            e.target.value,
                            index
                          )
                        }
                      />
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handleArrayInputChange("colors", "")}
                    >
                      Add Color
                    </Button>
                  </li>
                  <li className="flex flex-col gap-3 w-full">
                    <Label htmlFor="sizes">Sizes</Label>
                    {(editingProduct
                      ? editingProduct.sizes
                      : newProduct.sizes
                    ).map((size, index) => (
                      <Input
                        key={index}
                        placeholder={`Size ${index + 1}`}
                        value={size}
                        onChange={(e) =>
                          handleArrayInputChange("sizes", e.target.value, index)
                        }
                      />
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handleArrayInputChange("sizes", "")}
                    >
                      Add Size
                    </Button>
                  </li>
                </ul>
              </section>
            </CardContent>
            <CardFooter>
              {editingProduct ? (
                <Button
                  onClick={handleUpdateProduct}
                  className="p-6 text-lg font-medium w-full"
                >
                  Update Current Product
                </Button>
              ) : (
                <Button
                  onClick={handleCreateProduct}
                  className="p-6 text-lg font-medium w-full"
                >
                  Create New Product
                </Button>
              )}
            </CardFooter>
          </section>
        )}
      </Card>

      {/* Products Table */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your products</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="w-full overflow-auto">
            <Table className="whitespace-nowrap">
              <TableCaption>A list of your products.</TableCaption>
              <TableHeader>
                <TableRow className="border-b bg-zinc-50 dark:bg-zinc-900 h-10">
                  <TableHead className="w-40 border border-b-0">
                    Title
                  </TableHead>
                  <TableHead className="w-64 border border-b-0">
                    Description
                  </TableHead>
                  <TableHead className="w-24 border border-b-0">
                    Price
                  </TableHead>
                  <TableHead className="w-32 border border-b-0">Tag</TableHead>
                  <TableHead className="w-32 border border-b-0">
                    Image
                  </TableHead>
                  <TableHead className="w-64 border border-b-0">
                    Gallery
                  </TableHead>
                  <TableHead className="w-24 border border-b-0">
                    Stock
                  </TableHead>
                  <TableHead className="w-40 border border-b-0">Slug</TableHead>
                  <TableHead className="w-20 border border-b-0">
                    Colors
                  </TableHead>
                  <TableHead className="w-20 border border-b-0">
                    Sizes
                  </TableHead>
                  <TableHead className="w-20 border border-b-0">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-b whitespace-nowrap overflow-auto h-20">
                {products.map((product) => (
                  <TableRow key={product.id} className="">
                    {/* Title */}
                    <TableCell className="w-40 border-l border-r h-20">
                      {product.title}
                    </TableCell>

                    {/* Description */}
                    <TableCell className="w-64 border-r h-20">
                      {product.description}
                    </TableCell>

                    {/* Price */}
                    <TableCell className="w-24 border-r h-20">
                      ${product.price}
                    </TableCell>

                    {/* Tag */}
                    <TableCell className="w-32 border-r h-20">
                      {product.tag}
                    </TableCell>

                    {/* Image */}
                    <TableCell className="w-32 border-r h-20">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={500}
                        height={500}
                        className="w-auto h-14 object-cover rounded border"
                      />
                    </TableCell>

                    {/* Gallery */}
                    <TableCell className="w-64 border-r h-20">
                      {product.gallery.map((url, index) => (
                        <Image
                          key={index}
                          src={url}
                          alt={`Gallery ${index + 1}`}
                          width={500}
                          height={500}
                          className="w-auto h-14 object-cover inline-block rounded border mr-2"
                        />
                      ))}
                    </TableCell>

                    {/* Stock */}
                    <TableCell className="w-24 border-r h-20">
                      {product.stock}
                    </TableCell>

                    {/* Slug */}
                    <TableCell className="w-40 border-r h-20">
                      {product.slug}
                    </TableCell>

                    {/* Colors */}
                    <TableCell className="w-20 border-r h-20 overflow-auto">
                      <ul className="flex flex-col items-start gap-1 whitespace-nowrap overflow-auto h-full">
                        {product.colors.map((color, index) => (
                          <li key={index}>{color}</li>
                        ))}
                      </ul>
                    </TableCell>

                    {/* Sizes */}
                    <TableCell className="w-20 border-r h-20 overflow-auto">
                      <ul className="flex flex-col items-start gap-1 whitespace-nowrap overflow-auto h-full">
                        {product.sizes.map((size, index) => (
                          <li key={index}>{size}</li>
                        ))}
                      </ul>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="flex flex-col items-center justify-between py-3 w-20 border-r h-20">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setIsCardContentVisible(true);
                        }}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
