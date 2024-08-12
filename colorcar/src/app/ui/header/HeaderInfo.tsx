"use client";
import React, { useEffect, useState } from "react";
import MainButton from "../components/MainButton";
import Counter from "../components/Count";
import SearchIcon from "@/app/_assets/search.svg";
import ShopIcon from "@/app/_assets/shop.svg";
import { supabase } from "@/app/utils/supabaseClient";

const HeaderInfo = () => {
  return (
    <div className="flex justify-center items-center gap-5">
      <MainButton
        title="ЗАКАЗАТЬ ЗВОНОК"
        fontSize="text-xs"
        color="text-white"
        maxW="max-w-[168px]"
        hgt="h-[40px]"
        href="/"
      />
      {/* <button className="mr-3 ml-6 lg:hidden">
        <SearchIcon />
      </button> */}
      <button className="flex">
        <ShopIcon />
        <Counter count={0} className="" />
      </button>
    </div>
  );
};

export default HeaderInfo;
