import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((currentMode) => !currentMode);
  }

  return { darkMode, toggleDarkMode };
}
