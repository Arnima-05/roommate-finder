// src/Match.js
import React, { useEffect, useState } from "react";
import "./Match.css";

const calculateCompatibilityScore = (user1, user2) => {
  let score = 0;
  let totalWeight = 0;

  const compare = (field, weight = 1) => {
    totalWeight += weight;
    if ((user1[field] || "").toString().toLowerCase() === (user2[field] || "").toString().toLowerCase()) {
      score += weight;
    }
  };

  // Daily Routine (higher weight)
  compare("wakeUpTime", 2);
  compare("bedTime", 2);
  compare("isEarlyBird", 2);
  compare("quietMorning", 2);

  // Smoking & Alcohol
  compare("smokes", 3);
  compare("okWithSmoker", 3);
  compare("drinks", 2);
  compare("parties", 2);

  // Cleanliness
  compare("cleanFrequency", 3);
  compare("sharedChores", 3);
  compare("tidyScale", 3);
  compare("leaveDishes", 2);

  // Guests & Social
  compare("hasGuests", 1);
  compare("okWithGuests", 2);
  compare("socialLevel", 2);

  // Noise
  compare("playsLoudMusic", 2);
  compare("usesHeadphones", 2);
  compare("noiseSensitive", 2);

  // Pets
  compare("hasPets", 2);
  compare("okWithPets", 2);
  compare("petAllergy", 2);

  // Work/Study
  compare("workFromHome", 1);
  compare("workingHours", 1);
  compare("quietNeeded", 1);

  // Budget & Food
  compare("rentBudget", 1);
  compare("splitBills", 2);
  compare("foodSharing", 1);

  // Preferences
  compare("genderPref", 1);
  compare("religionCulture", 1);
  compare("introExtro", 1);

  const percentage = (score / totalWeight) * 100;
  return Math.round(percentage);
};

const Match = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (!currentUser) {
      alert("Please fill out the Compatibility Form first.");
      return;
    }

    const filtered = allUsers
      .filter((u) => JSON.stringify(u) !== JSON.stringify(currentUser))
      .map((u, index) => ({
        id: index,
        user: u,
        score: calculateCompatibilityScore(currentUser, u),
      }))
      .sort((a, b) => b.score - a.score);

    setMatches(filtered);
  }, []);

  return (
    <div className="match-container">
      <h2>🎯 Best Roommate Matches</h2>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        matches.map((match) => (
          <div key={match.id} className="match-card">
            <h3>Match Score: {match.score}%</h3>
            <ul>
              <li><strong>Wake Up:</strong> {match.user.wakeUpTime}</li>
              <li><strong>Bed Time:</strong> {match.user.bedTime}</li>
              <li><strong>Smokes:</strong> {match.user.smokes}</li>
              <li><strong>Drinks:</strong> {match.user.drinks}</li>
              <li><strong>Tidiness:</strong> {match.user.tidyScale}</li>
              <li><strong>Guests:</strong> {match.user.hasGuests}</li>
              <li><strong>Pets:</strong> {match.user.hasPets}</li>
              <li><strong>Budget:</strong> ₹{match.user.rentBudget}</li>
              <li><strong>Intro/Extro:</strong> {match.user.introExtro}</li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Match;
