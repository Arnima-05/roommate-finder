// src/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoutIcon from "./logout.png";

function Navbar({ isLoggedIn, username, onLogout }) {
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link className="logo" to="/">CoLive Connect</Link>
      </div>
      <div className="nav-right">
        <Link className="nav-link" to="/post-listing">Post a Listing</Link>

        {isLoggedIn && (
          <>
            <Link className="nav-link" to="/messages">Messages</Link>
            <Link className="nav-link" to="/profile">Profile</Link>
            <Link className="nav-link" to="/match">Find Matches</Link> {/* ✅ NEW MATCH LINK */}

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="nav-link dropdown" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                👤 {username} ▼
              </div>
              <button
                className="logout-btn"
                title="Logout"
                onClick={onLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2em",
                  margin: "0 8px"
                }}
              >
                <img
                  src={logoutIcon}
                  alt="logout"
                  style={{
                    width: "24px",
                    height: "24px",
                    verticalAlign: "middle",
                    filter: "invert(1)"
                  }}
                />
              </button>
            </div>
          </>
        )}

        {!isLoggedIn && (
          <Link className="nav-link login-btn" to="/login">Login / Sign Up</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
