import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";
import gitHubLogo from "../assets/github-fill-svgrepo-com.svg";

// hooks
import useDarkMode from "../hooks/useDarkMode.js";

export default function AppLayout() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="pern-app">
      <header>
        <Navbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h4>
              &copy; 2026{" "}
              <a href="https://github.com/Kagemoru" target="_blank">
                <p>Kagemoru</p>
              </a>
            </h4>
          </div>

          <div className="footer-section">
            <a
              href="https://github.com/Kagemoru/pern-stack"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View this project on GitHub"
            >
              <img src={gitHubLogo} className="svg" />
              <h4>Project Repository</h4>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
