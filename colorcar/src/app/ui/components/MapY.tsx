"use client";
import React from "react";

export default function MapY() {
  return (
    <div className=" basis-1/2 md:basis-full md:h-[300px]">
      <iframe
        src={`https://yandex.by/map-widget/v1/?ll=30.364994%2C53.943989&mode=poi&poi%5Bpoint%5D=30.364690%2C53.944102&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D190205805976&z=19.44`}
        width="100%"
        height="100%"
        frameBorder="1"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}
