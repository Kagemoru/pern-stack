import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";

// hooks
import useDarkMode from "../hooks/useDarkMode.js";

export default function AppLayout() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`app${darkMode ? " dark" : ""}`}>
      <header>
        <Navbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}
