import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const themes: string[] = ["Light", "Dark", "Retro", "Lofi", "Neon"];

type ThemeSelectorProps = {
  isThemeOpen: boolean;
  setIsThemeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLanguageOpen: boolean;
  setIsLanguageOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeSelector = ({
  isThemeOpen,
  setIsThemeOpen,
  isLanguageOpen,
  setIsLanguageOpen,
}: ThemeSelectorProps) => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("Must be used within a ThemeContextProvider");
  }

  const { themeToggler } = themeContext;

  const [t] = useTranslation("global");
  return (
    <div className="relative">
      <div
        onClick={() => {
          setIsThemeOpen(!isThemeOpen);
          setIsLanguageOpen(false);
        }}
        className={`cursor-pointer flex items-center p-2 text-secondary-text  ${
          isThemeOpen && "bg-base-100 rounded-t-md  "
        }`}
      >
        <p className={`${isThemeOpen && "text-base-text"} font-base`}>
          {t("nav.theme")}
        </p>
        <IoMdArrowDropdown
          className={`text-text text-lg mt-1 transition-transform duration-500 ease-in-out ${
            isThemeOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <AnimatePresence>
        {isThemeOpen && !isLanguageOpen && (
          <motion.ul
            key="modal"
            initial={{ opacity: 0, height: "0px" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: "20px" }}
            className="bg-base-100 absolute -right-2 w-48 rounded-md flex flex-col justify-center items-center gap-2 p-2 overflow-hidden shadow-2xl"
          >
            {themes.map((theme) => (
              <li
                key={theme}
                onClick={() => {
                  themeToggler(theme.toLocaleLowerCase());
                }}
                className={`
                    ${theme === "Light" && "bg-[#f5f5f5] text-black "}
                    ${theme === "Dark" && "bg-[#3b3636] text-white"}
                    ${
                      theme === "Retro" &&
                      "bg-[#fbf6e2] text-black font-[Poiret-One] "
                    } 
                    ${
                      theme === "Lofi" &&
                      "bg-[#afa7a7] text-black font-[Quicksand] "
                    } 
                    ${
                      theme === "Neon" &&
                      "bg-[#000] text-white font-[Chakra-Petch]"
                    } 
                    cursor-pointer  w-full rounded-md  p-2 relative overflow-hidden group flex justify-center items-center `}
              >
                <span
                  className={`
                    ${theme === "Light" && "bg-[#4d9295]"}
                    ${theme === "Dark" && "bg-[#016a70]"}
                    ${theme === "Retro" && "bg-[#131842]"}
                    ${theme === "Lofi" && "bg-[#2a2743]"} 
                    ${theme === "Neon" && "bg-[#16ff00]"}  

                    absolute top-0 left-0 h-full w-4  rotate-12 scale-150 group-hover:w-6 transition-all duration-1000 ease-in-out`}
                ></span>
                <span
                  className={`
                    ${theme === "Light" && "bg-[#924d93]"}
                    ${theme === "Dark" && "bg-[#70016a]"}
                    ${theme === "Retro" && "bg-[#e68369]"}
                    ${theme === "Lofi" && "bg-[#f9dc5c]"}  
                    ${theme === "Neon" && "bg-[#ffed00]"}  
                    absolute  top-0 left-9 h-full w-4 rotate-12 scale-150 group-hover:w-6 group-hover:left-12 transition-all duration-1000 ease-in-out`}
                ></span>

                <span className="group-hover:translate-x-8  transition-all duration-1000 ease-in-out ">
                  {theme}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
