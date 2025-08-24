import React from "react";
import { Search } from "lucide-react";
const SearchBar = () => {
  return (
    <div className="rounded-full w-full flex items-center justify-between gap-5 bg-amber-100 p-1 pr-5 opacity-75 shadow-2xl">
      <input
        type="text"
        name="search"
        className="w-full outline-none p-1 rounded-full pl-2"
      />
      <button>
        <Search size={"20px"} className="cursor-pointer" />
      </button>
    </div>
  );
};

export default SearchBar;
