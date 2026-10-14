import { useState } from "react";
import { Routes, Route } from "react-router";

// compnents
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

// pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  function toggleDarkMode() {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("darkMode", String(nextMode));
  }

  // return (
  //   <div className={`app${darkMode ? " dark" : ""}`}>
  //     <button type="button" aria-pressed={darkMode} onClick={toggleDarkMode}>
  //       {darkMode ? "☀ Light mode" : "☾ Dark mode"}
  //     </button>

  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/forgot-password" element={<ForgotPassword />} />
  //       <Route
  //         path="/dashboard"
  //         element={
  //           <ProtectedRoute>
  //             <Dashboard />
  //           </ProtectedRoute>
  //         }
  //       />
  //       <Route path="*" element={<NotFound />} />
  //     </Routes>
  //   </div>
  // );

  return (
    <div className={`app${darkMode ? " dark" : ""}`}>
      <header>
        <Navbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode}/>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer></footer>
    </div>
  );
}
