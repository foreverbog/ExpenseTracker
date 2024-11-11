import Footer from "../components/Landing/Footer";
import Navbar from "../components/Navigation/Navbar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="bg-base ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
