import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import { SlPaypal } from "react-icons/sl";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const p = product?.data?.[0]?.attributes;

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer bodyClassName="toastBody" />
      <Wrapper>
        <div className="flex items-center gap-2 md:text-base text-sm md:mt-0 mt-3 mb-10 cursor-default">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          /
          <Link
            className="hover:underline"
            href={`/category/${p.categories?.data?.[0].attributes?.slug}`}
          >
            {p.categories?.data?.[0].attributes?.name}
          </Link>
          /<span>{p.name}</span>
        </div>
        <div className="flex flex-col lg:flex-row md:px-5 gap-5 md:gap-[50px] lg:gap-[100px]">
          {/* ---------------------------------------------- LEFT COLUMN START ---------------------------------------------- */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p.image.data} />
          </div>
          {/* ----------------------- LEFT COLUMN END ----------------------- */}

          {/* ---------------------------------------------- RIGHT COLUMN START ---------------------------------------------- */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="md:text-3xl text-2xl font-semibold mb-2">
              {p.name}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="md:text-lg text-base font-semibold mb-5">
              {p.subtitle}
            </div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 md:text-lg text-base font-semibold">
                MRP: NPr {p.price}
              </p>
              {p.orignal_price && (
                <>
                  <p className="md:text-base text-sm font-medium line-through">
                    NPr {p.orignal_price}
                  </p>
                  <p className="ml-auto md:text-base text-sm font-medium text-[#00a34f]">
                    {getDiscountedPricePercentage(p.orignal_price, p.price)}%
                    off
                  </p>
                </>
              )}
            </div>
            <div className="md:text-base text-sm font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="md:text-base text-sm font-medium text-black/[0.5] mb-10 md:mb-20">
              {"(Also includes all applicable duties)"}
            </div>

            {/* PRODUCT SIZE RANGE START */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                {/* Heading start */}
                <div className="md:text-base text-sm font-semibold">
                  Select Option
                </div>
                {/* HEADING END */}
              </div>

              {/* SIZE START */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {p.size.data.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3  md:text-base text-sm font-medium ${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>
              {/* SIZE END */}

              {/* SHOW ERROR START */}
              {showError && (
                <div className="text-red-600 font-medium md:text-base text-sm mt-1">
                  Selection is required
                </div>
              )}
              {/* SHOW ERROR END */}
            </div>
            {/* PRODUCT SIZE RANGE END */}

            <div className="flex items-center justify-between gap-2 mb-10">
              {/* ADD TO CART BUTTON START */}
              <button
                className="w-full h-[54px] rounded-md bg-[#00a34f] text-white md:text-lg text-base font-medium transition-transform 
                active:scale-95 hover:opacity-75"
                onClick={() => {
                  if (!selectedSize) {
                    setShowError(true);
                    document.getElementById("sizesGrid").scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    });
                  } else {
                    dispatch(
                      addToCart({
                        ...product?.data?.[0],
                        selectedSize,
                        oneQuantityPrice: p.price,
                      })
                    );
                    notify();
                  }
                }}
              >
                Add to Cart
              </button>
              {/* ADD TO CART BUTTON END */}

              {/* WISHLIST BUTTON START */}
              <button
                className="w-full h-[54px] rounded-md border border-black md:text-lg text-base font-medium transition-transform 
                active:scale-95 flex items-center justify-center gap-2 hover:opacity-75"
              >
                Order Now
                <SlPaypal size={20} />
              </button>
              {/* WISHLIST BUTTON END */}
            </div>

            <div>
              <div className="md:text-2xl text-xl font-bold mb-5">
                Product Details
              </div>

              <div className="markdown md:text-base text-sm mb-5">
                <ReactMarkdown>{p.description}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* ----------------------- RIGHT COLUMN END ----------------------- */}
        </div>
        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");

  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: {
      product,
      products,
    },
  };
}
