import React, { useState, useEffect } from "react";
import "./CompatibilityForm.css";
import { useNavigate } from "react-router-dom";

const CompatibilityForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    wakeUpTime: "",
    bedTime: "",
    isEarlyBird: "",
    quietMorning: "",
    smokes: "",
    okWithSmoker: "",
    drinks: "",
    parties: "",
    cleanFrequency: "",
    sharedChores: "",
    tidyScale: "",
    leaveDishes: "",
    hasGuests: "",
    okWithGuests: "",
    socialLevel: "",
    playsLoudMusic: "",
    usesHeadphones: "",
    noiseSensitive: "",
    hasPets: "",
    okWithPets: "",
    petAllergy: "",
    workFromHome: "",
    workingHours: "",
    quietNeeded: "",
    rentBudget: "",
    splitBills: "",
    foodSharing: "",
    genderPref: "",
    religionCulture: "",
    introExtro: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load existing profile data if user has one
  useEffect(() => {
    const loadExistingProfile = () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.id) {
          navigate("/login");
          return;
        }

        const allProfiles = JSON.parse(localStorage.getItem("compatibilityProfiles")) || [];
        const existingProfile = allProfiles.find(profile => profile.userId === currentUser.id);
        
        if (existingProfile) {
          // Remove userId and username from the form data
          const { userId, username, ...formData } = existingProfile;
          setForm(formData);
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Error loading existing profile:", error);
      }
    };

    loadExistingProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Get current user from localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser || !currentUser.id) {
        alert("Please login first!");
        navigate("/login");
        return;
      }

      // Save compatibility data to localStorage
      const compatibilityData = {
        userId: currentUser.id,
        username: currentUser.username,
        ...form
      };

      // Get existing compatibility profiles
      const existingProfiles = JSON.parse(localStorage.getItem("compatibilityProfiles")) || [];
      
      // Check if user already has a profile
      const existingIndex = existingProfiles.findIndex(profile => profile.userId === currentUser.id);
      
      if (existingIndex !== -1) {
        // Update existing profile
        existingProfiles[existingIndex] = compatibilityData;
      } else {
        // Add new profile
        existingProfiles.push(compatibilityData);
      }

      // Save back to localStorage
      localStorage.setItem("compatibilityProfiles", JSON.stringify(existingProfiles));

      const message = isEditing ? "Profile updated successfully!" : "Profile saved successfully! You can now view your matches.";
      alert(message);
      navigate("/match");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile: " + error.message);
    }
  };

  return (
    <div className="compatibility-form-container">
      <h2>{isEditing ? "Edit Your Compatibility Profile" : "Roommate Compatibility Form"}</h2>
      {isEditing && (
        <p className="edit-notice">
          ✏️ You're editing your existing profile. Any changes will update your matches.
        </p>
      )}
      <form className="compatibility-form" onSubmit={handleSubmit}>
        <label>Wake Up Time:</label>
        <input name="wakeUpTime" value={form.wakeUpTime} onChange={handleChange} required />

        <label>Bed Time:</label>
        <input name="bedTime" value={form.bedTime} onChange={handleChange} required />

        <label>Are you an early bird or night owl?</label>
        <select name="isEarlyBird" value={form.isEarlyBird} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="early">Early Bird</option>
          <option value="night">Night Owl</option>
        </select>

        <label>Prefer quiet morning/evening?</label>
        <select name="quietMorning" value={form.quietMorning} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Do you smoke?</label>
        <select name="smokes" value={form.smokes} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Okay with smoker roommate?</label>
        <select name="okWithSmoker" value={form.okWithSmoker} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Do you drink alcohol?</label>
        <select name="drinks" value={form.drinks} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="occasionally">Occasionally</option>
        </select>

        <label>Party frequently?</label>
        <select name="parties" value={form.parties} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="occasionally">Occasionally</option>
          <option value="sometimes">Sometimes</option>
        </select>

        <label>How often do you clean? (e.g. daily, weekly)</label>
        <input name="cleanFrequency" value={form.cleanFrequency} onChange={handleChange} required />

        <label>Okay with shared chores?</label>
        <select name="sharedChores" value={form.sharedChores} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>How tidy are you? (1–10)</label>
        <input type="number" name="tidyScale" min="1" max="10" value={form.tidyScale} onChange={handleChange} required />

        <label>Okay with dishes left overnight?</label>
        <select name="leaveDishes" value={form.leaveDishes} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
        </select>

        <label>Have guests often?</label>
        <select name="hasGuests" value={form.hasGuests} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="rarely">Rarely</option>
          <option value="sometimes">Sometimes</option>
          <option value="often">Often</option>
        </select>

        <label>Okay if roommate has guests often?</label>
        <select name="okWithGuests" value={form.okWithGuests} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Preferred social interaction?</label>
        <select name="socialLevel" value={form.socialLevel} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="friendly">Friendly Chat</option>
          <option value="quiet">Keep to Yourself</option>
        </select>

        <label>Play loud music or TV?</label>
        <select name="playsLoudMusic" value={form.playsLoudMusic} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
        </select>

        <label>Use headphones often?</label>
        <select name="usesHeadphones" value={form.usesHeadphones} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="always">Always</option>
        </select>

        <label>Noise sensitive while sleeping/working?</label>
        <select name="noiseSensitive" value={form.noiseSensitive} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
        </select>

        <label>Have pets?</label>
        <select name="hasPets" value={form.hasPets} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Okay with pets?</label>
        <select name="okWithPets" value={form.okWithPets} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="maybe">Maybe</option>
        </select>

        <label>Allergic to animals?</label>
        <select name="petAllergy" value={form.petAllergy} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Do you work/study from home?</label>
        <select name="workFromHome" value={form.workFromHome} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <label>Working hours?</label>
        <input name="workingHours" value={form.workingHours} onChange={handleChange} required />

        <label>Need quiet to work/study?</label>
        <select name="quietNeeded" value={form.quietNeeded} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
        </select>

        <label>Monthly rent budget (₹)?</label>
        <input type="number" name="rentBudget" value={form.rentBudget} onChange={handleChange} required />

        <label>Okay splitting utility bills?</label>
        <select name="splitBills" value={form.splitBills} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Prefer shared or separate food?</label>
        <select name="foodSharing" value={form.foodSharing} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="shared">Shared</option>
          <option value="separate">Separate</option>
        </select>

        <label>Roommate gender preference?</label>
        <select name="genderPref" value={form.genderPref} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="any">Any</option>
        </select>

        <label>Religion or cultural considerations?</label>
        <input name="religionCulture" value={form.religionCulture} onChange={handleChange} />

        <label>Are you an introvert or extrovert?</label>
        <select name="introExtro" value={form.introExtro} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="introvert">Introvert</option>
          <option value="extrovert">Extrovert</option>
        </select>

        <button type="submit" style={{ marginTop: "20px" }}>
          {isEditing ? "Update Profile" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CompatibilityForm;
