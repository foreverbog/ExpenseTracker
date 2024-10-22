import MenuSmallScreen from "../components/MenuSmallScreen";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MenuBigScreen from "../components/MenuBigScreen";
import useMediaQuery from "../hooks/useMediaQuery";
import { Outlet } from "react-router-dom";

export type MenuContextType = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider ");
  }
  const { logout } = authContext;
  // console.log(`Small screen is = ${isSmallScreen} `);

  useEffect(() => {
    const handleBackClick = () => {
      setIsMenuOpen((prev) => !prev);
    };

    window.addEventListener("popstate", handleBackClick);

    return () => {
      window.removeEventListener("popstate", handleBackClick);
    };
  }, []);

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
        <Outlet context={{ setIsMenuOpen }} />
      </div>
    </>
  );
};

export default MenuLayout;
