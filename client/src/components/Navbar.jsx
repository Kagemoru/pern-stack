import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import DarkModeBtn from "./DarkModeBtn.jsx";
import LogoutBtn from "./LogoutBtn.jsx";

export default function Navbar({ darkMode, onToggleDarkMode }) {
  const { authenticated } = useAuth();
  
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
