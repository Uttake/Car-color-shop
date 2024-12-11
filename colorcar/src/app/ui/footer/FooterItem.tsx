import React from "react";

type footerType = {
  maintitle: string;
  subtitle: Array<{ title: string }>;
};

const FooterItem = async ({ item }: { item: footerType }) => {
  return (
    <div>
      <h2 className=" text-base text-white mb-5">{item.maintitle}</h2>
      {item.subtitle.map((el) => (
        <div className=" text-xs text-white opacity-50 mb-4 last:mb-0">
          {el.title}
        </div>
      ))}
    </div>
  );
};

export default FooterItem;
