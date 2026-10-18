import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { logout } from "../services/authService.js";

export default function LogoutBtn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuthenticated } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      await logout();
      setAuthenticated(false);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="nav-btn logout-btn"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
