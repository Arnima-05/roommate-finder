// backend/server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "mysecret"; // 🔒 Replace with a strong secret in production

app.use(cors());
app.use(express.json());

// ✅ MySQL DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // 🔁 Replace with your MySQL username
  password: "arnima@56", // 🔁 Replace with your MySQL password
  database: "roommate" // 🔁 Make sure this DB exists
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to DB:", err);
    return;
  }
  console.log("✅ Connected to MySQL database.");
});

// ✅ Register API
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error("❌ Registration Error:", err);
      return res.status(500).json({ message: "Registration failed. Email might already exist." });
    }
    res.status(201).json({ message: "✅ Registered successfully" });
  });
});

// ✅ Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "2h" });
    res.json({
      message: "✅ Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  });
});

// ✅ Save Compatibility Profile API
app.post("/save-compatibility", (req, res) => {
  const { userId, compatibilityData } = req.body;
  
  if (!userId || !compatibilityData) {
    return res.status(400).json({ message: "User ID and compatibility data are required" });
  }

  // Check if profile already exists
  const checkSql = "SELECT id FROM compatibility_profiles WHERE user_id = ?";
  db.query(checkSql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error checking profile:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      // Update existing profile
      const updateSql = `
        UPDATE compatibility_profiles SET 
        wakeUpTime = ?, bedTime = ?, isEarlyBird = ?, quietMorning = ?, 
        smokes = ?, okWithSmoker = ?, drinks = ?, parties = ?, 
        cleanFrequency = ?, sharedChores = ?, tidyScale = ?, leaveDishes = ?, 
        hasGuests = ?, okWithGuests = ?, socialLevel = ?, playsLoudMusic = ?, 
        usesHeadphones = ?, noiseSensitive = ?, hasPets = ?, okWithPets = ?, 
        petAllergy = ?, workFromHome = ?, workingHours = ?, quietNeeded = ?, 
        rentBudget = ?, splitBills = ?, foodSharing = ?, genderPref = ?, 
        religionCulture = ?, introExtro = ?
        WHERE user_id = ?
      `;
      
      const values = [
        compatibilityData.wakeUpTime, compatibilityData.bedTime, compatibilityData.isEarlyBird,
        compatibilityData.quietMorning, compatibilityData.smokes, compatibilityData.okWithSmoker,
        compatibilityData.drinks, compatibilityData.parties, compatibilityData.cleanFrequency,
        compatibilityData.sharedChores, compatibilityData.tidyScale, compatibilityData.leaveDishes,
        compatibilityData.hasGuests, compatibilityData.okWithGuests, compatibilityData.socialLevel,
        compatibilityData.playsLoudMusic, compatibilityData.usesHeadphones, compatibilityData.noiseSensitive,
        compatibilityData.hasPets, compatibilityData.okWithPets, compatibilityData.petAllergy,
        compatibilityData.workFromHome, compatibilityData.workingHours, compatibilityData.quietNeeded,
        compatibilityData.rentBudget, compatibilityData.splitBills, compatibilityData.foodSharing,
        compatibilityData.genderPref, compatibilityData.religionCulture, compatibilityData.introExtro,
        userId
      ];

      db.query(updateSql, values, (err, result) => {
        if (err) {
          console.error("❌ Error updating profile:", err);
          return res.status(500).json({ message: "Failed to update profile" });
        }
        res.json({ message: "✅ Profile updated successfully" });
      });
    } else {
      // Insert new profile
      const insertSql = `
        INSERT INTO compatibility_profiles (
          user_id, wakeUpTime, bedTime, isEarlyBird, quietMorning, 
          smokes, okWithSmoker, drinks, parties, cleanFrequency, 
          sharedChores, tidyScale, leaveDishes, hasGuests, okWithGuests, 
          socialLevel, playsLoudMusic, usesHeadphones, noiseSensitive, 
          hasPets, okWithPets, petAllergy, workFromHome, workingHours, 
          quietNeeded, rentBudget, splitBills, foodSharing, genderPref, 
          religionCulture, introExtro
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        userId, compatibilityData.wakeUpTime, compatibilityData.bedTime, compatibilityData.isEarlyBird,
        compatibilityData.quietMorning, compatibilityData.smokes, compatibilityData.okWithSmoker,
        compatibilityData.drinks, compatibilityData.parties, compatibilityData.cleanFrequency,
        compatibilityData.sharedChores, compatibilityData.tidyScale, compatibilityData.leaveDishes,
        compatibilityData.hasGuests, compatibilityData.okWithGuests, compatibilityData.socialLevel,
        compatibilityData.playsLoudMusic, compatibilityData.usesHeadphones, compatibilityData.noiseSensitive,
        compatibilityData.hasPets, compatibilityData.okWithPets, compatibilityData.petAllergy,
        compatibilityData.workFromHome, compatibilityData.workingHours, compatibilityData.quietNeeded,
        compatibilityData.rentBudget, compatibilityData.splitBills, compatibilityData.foodSharing,
        compatibilityData.genderPref, compatibilityData.religionCulture, compatibilityData.introExtro
      ];

      db.query(insertSql, values, (err, result) => {
        if (err) {
          console.error("❌ Error saving profile:", err);
          return res.status(500).json({ message: "Failed to save profile" });
        }
        res.json({ message: "✅ Profile saved successfully" });
      });
    }
  });
});

// ✅ Get Matches API
app.get("/get-matches/:userId", (req, res) => {
  const { userId } = req.params;
  
  // Get current user's profile
  const userProfileSql = "SELECT * FROM compatibility_profiles WHERE user_id = ?";
  db.query(userProfileSql, [userId], (err, userResults) => {
    if (err || userResults.length === 0) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const currentUser = userResults[0];

    // Get all other users' profiles with their usernames
    const matchesSql = `
      SELECT cp.*, u.username 
      FROM compatibility_profiles cp 
      JOIN users u ON cp.user_id = u.id 
      WHERE cp.user_id != ?
    `;
    
    db.query(matchesSql, [userId], (err, matchesResults) => {
      if (err) {
        console.error("❌ Error getting matches:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // Calculate compatibility scores
      const matches = matchesResults.map(match => {
        const score = calculateCompatibilityScore(currentUser, match);
        return {
          id: match.user_id,
          username: match.username,
          score: score,
          profile: match
        };
      });

      // Sort by compatibility score (highest first)
      matches.sort((a, b) => b.score - a.score);

      res.json({ matches });
    });
  });
});

// ✅ Check if user has profile
app.get("/has-profile/:userId", (req, res) => {
  const { userId } = req.params;
  
  const sql = "SELECT id FROM compatibility_profiles WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error checking profile:", err);
      return res.status(500).json({ message: "Database error" });
    }
    
    res.json({ hasProfile: results.length > 0 });
  });
});

// ✅ Forgot Password API
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Check if user exists
  const sql = "SELECT id, username, email FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("❌ Error checking user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      // Don't reveal if email exists or not for security
      return res.json({ message: "If the email exists, a password reset link has been sent." });
    }

    const user = results[0];
    
    // Generate a reset token (in production, use a more secure method)
    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // In a real application, you would:
    // 1. Store the reset token in the database with expiration
    // 2. Send an email with the reset link
    // 3. Use a proper email service like SendGrid, AWS SES, etc.
    
    // For demo purposes, we'll just return success
    // In production, implement actual email sending here
    
    console.log(`📧 Password reset requested for ${email}`);
    console.log(`🔗 Reset token: ${resetToken}`);
    console.log(`🔗 Reset link: http://localhost:3000/reset-password?token=${resetToken}`);
    
    res.json({ 
      message: "If the email exists, a password reset link has been sent.",
      // Remove this in production - only for demo
      demo: {
        resetToken,
        resetLink: `http://localhost:3000/reset-password?token=${resetToken}`
      }
    });
  });
});

// ✅ Reset Password API
app.post("/reset-password", (req, res) => {
  const { token, newPassword } = req.body;
  
  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 8);
    
    // Update the user's password
    const sql = "UPDATE users SET password = ? WHERE id = ? AND email = ?";
    db.query(sql, [hashedPassword, decoded.id, decoded.email], (err, result) => {
      if (err) {
        console.error("❌ Error updating password:", err);
        return res.status(500).json({ message: "Failed to update password" });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }

      res.json({ message: "Password updated successfully" });
    });
  } catch (error) {
    console.error("❌ Token verification error:", error);
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }
});

// ✅ Calculate compatibility score function
function calculateCompatibilityScore(user1, user2) {
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
}

// ✅ Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
