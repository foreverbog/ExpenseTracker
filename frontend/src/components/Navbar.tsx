import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogoVector } from "../assets/svg/BrandsVectors";

const Navbar = () => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [t] = useTranslation("global");

  return (
    <>
      <nav className="  text-text text-base-text p-4 flex justify-between  items-center bg-transparent absolute w-full top-0 z-10 mb-24">
        <div className="flex flex-1 gap-24  items-center ">
          <NavLink className="group" to="/">
            <LogoVector />
          </NavLink>
          <ul className=" hidden md:flex  w-full text-xl gap-16  text-base-text font-base ">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-primary decoration-2"
                  : "hover:text-primary transition duration-300 ease-linear"
              }
              to="/"
            >
              {t("nav.home")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-primary decoration-2"
                  : "hover:text-primary transition duration-300 ease-linear"
              }
              to="/about"
            >
              {t("nav.about")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-primary decoration-2"
                  : "hover:text-primary transition duration-300 ease-linear"
              }
              to="/contact"
            >
              {t("nav.contact")}
            </NavLink>
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-2 mr-24">
          <ThemeSelector
            isThemeOpen={isThemeOpen}
            setIsThemeOpen={setIsThemeOpen}
            isLanguageOpen={isLanguageOpen}
            setIsLanguageOpen={setIsLanguageOpen}
          />
          <LanguageSelector
            isLanguageOpen={isLanguageOpen}
            setIsLanguageOpen={setIsLanguageOpen}
            isThemeOpen={isThemeOpen}
            setIsThemeOpen={setIsThemeOpen}
          />
        </div>
        <label className="md:hidden">
          <div className="w-9 h-10 cursor-pointer  flex flex-col items-center justify-center scale-125 mr-6">
            <input className="hidden peer" type="checkbox" />
            <div className="w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
            <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
            <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
          </div>
        </label>
      </nav>
    </>
  );
};

export default Navbar;
