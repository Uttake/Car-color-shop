import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "./ui/header/Header";
import Footer from "./ui/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car color shop",
  description: "Goodya lox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'bg-black')}>
      <Header />
      {children}
      <Footer/>
      </body>
    </html>
  );
}
