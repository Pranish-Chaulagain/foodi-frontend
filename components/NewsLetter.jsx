import { FiMail } from "react-icons/fi";
import Wrapper from "./Wrapper";

const NewsLetter = () => {
  return (
    <Wrapper>
      <div className="md:py-14 py-8 mb-5">
        <div className="flex flex-col gap-5 items-center text-center justify-center md:px-4 md:max-w-[700px] mx-auto">
          <h1 className="md:text-3xl text-2xl font-semibold">
            Subscribe to our newsletter to get updates to our latest menus
          </h1>
          <p className="md:text-base text-sm">
            Get 20% off on your first order just by subscribing to our
            newsletter
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full md:w-80 font-medium placeholder:text-gray-500 placeholder:font-normal border-black focus:border-[#00a34f] border-b outline-none py-2 px-3 shadow-sm md:text-base text-sm sm:leading-6"
            />
            <button
              className="md:px-8 px-6 py-3 rounded-full bg-[#00a34f] text-white md:text-base text-sm font-medium transition-transform 
                  active:scale-95 hover:opacity-75 text-center"
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
