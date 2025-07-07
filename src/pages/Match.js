// src/Match.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditPrompt, setShowEditPrompt] = useState(false);

  useEffect(() => {
    const fetchMatches = () => {
      try {
        // Get current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.id) {
          setError("Please login first!");
          setLoading(false);
          return;
        }

        // Get all compatibility profiles from localStorage
        const allProfiles = JSON.parse(localStorage.getItem("compatibilityProfiles")) || [];
        
        // Find current user's profile
        const currentUserProfile = allProfiles.find(profile => profile.userId === currentUser.id);
        
        if (!currentUserProfile) {
          setError("Please fill out the compatibility form first!");
          setLoading(false);
          return;
        }

        // Check if user already has a profile - show edit prompt
        setShowEditPrompt(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleShowMatches = () => {
    setShowEditPrompt(false);
    loadMatches();
  };

  const handleEditForm = () => {
    navigate("/compatibility-form");
  };

  const loadMatches = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const allProfiles = JSON.parse(localStorage.getItem("compatibilityProfiles")) || [];
      const currentUserProfile = allProfiles.find(profile => profile.userId === currentUser.id);
      
      // Get other users' profiles (excluding current user)
      const otherProfiles = allProfiles.filter(profile => profile.userId !== currentUser.id);

      // Calculate compatibility scores and connection status
      const matchesWithScores = otherProfiles.map(profile => {
        const connectionStatus = getConnectionStatus(currentUser.id, profile.userId);
        return {
          id: profile.userId,
          username: profile.username,
          score: calculateCompatibilityScore(currentUserProfile, profile),
          profile: profile,
          connectionStatus: connectionStatus
        };
      });

      // Sort by compatibility score (highest first)
      matchesWithScores.sort((a, b) => b.score - a.score);

      setMatches(matchesWithScores);
    } catch (error) {
      console.error("Error loading matches:", error);
      setError("Failed to load matches");
    }
  };

  const getConnectionStatus = (currentUserId, otherUserId) => {
    const connections = JSON.parse(localStorage.getItem("connections")) || [];
    
    // Check if there's a mutual connection
    const mutualConnection = connections.find(conn => 
      (conn.user1 === currentUserId && conn.user2 === otherUserId) ||
      (conn.user1 === otherUserId && conn.user2 === currentUserId)
    );

    if (mutualConnection) {
      return "connected";
    }

    // Check if current user sent a request
    const sentRequest = connections.find(conn => 
      conn.from === currentUserId && conn.to === otherUserId && conn.status === "pending"
    );

    if (sentRequest) {
      return "request_sent";
    }

    // Check if current user received a request
    const receivedRequest = connections.find(conn => 
      conn.from === otherUserId && conn.to === currentUserId && conn.status === "pending"
    );

    if (receivedRequest) {
      return "request_received";
    }

    return "not_connected";
  };

  const handleConnect = (otherUserId, otherUsername) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const connections = JSON.parse(localStorage.getItem("connections")) || [];
      
      // Check if already connected
      const existingConnection = connections.find(conn => 
        (conn.user1 === currentUser.id && conn.user2 === otherUserId) ||
        (conn.user1 === otherUserId && conn.user2 === currentUser.id)
      );

      if (existingConnection) {
        alert("You are already connected with this user!");
        return;
      }

      // Check if request already sent
      const existingRequest = connections.find(conn => 
        conn.from === currentUser.id && conn.to === otherUserId && conn.status === "pending"
      );

      if (existingRequest) {
        alert("Connection request already sent!");
        return;
      }

      // Send connection request
      const newRequest = {
        from: currentUser.id,
        to: otherUserId,
        fromUsername: currentUser.username,
        toUsername: otherUsername,
        status: "pending",
        timestamp: new Date().toISOString()
      };

      connections.push(newRequest);
      localStorage.setItem("connections", JSON.stringify(connections));

      // Update matches to reflect the change
      loadMatches();
      alert("Connection request sent! They'll be notified when they log in.");
    } catch (error) {
      console.error("Error sending connection request:", error);
      alert("Failed to send connection request");
    }
  };

  const handleAcceptRequest = (fromUserId, fromUsername) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const connections = JSON.parse(localStorage.getItem("connections")) || [];
      
      // Find and remove the pending request
      const requestIndex = connections.findIndex(conn => 
        conn.from === fromUserId && conn.to === currentUser.id && conn.status === "pending"
      );

      if (requestIndex === -1) {
        alert("Request not found!");
        return;
      }

      connections.splice(requestIndex, 1);

      // Create mutual connection
      const mutualConnection = {
        user1: currentUser.id,
        user2: fromUserId,
        user1Username: currentUser.username,
        user2Username: fromUsername,
        connectedAt: new Date().toISOString()
      };

      connections.push(mutualConnection);
      localStorage.setItem("connections", JSON.stringify(connections));

      // Update matches
      loadMatches();
      alert("Connection accepted! You can now message each other.");
    } catch (error) {
      console.error("Error accepting connection:", error);
      alert("Failed to accept connection");
    }
  };

  const handleRejectRequest = (fromUserId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const connections = JSON.parse(localStorage.getItem("connections")) || [];
      
      // Remove the pending request
      const requestIndex = connections.findIndex(conn => 
        conn.from === fromUserId && conn.to === currentUser.id && conn.status === "pending"
      );

      if (requestIndex !== -1) {
        connections.splice(requestIndex, 1);
        localStorage.setItem("connections", JSON.stringify(connections));
        loadMatches();
        alert("Connection request rejected");
      }
    } catch (error) {
      console.error("Error rejecting connection:", error);
      alert("Failed to reject connection");
    }
  };

  const handleMessage = (otherUserId, otherUsername) => {
    // Navigate to messages with the specific user
    navigate(`/messages?user=${otherUserId}&username=${otherUsername}`);
  };

  if (loading) {
    return (
      <div className="match-container">
        <h2>🎯 Finding Your Best Matches...</h2>
        <p>Please wait while we analyze compatibility...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="match-container">
        <h2>❌ Error</h2>
        <p>{error}</p>
        <p>Please make sure you have filled out the compatibility form first.</p>
      </div>
    );
  }

  if (showEditPrompt) {
    return (
      <div className="match-container">
        <div className="edit-prompt">
          <h2>📋 You already have a compatibility profile!</h2>
          <p>Would you like to edit your responses before viewing matches?</p>
          
          <div className="prompt-buttons">
            <button 
              className="prompt-btn yes-btn"
              onClick={handleEditForm}
            >
              ✏️ Yes, Edit My Responses
            </button>
            <button 
              className="prompt-btn no-btn"
              onClick={handleShowMatches}
            >
              🎯 No, Show Matches Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="match-container">
      <h2>🎯 Best Roommate Matches</h2>
      {matches.length === 0 ? (
        <div>
          <p>No matches found yet.</p>
          <p>Make sure other users have filled out their compatibility forms!</p>
        </div>
      ) : (
        matches.map((match) => (
          <div key={match.id} className="match-card">
            <div className="match-header">
              <h3>
                <span style={{ color: '#3b82f6' }}>{match.username}</span> - 
                <span style={{ color: '#10b981' }}> {match.score}% Match</span>
              </h3>
              
              {/* Connection Status and Actions */}
              <div className="connection-actions">
                {match.connectionStatus === "not_connected" && (
                  <button 
                    className="connect-btn"
                    onClick={() => handleConnect(match.id, match.username)}
                  >
                    🔗 Connect
                  </button>
                )}
                
                {match.connectionStatus === "request_sent" && (
                  <span className="status-badge pending">📤 Request Sent</span>
                )}
                
                {match.connectionStatus === "request_received" && (
                  <div className="request-actions">
                    <button 
                      className="accept-btn"
                      onClick={() => handleAcceptRequest(match.id, match.username)}
                    >
                      ✅ Accept
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => handleRejectRequest(match.id)}
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}
                
                {match.connectionStatus === "connected" && (
                  <button 
                    className="message-btn"
                    onClick={() => handleMessage(match.id, match.username)}
                  >
                    💬 Message
                  </button>
                )}
              </div>
            </div>

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
  );
};

export default Match;
