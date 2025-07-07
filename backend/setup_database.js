const mysql = require("mysql2");

// First connect without specifying database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "arnima@56"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL successfully!");
  
  // Create database
  db.query("CREATE DATABASE IF NOT EXISTS roommate", (err) => {
    if (err) {
      console.error("❌ Error creating database:", err.message);
      return;
    }
    console.log("✅ Database 'roommate' created/verified!");
    
    // Use the database
    db.query("USE roommate", (err) => {
      if (err) {
        console.error("❌ Error using database:", err.message);
        return;
      }
      
      // Create users table
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      db.query(createUsersTable, (err) => {
        if (err) {
          console.error("❌ Error creating users table:", err.message);
        } else {
          console.log("✅ 'users' table created successfully!");
        }
        
        // Create compatibility_profiles table
        const createProfilesTable = `
          CREATE TABLE IF NOT EXISTS compatibility_profiles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            wakeUpTime VARCHAR(50),
            bedTime VARCHAR(50),
            isEarlyBird VARCHAR(20),
            quietMorning VARCHAR(10),
            smokes VARCHAR(10),
            okWithSmoker VARCHAR(10),
            drinks VARCHAR(10),
            parties VARCHAR(10),
            cleanFrequency VARCHAR(50),
            sharedChores VARCHAR(10),
            tidyScale INT,
            leaveDishes VARCHAR(10),
            hasGuests VARCHAR(10),
            okWithGuests VARCHAR(10),
            socialLevel VARCHAR(20),
            playsLoudMusic VARCHAR(10),
            usesHeadphones VARCHAR(10),
            noiseSensitive VARCHAR(10),
            hasPets VARCHAR(10),
            okWithPets VARCHAR(10),
            petAllergy VARCHAR(10),
            workFromHome VARCHAR(10),
            workingHours VARCHAR(50),
            quietNeeded VARCHAR(10),
            rentBudget INT,
            splitBills VARCHAR(10),
            foodSharing VARCHAR(20),
            genderPref VARCHAR(20),
            religionCulture TEXT,
            introExtro VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
          )
        `;
        
        db.query(createProfilesTable, (err) => {
          if (err) {
            console.error("❌ Error creating compatibility_profiles table:", err.message);
          } else {
            console.log("✅ 'compatibility_profiles' table created successfully!");
          }
          
          // Create room_listings table
          const createListingsTable = `
            CREATE TABLE IF NOT EXISTS room_listings (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT,
              location VARCHAR(255),
              rent_amount DECIMAL(10,2),
              roommate_preferences TEXT,
              description TEXT,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
          `;
          
          db.query(createListingsTable, (err) => {
            if (err) {
              console.error("❌ Error creating room_listings table:", err.message);
            } else {
              console.log("✅ 'room_listings' table created successfully!");
              console.log("\n🎉 Database setup complete! You can now register users.");
            }
            
            db.end();
          });
        });
      });
    });
  });
}); 