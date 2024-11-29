import Footer from "../components/Landing/Footer";
import Navbar from "../components/Navigation/Navbar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="bg-base flex flex-col min-h-screen overflow-scroll">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
