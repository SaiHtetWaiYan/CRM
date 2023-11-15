import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
export function Search({ query, setQuery }) {
  return (
    <div className="w-full md:w-72">
      <Input
        label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
      />
    </div>
  );
}

export default Search;
