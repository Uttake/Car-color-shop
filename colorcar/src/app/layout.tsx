import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "./ui/header/Header";
import Footer from "./ui/footer/Footer";
import Breadcrumb from "./ui/components/Breadcrumb";
import Arrow from "./_assets/arrow.svg";
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
      <body className={clsx(inter.className, "bg-black overflow-x-hidden")}>
        <Header />
        <Breadcrumb
          homeElement={"Главная"}
          separator={<Arrow />}
          activeClasses="text-amber-500"
          containerClasses="flex items-center py-5 wrapper"
          listClasses="hover:underline mx-2 font-bold"
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
