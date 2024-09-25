import { AnimatePresence, motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { useTranslation } from "react-i18next";

type NavbarUserIconProps = {
  logout: () => void;
  isUserOpen: boolean;
  setIsUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isThemeOpen: boolean;
  setIsThemeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLanguageOpen: boolean;
  setIsLanguageOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavbarUserIcon: React.FC<NavbarUserIconProps> = ({
  logout,
  isUserOpen,
  setIsUserOpen,
  isThemeOpen,
  setIsThemeOpen,
  isLanguageOpen,
  setIsLanguageOpen,
}) => {
  const [t] = useTranslation("global");
  return (
    <div
      onClick={() => {
        setIsLanguageOpen(false);
        setIsThemeOpen(false);
        setIsUserOpen((prev) => !prev);
      }}
      className="relative "
    >
      {" "}
      <FaUser className="cursor-pointer text-secondary-text text-xl lg:text-2xl  rounded-t-md " />
      <AnimatePresence>
        {isUserOpen && !isThemeOpen && !isLanguageOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, height: "0px" }}
            animate={{ opacity: 1, height: "100px" }}
            exit={{ opacity: 0, height: "20px" }}
            className="bg-base-100 absolute right-1 w-48  rounded-br-md rounded-l-md flex flex-col gap-4 items-center overflow-hidden shadow-2xl  "
          >
            <Link
              to="/auth"
              className="flex justify-center items-center gap-2 font-base hover:bg-base-200 px-4 py-2  w-full"
            >
              <IoMdSettings />
              <p>{t("nav.settings")}</p>
            </Link>
            <button
              onClick={logout}
              className="bg-red-700 flex justify-center items-center gap-2 rounded-md mx-4 w-2/3 mb-2 px-2 py-1 hover:bg-red-800  "
            >
              <IoIosLogOut className="text-lg" />
              {t("nav.logout")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarUserIcon;
