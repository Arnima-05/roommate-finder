// backend/server_fixed.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "mysecret";

app.use(cors());
app.use(express.json());

// MySQL DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "arnima@56",
  database: "roommate"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to DB:", err);
    return;
  }
  console.log("✅ Connected to MySQL database.");
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Register API
app.post("/register", (req, res) => {
  console.log("Register request received:", req.body);
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

// Login API
app.post("/login", (req, res) => {
  console.log("Login request received:", req.body);
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

// Save Compatibility Profile API (Simplified)
app.post("/save-compatibility", (req, res) => {
  console.log("Save compatibility request received:", req.body);
  const { userId, compatibilityData } = req.body;
  
  if (!userId || !compatibilityData) {
    console.log("Missing data:", { userId, compatibilityData });
    return res.status(400).json({ message: "User ID and compatibility data are required" });
  }

  console.log("Saving compatibility data for user:", userId);
  
  // For now, just return success
  res.json({ message: "✅ Profile saved successfully" });
});

// Get Matches API (Simplified)
app.get("/get-matches/:userId", (req, res) => {
  console.log("Get matches request received for user:", req.params.userId);
  res.json({ matches: [] });
});

// Check if user has profile
app.get("/has-profile/:userId", (req, res) => {
  console.log("Check profile request received for user:", req.params.userId);
  res.json({ hasProfile: false });
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("- GET  /test");
  console.log("- POST /register");
  console.log("- POST /login");
  console.log("- POST /save-compatibility");
  console.log("- GET  /get-matches/:userId");
  console.log("- GET  /has-profile/:userId");
}); 