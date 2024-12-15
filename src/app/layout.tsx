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
import dynamic from "next/dynamic";
// import YaMetrica from "./ui/components/YaMetrica";
import "react-toastify/dist/ReactToastify.css";
import FooterContact from "./ui/footer/FooterContact";
import Footer from "./ui/footer/Footer";

const YaMetrica = dynamic(() => import("./ui/components/YaMetrica"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Tarcolor",
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
              <div className="text-sm w-full bg-black pt-5">
                <div className="wrapper">
                  <FooterContact />
                </div>
              </div>
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
