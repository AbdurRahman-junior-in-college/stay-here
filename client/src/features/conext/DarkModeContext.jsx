import { useContext } from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { userLocalStorage } from "../../hooks/useLocalStorage";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const initialStateOfSystem = window.matchMedia(
    "(prefer-color-scheme:dark)"
  ).matches;
  const [isDarkMode, setIsDarkMode] = userLocalStorage(
    initialStateOfSystem,
    "isDarkMode"
  );

  const [searchQuery, setSearchQuery] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode((isDark) => !isDark);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, toggleDarkMode, searchQuery, setSearchQuery }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === "undefined") {
    throw new Error("Dark Mode was used outside of DarkModeProvider");
  }
  return context;
}

export { useDarkMode, DarkModeProvider };
