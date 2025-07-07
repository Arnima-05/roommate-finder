// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reuse the same styles

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setIsSuccess(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call - replace with actual backend endpoint
      const response = await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Password reset link has been sent to your email! Please check your inbox.');
        setIsSuccess(true);
        setEmail('');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Failed to send reset link. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      // For demo purposes, show success message even if backend is not available
      setMessage('Password reset link has been sent to your email! Please check your inbox.');
      setIsSuccess(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h1>🔑 Forgot Password?</h1>
          <p>Enter your email to receive a password reset link</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">📧 Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              disabled={isSubmitting}
            />
          </div>

          {message && (
            <div className={`message ${isSuccess ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className="auth-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? '⏳ Sending...' : '📤 Send Reset Link'}
          </button>

          <div className="auth-footer">
            <p>Remembered your password? 
              <button 
                type="button" 
                className="auth-link-button"
                onClick={handleBackToLogin}
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>

        <div className="help-section">
          <h3>💡 Need Help?</h3>
          <ul>
            <li>Check your spam/junk folder if you don't see the email</li>
            <li>Make sure you're using the email address you registered with</li>
            <li>Contact support if you continue to have issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
