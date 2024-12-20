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
  isScrolling: boolean;
  pathname: string;
};

const NavbarUserIcon: React.FC<NavbarUserIconProps> = ({
  logout,
  isUserOpen,
  setIsUserOpen,
  isThemeOpen,
  setIsThemeOpen,
  isLanguageOpen,
  setIsLanguageOpen,
  isScrolling,
  pathname,
}) => {
  const { t } = useTranslation("global");
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
      <FaUser
        className={`cursor-pointer text-xl lg:text-2xl  rounded-t-md ${
          pathname === "/contact" || pathname === "/about"
            ? "text-base-text"
            : isScrolling
            ? "text-base-text"
            : "text-secondary-text"
        }`}
      />
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
              to="/settings"
              className="flex justify-center items-center gap-2 font-base hover:bg-base-200 transition-colors duration-300 ease-in-out px-4 py-2  w-full"
            >
              <IoMdSettings />
              <p>{t("nav.settings")}</p>
            </Link>
            <button
              onClick={logout}
              className="bg-red-700 flex justify-center items-center gap-2 rounded-md mx-4 w-2/3 mb-2 px-2 py-1 hover:bg-red-800 transition-colors ease-in-out duration-300 text-base font-medium  text-white active:scale-95"
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
