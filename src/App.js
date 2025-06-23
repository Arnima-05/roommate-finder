// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PostListing from './pages/PostListing';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Match from "./pages/Match";
import CompatibilityForm from "./pages/CompatibilityForm";

// Check if compatibility form is filled
import { hasSubmittedForm } from "./utils";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <Login
              onLogin={(name) => {
                setIsLoggedIn(true);
                setUsername(name);
              }}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              onRegister={(name) => {
                setIsLoggedIn(true);
                setUsername(name);
              }}
            />
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/post-listing" element={<PostListing isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/compatibility-form" element={<CompatibilityForm />} />

        {/* ✅ Protected Match Route */}
        <Route
          path="/match"
          element={
            isLoggedIn ? (
              hasSubmittedForm() ? (
                <Match />
              ) : (
                <Navigate to="/compatibility-form" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;

