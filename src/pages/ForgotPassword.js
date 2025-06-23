// src/pages/ForgotPassword.js
import React from 'react';
import './Login.css'; // Reuse the same styles

function ForgotPassword() {
  return (
    <div className="login-page">
      <div className="wrapper">
        <form>
          <h1>Reset Password</h1>

          <div className="input-box">
            <input type="email" required />
            <label>Email</label>
            <i className="bx bxs-envelope"></i>
          </div>

          <button type="submit" className="btn">Send Reset Link</button>

          <div className="register-link">
            <p>Remembered? <a href="/login">Back to Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
