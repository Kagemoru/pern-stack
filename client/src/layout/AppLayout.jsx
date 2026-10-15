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
      <footer>
        <a
          href="https://github.com/Kagemoru/pern-stack"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View this project on GitHub"
        >
          GitHub repo
        </a>
      </footer>
    </div>
  );
}
