import { LandingBackgroundVectors } from "../assets/svg/HomeVectors";
import { LandingGridVector } from "../assets/svg/HomeVectors";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Landing = () => {
  const [t] = useTranslation("global");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider");
  }
  const { isAuthenticated, user } = authContext;

  return (
    <div className=" min-h-dvh flex flex-col items-center justify-center relative overflow-hidden ">
      <LandingBackgroundVectors />
      <div className=" grid grid-cols-1 md:grid-cols-2 relative w-full mt-24 md:mt-0 gap-12 md:gap-0 ">
        {isAuthenticated ? (
          //* USER IS AUTH
          <div className="flex flex-col justify-center items-center gap-8 h-full   font-base text-base-text  justify-self-center">
            <h1 className="text-3xl md:text-7xl text-center">
              {t("landing.isAuthenticated.title")}{" "}
              <span className="text-transparent bg-clip-text font-semibold bg-gradient-to-r from-primary to-secondary">
                {user.firstName}
              </span>
            </h1>
            <p className=" w-5/6  text-center text-balance text-sm md:text-lg italic  ">
              {t("landing.isAuthenticated.paragraph")}{" "}
            </p>
            <Link
              to="/auth"
              className="bg-primary px-4 py-2 md:px-8 md:py-4 rounded-md text-primary-text text-center w-1/3 hover:bg-primary-darker hover:shadow-[0px_13px_190px_10px_var(--color-secondary-lighter)] transition-shadow duration-300 ease-in-out"
            >
              {t("landing.isAuthenticated.btn")}
            </Link>
          </div>
        ) : (
          // * USER IS NOT AUTH, DEFAULT LANDING
          <div className="flex flex-col justify-center items-center gap-8 h-full   font-base text-base-text  justify-self-center">
            <h1 className="text-3xl md:text-7xl text-center">
              {t("landing.title")}{" "}
              <span className="text-transparent bg-clip-text font-semibold bg-gradient-to-r from-primary to-secondary">
                TrackIt
              </span>
            </h1>
            <p className=" w-5/6  text-center text-balance text-sm md:text-lg italic  ">
              {t("landing.paragraphStart")}{" "}
              <span className="font-semibold text-secondary">TrackIt </span>
              {t("landing.paragraphEnd")}
            </p>
            <Link
              to="/auth"
              className="bg-primary px-4 py-2 md:px-8 md:py-4 rounded-md text-primary-text text-center w-1/3 hover:bg-primary-darker hover:shadow-[0px_13px_190px_10px_var(--color-secondary-lighter)] transition-shadow duration-300 ease-in-out"
            >
              {t("landing.btn")}
            </Link>
          </div>
        )}
        <LandingGridVector />
      </div>
    </div>
  );
};

export default Landing;
