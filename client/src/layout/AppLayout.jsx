import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";

export default function AppLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  function toggleDarkMode() {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("darkMode", String(nextMode));
  }

  return (
    <div className={`app${darkMode ? " dark" : ""}`}>
      <header>
        <Navbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        
      </footer>
    </div>
  );
}
