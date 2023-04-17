import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const error = () => {
  return (
    <div className="h-[calc(100vh_-_116px)] flex">
      <Wrapper>
        <div className="mt-[25vh] max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <div className="md:text-6xl text-3xl font-bold">404</div>
          <div className="md:text-lg text-base font-bold mt-2">
            Oops, Page not found
          </div>
          <div className="md:text-base text-sm font-medium mt-2">
            The page you are looking for may have been moved, deleted or
            possibly never existed
          </div>

          <Link href="/" className="font-bold mt-5 md:text-base text-sm">
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default error;
