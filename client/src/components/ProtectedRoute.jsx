import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { authenticated } = useAuth();

  if (authenticated === null) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
