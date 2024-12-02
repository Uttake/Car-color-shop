"use client";
import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import catalogData from "@/app/_data/catalog-data.json";
import DropdownMenu from "./CategoryList/CategoryList";
import { getSearchItems } from "@/app/utils/actions";

const Search = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [filteredTitles, setFilteredTitles] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const searchRef: React.RefObject<HTMLInputElement> = useRef(null);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (searchRef.current?.value) {
      params.set("query", searchRef.current.value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const searchItems = async () => {
    const item = await getSearchItems(searchRef.current?.value || "");
    if (item) {
      let filteredItems = item?.map((el) => el.title);
      setItems(filteredItems);
    }
  };

  const handleSuggestionClick = (title: string) => {
    if (searchRef.current) {
      searchRef.current.value = title;
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    if (query) {
      const filtered = items.filter((title) =>
        title.toLowerCase().includes(query)
      );
      setFilteredTitles(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredTitles([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    searchItems();
  }, []);

  return (
    <form
      className="w-full mx-auto mb-5 relative"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Your Email
        </label>
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className={clsx(
            "flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-black border border-gray-300 rounded-s-lg hover:bg-orange-brdr focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 transition duration-300",
            { "bg-orange-brdr": categoryOpen, "bg-black": !categoryOpen }
          )}
          type="button"
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          Все категории{" "}
          <svg
            className={clsx("w-2.5 h-2.5 ms-2.5 transition", {
              "-rotate-180": categoryOpen,
              "rotate-0": !categoryOpen,
            })}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          className={clsx(
            "z-10 bg-white divide-y absolute top-12 divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 transition ease-in-out",
            {
              "opacity-100 scale-100": categoryOpen,
              "scale-0 opacity-0": !categoryOpen,
            }
          )}
        >
          <DropdownMenu categoryOpen={categoryOpen} data={catalogData} />
        </div>
        <div className="relative w-full">
          <input
            ref={searchRef}
            name="search"
            type="search"
            id="search-dropdown"
            defaultValue={searchParams.get("query")?.toString()}
            onChange={(e) => handleInputChange(e)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos, Design Templates..."
            autoComplete="off"
          />
          <button
            onClick={(e) => handleSearch(e)}
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-orange-brdr rounded-e-lg border border-orange-brdr hover:bg-orange-900 focus:ring-4 focus:outline-none focus:ring-orange-900  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>

          {showSuggestions && filteredTitles.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
              {filteredTitles.map((title, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(title)}
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
};

export default Search;
