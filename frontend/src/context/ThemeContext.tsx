import { createContext, ReactNode, useEffect, useState } from "react";

type ThemeContextType = {
  theme: string;
  themeToggler: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const themes: string[] = ["light", "dark", "neon"];

type ThemeContextProviderProps = {
  children: ReactNode;
};

const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<string>(themes[0]);

  //*get theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("user-theme");
    if (storedTheme && themes.includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  const themeToggler = (newTheme: string) => {
    if (themes.includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem("user-theme", newTheme);
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, themeToggler }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
