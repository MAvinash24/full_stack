import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google"; // The closest free match to Avenir
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Providers } from "@/components/providers"; 

// Configure the font
const avenirLike = Nunito_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"], // Avenir has a wide range of weights
  variable: "--font-avenir", 
});

export const metadata: Metadata = {
  title: "MLera Internship",
  description: "Built with Next.js and Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${avenirLike.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}