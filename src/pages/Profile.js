import React, { useState, useEffect } from "react";
import "./Profile.css";

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

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile"); // "profile" or "matches"

  useEffect(() => {
    const loadProfileAndMatches = () => {
      try {
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.id) {
          setLoading(false);
          return;
        }

        // Get user's compatibility profile
        const allProfiles = JSON.parse(localStorage.getItem("compatibilityProfiles")) || [];
        const userProfile = allProfiles.find(profile => profile.userId === currentUser.id);
        
        if (userProfile) {
          setUserProfile(userProfile);
          
          // Get other users' profiles for matching
          const otherProfiles = allProfiles.filter(profile => profile.userId !== currentUser.id);
          
          // Calculate compatibility scores
          const matchesWithScores = otherProfiles.map(profile => ({
            id: profile.userId,
            username: profile.username,
            score: calculateCompatibilityScore(userProfile, profile),
            profile: profile
          }));

          // Sort by compatibility score (highest first)
          matchesWithScores.sort((a, b) => b.score - a.score);
          setMatches(matchesWithScores);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading profile:", error);
        setLoading(false);
      }
    };

    loadProfileAndMatches();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="profile-container">
        <h2>No Profile Found</h2>
        <p>Please fill out the compatibility form first to view your profile and matches.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Your Profile & Matches</h1>
      
      {/* Tab Navigation */}
      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          📋 My Profile
        </button>
        <button 
          className={`tab-button ${activeTab === "matches" ? "active" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          🎯 View Roommates ({matches.length})
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="profile-content">
          <h2>Your Compatibility Profile</h2>
          <div className="profile-sections">
            <div className="profile-section">
              <h3>📅 Daily Routine</h3>
              <ul>
                <li><strong>Wake Up Time:</strong> {userProfile.wakeUpTime}</li>
                <li><strong>Bed Time:</strong> {userProfile.bedTime}</li>
                <li><strong>Type:</strong> {userProfile.isEarlyBird}</li>
                <li><strong>Quiet Morning:</strong> {userProfile.quietMorning}</li>
              </ul>
            </div>

            <div className="profile-section">
              <h3>🚬 Lifestyle</h3>
              <ul>
                <li><strong>Smokes:</strong> {userProfile.smokes}</li>
                <li><strong>Okay with Smoker:</strong> {userProfile.okWithSmoker}</li>
                <li><strong>Drinks:</strong> {userProfile.drinks}</li>
                <li><strong>Parties:</strong> {userProfile.parties}</li>
              </ul>
            </div>

            <div className="profile-section">
              <h3>🧹 Cleanliness</h3>
              <ul>
                <li><strong>Clean Frequency:</strong> {userProfile.cleanFrequency}</li>
                <li><strong>Shared Chores:</strong> {userProfile.sharedChores}</li>
                <li><strong>Tidiness Scale:</strong> {userProfile.tidyScale}/10</li>
                <li><strong>Leave Dishes:</strong> {userProfile.leaveDishes}</li>
              </ul>
            </div>

            <div className="profile-section">
              <h3>🏠 Living Preferences</h3>
              <ul>
                <li><strong>Has Guests:</strong> {userProfile.hasGuests}</li>
                <li><strong>Okay with Guests:</strong> {userProfile.okWithGuests}</li>
                <li><strong>Social Level:</strong> {userProfile.socialLevel}</li>
                <li><strong>Has Pets:</strong> {userProfile.hasPets}</li>
                <li><strong>Okay with Pets:</strong> {userProfile.okWithPets}</li>
                <li><strong>Pet Allergy:</strong> {userProfile.petAllergy}</li>
              </ul>
            </div>

            <div className="profile-section">
              <h3>🔊 Noise Preferences</h3>
              <ul>
                <li><strong>Plays Loud Music:</strong> {userProfile.playsLoudMusic}</li>
                <li><strong>Uses Headphones:</strong> {userProfile.usesHeadphones}</li>
                <li><strong>Noise Sensitive:</strong> {userProfile.noiseSensitive}</li>
              </ul>
            </div>

            <div className="profile-section">
              <h3>💼 Work/Study</h3>
              <ul>
                <li><strong>Work From Home:</strong> {userProfile.workFromHome}</li>
                <li><strong>Working Hours:</strong> {userProfile.workingHours}</li>
                <li><strong>Quiet Needed:</strong> {userProfile.quietNeeded}</li>
              </ul>
            </div>

            <div className="profile-section">
              <h3>💰 Budget & Food</h3>
              <ul>
                <li><strong>Rent Budget:</strong> ₹{userProfile.rentBudget}</li>
                <li><strong>Split Bills:</strong> {userProfile.splitBills}</li>
                <li><strong>Food Sharing:</strong> {userProfile.foodSharing}</li>
              </ul>
            </div>

            <div className="profile-section">
              <h3>👥 Preferences</h3>
              <ul>
                <li><strong>Gender Preference:</strong> {userProfile.genderPref}</li>
                <li><strong>Religion/Culture:</strong> {userProfile.religionCulture}</li>
                <li><strong>Personality:</strong> {userProfile.introExtro}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Matches Tab */}
      {activeTab === "matches" && (
        <div className="matches-content">
          <h2>🎯 Your Best Roommate Matches</h2>
          {matches.length === 0 ? (
            <div>
              <p>No matches found yet.</p>
              <p>Make sure other users have filled out their compatibility forms!</p>
            </div>
          ) : (
            matches.map((match) => (
              <div key={match.id} className="match-card">
                <h3>
                  <span style={{ color: '#3b82f6' }}>{match.username}</span> - 
                  <span style={{ color: '#10b981' }}> {match.score}% Match</span>
                </h3>
                <div className="match-details">
                  <div className="match-section">
                    <h4>📅 Daily Routine</h4>
                    <ul>
                      <li><strong>Wake Up:</strong> {match.profile.wakeUpTime}</li>
                      <li><strong>Bed Time:</strong> {match.profile.bedTime}</li>
                      <li><strong>Type:</strong> {match.profile.isEarlyBird}</li>
                    </ul>
                  </div>
                  
                  <div className="match-section">
                    <h4>🚬 Lifestyle</h4>
                    <ul>
                      <li><strong>Smokes:</strong> {match.profile.smokes}</li>
                      <li><strong>Drinks:</strong> {match.profile.drinks}</li>
                      <li><strong>Parties:</strong> {match.profile.parties}</li>
                    </ul>
                  </div>
                  
                  <div className="match-section">
                    <h4>🧹 Cleanliness</h4>
                    <ul>
                      <li><strong>Clean Frequency:</strong> {match.profile.cleanFrequency}</li>
                      <li><strong>Tidiness Scale:</strong> {match.profile.tidyScale}/10</li>
                      <li><strong>Shared Chores:</strong> {match.profile.sharedChores}</li>
                    </ul>
                  </div>
                  
                  <div className="match-section">
                    <h4>🏠 Living Preferences</h4>
                    <ul>
                      <li><strong>Guests:</strong> {match.profile.hasGuests}</li>
                      <li><strong>Pets:</strong> {match.profile.hasPets}</li>
                      <li><strong>Budget:</strong> ₹{match.profile.rentBudget}</li>
                    </ul>
                  </div>
                  
                  <div className="match-section">
                    <h4>👥 Personality</h4>
                    <ul>
                      <li><strong>Social Level:</strong> {match.profile.socialLevel}</li>
                      <li><strong>Type:</strong> {match.profile.introExtro}</li>
                      <li><strong>Work From Home:</strong> {match.profile.workFromHome}</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

