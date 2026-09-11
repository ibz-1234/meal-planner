import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chef.ai – Dinner, intelligently planned",
  description:
    "Weekly meal plans built around your calories, budget, allergies and goals. Chef AI writes recipes, shopping lists and local supermarket price comparisons.",
  keywords: [
    "meal planner",
    "meal plan",
    "grocery list",
    "shopping list",
    "budget meals",
    "macros",
    "healthy eating",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <CurrencyProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Suspense fallback={<div className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-card-border bg-card md:hidden" />}>
              <BottomNav />
            </Suspense>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
