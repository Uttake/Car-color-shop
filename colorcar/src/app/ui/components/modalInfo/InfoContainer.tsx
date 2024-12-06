"use client";
import { getInfo } from "@/app/utils/actions";
import React, { useEffect, useState } from "react";
import InfoItem from "./InfoItem";

interface Info {
  title: string;
  image: string;
  link: string;
  id: string;
}

const InfoContainer = () => {
  const [data, setData] = useState<Info[] | null>(null);

  const getData = async () => {
    const res: Info[] | null = await getInfo();
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-5 max-h-[600px] overflow-auto">
      {data ? (
        data.map((item) => <InfoItem key={item.id} data={item} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InfoContainer;
