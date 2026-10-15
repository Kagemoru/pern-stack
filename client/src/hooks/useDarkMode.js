import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((currentMode) => !currentMode);
  }

  return { darkMode, toggleDarkMode };
}
