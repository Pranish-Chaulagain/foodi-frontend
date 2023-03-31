import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const Failed = () => {
  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <div className="md:text-2xl text-xl font-bold">Payment failed!</div>
          <div className="md:text-base text-sm mt-5">
            For any product related query, drop an email to
          </div>
          <div className="underline md:text-base text-sm">
            foodi123@gmail.com
          </div>

          <Link href="/" className="font-bold mt-5 md:text-base text-sm">
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Failed;
