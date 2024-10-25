import { NavLink, Link } from "react-router-dom";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { MdBarChart } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { BsCurrencyExchange } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type MenuBigScreenType = {
  logout: () => void;
};

const MenuBigScreen: React.FC<MenuBigScreenType> = ({ logout }) => {
  const [t] = useTranslation("global");

  return (
    <div className="z-40 bg-base-200 font-base text-base-text h-full flex flex-col justify-between items-center fixed left-0 w-[50px] hover:w-[220px]  transition-all duration-300 group rounded-r-md overflow-hidden">
      {/* //*Back to home Link */}
      <Link
        to="/"
        className="absolute left-3 top-4 flex justify-center items-center gap-4 text-base-text group hover:text-primary hover:scale-105 transition duration-300 ease-in-out "
      >
        <FaHome className="text-2xl" />
        <p className="underline opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {t("auth.home")}
        </p>
      </Link>

      {/* //*The other links */}
      <div className="flex flex-col justify-center flex-1 gap-8  w-full">
        <NavLink
          to="/menu/expenses"
          className="flex items-center gap-4 pl-1 transition-all duration-300 hover:scale-105 hover:bg-base-200 py-2"
        >
          <MdBarChart className="text-blue-600 text-4xl flex-shrink-0 " />
          <p className="text-md text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {t("menu.expense")}
          </p>
        </NavLink>
        <NavLink
          to="/menu/trips"
          className="flex items-center gap-4 pl-1 transition-all duration-300 hover:scale-105 hover:bg-base-200 py-2 "
        >
          <TbBeach className="text-amber-500 text-4xl flex-shrink-0" />
          <p className="text-md text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {t("menu.trip")}
          </p>
        </NavLink>
        <NavLink
          to="/menu/exchange"
          className="flex items-center gap-4 pl-1 transition-all duration-300 hover:scale-105 hover:bg-base-200 py-2"
        >
          <BsCurrencyExchange className="text-green-500 text-4xl flex-shrink-0" />
          <p className="text-md text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {t("menu.currency")}
          </p>
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center gap-4 pl-1 transition-all duration-300 hover:scale-105 hover:bg-base-200 py-2"
        >
          <IoMdSettings className="text-base-text text-4xl flex-shrink-0" />
          <p className="text-md text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {t("nav.settings")}
          </p>
        </NavLink>
      </div>
      <button
        onClick={logout}
        className="mb-24 bg-red-700 hover:bg-red-800 flex items-center gap-2 pl-1 transition-all duration-300 rounded-md py-2 w-2/4 group-hover:w-1/2 text-base"
      >
        <IoIosLogOut className="text-xl flex-shrink-0" />
        <p className="text-md text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ">
          {t("nav.logout")}
        </p>
      </button>
    </div>
  );
};

export default MenuBigScreen;
