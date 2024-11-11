import { useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHome, FaInfo } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";

type SidebarProps = {
  isSideBarOpen: boolean;
  handleSideBar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isSideBarOpen, handleSideBar }) => {
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const [t] = useTranslation("global");

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider");
  }
  const { isAuthenticated, user, logout } = authContext;

  //*useEffect for clicking outside the sidebar and closing the sidebar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target as Node) &&
        isSideBarOpen
      ) {
        handleSideBar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleSideBar, isSideBarOpen]);

  const handleLogout = () => {
    logout();
    handleSideBar();
  };

  return (
    <>
      {isSideBarOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
      )}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "50%" }}
        exit={{ width: 0, transition: { duration: 0.3 } }}
        transition={{
          type: "spring",
          stiffness: 100,
        }}
        ref={sideBarRef}
        className="bg-base-200 font-base text-base-text absolute top-0 right-0 min-h-dvh z-50 w-1/2  flex flex-col items-center justify-start overflow-hidden "
      >
        {isAuthenticated && (
          <div className="flex flex-wrap gap-2 text-4xl mt-24">
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
          </div>
        )}
        <div className="flex flex-col flex-1 gap-3 justify-center items-center ">
          <NavLink
            onClick={handleSideBar}
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg xs:text-2xl  ${
                isActive &&
                "underline underline-offset-4 decoration-primary decoration-2"
              }`
            }
          >
            <FaHome />
            <p>{t("nav.home")}</p>
          </NavLink>
          <NavLink
            onClick={handleSideBar}
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg xs:text-2xl  ${
                isActive &&
                "underline underline-offset-4 decoration-primary decoration-2"
              }`
            }
          >
            <FaInfo />
            <p>{t("nav.about")}</p>
          </NavLink>
          <NavLink
            onClick={handleSideBar}
            to="/contact"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg xs:text-2xl  ${
                isActive &&
                "underline underline-offset-4 decoration-primary decoration-2"
              }`
            }
          >
            <FiMessageSquare />
            <p>{t("nav.contact")}</p>
          </NavLink>
          <NavLink
            to="/set"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg xs:text-2xl  ${
                isActive &&
                "underline underline-offset-4 decoration-primary decoration-2"
              }`
            }
          >
            <IoMdSettings />
            <p>{t("nav.settings")}</p>
          </NavLink>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-700 flex justify-center items-center gap-2 rounded-md w-3/4 sm:w-1/2   py-2 hover:bg-red-800 mb-24 overflow-hidden text-lg xs:text-lg "
          >
            <IoIosLogOut />
            <p>{t("nav.logout")}</p>
          </button>
        )}
      </motion.div>
    </>
  );
};

export default Sidebar;
