import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Search from "./Search";

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.svg";
import { FiShoppingBag, FiSearch, FiUser } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);
  const [searchModal, setSearchModal] = useState(false);

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

  const authenticated = false;

  return (
    <>
      <header
        className={`w-full h-[70px] md:h-[80px] my-1 lg:px-3 bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
      >
        <Wrapper className="w-full h-[60px] flex justify-between items-center">
          <div className="flex gap-5 items-center lg:w-[136px] w-full">
            {/* ---------------------------------------------- Mobile menu icon start ---------------------------------------------- */}
            <div className="lg:hidden flex justify-center items-center cursor-pointer -mr-2">
              <HiOutlineMenuAlt3
                className="text-[26px]"
                onClick={() => setMobileMenu(true)}
              />
            </div>
            {/* ----------------------- Mobile menu icon ----------------------- */}
            <Link className="w-[95px] md:w-[110px]" href="/">
              <Image src={Logo} alt="" className="w-[95px] md:w-[110px]" />
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

          <div className="flex items-center justify-end md:gap-7 gap-6 text-black flex-shrink-0">
            {/* ---------------------------------------------- Search icon start ---------------------------------------------- */}
            <div
              className="cursor-pointer"
              onClick={() => setSearchModal(true)}
            >
              <FiSearch className="md:text-[24px] text-[23px]" />
            </div>
            {/* ----------------------- Search icon end ----------------------- */}

            {/* ---------------------------------------------- Cart icon start ---------------------------------------------- */}
            <Link href="/cart" className="cursor-pointer relative">
              <FiShoppingBag className="md:text-[24px] text-[23px]" />
              {totalQuantity > 0 && (
                <span
                  className="h-[16px] md:h-[18px] min-w-[16px] md:min-w-[18px] rounded-full bg-red-600 absolute -top-1 md:-top-2 left-3
                  text-white text-[10px] md:text-[12px] flex justify-center items-center px-[4px] md:px-[5px]"
                >
                  {totalQuantity}
                </span>
              )}
            </Link>
            {/* ----------------------- Cart icon end ----------------------- */}

            {authenticated ? (
              <div className="cursor-pointer">
                <div className="w-8 md:w-[32px] h-8 md:h-[32px] object-cover rounded-full flex justify-center items-center overflow-hidden">
                  <img src="/a1.jpg" alt="" />
                </div>
              </div>
            ) : (
              <div className="cursor-pointer">
                <FiUser className="text-[24px]" />
              </div>
            )}
          </div>
        </Wrapper>
      </header>
      {searchModal && <Search setSearchModal={setSearchModal} />}
    </>
  );
};

export default Header;
