import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthFormDataType } from "../pages/Authentication";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useState } from "react";

type SignupProps = {
  isShowingPassword: boolean;
  setIsShowingPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallScreen: boolean;
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  loginAnimationComplete: boolean;
  serverError: string | null;
  setServerError: React.Dispatch<React.SetStateAction<string | null>>;
  authFormData: AuthFormDataType;
  setAuthFormData: React.Dispatch<React.SetStateAction<AuthFormDataType>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Signup: React.FC<SignupProps> = ({
  isShowingPassword,
  setIsShowingPassword,
  isSmallScreen,
  hasAccount,
  setHasAccount,
  setSignUpAnimationComplete,
  loginAnimationComplete,
  serverError,
  setServerError,
  isLoading,
  setIsLoading,
  authFormData,
  setAuthFormData,
}) => {
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] =
    useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthFormData({ ...authFormData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await axios.post(
        "https://extr-backend.onrender.com/signup",
        {
          firstName: authFormData.firstName,
          lastName: authFormData.lastName,
          email: authFormData.email,
          password: authFormData.password,
          confirmPassword: authFormData.confirmPassword,
        }
      );

      const data = response.data;
      console.log(data);
      setIsLoading(false);
      setAuthFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success(
        t("auth.signupToast", { firstName: authFormData.firstName }),
        {
          position: "top-center",
          autoClose: 1500,
          closeOnClick: true,
          transition: Zoom,
          className: "bg-base text-center text-sm",
        }
      );
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data);
        if (error?.response?.data) {
          setServerError(error?.response?.data.error);
        } else {
          setServerError("Unknown error happened");
        }
      } else {
        setServerError("An unexpected error occured");
      }
      console.log(serverError);
    } finally {
      setIsLoading(false);
    }
  };

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
            <p className="underline text-[10px]">{t("auth.home")}</p>
          </Link>
          <div
            className={`${
              hasAccount ? "hidden" : "flex"
            } md:flex flex-col items-center justify-center gap-12 h-full text-base-text font-base bg-base relative`}
          >
            {isLoading && <Loading text={t("auth.signupLoading")} />}
            <div className="flex flex-col  justify-center items-center gap-4">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl text-center font-semibold text-primary">
                {t("auth.titleSignup")}
              </h1>
              <h2 className="text-normal xs:text-lg text-center text-secondary font-semibold ">
                {t("auth.subtitleSignup")}
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center w-full gap-4"
            >
              {serverError && (
                <p className="text-red-500 font-semibold text-balance text-center">
                  {serverError}
                </p>
              )}
              <div className="flex gap-4 flex-wrap justify-center items-center w-full">
                <input
                  type="text"
                  name="firstName"
                  value={authFormData.firstName}
                  onChange={handleChange}
                  className={`${
                    serverError === "All fields must be filled in!" ||
                    serverError ===
                      "First name should contain at least two letters!"
                      ? "border-b-red-500"
                      : ""
                  } inputStyle w-1/3 md:w-1/4`}
                  id="firstName"
                  placeholder={t("auth.firstName")}
                />
                <input
                  type="text"
                  name="lastName"
                  value={authFormData.lastName}
                  onChange={handleChange}
                  className={`${
                    serverError === "All fields must be filled in!" ||
                    serverError ===
                      "Last name should contain at least two letters!"
                      ? "border-b-red-500"
                      : ""
                  } inputStyle w-1/3 md:w-1/4`}
                  id="lastName"
                  placeholder={t("auth.lastName")}
                />
              </div>
              <input
                type="email"
                name="email"
                value={authFormData.email}
                onChange={handleChange}
                className={`${
                  serverError === "All fields must be filled in!" ||
                  serverError === "Email already in use!"
                    ? "border-b-red-500"
                    : ""
                } inputStyle`}
                id="email"
                placeholder={t("auth.email")}
              />
              <div className=" relative">
                <input
                  className={`${
                    serverError === "All fields must be filled in!" ||
                    serverError ===
                      "Make sure to use at least 8 characters, one uppercase, one lowercase, a number and a symbol!"
                      ? "border-b-red-500"
                      : ""
                  } inputStyle`}
                  value={authFormData.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type={isShowingPassword ? "text" : "password"}
                  placeholder={t("auth.password")}
                />
                <div
                  onClick={() =>
                    setIsShowingPassword((prevState) => !prevState)
                  }
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:opacity-100 transition duration-300 ease-in-out text-base-text opacity-50"
                >
                  {isShowingPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <div className="relative">
                <input
                  className={`${
                    serverError === "All fields must be filled in!" ||
                    serverError === "Passwords do not match!"
                      ? "border-b-red-500"
                      : ""
                  } inputStyle`}
                  value={authFormData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  id="confirmPassword"
                  type={isShowingConfirmPassword ? "text" : "password"}
                  placeholder={t("auth.confirmPassword")}
                />
                <div
                  onClick={() =>
                    setIsShowingConfirmPassword((prevState) => !prevState)
                  }
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:opacity-100 transition duration-300 ease-in-out text-base-text opacity-50"
                >
                  {isShowingConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <button className="bg-primary text-primary-text py-2 px-4 rounded-md hover:scale-105 transition duration-300 ease-in-out">
                {t("auth.signup")}
              </button>
              <div className="flex gap-1 font-base text-base-text mt-2">
                <p className=" text-sm">{t("auth.alreadyUser")}</p>
                <button
                  className="font-bold underline text-sm"
                  disabled={hasAccount}
                  onClick={(e) => {
                    e.preventDefault();
                    setHasAccount((prevState) => !prevState);
                    setSignUpAnimationComplete(false);
                  }}
                >
                  {t("auth.login")}
                </button>
              </div>
            </form>
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
            <p className="underline text-[10px]">{t("auth.home")}</p>
          </Link>
          <div
            className={`${
              hasAccount ? "hidden" : "flex"
            } md:flex flex-col items-center justify-center gap-12 h-full text-base-text font-base bg-base relative`}
          >
            {isLoading && <Loading text={t("auth.signupLoading")} />}
            <div className="flex flex-col  justify-center items-center gap-4">
              <h1 className="text-6xl text-center font-semibold text-primary">
                {t("auth.titleSignup")}
              </h1>
              <h2 className="text-lg text-center text-secondary font-semibold ">
                {t("auth.subtitleSignup")}
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center w-full gap-4"
            >
              {serverError && (
                <p className="text-red-500 font-semibold text-balance text-center">
                  {serverError}
                </p>
              )}
              <div className="flex gap-4 flex-wrap justify-center items-center w-full">
                <input
                  className={`${
                    serverError === "All fields must be filled in!" ||
                    serverError ===
                      "First name should contain at least two letters!"
                      ? "border-b-red-500"
                      : ""
                  } inputStyle w-1/4`}
                  value={authFormData.firstName}
                  onChange={handleChange}
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder={t("auth.firstName")}
                />
                <input
                  className={`${
                    serverError === "All fields must be filled in!" ||
                    serverError ===
                      "Last name should contain at least two letters!"
                      ? "border-b-red-500"
                      : ""
                  } inputStyle w-1/4`}
                  value={authFormData.lastName}
                  onChange={handleChange}
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder={t("auth.lastName")}
                />
              </div>

              <input
                className={`${
                  serverError === "All fields must be filled in!" ||
                  serverError === "Email already in use!"
                    ? "border-b-red-500 "
                    : ""
                } inputStyle`}
                value={authFormData.email}
                onChange={handleChange}
                name="email"
                id="email"
                type="email"
                placeholder={t("auth.email")}
              />
              <div className=" relative">
                <input
                  className={`${
                    serverError === "All fields must be filled in!" ||
                    serverError ===
                      "Make sure to use at least 8 characters, one uppercase, one lowercase, a number and a symbol!"
                      ? "border-b-red-500"
                      : ""
                  } inputStyle`}
                  value={authFormData.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type={isShowingPassword ? "text" : "password"}
                  placeholder={t("auth.password")}
                />
                <div
                  onClick={() =>
                    setIsShowingPassword((prevState) => !prevState)
                  }
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:opacity-100 transition duration-300 ease-in-out text-base-text opacity-50"
                >
                  {isShowingPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <div className="relative">
                <input
                  className={`${
                    serverError === "All fields must be filled in!" ||
                    serverError === "Passwords do not match!"
                      ? "border-b-red-500"
                      : ""
                  } inputStyle`}
                  value={authFormData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  id="confirmPassword"
                  type={isShowingConfirmPassword ? "text" : "password"}
                  placeholder={t("auth.confirmPassword")}
                />
                <div
                  onClick={() =>
                    setIsShowingConfirmPassword((prevState) => !prevState)
                  }
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:opacity-100 transition duration-300 ease-in-out text-base-text opacity-50"
                >
                  {isShowingConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <button className="bg-primary text-primary-text py-2 px-4 rounded-md hover:scale-105 transition duration-300 ease-in-out">
                {t("auth.signup")}
              </button>
              <div className="flex gap-1 font-base text-base-text mt-2">
                <p className=" text-sm">{t("auth.alreadyUser")}</p>
                <button
                  className="font-bold underline text-sm"
                  disabled={hasAccount}
                  onClick={(e) => {
                    e.preventDefault();
                    setHasAccount((prevState) => !prevState);
                    setSignUpAnimationComplete(true);
                  }}
                >
                  {t("auth.login")}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Signup;
