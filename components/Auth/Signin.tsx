"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useAuthorization } from "@/components/Services/useAuthorization"
import { getCurrentUser, login } from "../Services/authService";
import { useRouter } from "next/navigation";

type LoginFormState = {
  email: string;
  password: string;
};

const Signin = () => {
  const router = useRouter();

  const { authorizeUser } = useAuthorization({ router });
  const memoizedAuthorizeUser = useCallback(authorizeUser, []);


useEffect(() => {
  memoizedAuthorizeUser();
}, [memoizedAuthorizeUser]);

  useEffect(() => {
    memoizedAuthorizeUser();
  }, [memoizedAuthorizeUser]);

  ///////////////////////////////////
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginForm({ ...loginForm, email: e.target.value });
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginForm({ ...loginForm, password: e.target.value });
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleLogin = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      await login(loginForm);
      authorizeUser();
      getCurrentUser();
      router.push('/dashbord');
    } catch (error) {
      console.error("Signin failed. An error occurred.", error);
    }
  };





  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Login to Your Account
            </h2>
            
            

            <form onSubmit={handleLogin}>
              <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleEmailChange}
                  className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginForm.password}
                  onChange={handlePasswordChange}
                  className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                />
              </div>

              <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
                <div className="flex flex-wrap gap-4 md:gap-10">
                  

                  <a href="#" className="hover:text-primary">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  //onClick={handleLogin}
                  aria-label="login with email and password"
                  className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                >
                  Log in
                  <svg
                    className="fill-white"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
                <p>
                  Don't have an account?{" "}
                  <Link
                    className="text-black hover:text-primary dark:text-white hover:dark:text-primary"
                    href="/auth/signup"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default Signin;
