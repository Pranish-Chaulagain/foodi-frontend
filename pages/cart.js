import React, { useMemo, useState } from "react";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/api";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItems]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("/api/orders", {
        products: cartItems,
      });
      await stripe.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {cartItems.length > 0 && (
        <div className="w-full md:py-20">
          <Wrapper>
            <>
              <div className="flex items-center gap-2 md:text-base text-sm md:mt-0 mt-3 mb-10 cursor-default">
                <Link className="hover:underline" href="/">
                  Home
                </Link>
                /<span>Cart</span>
              </div>
              {/* HEADING AND PARAGRAPH START */}
              <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-2xl md:text-3xl mb-5 font-semibold leading-tight">
                  Shopping Cart
                </div>
              </div>
              {/* HEADING AND PARAGRAPH END */}

              {/* CART CONTENT START */}
              <div className="flex flex-col lg:flex-row gap-12 md:py-10 py-5">
                {/* CART ITEMS START */}
                <div className="flex-[2]">
                  <div className="md:text-lg text-base font-bold">
                    Cart Items
                  </div>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </div>
                {/* CART ITEMS END */}

                {/* SUMMARY START */}
                <div className="flex-[1]">
                  <div className="md:text-lg text-base font-bold">Summary</div>

                  <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                    <div className="flex justify-between">
                      <div className="uppercase md:text-lg text-base font-medium text-black">
                        Subtotal
                      </div>
                      <div className="md:text-lg text-base font-medium text-black">
                        NPr {subTotal}
                      </div>
                    </div>
                    <div className="text-sm py-5 border-t mt-5">
                      The subtotal reflects the total price of your order,
                      including duties and taxes, before any applicable
                      discounts. It does not include delivery costs and
                      international transaction fees.
                    </div>
                  </div>

                  {/* BUTTON START */}
                  <button
                    className="w-full h-[54px] rounded-md bg-[#00a34f] text-white md:text-lg text-base font-medium transition-transform 
                  active:scale-95 hover:opacity-75 flex items-center justify-center gap-2"
                    onClick={handlePayment}
                  >
                    {loading ? <img src="/spinner.svg" /> : "Checkout"}
                  </button>
                  {/* BUTTON END */}
                </div>
                {/* SUMMARY END */}
              </div>
              {/* CART CONTENT END */}
            </>
          </Wrapper>
        </div>
      )}

      {cartItems.length < 1 && (
        <div className="flex flex-col items-center h-[calc(100vh_-_116px)]">
          <Image
            src="/empty-cart.jpg"
            alt=""
            width={300}
            height={300}
            className="w-[300px] md:w-[400px] mt-[10vh]"
          />
          <span className="text-xl font-bold">Your cart is empty</span>
          <span className="text-center mt-4">
            Looks like you have not added anything in your cart.
            <br />
            Go ahead and explore top categories.
          </span>
          <Link
            href="/"
            className="mt-8 px-10 h-[54px] rounded-md bg-[#00a34f] text-white md:text-lg text-base font-medium transition-transform 
                  active:scale-95 hover:opacity-75 flex items-center justify-center"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
