export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string; // Main product image
  gallery: string[]; // Array of image URLs for the gallery
  stock: number;
  slug: string; // SEO-friendly URL slug
  tags: string[]; // Array of tags related to the product
}
