export default [
  "strapi::errors",
  "strapi::security",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: ["http://localhost:3000", "https://menzycart.vercel.app"], // Allow Next.js frontend
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
      headers: ["Content-Type", "Authorization", "Origin", "Accept"], // Allowed headers
      credentials: true, // Allow cookies if needed
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
