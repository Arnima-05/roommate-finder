// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PostListing from './pages/PostListing';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Match from "./pages/Match";
import Messages from "./pages/Messages";
import CompatibilityForm from "./pages/CompatibilityForm";

// Test profiles for demonstration
const initializeTestProfiles = () => {
  const existingProfiles = localStorage.getItem("compatibilityProfiles");
  if (!existingProfiles) {
    const testProfiles = [
      {
        userId: "test_user_1",
        username: "Sarah",
        wakeUpTime: "7:00 AM",
        bedTime: "11:00 PM",
        isEarlyBird: "early",
        quietMorning: "yes",
        smokes: "no",
        okWithSmoker: "no",
        drinks: "occasionally",
        parties: "no",
        cleanFrequency: "daily",
        sharedChores: "yes",
        tidyScale: "8",
        leaveDishes: "no",
        hasGuests: "rarely",
        okWithGuests: "yes",
        socialLevel: "friendly",
        playsLoudMusic: "no",
        usesHeadphones: "yes",
        noiseSensitive: "yes",
        hasPets: "no",
        okWithPets: "yes",
        petAllergy: "no",
        workFromHome: "yes",
        workingHours: "9 AM - 5 PM",
        quietNeeded: "yes",
        rentBudget: "15000",
        splitBills: "yes",
        foodSharing: "separate",
        genderPref: "female",
        religionCulture: "None specific",
        introExtro: "introvert"
      },
      {
        userId: "test_user_2",
        username: "Alex",
        wakeUpTime: "8:30 AM",
        bedTime: "12:30 AM",
        isEarlyBird: "night",
        quietMorning: "no",
        smokes: "no",
        okWithSmoker: "no",
        drinks: "yes",
        parties: "occasionally",
        cleanFrequency: "weekly",
        sharedChores: "yes",
        tidyScale: "6",
        leaveDishes: "sometimes",
        hasGuests: "sometimes",
        okWithGuests: "yes",
        socialLevel: "friendly",
        playsLoudMusic: "sometimes",
        usesHeadphones: "yes",
        noiseSensitive: "no",
        hasPets: "yes",
        okWithPets: "yes",
        petAllergy: "no",
        workFromHome: "no",
        workingHours: "10 AM - 6 PM",
        quietNeeded: "no",
        rentBudget: "12000",
        splitBills: "yes",
        foodSharing: "shared",
        genderPref: "any",
        religionCulture: "None specific",
        introExtro: "extrovert"
      },
      {
        userId: "test_user_3",
        username: "Priya",
        wakeUpTime: "6:00 AM",
        bedTime: "10:00 PM",
        isEarlyBird: "early",
        quietMorning: "yes",
        smokes: "no",
        okWithSmoker: "no",
        drinks: "no",
        parties: "no",
        cleanFrequency: "daily",
        sharedChores: "yes",
        tidyScale: "9",
        leaveDishes: "no",
        hasGuests: "rarely",
        okWithGuests: "no",
        socialLevel: "quiet",
        playsLoudMusic: "no",
        usesHeadphones: "always",
        noiseSensitive: "yes",
        hasPets: "no",
        okWithPets: "no",
        petAllergy: "yes",
        workFromHome: "yes",
        workingHours: "8 AM - 4 PM",
        quietNeeded: "yes",
        rentBudget: "18000",
        splitBills: "yes",
        foodSharing: "separate",
        genderPref: "female",
        religionCulture: "Vegetarian",
        introExtro: "introvert"
      },
      {
        userId: "test_user_4",
        username: "Mike",
        wakeUpTime: "9:00 AM",
        bedTime: "1:00 AM",
        isEarlyBird: "night",
        quietMorning: "no",
        smokes: "yes",
        okWithSmoker: "yes",
        drinks: "yes",
        parties: "yes",
        cleanFrequency: "bi-weekly",
        sharedChores: "no",
        tidyScale: "4",
        leaveDishes: "yes",
        hasGuests: "often",
        okWithGuests: "yes",
        socialLevel: "friendly",
        playsLoudMusic: "yes",
        usesHeadphones: "no",
        noiseSensitive: "no",
        hasPets: "no",
        okWithPets: "maybe",
        petAllergy: "no",
        workFromHome: "no",
        workingHours: "2 PM - 10 PM",
        quietNeeded: "no",
        rentBudget: "10000",
        splitBills: "yes",
        foodSharing: "shared",
        genderPref: "any",
        religionCulture: "None specific",
        introExtro: "extrovert"
      },
      {
        userId: "test_user_5",
        username: "Emma",
        wakeUpTime: "7:30 AM",
        bedTime: "11:30 PM",
        isEarlyBird: "early",
        quietMorning: "yes",
        smokes: "no",
        okWithSmoker: "no",
        drinks: "occasionally",
        parties: "sometimes",
        cleanFrequency: "weekly",
        sharedChores: "yes",
        tidyScale: "7",
        leaveDishes: "no",
        hasGuests: "sometimes",
        okWithGuests: "yes",
        socialLevel: "friendly",
        playsLoudMusic: "sometimes",
        usesHeadphones: "yes",
        noiseSensitive: "sometimes",
        hasPets: "no",
        okWithPets: "yes",
        petAllergy: "no",
        workFromHome: "hybrid",
        workingHours: "9 AM - 5 PM",
        quietNeeded: "sometimes",
        rentBudget: "14000",
        splitBills: "yes",
        foodSharing: "shared",
        genderPref: "any",
        religionCulture: "None specific",
        introExtro: "introvert"
      }
    ];
    
    localStorage.setItem("compatibilityProfiles", JSON.stringify(testProfiles));
    console.log("Test profiles initialized!");
  }
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check login status and profile on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      // Initialize test profiles if they don't exist
      initializeTestProfiles();
      
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && currentUser.id) {
        setIsLoggedIn(true);
        setUsername(currentUser.username);
        
        // Check if user has profile in localStorage
        const allProfiles = JSON.parse(localStorage.getItem("compatibilityProfiles")) || [];
        const userProfile = allProfiles.find(profile => profile.userId === currentUser.id);
        setHasProfile(!!userProfile);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setHasProfile(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  };

  // Login success handler
  const handleLogin = (name, userId) => {
    setIsLoggedIn(true);
    setUsername(name);
    
    // Check if user has profile in localStorage
    const allProfiles = JSON.parse(localStorage.getItem("compatibilityProfiles")) || [];
    const userProfile = allProfiles.find(profile => profile.userId === userId);
    setHasProfile(!!userProfile);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <Login
              onLogin={(name, userId) => handleLogin(name, userId)}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              onRegister={(name, userId) => handleLogin(name, userId)}
            />
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/post-listing" element={<PostListing isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        
        {/* Compatibility Form Route */}
        <Route
          path="/compatibility-form"
          element={
            isLoggedIn ? (
              <CompatibilityForm />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected Match Route */}
        <Route
          path="/match"
          element={
            isLoggedIn ? (
              hasProfile ? (
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

