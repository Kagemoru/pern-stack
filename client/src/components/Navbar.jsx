import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import DarkModeBtn from "./DarkModeBtn.jsx";
import LogoutBtn from "./LogoutBtn.jsx";
import { checkAuth } from "../services/authService.js";

export default function Navbar({ darkMode, onToggleDarkMode }) {
  const [authenticated, setAuthenticated] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);

    let isMounted = true;

    const loadAuthStatus = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (isMounted) setAuthenticated(isAuthenticated);
      } catch {
        if (isMounted) setAuthenticated(false);
      }
    };

    loadAuthStatus();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  return (
    <nav>
      <Link to="/">PERN STACK</Link>
      <ul>
        {authenticated ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <LogoutBtn />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        <li>
          <DarkModeBtn darkMode={darkMode} onToggle={onToggleDarkMode} />
        </li>
      </ul>
    </nav>
  );
}
