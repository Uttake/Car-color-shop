"use client";
import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

export interface Category {
  title: string;
  category?: string;
  link?: string;
  subcategories?: Category[];
}

interface DropdownProps extends UseControllerProps {
  options: Category[];
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  ...controllerProps
}) => {
  const { field } = useController(controllerProps);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMainCategorySelect = (category: string | null) => {
    field.onChange(category);
    setIsDropdownOpen(false);
    setOpenCategory(null);
  };

  const handleToggleSubcategories = (category: string | null) => {
    setOpenCategory(category === openCategory ? null : category);
  };

  return (
    <div className="w-full max-w-sm mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-left shadow-sm focus:outline-none hover:bg-gray-50"
          onClick={toggleDropdown}
        >
          {field.value || "Выберите категорию"}
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-sm">
            {options.map((item) => (
              <div key={item.title} className="relative">
                <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                  <button
                    type="button"
                    className="flex-grow text-left focus:outline-none"
                    onClick={() =>
                      handleMainCategorySelect(item.category || item.title)
                    }
                  >
                    {item.title}
                  </button>
                  {item.subcategories && (
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none hover:text-gray-700"
                      onClick={() =>
                        handleToggleSubcategories(item.category || null)
                      }
                    >
                      {openCategory === item.category ? "▲" : "▼"}
                    </button>
                  )}
                </div>

                {item.subcategories && openCategory === item.category && (
                  <div className="ml-4 border-l border-gray-200">
                    {item.subcategories.map((sub) => (
                      <button
                        key={sub.title}
                        type="button"
                        className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                        onClick={() => {
                          field.onChange(
                            (item.category &&
                              item.category + "," + sub.category) ||
                              sub.title
                          );
                          setIsDropdownOpen(false);
                        }}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
