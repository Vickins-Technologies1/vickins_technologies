
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import Preloader from "./Preloader";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemePreloaderProvider");
  }
  return context;
}

interface ThemePreloaderProviderProps {
  children: ReactNode;
}

export default function ThemePreloaderProvider({ children }: ThemePreloaderProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  // Load saved theme preference (default: light)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    setIsDarkMode(theme === "dark");
  }, []);

  // Hide preloader after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaderVisible(false);
    }, 2000); // Adjust as needed

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newTheme = prev ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      return !prev;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {isPreloaderVisible && <Preloader isDarkMode={isDarkMode} />}
      {children}
    </ThemeContext.Provider>
  );
}
