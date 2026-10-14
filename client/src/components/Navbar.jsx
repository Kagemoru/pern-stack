import { useState, useEffect } from "react";
import { Link } from "react-router";
import DarkMode from "./DarkMode.jsx";

export default function Navbar({ darkMode, onToggleDarkMode}) {
  const [authenticated, setAuthenticated] = useState(null);

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
              <button>Logout</button>
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
          <DarkMode darkMode={darkMode} onToggle={onToggleDarkMode} />
        </li>
      </ul>
    </nav>
  );
}
