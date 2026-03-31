import React, { useState, useEffect } from "react";
import "./Navbar.css";

import { FiSearch } from "react-icons/fi";
import { BsCart } from "react-icons/bs";
import { MdHelpOutline, MdKeyboardArrowDown, MdLocationOn } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { IoBagHandleOutline, IoClose } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

import location from "../../assets/idmj05ptAq_1773205760417.jpeg";

function Navbar() {

  const [showLocation, setShowLocation] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  // Load cart count
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, []);

  const handleLocation = () => setShowLocation(true);
  const closeLocation = () => setShowLocation(false);

  return (
    <>
      <div className="navbar">

        {/* LEFT */}
        <div className="nav-left">

          <div className="logo">
            <img src={location} alt="logo" height={45} width={45} />
          </div>

          <div className="location" onClick={handleLocation}>
            <b>HOME</b>
            <span>Adyar, Karnataka</span>
            <MdKeyboardArrowDown className="arrow" />
          </div>

        </div>

        {/* RIGHT */}
        <div className="nav-right">

          <div className="nav-item">
            <IoBagHandleOutline />
            <a href="https://www.swiggy.com/corporate/" target="_blank" rel="noreferrer">
              <span className="bold">Swiggy Corporate</span>
            </a>
          </div>

          <div className="nav-item">
            <FiSearch /> Search
          </div>

          <div className="nav-item">
            🎟 Offers <span className="new">NEW</span>
          </div>

          <div className="nav-item">
            <MdHelpOutline /> Help
          </div>

          <div className="nav-item">
            <BiUser /> Adithya
          </div>

          {/* ✅ CART BUTTON */}
          <div className="nav-item" onClick={() => navigate("/cart")}>
            <BsCart /> Cart ({cartCount})
          </div>

        </div>
      </div>

      {/* LOCATION PANEL */}
      {showLocation && (
        <div className="overlay">

          <div className="location-panel">

            <div className="close">
              <IoClose onClick={closeLocation} />
            </div>

            <input
              className="location-search"
              placeholder="Search for area, street name..."
            />

            <div className="location-box">
              <MdLocationOn />

              <div>
                <b>Get current location</b>
                <p>Using GPS</p>
              </div>
            </div>

            <div className="saved">
              <h4>SAVED ADDRESSES</h4>

              <div className="address">
                <b>Home</b>
                <p>
                  Sahyadri College Of Engineering, Adyar,
                  Karnataka 575029, India
                </p>
              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default Navbar;