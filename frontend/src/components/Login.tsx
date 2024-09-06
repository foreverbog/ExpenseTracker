import { Link } from "react-router-dom";
import {
  RightSideGridVector,
  RightSideGridLogoVector,
} from "../assets/svg/RegisterVectors";
import { FaHome } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { AuthFormDataType } from "../pages/Authentication";

type LoginProps = {
  isShowingPassword: boolean;
  setIsShowingPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallScreen: boolean;
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  signUpAnimationComplete: boolean;
  setLoginAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  authFormData: AuthFormDataType;
  setAuthFormData: React.Dispatch<React.SetStateAction<AuthFormDataType>>;
};

const Login = ({
  isSmallScreen,
  hasAccount,
  setHasAccount,
  signUpAnimationComplete,
  setLoginAnimationComplete,
}: LoginProps) => {
  return (
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
                setHasAccount((prevState) => !prevState);
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
                setHasAccount((prevState) => !prevState);
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
  );
};

export default Login;
