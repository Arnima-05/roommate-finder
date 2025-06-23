import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostListing({ isLoggedIn }) {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    // Redirect if not logged in
    navigate('/login');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Listing posted successfully!');
    // You can handle saving data here or send it to backend
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Post a Listing</h1>

          <div className="input-box">
            <input type="text" required />
            <label>Location</label>
          </div>

          <div className="input-box">
            <input type="text" required />
            <label>Rent (per month)</label>
          </div>

          <div className="input-box">
            <input type="text" required />
            <label>Roommate Preferences</label>
          </div>

          <div className="input-box">
            <textarea required placeholder="More details..."></textarea>
          </div>


          <button type="submit" className="btn">Submit Listing</button>
        </form>
      </div>
    </div>
  );
}

export default PostListing;
