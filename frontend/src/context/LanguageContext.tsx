import { createContext, useState, useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type LanguageContextType = {
  language: string;
  languageToggler: (language: "en" | "de") => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

type LanguageContextProviderProps = {
  children: ReactNode;
};

const languages: string[] = ["en", "de"];

const LanguageContextProvider = ({
  children,
}: LanguageContextProviderProps) => {
  const [language, setLanguage] = useState<string>(languages[0]);
  const [, i18n] = useTranslation("global");

  //*Store the language in localStorage
  const languageSelect = (newLanguage: "en" | "de") => {
    setLanguage(newLanguage);
    localStorage.setItem("user-lng", newLanguage);
  };

  //*Check if is any language stored
  useEffect(() => {
    const storedLanguage = localStorage.getItem("user-lng") as "en" | "de";

    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  //*Change language
  const languageToggler = (newLanguage: "en" | "de") => {
    i18n.changeLanguage(newLanguage);
    languageSelect(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, languageToggler }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;