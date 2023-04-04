import React, { useState, useRef, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { FiSearch, FiX } from "react-icons/fi";
import Link from "next/link";

const SearchBar = ({ setMobileMenu }) => {
  const [query, setQuery] = useState("");
  const [hasContent, setHasContent] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const onChange = (e) => {
    setQuery(e.target.value);
    setHasContent(e.target.value.length > 0);
    setShowResults(e.target.value.length > 0);
  };

  const resetSearch = () => {
    setQuery("");
    setHasContent(false);
    setShowResults(false);
  };

  let { data } = useFetch(
    `/api/products?populate=*&filters[name][$containsi]=${query}`
  );

  if (!query.length) {
    data = null;
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resultsRef]);

  return (
    <>
      <div className="relative flex items-center">
        <input
          id="search-bar"
          className="lg:rounded-md rounded-none text-sm text-gray-900 lg:ring-1 lg:ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-[#00a34f] lg:w-80 w-full"
          type="text"
          placeholder="Search"
          value={query}
          onChange={onChange}
          autoComplete="off"
        />
        {hasContent ? (
          <FiX
            id="search-icon"
            className="absolute text-gray-400 lg:left-3 cursor-pointer"
            onClick={resetSearch}
          />
        ) : (
          <FiSearch
            id="search-icon"
            className="absolute text-gray-400 lg:left-3"
          />
        )}
        {showResults && (
          <div
            id="search-results"
            ref={resultsRef}
            className="absolute bg-white w-full lg:top-[40px] top-[52px] lg:rounded-md border-b border-t lg:border border-0 lg:shadow-md lg:min-h-fit min-h-[260px] px-1 py-1 z-[1] md:text-base text-sm font-medium"
          >
            {data?.data?.length ? (
              data?.data?.map((item) => (
                <div
                  className="w-full flex"
                  key={item.id}
                  onClick={resetSearch}
                >
                  <Link
                    href={`/product/${item.attributes.slug}`}
                    className="w-full px-3 py-2 hover:bg-black/[0.03] rounded lg:block hidden"
                  >
                    {item.attributes.name}
                  </Link>

                  <Link
                    href={`/product/${item.attributes.slug}`}
                    className="w-full px-3 py-2 hover:bg-black/[0.03] rounded lg:hidden block"
                    onClick={() => setMobileMenu(false)}
                  >
                    {item.attributes.name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="w-full h-[220px] items-center text-center flex justify-center">
                No search results found
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
