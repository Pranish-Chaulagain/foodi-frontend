import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import Wrapper from "./Wrapper";

const HeroBanner = () => {
  return (
    <Wrapper>
      <div className="relative rounded-lg overflow-hidden">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={6000}
          renderArrowPrev={(clickHandler, hasPrev) => (
            <div
              onClick={clickHandler}
              className="absolute right-[55px] md:right-[70px] top-3 w-[40px] md:w-[50px] h-[40px] md:h-[50px] bg-white z-10 flex items-center justify-center cursor-pointer hover:opacity-90 rounded-md"
            >
              <BiArrowBack className="text-sm md:text-lg" />
            </div>
          )}
          renderArrowNext={(clickHandler, hasNext) => (
            <div
              onClick={clickHandler}
              className="absolute right-3 top-3 w-[40px] md:w-[50px] h-[40px] md:h-[50px] bg-white z-10 flex items-center justify-center cursor-pointer hover:opacity-90 rounded-md"
            >
              <BiArrowBack className="rotate-180 text-sm md:text-lg" />
            </div>
          )}
        >
          <div
            id="banner1"
            className="relative flex items-center justify-center"
          >
            <div className="absolute flex flex-col items-center gap-4 px-3 lg:px-52">
              <h1 className="text-white lg:text-6xl md:text-5xl text-4xl font-semibold">
                We serve you with Hot, Fresh & Tasty.
              </h1>
              <p className="text-white md:text-base text-sm font-medium">
                We understand that the quality of your meal is just as important
                as its flavor, which is why we prioritize freshness and quality
                in every order.
              </p>
              <button
                className="px-5 h-[54px] rounded-md bg-white text-black md:text-lg text-base font-semibold transition-transform 
                  active:scale-95 hover:opacity-75 flex items-center justify-center gap-2"
              >
                Order now
                <BiArrowBack className="rotate-180 text-sm md:text-lg" />
              </button>
            </div>
          </div>

          <div
            id="banner2"
            className="relative flex items-center justify-center"
          >
            <div className="absolute flex flex-col items-center gap-4 px-3 lg:px-52">
              <h1 className="text-white lg:text-6xl md:text-5xl text-4xl font-semibold">
                Experience the taste like nothing before.
              </h1>
              <p className="text-white md:text-base text-sm font-medium">
                Whether you're in the mood for something spicy, sweet, or
                savory, our menu has something to satisfy every craving.
              </p>
              <button
                className="px-5 h-[54px] rounded-md bg-white text-black md:text-lg text-base font-semibold transition-transform 
                  active:scale-95 hover:opacity-75 flex items-center justify-center gap-2"
              >
                Order now
                <BiArrowBack className="rotate-180 text-sm md:text-lg" />
              </button>
            </div>
          </div>

          <div
            id="banner3"
            className="relative flex items-center justify-center"
          >
            <div className="absolute flex flex-col items-center gap-4 px-3 lg:px-52">
              <h1 className="text-white lg:text-6xl md:text-5xl text-4xl font-semibold">
                Delicious food, delivered to your doorstep!
              </h1>
              <p className="text-white md:text-base text-sm font-medium">
                Our food is prepared fresh and delivered straight to you, so you
                can enjoy a restaurant-quality meal without ever leaving your
                house.
              </p>
              <button
                className="px-5 h-[54px] rounded-md bg-white text-black md:text-lg text-base font-semibold transition-transform 
                  active:scale-95 hover:opacity-75 flex items-center justify-center gap-2"
              >
                Order now
                <BiArrowBack className="rotate-180 text-sm md:text-lg" />
              </button>
            </div>
          </div>
        </Carousel>
      </div>
    </Wrapper>
  );
};

export default HeroBanner;
