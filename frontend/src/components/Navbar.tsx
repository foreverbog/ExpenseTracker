import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LogoVector } from "../assets/svg/BrandsVectors";
import { AuthContext } from "../context/AuthContext";
import NavbarUserIcon from "./NavbarUserIcon";
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";
const Navbar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const [t] = useTranslation("global");

  //* open/close the sidebar and add the no scroll to it if open
  const handleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
    if (isSideBarOpen) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
  };
  //* useEffect to automatically close the sidebar on bigger screens
  useEffect(() => {
    if (!isSmallScreen) {
      setIsSideBarOpen(false);
    }
  }, [isSmallScreen]);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider");
  }

  const { isAuthenticated, logout } = authContext;

  return (
    <>
      <nav className="  text-text text-base-text p-4 flex justify-between  items-center bg-transparent absolute w-full top-0 z-10 mb-24">
        <div className="flex flex-1 gap-24  items-center ">
          <NavLink className="group" to="/">
            <LogoVector />
          </NavLink>
          <ul className=" hidden md:flex  w-full text-xl gap-16  text-base-text font-base ">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-primary decoration-2"
                  : "hover:text-primary transition duration-300 ease-linear"
              }
              to="/"
            >
              {t("nav.home")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-primary decoration-2"
                  : "hover:text-primary transition duration-300 ease-linear"
              }
              to="/about"
            >
              {t("nav.about")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-primary decoration-2"
                  : "hover:text-primary transition duration-300 ease-linear"
              }
              to="/contact"
            >
              {t("nav.contact")}
            </NavLink>
          </ul>
        </div>
        <div className="flex items-center gap-2 md:mr-24">
          {isAuthenticated && !isSmallScreen ? (
            <NavbarUserIcon
              logout={logout}
              isUserOpen={isUserOpen}
              setIsUserOpen={setIsUserOpen}
              isThemeOpen={isThemeOpen}
              setIsThemeOpen={setIsThemeOpen}
              isLanguageOpen={isLanguageOpen}
              setIsLanguageOpen={setIsLanguageOpen}
            />
          ) : null}

          <ThemeSelector
            isSmallScreen={isSmallScreen}
            isUserOpen={isUserOpen}
            setIsUserOpen={setIsUserOpen}
            isThemeOpen={isThemeOpen}
            setIsThemeOpen={setIsThemeOpen}
            isLanguageOpen={isLanguageOpen}
            setIsLanguageOpen={setIsLanguageOpen}
          />
          <LanguageSelector
            isUserOpen={isUserOpen}
            setIsUserOpen={setIsUserOpen}
            isLanguageOpen={isLanguageOpen}
            setIsLanguageOpen={setIsLanguageOpen}
            isThemeOpen={isThemeOpen}
            setIsThemeOpen={setIsThemeOpen}
          />
          <GiHamburgerMenu
            onClick={handleSideBar}
            className="text-3xl md:hidden text-secondary-text hover:cursor-pointer"
          />
        </div>
      </nav>
      <AnimatePresence>
        {isSideBarOpen && (
          <Sidebar
            isSideBarOpen={isSideBarOpen}
            handleSideBar={handleSideBar}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
