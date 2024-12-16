"use client";

import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import ArrowIcon from "../../_assets/arrow.svg";
import Link from "next/link";

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname]
  );

  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3 sm:px-6">
        <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              href={createPageURL(Math.max(currentPage - 1, 1))}
              scroll={false}
              className={clsx(
                "relative inline-flex items-center px-3.5 py-2 text-sm border-t-4 border-l-4 border-b-4 border-orange-brdr",
                currentPage === 1 &&
                  "text-gray-400 cursor-not-allowed opacity-50"
              )}
              aria-disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ArrowIcon style={{ transform: "rotate(180deg)" }} />
            </Link>
            {allPages.map((el) =>
              typeof el === "number" ? (
                <Link
                  key={el}
                  scroll={false}
                  href={createPageURL(el)}
                  className={clsx(
                    "relative inline-flex items-center px-3.5 py-2 text-sm font-semibold text-black border-4 border-orange-brdr",
                    currentPage === el && "bg-orange-brdr text-white"
                  )}
                >
                  {el}
                </Link>
              ) : (
                <span
                  key={el}
                  className="relative inline-flex items-center px-3.5 py-2 text-sm text-gray-500"
                >
                  {el}
                </span>
              )
            )}
            <Link
              href={createPageURL(Math.min(currentPage + 1, totalPages))}
              scroll={false}
              className={clsx(
                "relative inline-flex items-center px-3.5 py-2 border-t-4 border-r-4 border-b-4 border-orange-brdr",
                currentPage === totalPages &&
                  "text-gray-400 cursor-not-allowed opacity-50"
              )}
              aria-disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ArrowIcon />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
