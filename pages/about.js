import NewsLetter from "@/components/NewsLetter";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";

const about = () => {
  return (
    <>
      <div className="w-full md:py-20">
        <Wrapper>
          <div className="flex items-center gap-2 md:text-base text-sm md:mt-0 mt-3 mb-10 cursor-default">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            /<span>About</span>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
            <div className="py-20">
              <h1 className="md:text-4xl text-3xl font-semibold mb-4">
                About Us
              </h1>
              <p className="text-sm md:text-base mb-3">
                Welcome to our innovative food ordering system! We are a team of
                food enthusiasts who believe that technology can revolutionize
                the way we order and enjoy food. Our mission is to make the
                process of ordering food as simple and convenient as possible,
                while also providing a seamless and personalized experience for
                each and every one of our customers.
              </p>
              <p className="text-sm md:text-base mb-3">
                We are passionate about working with local restaurants and food
                vendors to bring you a wide range of delicious and unique
                options, all available at your fingertips. Whether you're
                craving a classic burger and fries or something a bit more
                exotic, our platform has something for everyone. So why wait in
                line or settle for mediocre food? With our food ordering system,
                you can sit back, relax, and let us bring the restaurant
                experience to you.
              </p>
              <ul className="list-disc pl-5 text-sm md:text-base">
                <li>
                  We're a team of food enthusiasts who believe in the power of
                  technology to enhance the dining experience.
                </li>
                <li>
                  Our mission is to provide a simple, convenient, and
                  personalized food ordering experience for our customers.
                </li>
                <li>
                  Our user-friendly platform includes features like order
                  tracking, payment options, and personalized recommendations.
                </li>
                <li>
                  Our goal is to revolutionize the way people order food and
                  create a better dining experience for everyone.
                </li>
              </ul>
              <div className="flex gap-10 mt-5">
                <div>
                  <h1 className="md:text-3xl text-2xl font-semibold">250</h1>
                  <span className="md:text-base text-sm">
                    <strong>Daily</strong> Customers
                  </span>
                </div>

                <div>
                  <h1 className="md:text-3xl text-2xl font-semibold">250</h1>
                  <span className="md:text-base text-sm">
                    <strong>Happy</strong> Customers
                  </span>
                </div>

                <div>
                  <h1 className="md:text-3xl text-2xl font-semibold">250</h1>
                  <span className="md:text-base text-sm">
                    <strong>Daily</strong> Orders
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-5">
              <div className="grid grid-cols-1 gap-5 md:pt-10">
                <Image
                  src="/a1.jpg"
                  className="h-[320px] w-[280px] object-cover rounded-md"
                  width={300}
                  height={300}
                  alt="..."
                />
                <Image
                  src="/a2.jpg"
                  className="h-[320px] w-[280px] object-cover rounded-md"
                  width={300}
                  height={300}
                  alt="..."
                />
              </div>
              <div className="grid grid-cols-1 gap-5">
                <Image
                  src="/a3.jpg"
                  className="h-[320px] w-[280px] object-cover rounded-md"
                  width={300}
                  height={300}
                  alt="..."
                />
                <Image
                  src="/a4.jpg"
                  className="h-[320px] w-[280px] object-cover rounded-md"
                  width={300}
                  height={300}
                  alt="..."
                />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <NewsLetter />
    </>
  );
};

export default about;
