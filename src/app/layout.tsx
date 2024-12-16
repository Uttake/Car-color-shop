import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "./ui/header/Header";
const inter = Inter({ subsets: ["latin"], display: "swap" });
import ToastProvider from "./ui/components/ToastProvider";
import { BasketProvider } from "./ui/components/BasketContext";
import GoogleCaptchaWrapper from "./ui/components/GoogleCaptchaWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import FooterContact from "./ui/footer/FooterContact";
import Footer from "./ui/footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import Script from "next/script";
const YaMetrica = dynamic(() => import("./ui/components/YaMetrica"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Tarcolor | Автоэмали и лаки в Могилеве",
  description:
    "Tarcolor — магазин автоэмалей, лаков, шпатлевок и других материалов для покраски автомобилей в Могилеве. Качество, надежность и широкий ассортимент.",
  keywords: [
    "автоэмали",
    "автомобильные лаки",
    "шпатлевки",
    "краска для авто",
    "магазин автоэмалей Могилев",
    "покраска авто",
    "грунт",
    "материалы для покраски автомобилей",
    "доступные цены на материалы для покраски автомобиля",
    "Tarcolor",
  ],
  openGraph: {
    title:
      "Tarcolor | Автоэмали, лаки, грунты, материалы для покраски в Могилеве",
    description:
      "Купить автоэмали, лаки и другие материалы для покраски автомобилей в Могилеве. Высокое качество и доступные цены.",
    url: "https://tarcolor.by",
    siteName: "Tarcolor",

    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Логотип Tarcolor",
      },
    ],
    locale: "ru_BY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tarcolor",
    title: "Tarcolor | Автоэмали и лаки в Могилеве",
    description:
      "Магазин материалов для покраски автомобилей. У нас вы найдете автоэмали, лаки и многое другое.",
    images: ["/images/logo.png"],
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Tarcolor",
  description:
    "Магазин автоэмалей и материалов для покраски автомобилей в Могилеве.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Могилев",
    addressRegion: "Могилевская область",
    addressCountry: "BY",
    postalCode: "212000",
    streetAddress: "ул. Турова, 3, корп. 1",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 53.943925,
    longitude: 30.364457,
  },
  openingHours: "Mo-Sat 09:00-17:00",
  telephone: "+375 29 388-82-93",
  url: "https://tarcolor.by",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://tarcolor.by",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Контакты",
      item: "https://tarcolor.by/contacts",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Услуги",
      item: "https://tarcolor.by/services",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Информация",
      item: "https://tarcolor.by/info",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "О нас",
      item: "https://tarcolor.by/company",
    },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <Head>
        <meta name="geo.region" content="BY-MA" />
        <meta name="geo.placename" content="Могилев" />
        <meta name="geo.position" content="53.943925;30.364457" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        ;
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
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
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-JJ4RDB15WV" />
    </html>
  );
}
