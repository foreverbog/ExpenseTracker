import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { ThemeContext } from "../context/ThemeContext";

const themes: string[] = ["Light", "Dark", "Neon", "Another"];

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
              className="bg-red-300  absolute mt-60 -right-4 w-48 rounded-md flex flex-col justify-center items-center gap-2 p-2 overflow-hidden"
            >
              {themes.map((theme) => (
                <li
                  onClick={() => {
                    themeToggler(theme.toLocaleLowerCase());
                  }}
                  className={`
                    ${theme === "Light" && "bg-[#f5f5f5] text-black"}
                    ${theme === "Dark" && "bg-[#021526] text-white"}
                    ${theme === "Neon" && "bg-[#eb3678] text-black"} 
                    ${theme === "Another" && "bg-[#56b1a9] text-black"} 
                    cursor-pointer  w-full rounded-md  p-2 relative overflow-hidden group flex justify-center items-center `}
                >
                  <span
                    className={`
                    ${theme === "Light" && "bg-red-900"}
                    ${theme === "Dark" && "bg-lime-600"}
                    ${theme === "Neon" && "bg-blue-500"} 
                    ${theme === "Another" && "bg-red-950"}  

                    absolute top-0 left-0 h-full w-4 rotate-12 scale-150 group-hover:w-8 transition-all duration-1000 ease-in-out`}
                  ></span>
                  <span
                    className={`
                    ${theme === "Light" && "bg-yellow-200"}
                    ${theme === "Dark" && "bg-purple-600"}
                    ${theme === "Neon" && "bg-green-500"}  
                    ${theme === "Another" && "bg-green-950"}  
                    absolute  top-0 left-4 h-full w-4 rotate-12 scale-150 group-hover:w-8 group-hover:left-8 transition-all duration-1000 ease-in-out`}
                  ></span>
                  <span
                    className={`
                    ${theme === "Light" && "bg-cyan-200"}
                    ${theme === "Dark" && "bg-gray-200"}
                    ${theme === "Neon" && "bg-slate-500"} 
                    ${theme === "Another" && "bg-white"} 
                    absolute  top-0 left-8 h-full w-4 rotate-12 scale-125 group-hover:w-8 group-hover:left-16 transition-all duration-1000 ease-in-out`}
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
    </>
  );
};

export default ThemeSelector;
