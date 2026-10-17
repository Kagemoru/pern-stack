import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import DarkModeBtn from "./DarkModeBtn.jsx";
import LogoutBtn from "./LogoutBtn.jsx";

export default function Navbar({ darkMode, onToggleDarkMode }) {
  const { authenticated } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <svg
          className="svg nav-pern-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M5.0333 14.8284L6.44751 16.2426L10.6902 12L6.44751 7.75733L5.0333 9.17155L7.86172 12L5.0333 14.8284Z"
            fill="currentColor"
          />
          <path d="M15 14H11V16H15V14Z" fill="currentColor" />
          <path
            d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.895431 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM22 4H2L2 20H22V4Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <h1>PERN STACK</h1>
      </Link>

      <ul className="navbar-links">
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
              <Link to="/login">
                <h2>Login</h2>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <h2>Register</h2>
              </Link>
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
