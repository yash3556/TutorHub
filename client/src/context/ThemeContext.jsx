import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const readInitialTheme = () => {
  const isDark = (localStorage.getItem("tutorhub-theme") ?? localStorage.getItem("student-theme")) === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  return isDark;
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(readInitialTheme);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("tutorhub-theme", theme);
  }, [isDark]);

  const value = useMemo(() => ({ isDark, setIsDark }), [isDark]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
