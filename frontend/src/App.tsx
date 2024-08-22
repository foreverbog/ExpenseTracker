import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Navbar from "./components/Navbar";

function App() {
  const themeContext = useContext(ThemeContext);
  // console.log(themeContext);

  //*Checks if is true so that TS don't thinks is undefined when I am trying to destructure it
  if (!themeContext) {
    throw new Error("Must be used within a ThemeContextProvider");
  }

  const { theme } = themeContext;
  return (
    <div className={`theme-${theme}`}>
      <Navbar />
      {/* <div className="bg-primary text-text">
        <p
          onClick={() => {
            themeToggler("dark");
          }}
        >
          dark
        </p>
        <p
          onClick={() => {
            themeToggler("light");
          }}
        >
          light
        </p>
        <p
          onClick={() => {
            themeToggler("neon");
          }}
        >
          neon
        </p>
      </div> */}
    </div>
  );
}

export default App;
