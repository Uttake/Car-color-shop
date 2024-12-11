import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "./ui/header/Header";

const inter = Inter({ subsets: ["latin"] });
import ToastProvider from "./ui/components/ToastProvider";
import { BasketProvider } from "./ui/components/BasketContext";
import GoogleCaptchaWrapper from "./ui/components/GoogleCaptchaWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import YaMetrica from "./ui/components/YaMetrica";

const Footer = dynamic(() => import("./ui/footer/Footer"), { ssr: false });

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
      <body
        className={clsx(
          inter.className,
          "bg-[#EDEDED] overflow-x-hidden antialiased"
        )}
      >
        <ToastProvider>
          <BasketProvider>
            <GoogleCaptchaWrapper>
              <Header />

              {children}
            </GoogleCaptchaWrapper>
          </BasketProvider>
        </ToastProvider>
        <Footer />
        <YaMetrica />
      </body>
      <GoogleAnalytics gaId="G-JJ4RDB15WV" />
    </html>
  );
}
