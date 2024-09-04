import { Link } from "react-router-dom";
import {
  RightSideGridVector,
  RightSideGridLogoVector,
} from "../assets/svg/RegisterVectors";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

const Signup = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [signUpAnimationComplete, setSignUpAnimationComplete] = useState(false);
  const [loginAnimationComplete, setLoginAnimationComplete] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  //! MAKE 2 BTN FOR SMALL AND BIG SCREENS - ANIMATION AND FOR GRID

  return (
    <div className="min-h-dvh  p-24 flex justify-center items-center ">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className=" relative    md:grid md:grid-cols-2 rounded-md   bg-base-100  h-[700px] w-[1200px] overflow-hidden drop-shadow-2xl"
      >
        {/* //*LEFT SIDE GRID -- Sign Up */}
        <AnimatePresence>
          //*Small screens only the form
          {isSmallScreen && !hasAccount && loginAnimationComplete && (
            <motion.div
              key="signup"
              initial={{ x: isSmallScreen ? -400 : "" }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ duration: isSmallScreen ? 0.3 : "" }}
              className={` h-full`}
              onAnimationComplete={() => setSignUpAnimationComplete(true)}
            >
              <Link
                to="/home"
                className={`${
                  hasAccount ? "hidden" : "flex"
                } absolute left-6 top-8 md:flex gap-2 justify-center items-center group hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out z-10`}
              >
                <FaHome className="text-xs" />
                <p className="underline text-[10px]">Go back home</p>
              </Link>
              <div
                className={`${
                  hasAccount ? "hidden" : "flex"
                } md:flex flex-col items-center justify-center gap-24 h-full`}
              >
                <h1 className="text-6xl text-center">Get Started</h1>
                <form className="flex flex-col justify-center items-center  w-4/5">
                  <label htmlFor="firstName">
                    First Name <br />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name here... "
                    />
                  </label>
                  <label htmlFor="lastName">
                    Last Name <br />
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name here... "
                    />
                  </label>
                  <label htmlFor="email">
                    Email <br />
                    <input
                      id="email"
                      type="text"
                      placeholder="Enter your email here... "
                    />
                  </label>
                  <label htmlFor="password">
                    Password <br />
                    <input
                      id="password"
                      type="text"
                      placeholder="Enter your password here... "
                    />
                  </label>
                  <label htmlFor="confirmPassword">
                    Confirm Password <br />
                    <input
                      id="confirmPassword"
                      type="text"
                      placeholder="Enter your password here... "
                    />
                  </label>
                  <button>Sign up</button>
                </form>
                <button
                  disabled={hasAccount}
                  onClick={() => {
                    setHasAccount(!hasAccount);
                    setSignUpAnimationComplete(false);
                  }}
                >
                  ac
                </button>
              </div>
            </motion.div>
          )}
          //*Big screens with logo cover
          {!isSmallScreen && (
            <>
              <Link
                to="/home"
                className={`${
                  hasAccount ? "hidden" : "flex"
                } absolute left-6 top-8 md:flex gap-2 justify-center items-center group hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out z-10`}
              >
                <FaHome className="text-xs" />
                <p className="underline text-[10px]">Go back home</p>
              </Link>
              <div
                className={`${
                  hasAccount ? "hidden" : "flex"
                } md:flex flex-col items-center justify-center gap-24 h-full`}
              >
                <h1 className="text-6xl text-center">Get Started</h1>
                <form className="flex flex-col justify-center items-center  w-4/5">
                  <label htmlFor="firstName">
                    First Name <br />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name here... "
                    />
                  </label>
                  <label htmlFor="lastName">
                    Last Name <br />
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name here... "
                    />
                  </label>
                  <label htmlFor="email">
                    Email <br />
                    <input
                      id="email"
                      type="text"
                      placeholder="Enter your email here... "
                    />
                  </label>
                  <label htmlFor="password">
                    Password <br />
                    <input
                      id="password"
                      type="text"
                      placeholder="Enter your password here... "
                    />
                  </label>
                  <label htmlFor="confirmPassword">
                    Confirm Password <br />
                    <input
                      id="confirmPassword"
                      type="text"
                      placeholder="Enter your password here... "
                    />
                  </label>
                  <button>Sign up</button>
                </form>
                <button
                  disabled={hasAccount}
                  onClick={() => {
                    setHasAccount(!hasAccount);
                  }}
                >
                  ac
                </button>
              </div>
            </>
          )}
        </AnimatePresence>
        {/* //*RIGHT SIDE GRID -- Login */}
        <AnimatePresence>
          //*Small screens only the form
          {isSmallScreen && hasAccount && signUpAnimationComplete && (
            <motion.div
              className="h-full"
              key="login"
              initial={{ x: isSmallScreen ? 400 : "" }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: isSmallScreen ? 0.3 : "" }}
              onAnimationComplete={() => {
                setLoginAnimationComplete(true);
              }}
            >
              <Link
                to="/home"
                className={`${
                  !hasAccount ? "hidden " : "flex "
                } absolute  left-6 top-8 md:flex gap-2 justify-center items-center group hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out z-10`}
              >
                <FaHome className="text-xs" />
                <p className="underline text-[10px] ">Go back home</p>
              </Link>
              <div
                className={`${
                  !hasAccount ? "hidden" : "flex"
                } md:flex flex-col items-center justify-center gap-24 h-full relative `}
              >
                <h1 className="text-6xl text-center">Login</h1>
                <form className="flex flex-col justify-center items-center  w-4/5 ">
                  <label htmlFor="firstName">
                    First Name <br />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name here... "
                    />
                  </label>
                  <label htmlFor="lastName">
                    Last Name <br />
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name here... "
                    />
                  </label>
                  <label htmlFor="email">
                    Email <br />
                    <input
                      id="email"
                      type="text"
                      placeholder="Enter your email here... "
                    />
                  </label>
                  <label htmlFor="password">
                    Password <br />
                    <input
                      id="password"
                      type="text"
                      placeholder="Enter your password here... "
                    />
                  </label>
                  <label htmlFor="confirmPassword">
                    Confirm Password <br />
                    <input
                      id="confirmPassword"
                      type="text"
                      placeholder="Enter your password here... "
                    />
                  </label>
                  <button>Sign up</button>
                </form>
                <button
                  disabled={!hasAccount}
                  onClick={() => {
                    setHasAccount(!hasAccount);
                    setLoginAnimationComplete(false);
                  }}
                >
                  ac
                </button>
                <div
                  className={`${
                    hasAccount ? "-translate-x-full" : ""
                  } absolute w-full h-full hidden md:block duration-1000 transition-all ease-in-out overflow-hidden z-30`}
                >
                  <RightSideGridLogoVector />
                  <RightSideGridVector />
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                </div>
              </div>
            </motion.div>
          )}
          //*Big screens with logo cover
          {!isSmallScreen && (
            <>
              <Link
                to="/home"
                className={`${
                  !hasAccount ? "hidden " : "flex "
                } absolute  right-6 top-8 md:flex gap-2 justify-center items-center group hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out z-10`}
              >
                <p className="underline text-[10px] ">Go back home</p>
                <FaHome className="text-xs" />
              </Link>
              <div
                className={`${
                  !hasAccount ? "hidden" : "flex"
                } md:flex flex-col items-center justify-center gap-24 h-full relative `}
              >
                <h1 className="text-6xl text-center">Login</h1>
                <form className="flex flex-col justify-center items-center  w-4/5 ">
                  <label htmlFor="firstName">
                    First Name <br />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name here... "
                    />
                  </label>
                  <label htmlFor="lastName">
                    Last Name <br />
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name here... "
                    />
                  </label>
                  <label htmlFor="email">
                    Email <br />
                    <input
                      id="email"
                      type="text"
                      placeholder="Enter your email here... "
                    />
                  </label>
                  <label htmlFor="password">
                    Password <br />
                    <input
                      id="password"
                      type="text"
                      placeholder="Enter your password here... "
                    />
                  </label>
                  <label htmlFor="confirmPassword">
                    Confirm Password <br />
                    <input
                      id="confirmPassword"
                      type="text"
                      placeholder="Enter your password here... "
                    />
                  </label>
                  <button>Sign up</button>
                </form>
                <button
                  disabled={!hasAccount}
                  onClick={() => {
                    setHasAccount(!hasAccount);
                  }}
                >
                  ac
                </button>
                <div
                  className={`${
                    hasAccount ? "-translate-x-full" : ""
                  } absolute w-full h-full hidden md:block duration-1000 transition-all ease-in-out overflow-hidden z-30`}
                >
                  <RightSideGridLogoVector />
                  <RightSideGridVector />
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Signup;
