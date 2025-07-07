const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

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

// Simple save-compatibility endpoint
app.post("/save-compatibility", (req, res) => {
  console.log("Received compatibility data:", req.body);
  res.json({ message: "✅ Profile saved successfully" });
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 