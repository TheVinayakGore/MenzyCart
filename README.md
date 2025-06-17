## 🛒 MenzyCart

MenzyCart is a full-stack eCommerce web app built with modern technologies like Next.js, Sanity CMS, Redux Toolkit, and Clerk authentication. It features both user and admin panels, a seamless shopping experience, and dynamic content management.

🔗 [Live Demo](https://menzycart.vercel.app/)

## 🚀 Tech Stack

-	Frontend : Next.js 13+ App Router, React.js, TypeScript, Tailwind CSS, Shadcn UI
-	CMS : Sanity.io – for dynamic product and content management
-	State Management : Redux Toolkit
-	Auth : Clerk (secure, real-time user authentication)
-	Deployment : Vercel


## 📦 Features

-	✅ User authentication with Clerk
-	🛍️ Dynamic product listing from Sanity CMS
-	🧺 Cart management with Redux Toolkit
-	🔐 Protected routes for admin panel
-	📦 Checkout and Buy Now functionality
-	🛠 Admin panel to manage products and orders
-	🌐 Fully responsive layout using Tailwind & Shadcn UI
-	⚙️ Clean and modular folder structure
  

## 🗂️ Important Folder Structure

```bash
├── app              # Routing (Next.js App Router)
├── components       # Reusable UI components
├── redux            # Redux Toolkit store and slices
├── sanity           # Sanity CMS integration
├── lib/utils        # Utility functions
├── public           # Static files and images
└── ...
```


## 🛠 Getting Started

To run the project locally :

```bash
git clone https://github.com/TheVinayakGore/MenzyCart.git
cd MenzyCart
npm install
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)


## 🧠 Sanity CMS Setup

If you want to use your own content :

1.	Go to sanity/ directory
2.	Run sanity init
3.	Deploy the studio using sanity deploy
4.	Replace the project ID and dataset in the app’s env variables


## 🔐 Clerk Auth Setup

1.	Create a project on [Clerk.dev](https://clerk.com/)
2.	Add your Clerk keys to .env.local:

```bash
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_api
```


## 📤 Deploy Your Own

Want to deploy your own version of Stock-Manager ?

You can easily deploy it using Vercel in just a few steps :


## 🚀 Steps to Deploy on Vercel

1.	Push the project to GitHub
  -	Make sure your code is committed and pushed to a GitHub repository.
2.	Login to Vercel
  -	Go to vercel.com and sign in with GitHub.
3.	Import your GitHub Repository
	-	Click on + New Project → Import Git Repository.
	-	Select the Stock-Manager repo from the list.
4.	Configure Environment Variables
	-	Add your environment variables during the setup:

```bash
MONGODB_URI=your_mongodb_connection_string
```

5.	Choose Framework Preset
	-	Vercel will auto-detect the Next.js framework. Leave the default settings unless custom.
6.	Deploy
	-	Click Deploy and wait for Vercel to build and deploy your app.
	-	Once done, you’ll get a live URL like:

```bash
https://your-project-name.vercel.app
```

7.	Post-Deployment
	-	Optionally, go to your project settings on Vercel and :
	-	Set up a custom domain.
	-	Configure automatic re-deployment on GitHub pushes.
	-	Enable serverless function logs and analytics.

🔗 Vercel Docs - [Getting Started](https://vercel.com/docs/getting-started-with-vercel)


## 📫 Connect

Built with ❤️‍🩹 by Vinayak Gore

For queries or feedback, feel free to connect : [@vinayakgore.vercel.app](https://vinayakgore.vercel.app)

Let me know if you’d like a badge section, GIF demo preview, or GitHub stats added as well !


💻 Happy coding ! 🎉

⌲ Design.Implement.Inspire
