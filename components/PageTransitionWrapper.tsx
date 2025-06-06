"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingBar from "./LoadingBar";

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, [pathname]);

  return (
    <>
      <LoadingBar loading={isLoading} />
      {children}
    </>
  );
}
