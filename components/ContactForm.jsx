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
        id="contact-form"
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-4 align-baseline"
      >
        <input
          name="fullName"
          className="md:text-base text-sm border-0 ring-1 ring-gray-300 focus:ring-[#00a34f] px-4 py-2 w-full rounded-md"
          placeholder="Name"
          autoComplete="off"
          type="text"
          required
        />
        <input
          name="email"
          className="md:text-base text-sm border-0 ring-1 ring-gray-300 focus:ring-[#00a34f] px-4 py-2 w-full rounded-md"
          placeholder="Email"
          autoComplete="off"
          type="email"
          required
        />
        <textarea
          name="message"
          className="md:text-base text-sm border-0 ring-1 ring-gray-300 focus:ring-[#00a34f] px-4 py-2 w-full rounded-md"
          placeholder="Message"
          autoComplete="off"
          rows={5}
          required
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[45px] rounded-md bg-[#00a34f] text-white md:text-base text-sm font-medium transition-transform 
                  active:scale-95 hover:opacity-75 flex items-center justify-center cursor-pointer"
        >
          {loading ? <img src="/spinner.svg" /> : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
