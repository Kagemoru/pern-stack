import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "../services/authService.js";

// createContext - creates a context to share authentication data across components
// without having to pass props manually through the component tree.
const AuthContext = createContext();

//! AuthProvider - provides authentication state and functions to child components
// so they can access and update the user's authentication status.
export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadAuthStatus = async () => {
      try {
        // Check whether the user is authenticated when the component mounts.
        const currentUser = await checkAuth();

        // Update the authentication state only if the component is still mounted.
        if (isMounted) {
          setUser(currentUser);
          setAuthenticated(Boolean(currentUser));
        }
      } catch {
        // If the authentication check fails, treat the user as unauthenticated.
        if (isMounted) {
          setUser(null);
          setAuthenticated(false);
        }
      }
    };

    loadAuthStatus();

    // Prevent state updates if the component unmounts before the check finishes.
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    // Provide the authentication state and its updater to all child components.
    <AuthContext.Provider value={{ authenticated, setAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

//! useAuth - a custom hook that lets components access the authentication context.
export function useAuth() {
  const context = useContext(AuthContext);

  // Throw an error if this hook is used outside the AuthProvider.
  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
