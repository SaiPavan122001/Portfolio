import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import ConsoleWidget from "@/components/ConsoleWidget";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Adusumalli Sai Pavan | Agentic AI Engineer & Full Stack Developer",
  description:
    "Software Engineer focused on Agentic AI, Generative AI, and full-stack application development. Building intelligent systems that solve real problems.",
  keywords: ["AI Engineer", "Full Stack Developer", "Agentic AI", "RAG", "LangGraph", "React", "Python"],
  authors: [{ name: "Adusumalli Sai Pavan" }],
  openGraph: {
    title: "Adusumalli Sai Pavan | Agentic AI Engineer & Full Stack Developer",
    description: "Software Engineer focused on Agentic AI, Generative AI, and full-stack application development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adusumalli Sai Pavan",
    description: "Software Engineer focused on Agentic AI, Generative AI, and full-stack application development.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <Preloader />
            <a href="#about" className="skip-link">Skip to content</a>
            <ScrollProgress />
            <Cursor />
            <Navigation />
            {/* Solid backdrop lets the fixed footer reveal only at the end */}
            <main className="relative z-10 bg-background pb-64 sm:pb-48">{children}</main>
            <Footer />
            <ConsoleWidget />
            <CommandPalette />
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
