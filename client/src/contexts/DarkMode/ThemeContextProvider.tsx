import { useContext, useEffect, useState } from "react";

import { ThemeContext } from "./ThemeContext";

type ThemeContextContextProviderProps = {
  children: React.ReactNode;
};

function ThemeContextProvider({ children }: ThemeContextContextProviderProps) {
  const initialState = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme ? JSON.parse(savedTheme) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  const toggleDarkMode = () => setIsDarkMode((isDark: boolean) => !isDark);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { ThemeContextProvider, useDarkMode };
