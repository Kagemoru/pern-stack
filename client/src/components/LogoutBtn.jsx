import { useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "../services/authService.js";

export default function LogoutBtn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Log out"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}