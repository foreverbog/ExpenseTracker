import { Link, NavLink } from "react-router-dom";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { MdBarChart } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { BsCurrencyExchange } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

type MenuSmallScreenType = {
  logout: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuSmallScreen: React.FC<MenuSmallScreenType> = ({
  logout,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const [t] = useTranslation("global");

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ width: "20%" }}
          animate={{ width: "100%" }}
          exit={{ width: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 0.2 }}
          className="z-40 bg-base-200 font-base text-base-text h-dvh flex flex-col  items-center fixed "
        >
          {/* //*Back to home Link */}
          <Link
            to="/"
            className="absolute left-4 top-4 flex justify-center items-center gap-2 text-base-text group hover:text-primary hover:scale-105 transition duration-300 ease-in-out"
          >
            <FaHome />
            <p className="underline">{t("auth.home")}</p>
          </Link>

          {/* //*The other links */}
          <div className="flex flex-col justify-center items-center flex-1 gap-8 w-full overflow-hidden ">
            <NavLink
              onClick={() => setIsMenuOpen((prev) => !prev)}
              to="/menu/expenses"
              className="flex flex-wrap  text-center gap-2 items-center justify-center   text-2xl xs:text-4xl  hover:scale-110 transition-all duration-300  p-2 hover:bg-base-200 w-full"
            >
              <MdBarChart className="text-blue-600 text-3xl xs:text-5xl" />
              <p>{t("menu.expense")}</p>
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen((prev) => !prev)}
              to="/menu/trips"
              className="flex flex-wrap  text-center gap-2 items-center justify-center   text-2xl xs:text-4xl  hover:scale-110 transition-all duration-300  p-2 hover:bg-base-200 w-full"
            >
              <TbBeach className="text-amber-500 text-3xl xs:text-5xl" />
              <p>{t("menu.trip")}</p>
            </NavLink>
            <NavLink
              to="/menu/exchange"
              className="flex flex-wrap  text-center gap-2 items-center justify-center   text-2xl xs:text-4xl  hover:scale-110 transition-all duration-300  p-2 hover:bg-base-200 w-full"
            >
              <BsCurrencyExchange className="text-green-500 text-3xl xs:text-5xl" />
              <p>{t("menu.currency")}</p>
            </NavLink>
            <NavLink
              to="/menu/expenses"
              className="flex flex-wrap  text-center gap-2 items-center justify-center   text-2xl xs:text-4xl  hover:scale-110 transition-all duration-300  p-2 hover:bg-base-200 w-full"
            >
              <IoMdSettings className="text-base-text text-3xl xs:text-5xl" />
              <p>{t("nav.settings")}</p>
            </NavLink>
          </div>
          <button
            onClick={logout}
            className="mb-24 bg-red-700 hover:bg-red-800 transition-colors duration-300 ease-in-out flex items-center justify-center gap-2 rounded-md py-2 w-1/2 xs:w-1/3 xs:text-xl "
          >
            <IoIosLogOut />
            <p>{t("nav.logout")}</p>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuSmallScreen;
