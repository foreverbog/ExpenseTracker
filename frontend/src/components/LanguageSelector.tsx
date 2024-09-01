import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// const languages: string[] = ["EN", "DE"];

type LanguageSelectorProps = {
  isLanguageOpen: boolean;
  setIsLanguageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isThemeOpen: boolean;
  setIsThemeOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LanguageSelector = ({
  isLanguageOpen,
  setIsLanguageOpen,
  isThemeOpen,
  setIsThemeOpen,
}: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<"EN" | "DE">("EN");

  const [, i18n] = useTranslation("global");

  //* Store the lng in localStorage
  const languageSelect = (newLanguage: "EN" | "DE") => {
    setSelectedLanguage(newLanguage);
    localStorage.setItem("user-lng", newLanguage);
  };

  //*Check language preferences
  useEffect(() => {
    const storedLanguage = localStorage.getItem("user-lng") as
      | "EN"
      | "DE"
      | null;
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage.toLowerCase());
    }
  }, [i18n]);

  //*Changelng and close the modal
  const handleChangeLanguage = (language: "EN" | "DE") => {
    i18n.changeLanguage(language.toLowerCase());
    languageSelect(language);
    setIsLanguageOpen(false);
  };
  return (
    <div className="relative p-2 rounded-t-md cursor-pointer font-base ">
      <div
        onClick={() => {
          setIsLanguageOpen(!isLanguageOpen);
          setIsThemeOpen(false);
        }}
        className="flex gap-1 relative justify-center items-center  p-1 text-secondary-text "
      >
        <img
          src={`../images/${selectedLanguage === "EN" ? "en" : "de"}.svg`}
          alt="flag"
          width={16}
        />
        <p>{selectedLanguage}</p>
      </div>
      <AnimatePresence>
        {isLanguageOpen && !isThemeOpen && (
          <motion.ul
            key="modal"
            initial={{ opacity: 0, height: "0px" }}
            animate={{ opacity: 1, height: "30px" }}
            exit={{ opacity: 0, height: "0px" }}
            className="bg-base-100  absolute  right-0 w-full   rounded-b-md flex flex-col justify-center items-center gap-2 p-2 cursor-pointer"
          >
            <li
              onClick={() =>
                selectedLanguage === "DE"
                  ? handleChangeLanguage("EN")
                  : handleChangeLanguage("DE")
              }
              className="flex gap-1 justify-center items-center text-base-text"
            >
              <img
                src={`../images/${selectedLanguage === "DE" ? "en" : "de"}.svg`}
                alt="flag"
                width={16}
              />
              <p>{selectedLanguage === "DE" ? "EN" : "DE"}</p>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
