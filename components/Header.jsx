import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.svg";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };

  return (
    <header
      className={`w-full h-[70px] md:h-[80px] my-2 lg:px-3 bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="w-full h-[60px] flex justify-between items-center">
        <div className="flex gap-3 items-center">
          {/* ---------------------------------------------- Mobile menu icon start ---------------------------------------------- */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full lg:hidden flex justify-center items-center md:hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[24px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <HiOutlineMenuAlt3
                className="text-[26px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* ----------------------- Mobile menu icon ----------------------- */}
          <Link href="/">
            <Image src={Logo} alt="" className="w-[95px] md:w-[110px] mr-20" />
          </Link>
        </div>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          {/* ---------------------------------------------- Heart icon start ---------------------------------------------- */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center md:hover:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[24px]" />
            <div
              className="h-[16px] md:h-[18px] min-w-[16px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7
             text-white text-[10px] md:text[12px] flex justify-center items-center px-[3px] md:px-[5px]"
            >
              53
            </div>
          </div>
          {/* ----------------------- Heart icon end ----------------------- */}

          {/* ---------------------------------------------- Cart icon start ---------------------------------------------- */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center  md:hover:bg-black/[0.05] cursor-pointer relative">
              <BsBag className="text-[21px]" />
              {totalQuantity > 0 && (
                <span
                  className="h-[16px] md:h-[18px] min-w-[16px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7
                  text-white text-[10px] md:text[12px] flex justify-center items-center"
                >
                  {totalQuantity}
                </span>
              )}
            </div>
          </Link>

          {/* ----------------------- Cart icon end ----------------------- */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
