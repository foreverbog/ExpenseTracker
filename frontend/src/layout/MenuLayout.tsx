import MenuSmallScreen from "../components/MenuSmallScreen";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MenuBigScreen from "../components/MenuBigScreen";
import useMediaQuery from "../hooks/useMediaQuery";
import { Outlet, useLocation } from "react-router-dom";
import MenuTitleComponent from "../components/MenuTitleComponent";
import { useTranslation } from "react-i18next";

export type MenuContextType = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const { t } = useTranslation("global");
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider ");
  }
  const { logout } = authContext;

  const location = useLocation();

  useEffect(() => {
    const handleBackClick = () => {
      setIsMenuOpen((prev) => !prev);
    };

    window.addEventListener("popstate", handleBackClick);

    return () => {
      window.removeEventListener("popstate", handleBackClick);
    };
  }, []);

  const findTitle = () => {
    if (location.pathname === "/menu/expenses") {
      return t("expenses.title");
    } else if (location.pathname === "/menu/trips") {
      return t("trips.title");
    } else {
      return t("exchange.title");
    }
  };

  return (
    <>
      {isSmallScreen ? (
        <MenuSmallScreen
          logout={logout}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      ) : (
        <MenuBigScreen logout={logout} />
      )}
      <div className={`${!isSmallScreen && "ml-11"}`}>
        <MenuTitleComponent title={findTitle()} setIsMenuOpen={setIsMenuOpen} />
        <Outlet context={{ setIsMenuOpen }} />
      </div>
    </>
  );
};

export default MenuLayout;
