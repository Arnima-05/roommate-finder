import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostListing.css';

function PostListing({ isLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    rent: '',
    roomType: '',
    roommatePreferences: '',
    description: '',
    contactInfo: ''
  });

  if (!isLoggedIn) {
    // Redirect if not logged in
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Listing posted successfully!');
    // You can handle saving data here or send it to backend
    setFormData({
      location: '',
      rent: '',
      roomType: '',
      roommatePreferences: '',
      description: '',
      contactInfo: ''
    });
  };

  return (
    <div className="post-listing-container">
      <div className="post-listing-form">
        <h1>🏠 Post a Listing</h1>
        <p>Share your room/apartment and find the perfect roommate</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">📍 Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter city, area, or landmark"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rent">💰 Monthly Rent (₹)</label>
              <input
                type="number"
                id="rent"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder="e.g., 15000"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="roomType">🏠 Room Type</label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                required
              >
                <option value="">Select room type</option>
                <option value="single">Single Room</option>
                <option value="shared">Shared Room</option>
                <option value="studio">Studio Apartment</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="roommatePreferences">👥 Preferred Roommate</label>
              <select
                id="roommatePreferences"
                name="roommatePreferences"
                value={formData.roommatePreferences}
                onChange={handleChange}
                required
              >
                <option value="">Select preference</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="any">Any Gender</option>
                <option value="student">Student</option>
                <option value="working">Working Professional</option>
                <option value="any">Any</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">📝 Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your room/apartment, amenities, house rules, etc."
              rows="4"
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="contactInfo">📞 Contact Information</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="Phone number or email for interested people"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              📤 Post Listing
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostListing;
