import React from "react";

const Price = async ({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) => {
  return (
    <>
      {discount ? (
        <div className="relative">
          <div className="absolute -top-5 text-[#A5A5A5] text-lg font-bold line-through">
            {price} BYN
          </div>
          <div className=" text-[#C53720] text-3xl mb-5 font-bold">
            {price - discount} BYN
          </div>
        </div>
      ) : (
        <div className=" text-[#1D1D1D] text-3xl mb-5 font-bold ">
          {price} BYN
        </div>
      )}
    </>
  );
};

export default Price;
