import { AnimatePresence, motion } from "framer-motion";

const languages: string[] = ["EN", "DE"];

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
  return (
    <div className="relative p-2 rounded-t-md cursor-pointer">
      <div
        onClick={() => {
          setIsLanguageOpen(!isLanguageOpen);
          setIsThemeOpen(false);
        }}
        className="flex gap-1 relative justify-center items-center"
      >
        <img src="../images/en.svg" alt="flag" width={16} />
        <p>{languages[0]}</p>
      </div>
      <AnimatePresence>
        {isLanguageOpen && !isThemeOpen && (
          <motion.ul
            key="modal"
            initial={{ opacity: 0, height: "0px" }}
            animate={{ opacity: 1, height: "30px" }}
            exit={{ opacity: 0, height: "0px" }}
            className="bg-red-300  absolute  right-0 w-full   rounded-b-md flex flex-col justify-center items-center gap-2 p-2 cursor-pointer"
          >
            <li className="flex gap-1 justify-center items-center">
              <img src="../images/de.svg" alt="flag" width={16} />
              <p>DE</p>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
