import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiffinly – Your whole week of meals, planned in 30 seconds",
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
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <CurrencyProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
