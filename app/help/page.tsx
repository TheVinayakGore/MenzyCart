"use client";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Phone, Mail, MapPin } from "lucide-react";

const HelpCenterPage = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our products, adding them to your cart, and proceeding to checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy. Please contact us for more details.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on your location.",
    },
    {
      question: "How can I cancel or modify my order?",
      answer:
        "You can cancel or modify your order within 24 hours of placing it. Contact our support team for assistance.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-6 sm:px-10 py-20 space-y-10"
    >
      <h1 className="inline-flex text-6xl sm:text-8xl lg:text-9xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-500 h-full">
        Help Center
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <Card className="shadow-lg">
          <CardHeader className="border-b pb-5 mb-5">
            <CardTitle className="text-xl sm:text-2xl">
              Frequently Asked Questions
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Find answers to common questions about our services and policies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-base">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    {faq.answer}
                  </p>
                  {index !== faqs.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Contact Us</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Have a question? Send us a message, and we will get back to you as
              soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {["name", "email", "phone", "subject"].map((field) => (
                <div className="space-y-1" key={field}>
                  <Label htmlFor={field} className="text-sm capitalize">
                    {field}
                  </Label>
                  <Input
                    id={field}
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                          ? "tel"
                          : "text"
                    }
                    placeholder={`Your ${field}`}
                    className="text-sm"
                  />
                </div>
              ))}
              <div className="space-y-1">
                <Label htmlFor="message" className="text-sm">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Your message"
                  className="text-sm"
                />
              </div>
              <Button type="submit" className="w-full text-base">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Alert className="flex items-start space-x-3 p-5 shadow-md">
          <Phone className="h-6 w-6 mt-1 text-sky-500" />
          <div>
            <AlertTitle className="text-base font-semibold">Call Us</AlertTitle>
            <AlertDescription className="text-sm">
              For immediate assistance, call us at{" "}
              <span className="font-medium">+1 (800) 123-4567</span>.
            </AlertDescription>
          </div>
        </Alert>

        <Alert className="flex items-start space-x-3 p-5 shadow-md">
          <Mail className="h-6 w-6 mt-1 text-fuchsia-500" />
          <div>
            <AlertTitle className="text-base font-semibold">
              Email Us
            </AlertTitle>
            <AlertDescription className="text-sm">
              Send us an email at{" "}
              <span className="font-medium">support@example.com</span>.
            </AlertDescription>
          </div>
        </Alert>

        <Alert className="flex items-start space-x-3 p-5 shadow-md">
          <MapPin className="h-6 w-6 mt-1 text-emerald-500" />
          <div>
            <AlertTitle className="text-base font-semibold">
              Our Location
            </AlertTitle>
            <AlertDescription className="text-sm">
              123 Main Street, Suite 100, San Francisco, CA 94110
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </motion.div>
  );
};

export default HelpCenterPage;
