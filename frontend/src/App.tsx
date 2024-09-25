import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import MainLayout from "./layout/MainLayout";
import Menu from "./components/Menu";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";

function App() {
  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  console.log(authContext);

  //*Checks if is true so that TS don't thinks is undefined when I am trying to destructure it
  if (!authContext) {
    throw new Error("Must be used within a AuthContextProvider");
  }
  if (!themeContext) {
    throw new Error("Must be used within a ThemeContextProvider");
  }

  const { theme } = themeContext;
  const { isAuthenticated } = authContext;
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
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route
          path="/auth"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Authentication />
          }
        />
        <Route
          path="/menu"
          element={isAuthenticated ? <Menu /> : <Navigate to="/auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
