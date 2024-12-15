"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const variants = [9, 12, 18];

const ItemPerView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [active, setActive] = useState(variants[0]);

  const createPageURL = (variant: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("rowPerPage", variant.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const rowPerPage = searchParams.get("rowPerPage");
    if (rowPerPage) {
      setActive(Number(rowPerPage));
    }
  }, [searchParams]);

  return (
    <div className="flex gap-4 items-end">
      <h3 className="font-bold">Показать:</h3>
      {variants.map((variant) => (
        <button
          className="w-10 h-10 border-4 border-orange-brdr"
          onClick={() => {
            createPageURL(variant);
            setActive(variant);
          }}
          key={variant}
          style={{
            backgroundColor: active === variant ? "#d42e12" : "",
            color: active === variant ? "#fff" : "#d42e12",
          }}
        >
          {variant}
        </button>
      ))}
    </div>
  );
};

export default ItemPerView;
