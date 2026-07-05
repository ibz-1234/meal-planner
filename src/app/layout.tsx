import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Meal Plan – Your personalised meal plan in under 5 minutes",
  description:
    "Weekly meal plans built around your calories, budget, allergies, cooking ability and goals. Includes recipes, shopping lists, nutrition and local supermarket price comparison.",
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
        <CurrencyProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
