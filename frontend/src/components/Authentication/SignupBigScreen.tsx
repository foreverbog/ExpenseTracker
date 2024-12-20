import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../Loading/Loading";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import React, { useState } from "react";
import { AuthFormDataType } from "../../pages/Authentication";
// import { motion } from "framer-motion";
type SignupBigScreenProps = {
  isShowingPassword: boolean;
  setIsShowingPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallScreen: boolean;
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  loginAnimationComplete: boolean;
  authFormData: AuthFormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  serverError: string | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
const SignupBigScreen: React.FC<SignupBigScreenProps> = ({
  isShowingPassword,
  setIsShowingPassword,
  hasAccount,
  setHasAccount,
  setSignUpAnimationComplete,
  authFormData,
  handleChange,
  isLoading,
  serverError,
  handleSubmit,
}) => {
  const { t } = useTranslation("global");
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] =
    useState(false);
  return (
    <>
      <Link
        to="/"
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
                  ? "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
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
                serverError === "Last name should contain at least two letters!"
                  ? "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
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
                ? "border-b-red-500 animate-[wiggle_0.3s_ease-in-out] "
                : ""
            } inputStyle`}
            value={authFormData.signupEmail}
            onChange={handleChange}
            name="signupEmail"
            id="signupEmail"
            type="email"
            placeholder={t("auth.email")}
          />
          <div className=" relative">
            <input
              className={`${
                serverError === "All fields must be filled in!" ||
                serverError ===
                  "Make sure to use at least 8 characters, one uppercase, one lowercase, a number and a symbol!"
                  ? "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
                  : ""
              } inputStyle`}
              value={authFormData.signupPassword}
              onChange={handleChange}
              autoComplete="new-password"
              name="signupPassword"
              id="signupPassword"
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

          <div className="relative">
            <input
              className={`${
                serverError === "All fields must be filled in!" ||
                serverError === "Passwords do not match!"
                  ? "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
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
  );
};

export default SignupBigScreen;
