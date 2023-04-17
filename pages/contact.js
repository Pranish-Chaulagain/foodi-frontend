import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import NewsLetter from "@/components/NewsLetter";

function contact() {
  return (
    <>
      <div className="w-full md:pt-20 md:pb-5">
        <Wrapper>
          <div className="flex items-center gap-2 md:text-base text-sm md:mt-0 mt-3 mb-10 cursor-default">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            /<span>Contact</span>
          </div>
          <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
            <div className="text-2xl md:text-3xl mb-5 font-semibold leading-tight">
              Contact Us
            </div>
          </div>
          <div className="pt-10 pb-5">
            <iframe
              className="w-full h-80 border rounded-md"
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.5483200393414!2d87.27001779211922!3d26.662940623779374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6da4ff651adf%3A0xb318fbb46292c76b!2sItahari%20Chowk!5e0!3m2!1sen!2snp!4v1677086015960!5m2!1sen!2snp"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 pt-16">
              <div>
                <h3 className="md:text-2xl text-xl font-semibold">
                  Stay Connected
                </h3>
                <p className="md:text-base text-sm">
                  We're here to help! If you have any questions, comments, or
                  concerns about our food ordering system, please don't hesitate
                  to reach out to us.
                </p>
                <div className="flex flex-col gap-3 py-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-200 flex-shrink-0 text-2xl text-green-500 p-2 ">
                      <FiPhone />
                    </div>
                    <span className="text-blue-600 md:text-base text-sm cursor-pointer hover:underline">
                      +(977) 6660006660
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-200 flex-shrink-0 text-2xl text-green-500 p-2 ">
                      <MdOutlineMail />
                    </div>
                    <span className="text-blue-600 md:text-base text-sm cursor-pointer hover:underline">
                      foodi123@email.com
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-200 flex-shrink-0 text-2xl text-green-500 p-2 ee">
                      <MdOutlineLocationOn />
                    </div>
                    <span className="text-blue-600 md:text-base text-sm cursor-pointer hover:underline">
                      56705 Itahari, Sunsari Nepal.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[#5d82d1] cursor-pointer">
                    <FaFacebook size={28} />
                  </div>
                  <div className="text-[#40bff5] cursor-pointer">
                    <FaTwitter size={26} />
                  </div>
                  <div className="text-[#238cc8] cursor-pointer">
                    <FaLinkedinIn size={26} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="md:text-2xl text-xl font-semibold">
                  Get In Touch With Us
                </h3>
                <p className="md:text-base text-sm">
                  We value your feedback and are committed to providing you with
                  the best possible experience.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}

export default contact;
