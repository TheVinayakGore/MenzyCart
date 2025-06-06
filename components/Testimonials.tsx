"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "John Doe",
    avatar: "/mem1.jpeg",
    comment:
      "Mega Mall has the best deals! I always find what I need at great prices.",
  },
  {
    name: "Jane Smith",
    avatar: "/mem2.jpeg",
    comment: "The customer service is amazing, and the delivery is super fast!",
  },
  {
    name: "Alice Johnson",
    avatar: "/mem3.jpeg",
    comment: "I love the variety of products available. Highly recommended!",
  },
  {
    name: "Michael Lee",
    avatar: "/mem4.jpeg",
    comment:
      "Impressed with the quality and quick response from support. Great experience!",
  },
  {
    name: "Priya Patel",
    avatar: "/mem5.jpeg",
    comment:
      "Shopping at Mega Mall is always a joy — smooth interface and amazing discounts!",
  },
];

const Testimonials = () => {
  return (
    <>
      <main className="w-full">
        <h1 className="text-center pb-14 text-4xl sm:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-500 h-full">
          What Our Customers Say
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 md:p-5 md:pb-0">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{testimonial.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 md:p-5">
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                  {testimonial.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

export default Testimonials;
