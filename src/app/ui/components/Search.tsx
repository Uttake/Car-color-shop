"use client";
import React, { useRef, useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getSearchItems } from "@/app/utils/data";
import clsx from "clsx";

const Search = ({ main }: { main?: boolean }) => {
  const [filteredTitles, setFilteredTitles] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const searchRef: React.RefObject<HTMLInputElement> = useRef(null);
  const pathname = usePathname();
  const { replace } = useRouter();
  const { push } = useRouter();

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
    const slug = pathname.split("/")[2];
    const item = await getSearchItems(
      searchRef.current?.value || "",
      slug || ""
    );
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
      className={clsx(
        { "mb-0 max-w-[1152px] mx-auto absolute top-5 left-0 right-0": main },
        { "w-full mx-auto mb-5 relative": !main }
      )}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        ></label>

        <div className="relative w-full">
          <input
            ref={searchRef}
            name="search"
            type="text"
            id="search-dropdown"
            defaultValue={searchParams.get("query")?.toString()}
            onChange={(e) => handleInputChange(e)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className={clsx(
              {
                "block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500":
                  !main,
              },
              {
                "block p-2.5 w-full z-20 rounded-sm text-sm text-black bg-alphablack border placeholder:text-gray-500 border-black focus:ring-white focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ":
                  main,
              }
            )}
            placeholder="Поиск по каталогу"
            autoComplete="off"
          />
          <button
            aria-label="Search"
            onClick={(e) => {
              if (main) {
                push(`catalog/?page=1&query=${searchRef.current?.value}`);
                return;
              }
              handleSearch(e);
            }}
            className={clsx(
              {
                "absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-orange-brdr rounded-e-lg border border-orange-brdr hover:bg-orange-900 focus:ring-4 focus:outline-none focus:ring-orange-900  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300":
                  !main,
              },
              {
                "absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white":
                  main,
              }
            )}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="transparent"
            >
              <path
                stroke={main ? "black" : "white"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            {/* <span className="sr-only">Search</span> */}
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
