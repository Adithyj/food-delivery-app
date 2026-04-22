import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/SwiggynavLogo.png";
import profile from "../assets/profile (1).png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
 const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log("Invalid user data");
      localStorage.removeItem("user");
    }
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="navbar1">
      <div className="nav-inner">

        <div className="left">
          <img src={logo} alt="logo" height="48" />
        </div>

        <div className="right">
          <a href="#">Swiggy Corporate</a>
          <a href="#">Partner with us</a>

          {user ? (
            <div className="profile-section" ref={menuRef}>
              <img
                src={profile}
                alt="profile"
                className="profile-img"
                onClick={() => setShowMenu(!showMenu)}
              />

              {showMenu && (
                <div className="dropdown">
                  <p onClick={() => navigate("/account")}>Profile</p>
                  <p onClick={() => navigate("/account")}>Orders</p>
                  <p>Swiggy One</p>
                  <p>Favourites</p>
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="signin">Sign in</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;