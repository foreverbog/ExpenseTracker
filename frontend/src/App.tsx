import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
// import Navbar from "./components/Navbar";
import MainLayout from "./layout/MainLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

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
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
