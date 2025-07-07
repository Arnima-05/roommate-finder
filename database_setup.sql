-- Create the roommate database
CREATE DATABASE IF NOT EXISTS roommate;
USE roommate;

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create compatibility_profiles table for storing user preferences
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
);

-- Create room_listings table for property listings
CREATE TABLE IF NOT EXISTS room_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    location VARCHAR(255),
    rent_amount DECIMAL(10,2),
    roommate_preferences TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
); 