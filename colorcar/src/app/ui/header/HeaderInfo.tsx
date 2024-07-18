"use client";
import React, { useEffect, useState } from "react";
import MainButton from "../components/MainButton";
import Counter from "../components/Count";
import SearchIcon from "@/app/_assets/search.svg";
import ShopIcon from "@/app/_assets/shop.svg";
import { supabase } from "@/app/utils/supabaseClient";

const HeaderInfo = () => {
  return (
    <div className="flex justify-center items-center">
      <MainButton title="ЗАКАЗАТЬ ЗВОНОК" />
      <button className="mr-3 ml-6">
        <SearchIcon />
      </button>
      <button>
        <ShopIcon />
      </button>
      <Counter count={0} className="" />
    </div>
  );
};

export default HeaderInfo;
