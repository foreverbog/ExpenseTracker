import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { ThemeContext } from "../context/ThemeContext";

const themes: string[] = ["Light", "Dark", "Neon"];

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("Must be used within a ThemeContextProvider");
  }

  const { themeToggler } = themeContext;
  return (
    <>
      <div
        className={`flex items-center relative p-2 rounded-t-md  ${
          isOpen ? "bg-red-300 " : ""
        }`}
      >
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="cursor-pointer flex items-center"
        >
          <p>Theme</p>
          <IoMdArrowDropdown
            className={`text-text text-lg mt-1 transition-transform duration-500 ease-in-out ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              key="modal"
              initial={{ opacity: 0, height: "0px" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: "20px" }}
              className="bg-red-300  absolute mt-32 -right-4 w-48 rounded-md flex flex-col justify-center items-center gap-2 p-2 overflow-hidden"
            >
              {themes.map((theme) => (
                <li
                  onClick={() => {
                    themeToggler(theme.toLocaleLowerCase());
                  }}
                  className="cursor-pointer"
                >
                  {theme}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ThemeSelector;
