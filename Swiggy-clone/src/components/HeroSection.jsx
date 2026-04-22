import React, { useState, useRef, useEffect } from "react";
import "./HeroSection.css";

import leftImg from "../assets/LeftSide.png";
import rightImg from "../assets/rightside.png";
import searchIcon from "../assets/search-icon.png";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude}, ${position.coords.longitude}`;

        setLocation(coords);
        localStorage.setItem("location", coords);

        setOpen(false);
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  return (
    <>
      <div className="hero">
        <img src={leftImg} className="left-side-img" alt="left illustration" />

        <div className="food-center">
          <div className="food-center-line">
            Order food. Shop groceries. Swiggy it!
          </div>
        </div>

        <div className="div-for-search">

          
          <div
            className="location-wrapper"
            onClick={() => setOpen(true)} 
            ref={dropdownRef}
          >

            <svg width="24" height="24" viewBox="0 0 18 23" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 21.8C12.4 19.4 17.7 13.4 17.7 8.7C17.7 3.7 13.9 0 9 0C4 0 0.2 3.7 0.2 8.7C0.2 13.4 5.5 19.4 9 21.8ZM9 12.7C11.4 12.7 13.3 10.8 13.3 8.4C13.3 6 11.4 4 9 4C6.6 4 4.6 6 4.6 8.4C4.6 10.8 6.6 12.7 9 12.7Z"
                fill="#FF5200"
              />
            </svg>

            <div className="location-input-container">
              <input
                type="text"
                name="location"
                autoComplete="off"
                placeholder="Enter your delivery location"
                maxLength="30"
                className="location-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onClick={(e) => e.stopPropagation()} 
              />
            </div>

            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`dropdown-arrow ${open ? "rotate" : ""}`}
            >
              <path
                d="M5 7L10 12L15 7"
                stroke="rgba(2,6,12,0.92)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {open && (
              <div
                className="location-dropdown"
                onClick={(e) => e.stopPropagation()} 
              >
                <div
                  className="current-location"
                  onClick={handleCurrentLocation}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#FF5200"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Use my current location</span>
                </div>
              </div>
            )}
          </div>

         
          <div className="search-bar-full">
            <div className="search-bar">
              <div className="search-button">
                Search for restaurant, item or more
              </div>
              <div className="search-icon">
                <img src={searchIcon} alt="search" height="20" width="25" />
              </div>
            </div>
          </div>
        </div>

        <img src={rightImg} className="right-side-img" alt="right illustration" />
      </div>

      <div className="food-cards">
        <div className="food-card-container">
          <div
  className="card1"
  onClick={() => navigate("/explore")}
  style={{ cursor: "pointer" }}
>
  <img src={card1} alt="card1" className="card-one-img" />
</div>

          <div className="card1">
            <a href="#" className="card-a">
              <img src={card2} alt="card2" className="card-one-img" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;