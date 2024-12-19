import React from "react";
import { Slide } from "../sliders/SliderSwiper";
import DOMPurify from "isomorphic-dompurify";
import { fixStyleString } from "@/app/utils";
const InfoItem = ({ data }: { data: Slide[] }) => {
  return (
    <div className="flex flex-col gap-5 ">
      {data.map((item) => (
        <div key={item.id} className="p-5 border-[3px] border-orange-brdr ">
          <h3
            className="text-2xl font-bold mb-3 text-black"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(fixStyleString(item.title || "")),
            }}
          ></h3>
          <div
            className="w-full mt-3 flex flex-col gap-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                fixStyleString(item.fulldescription || "")
              ),
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default InfoItem;
