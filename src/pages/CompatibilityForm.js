import React, { useState } from "react";
import "./CompatibilityForm.css";


const CompatibilityForm = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save current user data
    localStorage.setItem("currentUser", JSON.stringify(form));

    // Save to user list (for matching)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Form submitted successfully!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Roommate Compatibility Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Wake Up Time:</label>
        <input name="wakeUpTime" onChange={handleChange} required />

        <label>Bed Time:</label>
        <input name="bedTime" onChange={handleChange} required />

        <label>Are you an early bird or night owl?</label>
        <select name="isEarlyBird" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="early">Early Bird</option>
          <option value="night">Night Owl</option>
        </select>

        <label>Prefer quiet morning/evening?</label>
        <select name="quietMorning" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Do you smoke?</label>
        <select name="smokes" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Okay with smoker roommate?</label>
        <select name="okWithSmoker" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Do you drink alcohol?</label>
        <select name="drinks" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Party frequently?</label>
        <select name="parties" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>How often do you clean? (e.g. daily, weekly)</label>
        <input name="cleanFrequency" onChange={handleChange} required />

        <label>Okay with shared chores?</label>
        <select name="sharedChores" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>How tidy are you? (1–10)</label>
        <input type="number" name="tidyScale" min="1" max="10" onChange={handleChange} required />

        <label>Okay with dishes left overnight?</label>
        <select name="leaveDishes" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Have guests often?</label>
        <select name="hasGuests" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Okay if roommate has guests often?</label>
        <select name="okWithGuests" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Preferred social interaction?</label>
        <select name="socialLevel" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="friendly">Friendly Chat</option>
          <option value="quiet">Keep to Yourself</option>
        </select>

        <label>Play loud music or TV?</label>
        <select name="playsLoudMusic" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Use headphones often?</label>
        <select name="usesHeadphones" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Noise sensitive while sleeping/working?</label>
        <select name="noiseSensitive" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Have pets?</label>
        <select name="hasPets" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Okay with pets?</label>
        <select name="okWithPets" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Allergic to animals?</label>
        <select name="petAllergy" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Do you work/study from home?</label>
        <select name="workFromHome" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Working hours?</label>
        <input name="workingHours" onChange={handleChange} required />

        <label>Need quiet to work/study?</label>
        <select name="quietNeeded" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Monthly rent budget (₹)?</label>
        <input type="number" name="rentBudget" onChange={handleChange} required />

        <label>Okay splitting utility bills?</label>
        <select name="splitBills" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Prefer shared or separate food?</label>
        <select name="foodSharing" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="shared">Shared</option>
          <option value="separate">Separate</option>
        </select>

        <label>Roommate gender preference?</label>
        <select name="genderPref" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="any">Any</option>
        </select>

        <label>Religion or cultural considerations?</label>
        <input name="religionCulture" onChange={handleChange} />

        <label>Are you an introvert or extrovert?</label>
        <select name="introExtro" onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="introvert">Introvert</option>
          <option value="extrovert">Extrovert</option>
        </select>

        <button type="submit" style={{ marginTop: "20px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompatibilityForm;
