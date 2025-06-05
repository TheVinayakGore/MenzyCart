// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Allow only these to pass unauthenticated:
    "/((?!_next/static|_next/image|favicon.ico|api/auth|api/webhooks|logo.png).*)",
  ],
};