import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

// const languages: string[] = ["EN", "DE"];

type LanguageSelectorProps = {
  isUserOpen: boolean;
  setIsUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isThemeOpen: boolean;
  setIsThemeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLanguageOpen: boolean;
  setIsLanguageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isScrolling: boolean;
  pathname: string;
};

const LanguageSelector = ({
  isUserOpen,
  setIsUserOpen,
  isThemeOpen,
  setIsThemeOpen,
  isLanguageOpen,
  setIsLanguageOpen,
  isScrolling,
  pathname,
}: LanguageSelectorProps) => {
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    throw new Error("Must be used within a ThemeContextProvider");
  }
  const { language, languageToggler } = languageContext;

  return (
    <div className="relative p-2 rounded-t-md cursor-pointer font-base ">
      <div
        onClick={() => {
          setIsLanguageOpen((prevState) => !prevState);
          setIsThemeOpen(false);
          setIsUserOpen(false);
        }}
        className={`flex gap-1 relative justify-center items-center  p-1   ${
          pathname === "/contact" || pathname === "/about"
            ? "text-base-text"
            : isScrolling
            ? "text-base-text"
            : "text-secondary-text"
        }`}
      >
        <img
          src={`../images/${language === "en" ? "en" : "de"}.svg`}
          alt="flag"
          width={16}
        />
        <p>{language.toUpperCase()}</p>
      </div>
      <AnimatePresence>
        {isLanguageOpen && !isThemeOpen && !isUserOpen && (
          <motion.ul
            onClick={() => {
              const newLanguage = language === "de" ? "en" : "de";
              languageToggler(newLanguage);

              setIsLanguageOpen((prevState) => !prevState);
            }}
            key="modal"
            initial={{ opacity: 0, height: "0px" }}
            animate={{ opacity: 1, height: "30px" }}
            exit={{ opacity: 0, height: "0px" }}
            className="bg-base-100  absolute  right-0 w-full   rounded-b-md flex flex-col justify-center items-center gap-2 p-2 cursor-pointer hover:bg-base-200"
          >
            <li className="flex gap-1 justify-center items-center text-base-text ">
              <img
                src={`../images/${language === "de" ? "en" : "de"}.svg`}
                alt="flag"
                width={16}
              />
              <p>{language.toUpperCase() === "DE" ? "EN" : "DE"}</p>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
