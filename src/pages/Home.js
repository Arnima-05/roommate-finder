// src/pages/Home.js
import React from "react";
import "./Home.css";

const roomData = [
  { id: 1, city: "Mumbai", image: "/room1.jpeg" },
  { id: 2, city: "Delhi", image: "/room2.jpg"  },
  { id: 3, city: "Bangalore", image: "/room3.jpg"  },
  { id: 4, city: "Pune", image: "/room4.jpg"  },
  { id: 5, city: "Chennai", image: "/room5.jpg"  },
  { id: 6, city: "Kolkata", image: "/room6.jpg"  },
  { id: 7, city: "Hyderabad", image: "/room7.jpg" },
  { id: 8, city: "Ahmedabad", image: "/room8.jpeg"  },
];

const Home = () => {
  return (
    <div className="home-container">
      <h1>Featured Listings</h1>
      <div className="card-wrapper">
        <div className="card-track">
          <div className="card-set">
            {roomData.concat(roomData).map((room, index) => (
              <div className="card" key={index}>
                <img src={room.image} alt={`Room ${room.id}`} />
                <div className="card-content">
                  <h3>Room #{room.id}</h3>
                  <p>City: {room.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


