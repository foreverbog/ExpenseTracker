import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { useState } from "react";

const Navbar = () => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [t] = useTranslation("global");

  return (
    <>
      <nav className="bg-primary text-text p-4 flex justify-end md:justify-between items-center ">
        <ul className=" hidden md:flex  w-1/2 text-xl gap-16 ml-24">
          <li>{t("nav.home")}</li>
          <li>{t("nav.about")}</li>
          <li>{t("nav.contact")}</li>
        </ul>
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
          {/* <div className="hidden md:block bg-red-300 rounded-md px-4 py-2">
            Sign Up
          </div> */}
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
