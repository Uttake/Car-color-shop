"use client";
import clsx from "clsx";
import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  tooltip: string;
}

const FormTooltip = ({ children, tooltip }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      {tooltip && (
        <span
          className={clsx(
            "absolute max-w-[320px] w-full -top-2 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none sm:text-xs"
          )}
        >
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default FormTooltip;
