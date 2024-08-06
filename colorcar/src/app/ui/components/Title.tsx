import React from "react";

type titleType = {
  title: string;
  color: string;
};

const Title = ({ title, color }: titleType) => {
  return (
    <>
      <div className="w-fit m-auto">
        <h2
          className={`text-4xl uppercase text-center text-[${color}] font-bold`}
        >
          {title}
        </h2>
        <div className="bg-[#C53720] h-[4px] mb-8 mt-2" />
      </div>
    </>
  );
};

export default Title;
