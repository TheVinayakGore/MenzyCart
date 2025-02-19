"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

// Define the types for the article and block data
interface Article {
  id: string;
  title: string;
  slug: string; // Include slug in the Article interface
  body: string;
  publishedAt: string;
  coverUrl: string; // Added cover image URL
}

interface Block {
  __component: string;
  body?: string; // Only "shared.rich-text" blocks will have body
}

const Page = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetching data from Strapi with populate=* to get all fields
        const response = await axios.get(
          "http://localhost:1337/api/articles?populate=*"
        );

        // Extracting the relevant article details (id, title, body, publishedAt, cover image URL, and slug)
        const fetchedArticles = response.data.data.map(
          (article: {
            id: string;
            title: string;
            slug: string; // Ensure slug is included here
            blocks: Block[];
            publishedAt: string;
            cover: { url: string };
          }) => ({
            id: article.id,
            title: article.title,
            slug: article.slug, // Assign slug to the fetched data
            body: article.blocks
              .filter(
                (block: Block) => block.__component === "shared.rich-text"
              ) // Filter only rich-text blocks
              .map((block: Block) => block.body) // Extract the body from each block
              .join("\n"), // Join the multiple body texts (if any)
            publishedAt: article.publishedAt,
            coverUrl: article.cover?.url || "", // Fetch the cover image URL (default to empty string if not available)
          })
        );

        // Set the fetched articles
        setArticles(fetchedArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p>Loading articles...</p>;
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-10 max-w-6xl mx-auto py-36">
        <h1 className="text-6xl font-extrabold">Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              href={`/articles/${article.slug}`}
              target="_blank"
              key={article.id}
              className="p-6 shadow-lg rounded-lg bg-white dark:bg-zinc-900 border transition-transform hover:scale-105 hover:shadow-2xl"
            >
              {article.coverUrl && (
                <Image
                  src={`http://localhost:1337${article.coverUrl}`}
                  alt={article.title}
                  width={1000}
                  height={1000}
                  priority
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <h2 className="text-xl font-semibold mt-4">{article.title}</h2>
              <p className="text-xs opacity-30">
                {article.publishedAt
                  ? format(new Date(article.publishedAt), "dd MMM yyyy")
                  : "No Date"}
              </p>
              <div className="mt-4">
                <p className="text-sm opacity-50">
                  {article.body.slice(0, 300)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Page;
