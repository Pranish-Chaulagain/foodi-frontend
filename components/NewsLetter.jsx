import { FiMail } from "react-icons/fi";
import Wrapper from "./Wrapper";

const NewsLetter = () => {
  return (
    <Wrapper>
      <div className="md:py-14 py-8 mb-5" id="newsletter">
        <div className="flex flex-col gap-5 items-center text-center justify-center md:px-4 md:max-w-[700px] mx-auto">
          <h1 className="md:text-3xl text-2xl font-semibold">
            Subscribe to our newsletter to get updates to our latest menus
          </h1>
          <p className="md:text-base text-sm">
            Get 20% off on your first order just by subscribing to our
            newsletter
          </p>
          <div className="flex items-center gap-2 relative">
            <input
              type="text"
              placeholder="Enter your email"
              className="pr-3 pl-9 py-2.5 rounded-md text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-[#00a34f] lg:w-80 w-full"
            />
            <div className="absolute left-3 text-gray-400">
              <FiMail />
            </div>
            <button
              className="rounded-md px-4 md:text-base text-sm text-white h-[40px] bg-[#00a34f] transition-transform 
                  active:scale-95 hover:opacity-75"
            >
              Subscribe
            </button>
          </div>
          <div>
            <p className="md:text-base text-sm">
              You will be able to unsubscribe any time
            </p>
            <p className="md:text-base text-sm">
              Read our privacy policy
              <span className="font-semibold underline cursor-pointer ml-1">
                here
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewsLetter;
