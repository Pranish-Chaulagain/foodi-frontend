import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { updateCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ data }) => {
  const p = data.attributes;

  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };

  return (
    <div className="border-b py-5">
      <div className="flex items-center gap-3 md:gap-5">
        {/* IMAGE START */}
        <div className="shrink-0 overflow-hidden rounded-md">
          <Image
            width={120}
            height={120}
            src={p.thumbnail.data.attributes.url}
            alt={p.name}
          />
        </div>
        {/* IMAGE END */}

        <div className="w-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between">
            {/* PRODUCT TITLE */}
            <div className="text-lg md:text-xl font-semibold text-black/[0.8]">
              {p.name}
            </div>

            {/* PRODUCT SUBTITLE MOBILE */}
            <div className="text-sm md:text-base font-medium text-black/[0.5] block md:hidden">
              {p.subtitle}
            </div>

            {/* PRODUCT PRICE */}
            <div className="text-sm md:text-base font-bold text-black/[0.5] mt-2">
              MRP : NPr {p.price}
            </div>
          </div>
          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-base font-medium text-black/[0.5] hidden md:block">
            {p.subtitle}
          </div>

          <div className="md:flex hidden items-center justify-between mt-4">
            <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-base flex-wrap">
              <div className="flex items-center gap-1">
                <div className="font-semibold">Option:</div>
                <select
                  className="hover:text-black px-2 py-1 border rounded-md"
                  onChange={(e) => updateCartItem(e, "selectedSize")}
                >
                  {p.size.data.map((item, i) => {
                    return (
                      <option
                        key={i}
                        value={item.size}
                        disabled={!item.enabled ? true : false}
                        selected={data.selectedSize === item.size}
                      >
                        {item.size}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex items-center gap-1">
                <div className="font-semibold">Quantity:</div>
                <select
                  className="hover:text-black px-2 py-1 border rounded-md"
                  onChange={(e) => updateCartItem(e, "quantity")}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                    return (
                      <option selected={data.quantity === q} key={1} value={q}>
                        {q}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <RiDeleteBin6Line
              onClick={() => dispatch(removeFromCart({ id: data.id }))}
              className="cursor-pointer text-black/[0.5] hover:text-black text-xl"
            />
          </div>
        </div>
      </div>

      <div className="md:hidden flex items-center justify-between mt-4">
        <div className="flex items-center gap-4 md:gap-10 text-black/[0.5] text-sm md:text-base flex-wrap">
          <div className="flex items-center gap-1">
            <div className="font-semibold">Option:</div>
            <select
              className="hover:text-black px-2 py-1 border rounded-md"
              onChange={(e) => updateCartItem(e, "selectedSize")}
            >
              {p.size.data.map((item, i) => {
                return (
                  <option
                    key={i}
                    value={item.size}
                    disabled={!item.enabled ? true : false}
                    selected={data.selectedSize === item.size}
                  >
                    {item.size}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <div className="font-semibold">Quantity:</div>
            <select
              className="hover:text-black px-2 py-1 border rounded-md"
              onChange={(e) => updateCartItem(e, "quantity")}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                return (
                  <option selected={data.quantity === q} key={1} value={q}>
                    {q}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <RiDeleteBin6Line
          onClick={() => dispatch(removeFromCart({ id: data.id }))}
          className="cursor-pointer text-black/[0.5] hover:text-black text-xl"
        />
      </div>
    </div>
  );
};

export default CartItem;
