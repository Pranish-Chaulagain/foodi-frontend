import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const [result, showResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_KEY,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          message();
          e.target.reset();
          setLoading(false);
          showResult(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const message = () => {
    toast.success("Your message has been sent!", {
      position: "top-right",
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
    <div className="pt-8">
      <ToastContainer bodyClassName="toastBody" />
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-4 align-baseline"
      >
        <div>
          <label
            htmlFor="full-name"
            className="block md:text-base text-sm font-medium leading-6"
          >
            Name
          </label>
          <input
            name="fullName"
            id="full-name"
            className="block w-full font-medium border-black focus:border-[#00a34f] border-b outline-none py-2 px-3 shadow-sm md:text-base text-sm sm:leading-6"
            autoComplete="off"
            type="text"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block md:text-base text-sm font-medium leading-6"
          >
            Email
          </label>
          <input
            name="email"
            id="email"
            className="block w-full font-medium border-black focus:border-[#00a34f] border-b outline-none py-2 px-3 shadow-sm md:text-base text-sm sm:leading-6"
            autoComplete="off"
            type="email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block md:text-base text-sm font-medium leading-6"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="block w-full font-medium border-black focus:border-[#00a34f] border-b outline-none py-2 px-3 shadow-sm md:text-base text-sm sm:leading-6"
            autoComplete="off"
            rows={5}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[54px] rounded-full bg-[#00a34f] text-white md:text-lg text-base font-medium transition-transform 
                  active:scale-95 hover:opacity-75 flex items-center justify-center"
        >
          {loading ? <img src="/spinner.svg" /> : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
