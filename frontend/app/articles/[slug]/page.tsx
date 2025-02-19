"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { GoPaste } from "react-icons/go";
import { MdDone } from "react-icons/md";
import toast from "react-hot-toast";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface Article {
  id: string;
  title: string;
  slug: string;
  body: string;
  publishedAt: string;
  coverUrl: string;
  code: string;
}

interface Block {
  __component: string;
  body?: string;
}

export default function Page() {
  const { slug } = useParams();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`);

          const fetchedArticle =
            response.data.data.length > 0 ? response.data.data[0] : null;

          if (fetchedArticle) {
            const articleData = {
              id: fetchedArticle.id,
              title: fetchedArticle.title,
              slug: fetchedArticle.slug,
              body: fetchedArticle.blocks
                .filter(
                  (block: Block) => block.__component === "shared.rich-text"
                )
                .map((block: Block) => block.body)
                .join("\n"),
              publishedAt: fetchedArticle.publishedAt,
              coverUrl: fetchedArticle.cover?.url || "",
              code: fetchedArticle.code || "No code available!",
            };
            setArticle(articleData);
          }
          setLoading(false);
        } catch (error) {
          toast.error("Error fetching article:" + error);
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [slug]);

  const handleCopy = () => {
    if (article?.code) {
      navigator.clipboard.writeText(article.code);
      setIsCopied(true);
      toast.success("Copied Successfully!");
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  if (loading) return <p>Loading article...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <div className="flex flex-col items-start justify-start gap-5 max-w-6xl mx-auto py-40">
      <h1 className="text-4xl font-extrabold">{article.title}</h1>

      {article.coverUrl && (
        <Image
          src={`http://localhost:1337${article.coverUrl}`}
          alt={article.title}
          width={1000}
          height={1000}
          priority
          className="w-full h-full rounded-xl border-2"
        />
      )}

      <p className="text-xs opacity-40">
        Published on: {format(new Date(article.publishedAt), "dd MMM yyyy")}
      </p>

      <p className="opacity-60">{article.body}</p>

      {/* Code Block */}
      <div className="rounded-lg border w-full">
        <div className="flex items-center justify-between bg-[#1d1d1d] rounded-t-lg text-base px-4 py-2 font-medium">
          <div className="flex space-x-1">
            <span className="bg-red-500 rounded-full w-3 h-3"></span>
            <span className="bg-yellow-500 rounded-full w-3 h-3"></span>
            <span className="bg-green-500 rounded-full w-3 h-3"></span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center text-sm font-light space-x-2 pb-1 ${
              isCopied ? "text-blue-600" : ""
            }`}
          >
            {isCopied ? <MdDone /> : <GoPaste />}
            <span>{isCopied ? "Copied!" : "Copy"}</span>
          </button>
        </div>

        <SyntaxHighlighter
          language="javascript"
          style={atomOneDark}
          customStyle={{
            padding: "1.5rem",
            borderRadius: "0 0 0.5rem 0.5rem",
            background: "#0f0f0f",
          }}
          wrapLongLines={true}
          className="text-sm font-light"
        >
          {article.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
