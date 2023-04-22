import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { auth } from "@/firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Link from "next/link";

const provider = new GoogleAuthProvider();

const login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { authUser, isLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);

  const loginHandler = async () => {
    if (!email || !password) return;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.error("an error has occurred", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (error) {
      console.error("an error occurred", error);
    }
  };

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <div className="flex min-h-[100vh] flex-1 flex-col md:pt-[160px] pt-[100px] px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/">
          <img
            className="mx-auto h-8 w-auto"
            src="/logo.svg"
            alt="Your Company"
          />
        </Link>

        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
          Login
        </h2>
        <h2 className="text-center md:text-base text-sm font-medium">
          Get access to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <button
          className="w-full py-3 rounded-full bg-black/[0.05] hover:bg-black hover:text-white  md:text-base text-sm font-medium transition-transform 
                  active:scale-95 flex items-center justify-center gap-2 mb-6"
          onClick={signInWithGoogle}
        >
          <span className="md:text-[22px] text-lg">
            <FcGoogle />
          </span>
          <span>Login with Google</span>
        </button>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="email"
              className="block md:text-base text-sm font-medium leading-6"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full font-medium placeholder:text-gray-400 placeholder:font-normal border-black focus:border-[#00a34f] border-b outline-none py-2 px-3 shadow-sm md:text-base text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block md:text-base text-sm font-medium leading-6"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full font-medium placeholder:text-gray-400 placeholder:font-normal border-black focus:border-[#00a34f] border-b outline-none py-2 px-3 shadow-sm md:text-base text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              className="h-[14px] w-[14px] rounded border-gray-300 cursor-pointer"
              type="checkbox"
              name=""
              id="remember"
            />
            <label
              htmlFor="remember"
              className="block md:text-base text-sm font-medium leading-6 cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#00a34f] text-white md:text-base text-sm font-medium transition-transform 
                  active:scale-95 hover:opacity-75 text-center"
              onClick={loginHandler}
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-5 text-center font-medium  md:text-base text-sm">
          Don't have an account?
          <Link
            href="/register"
            className="ml-1 leading-6 text-[#00a34f] hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default login;
