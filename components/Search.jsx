import Image from "next/image";
import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Logo from "../public/logo.svg";
import Link from "next/link";
import Wrapper from "./Wrapper";
import useFetch from "@/hooks/useFetch";

const Search = ({ setSearchModal }) => {
  const [query, setQuery] = useState("");
  const [hasContent, setHasContent] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

  return (
    <div className="search-modal h-[100%] w-full fixed top-0 left-0 bg-white z-20">
      <Wrapper>
        <div className="flex justify-between items-center py-6">
          <Link className="w-[95px] md:w-[110px]" href="/">
            <Image src={Logo} alt="" className="w-[95px] md:w-[110px]" />
          </Link>
          <FiX
            className="text-black text-[30px] cursor-pointer"
            onClick={() => setSearchModal(false)}
          />
        </div>
      </Wrapper>
      <div className="md:w-[900px] mx-auto mt-5 px-[10px]">
        <div className="relative flex items-center mt-5">
          <input
            className="outline-0 border-b px-10 md:py-5 py-2 rounded-none md:text-2xl text-xl text-gray-900 placeholder:text-gray-400 w-full text-center"
            type="text"
            placeholder="Search for Menus"
            value={query}
            onChange={onChange}
            autoComplete="off"
            autoFocus="on"
          />
          {hasContent ? (
            <FiX
              className="absolute text-gray-400 left-3 cursor-pointer md:text-[28px] text-[24px]"
              onClick={resetSearch}
            />
          ) : (
            <FiSearch className="absolute text-gray-400 left-3 md:text-[26px] text-[22px]" />
          )}
        </div>
        <div className="my-5">
          {showResults && (
            <div className=" bg-white w-full lg:min-h-fit min-h-[260px] px-1 py-1 z-[1] md:text-base text-sm font-medium">
              {data?.data?.length ? (
                data?.data?.map((item) => (
                  <div
                    className="w-full flex"
                    key={item.id}
                    onClick={resetSearch}
                  >
                    <Link
                      href={`/product/${item.attributes.slug}`}
                      className="w-full px-5 py-3 hover:bg-black/[0.03] rounded border-b"
                    >
                      <div className="flex items-center gap-4 w-full">
                        <Image
                          width={40}
                          height={40}
                          className="rounded"
                          src={item.attributes.image.data[0].attributes.url}
                        />
                        <div className="flex flex-col overflow-hidden">
                          <span className="md:text-xl text-base">
                            {item.attributes.name}
                          </span>
                          <span className="block text-ellipsis whitespace-nowrap overflow-hidden md:text-base text-sm text-gray-500">
                            {item.attributes.description}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="w-full h-[220px] items-center text-center flex justify-center md:text-xl text-base">
                  No search results found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;