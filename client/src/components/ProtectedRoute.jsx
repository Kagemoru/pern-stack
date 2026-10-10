import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { checkAuth } from "../services/authService.js";

export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
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
  }, []);

  if (authenticated === null) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
