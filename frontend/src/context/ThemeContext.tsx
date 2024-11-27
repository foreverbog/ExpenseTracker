import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

type ThemeContextType = {
  theme: string;
  themeToggler: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const themes: string[] = ["light", "dark", "retro", "lofi", "neon"];

type ThemeContextProviderProps = {
  children: ReactNode;
};

const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<string>(themes[0]);

  //*get theme from localStorage
  useEffect(() => {
    const storedTheme = Cookies.get("user-theme");
    if (storedTheme && themes.includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  const themeToggler = (newTheme: string) => {
    if (themes.includes(newTheme)) {
      setTheme(newTheme);
      Cookies.set("user-theme", newTheme, { expires: 365 });
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, themeToggler }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
