import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SwiggyNavbar.css";
import logo from "../assets/SwiggynavLogo.png";

function SwiggyNavbar() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState("Adyar, Karnataka 575029, India");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem("user");
    }

    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  return (
    <div className="swiggy-navbar">

      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />

        <div className="location" onClick={() => navigate("/")}>
          <span className="home">HOME</span>
          <span className="loc-text">{location}</span>
          <span className="arrow">▼</span>
        </div>
      </div>

      <div className="nav-right">

        <div className="nav-item">Swiggy Corporate</div>

        <div className="nav-item">Search</div>

        <div className="nav-item offers">
          Offers <span className="new">NEW</span>
        </div>

        <div className="nav-item">Help</div>

        <div className="nav-item">
          {user ? user.name : "Sign In"}
        </div>

        <div className="nav-item cart">
          Cart <span className="cart-count">0</span>
        </div>

      </div>
    </div>
  );
}

export default SwiggyNavbar;