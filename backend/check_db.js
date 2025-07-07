const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "arnima@56",
  database: "roommate"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL successfully!");
  
  // Check if users table exists
  db.query("SHOW TABLES LIKE 'users'", (err, results) => {
    if (err) {
      console.error("❌ Error checking tables:", err.message);
    } else if (results.length === 0) {
      console.log("❌ 'users' table does not exist!");
      console.log("Please run the database_setup.sql script first.");
    } else {
      console.log("✅ 'users' table exists!");
    }
    
    // Close connection
    db.end();
  });
}); 