import Link from "next/link";
import React from "react";

interface footerType {
  maintitle: string;
  href: string;
  subtitle: Array<{ title: string; href?: string }>;
}

const FooterItem = async ({ item }: { item: footerType }) => {
  return (
    <div>
      <h2 className=" text-base text-white mb-5">
        <Link href={item.href}>{item.maintitle}</Link>
      </h2>
      {item.subtitle.map((el) => (
        <div
          key={el.title}
          className=" text-xs text-white opacity-50 mb-4 last:mb-0"
        >
          <Link href={el.href ? el.href : "#"}>{el.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default FooterItem;
