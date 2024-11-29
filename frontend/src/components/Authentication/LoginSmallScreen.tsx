import { Link } from "react-router-dom";
import {
  RightSideGridVector,
  RightSideGridLogoVector,
} from "../../assets/svg/RegisterVectors";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { AuthFormDataType } from "../../pages/Authentication";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";

type LoginSmallScreenProps = {
  isSmallScreen: boolean;
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  isShowingPassword: boolean;
  setIsShowingPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  authFormData: AuthFormDataType;
  setAuthFormData: React.Dispatch<React.SetStateAction<AuthFormDataType>>;
  isLoading: boolean;
  serverError: string | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const LoginSmallScreen: React.FC<LoginSmallScreenProps> = ({
  isSmallScreen,
  hasAccount,
  setHasAccount,
  isShowingPassword,
  setIsShowingPassword,
  setLoginAnimationComplete,
  handleChange,
  authFormData,
  setAuthFormData,
  isLoading,
  serverError,
  handleSubmit,
}) => {
  const { t } = useTranslation("global");

  return (
    <motion.div
      className="h-full"
      key="loginSmallScreen"
      initial={{ x: isSmallScreen ? 400 : "" }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      transition={{ duration: isSmallScreen ? 0.3 : "" }}
      onAnimationComplete={() => {
        setLoginAnimationComplete(true);
      }}
    >
      <Link
        to="/"
        className={`${
          !hasAccount ? "hidden " : "flex "
        } absolute  left-6 top-8 md:flex gap-2 justify-center items-center group hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out z-10`}
      >
        <FaHome className="text-xs" />
        <p className="underline text-[10px] ">{t("auth.home")}</p>
      </Link>
      <div
        className={`${
          !hasAccount ? "hidden" : "flex"
        } md:flex flex-col items-center justify-center gap-24 h-full relative `}
      >
        {isLoading && <Loading text={t("auth.loginLoading")} />}
        <div className="flex flex-col  justify-center items-center gap-4">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl text-center font-semibold text-primary">
            {t("auth.titleLogin")}
          </h1>
          <h2 className="text-normal xs:text-lg text-center text-secondary font-semibold ">
            {t("auth.subtitleLogin")}
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
          <input
            onChange={handleChange}
            value={authFormData.email}
            className={`${
              serverError === "All fields must be filled in!" ||
              serverError === "Incorrect email!"
                ? "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
                : ""
            } inputStyle`}
            name="email"
            id="email"
            type="text"
            placeholder={t("auth.email")}
          />

          <div className="relative">
            <input
              onChange={handleChange}
              value={authFormData.password}
              className={`${
                serverError === "All fields must be filled in!" ||
                serverError === "Incorrect password!"
                  ? "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
                  : ""
              } inputStyle`}
              name="password"
              id="password"
              type={isShowingPassword ? "text" : "password"}
              placeholder={t("auth.password")}
            />
            <div
              onClick={() => setIsShowingPassword((prevState) => !prevState)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:opacity-100 transition duration-300 ease-in-out text-base-text opacity-50"
            >
              {isShowingPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button className="bg-primary text-primary-text py-2 px-4 rounded-md hover:scale-105 transition duration-300 ease-in-out">
            {t("auth.login")}
          </button>
        </form>
        <div className="flex gap-1 font-base text-base-text mt-2">
          <p className=" text-sm">{t("auth.notAnUser")}</p>
          <button
            className="font-bold underline text-sm"
            disabled={!hasAccount}
            onClick={(e) => {
              e.preventDefault();
              setHasAccount((prevState) => !prevState);
              setLoginAnimationComplete(false);
              setAuthFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
            }}
          >
            {t("auth.signup")}
          </button>
        </div>
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
  );
};

export default LoginSmallScreen;
