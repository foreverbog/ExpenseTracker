import { Link, NavLink } from "react-router-dom";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { MdBarChart } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { BsCurrencyExchange } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Menu = () => {
  const [t] = useTranslation("global");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return new Error("useContext must be used within an AuthContextProvider ");
  }
  const { logout } = authContext;

  return (
    <div className="bg-base font-base text-base-text h-dvh flex flex-col  items-center relative">
      {/* //*Back to home Link */}
      <Link
        to="/home"
        className="absolute left-4 top-4 flex justify-center items-center gap-2 text-base-text group hover:text-primary hover:scale-105 transition duration-300 ease-in-out"
      >
        <FaHome />
        <p className="underline">Home</p>
      </Link>
      <div className="flex flex-col justify-center items-center flex-1 gap-8 w-full overflow-hidden ">
        <NavLink
          to="/home"
          className="flex flex-wrap  text-center gap-2 items-center justify-center   text-2xl xs:text-4xl  hover:scale-110 transition-transform duration-500 ease-in-out p-2"
        >
          <MdBarChart className="text-blue-600 text-3xl xs:text-5xl" />
          <p>{t("menu.expense")}</p>
        </NavLink>
        <NavLink
          to="/home"
          className="flex flex-wrap  text-center gap-2 items-center justify-center  text-2xl xs:text-4xl  hover:scale-110 transition-transform duration-500 ease-in-out p-2"
        >
          <TbBeach className="text-amber-500 text-3xl xs:text-5xl" />
          <p>{t("menu.trip")}</p>
        </NavLink>
        <NavLink
          to="/home"
          className="flex flex-wrap text-center gap-2 items-center justify-center  text-2xl xs:text-4xl  hover:scale-110 transition-transform duration-500 ease-in-out p-2"
        >
          <BsCurrencyExchange className="text-green-500 text-3xl xs:text-5xl" />
          <p>{t("menu.currency")}</p>
        </NavLink>
        <NavLink
          to="/home"
          className="flex flex-wrap text-center gap-2 items-center justify-center  text-2xl xs:text-4xl  hover:scale-110 transition-transform duration-500 ease-in-out p-2"
        >
          <IoMdSettings className="text-base-text text-3xl xs:text-5xl" />
          <p>{t("nav.settings")}</p>
        </NavLink>
      </div>
      <button
        onClick={logout}
        className="mb-24 bg-red-700 hover:bg-red-800 flex items-center justify-center gap-2 rounded-md py-2 w-1/2 xs:w-1/3 xs:text-xl "
      >
        <IoIosLogOut />
        <p>{t("nav.logout")}</p>
      </button>
    </div>
  );
};

export default Menu;
