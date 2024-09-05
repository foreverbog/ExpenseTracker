import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type SignupProps = {
  isSmallScreen: boolean;
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  loginAnimationComplete: boolean;
};

const Signup = ({
  isSmallScreen,
  hasAccount,
  setHasAccount,
  setSignUpAnimationComplete,
  loginAnimationComplete,
}: SignupProps) => {
  const [t] = useTranslation("global");

  return (
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
            <h1 className="text-6xl text-center">{t("signup.title")}</h1>
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
                setHasAccount((prevState) => !prevState);
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
                setHasAccount((prevState) => !prevState);
                setSignUpAnimationComplete(true);
              }}
            >
              ac
            </button>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Signup;
