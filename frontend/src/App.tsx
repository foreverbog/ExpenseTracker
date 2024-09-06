import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
// import Navbar from "./components/Navbar";
import MainLayout from "./layout/MainLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const themeContext = useContext(ThemeContext);
  // console.log(themeContext);

  //*Checks if is true so that TS don't thinks is undefined when I am trying to destructure it
  if (!themeContext) {
    throw new Error("Must be used within a ThemeContextProvider");
  }

  const { theme } = themeContext;
  return (
    <div className={`theme-${theme} relative`}>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        transition={Zoom}
      />
      <Routes>
        <Route path="/home" element={<MainLayout />}>
          {/* <Route path="/home" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} /> */}
        </Route>
        <Route path="/" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
