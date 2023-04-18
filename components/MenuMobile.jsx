import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import Logo from "../public/logo.svg";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
}) => {
  const mobileMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]);

  return (
    <div
      ref={mobileMenuRef}
      className="mobile-menu lg:hidden fixed top-0 left-0 sm:w-[500px] w-full h-[100vh] bg-white font-bold text-black shadow-none sm:shadow-2xl z-20"
    >
      <div className="flex items-center justify-between px-5 w-full h-[60px] md:h-[70px] my-1 border-b">
        <Link className="w-[95px] md:w-[110px]" href="/">
          <Image src={Logo} alt="" className="w-[95px] md:w-[110px]" />
        </Link>
        <div onClick={() => setMobileMenu(false)}>
          <FiX className="md:text-[30px] text-[26px]" />
        </div>
      </div>

      <ul className="flex flex-col ">
        {data.map((item) => {
          return (
            <React.Fragment key={item.id}>
              {!!item?.subMenu ? (
                <li
                  className="cursor-pointer py-4 text-sm px-5 border-b flex flex-col relative"
                  onClick={() => setShowCatMenu(!showCatMenu)}
                >
                  <div className="flex justify-between items-center">
                    {item.name}
                    <BsChevronDown size={14} />
                  </div>

                  {showCatMenu && (
                    <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                      {categories?.map(({ attributes: c, id }) => {
                        return (
                          <Link
                            key={id}
                            href={`/category/${c.slug}`}
                            onClick={() => {
                              setShowCatMenu(false);
                              setMobileMenu(false);
                            }}
                          >
                            <li className="py-4 px-8 border-t flex justify-between">
                              {c.name}
                              <span className="opacity-50 text-xs ">{`(${c.products.data.length})`}</span>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ) : (
                <li className="py-4 text-sm px-5 border-b">
                  <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                    {item.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuMobile;
