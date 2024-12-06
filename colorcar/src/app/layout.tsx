import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "./ui/header/Header";
import Footer from "./ui/footer/Footer";
const inter = Inter({ subsets: ["latin"] });
import ToastProvider from "./ui/components/ToastProvider";
import { BasketProvider } from "./ui/components/BasketContext";
import GoogleCaptchaWrapper from "./ui/components/GoogleCaptchaWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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
              <Footer />
            </GoogleCaptchaWrapper>
          </BasketProvider>
        </ToastProvider>
      </body>
      <GoogleAnalytics gaId="G-JJ4RDB15WV" />
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(99101809, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          `,
        }}
      />
    </html>
  );
}
