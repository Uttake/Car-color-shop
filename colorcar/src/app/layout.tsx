import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "./ui/header/Header";
import Footer from "./ui/footer/Footer";
const inter = Inter({ subsets: ["latin"] });
import dataSlider from "@/app/_data/slider-data.json";
import { ToastContainer } from "react-toastify";
import ToastProvider from "./ui/components/ToastProvider";
import { BasketProvider } from "./ui/components/BasketContext";
import GoogleCaptchaWrapper from "./ui/components/GoogleCaptchaWrapper";

export const metadata: Metadata = {
  title: "Car color shop",
  description: "Goodya lox",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-black overflow-x-hidden")}>
        <ToastProvider>
          <BasketProvider>
            <GoogleCaptchaWrapper>
              <Header />
              {children}
              <Footer />
            </GoogleCaptchaWrapper>
          </BasketProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
