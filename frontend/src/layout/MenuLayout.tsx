import MenuSmallScreen from "../components/MenuSmallScreen";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MenuBigScreen from "../components/MenuBigScreen";
import useMediaQuery from "../hooks/useMediaQuery";
import { Outlet } from "react-router-dom";

const MenuLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider ");
  }
  const { logout } = authContext;
  console.log(`Small screen is = ${isSmallScreen} `);

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
        <Outlet />
      </div>
    </>
  );
};

export default MenuLayout;
