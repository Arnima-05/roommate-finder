import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    gender: "",
    profession: "",
    smoking: "no",
    drinking: "no",
    introvertExtrovert: "",
    workType: "",
    languages: "",
    foodPreference: "veg",
    cleanliness: "average",
    sleepingTime: "",
    wakeupTime: "",
    guestsAllowed: "no",
    roommateGender: "",
    roomType: "",
    budget: "",
    hobbies: "",
    additionalInfo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile submitted:", profileData);
    alert("Profile saved successfully!");
  };

  return (
    <div className="profile-container">
      <h1>Your Roommate Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">

        <label>Name:</label>
        <input type="text" name="name" value={profileData.name} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={profileData.age} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={profileData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Profession:</label>
        <input type="text" name="profession" value={profileData.profession} onChange={handleChange} />

        <label>Do you smoke?</label>
        <select name="smoking" value={profileData.smoking} onChange={handleChange}>
          <option value="no">No</option>
          <option value="occasionally">Occasionally</option>
          <option value="yes">Yes</option>
        </select>

        <label>Do you drink?</label>
        <select name="drinking" value={profileData.drinking} onChange={handleChange}>
          <option value="no">No</option>
          <option value="occasionally">Occasionally</option>
          <option value="yes">Yes</option>
        </select>

        <label>Are you introvert or extrovert?</label>
        <select name="introvertExtrovert" value={profileData.introvertExtrovert} onChange={handleChange}>
          <option value="">Select</option>
          <option value="introvert">Introvert</option>
          <option value="extrovert">Extrovert</option>
          <option value="ambivert">Ambivert</option>
        </select>

        <label>Work Type:</label>
        <select name="workType" value={profileData.workType} onChange={handleChange}>
          <option value="">Select</option>
          <option value="home">Work from Home</option>
          <option value="office">Work from Office</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <label>Languages Spoken:</label>
        <input type="text" name="languages" value={profileData.languages} onChange={handleChange} />

        <label>Food Preference:</label>
        <select name="foodPreference" value={profileData.foodPreference} onChange={handleChange}>
          <option value="veg">Vegetarian</option>
          <option value="nonveg">Non-Vegetarian</option>
          <option value="eggetarian">Eggetarian</option>
        </select>

        <label>Cleanliness Level:</label>
        <select name="cleanliness" value={profileData.cleanliness} onChange={handleChange}>
          <option value="average">Average</option>
          <option value="neat">Neat</option>
          <option value="very-neat">Very Neat</option>
        </select>

        <label>Sleeping Time:</label>
        <input type="time" name="sleepingTime" value={profileData.sleepingTime} onChange={handleChange} />

        <label>Wakeup Time:</label>
        <input type="time" name="wakeupTime" value={profileData.wakeupTime} onChange={handleChange} />

        <label>Guests Allowed?</label>
        <select name="guestsAllowed" value={profileData.guestsAllowed} onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
          <option value="sometimes">Sometimes</option>
        </select>

        <label>Preferred Roommate Gender:</label>
        <select name="roommateGender" value={profileData.roommateGender} onChange={handleChange}>
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Room Type:</label>
        <select name="roomType" value={profileData.roomType} onChange={handleChange}>
          <option value="">Select</option>
          <option value="single">Single Room</option>
          <option value="shared">Shared Room</option>
        </select>

        <label>Preferred Budget (monthly in ₹):</label>
        <input type="number" name="budget" value={profileData.budget} onChange={handleChange} />

        <label>Hobbies:</label>
        <input type="text" name="hobbies" value={profileData.hobbies} onChange={handleChange} />

        <label>Additional Info:</label>
        <textarea name="additionalInfo" value={profileData.additionalInfo} onChange={handleChange} />

        <button type="submit" className="save-btn">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;

