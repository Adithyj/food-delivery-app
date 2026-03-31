import "./Footer.css";

import logo from "../assets/swiggy-logo.png"; 
import appStore from "../assets/appstore.png";
import playStore from "../assets/googleplay.png";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        
        <div className="footer-brand">
          <div className="brand-logo">
            <img src={logo} alt="Swiggy" />
          </div>
          <p>© 2025 Swiggy Limited</p>
        </div>

       
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Swiggy Corporate</li>
            <li>Careers</li>
            <li>Team</li>
            <li>Swiggy One</li>
            <li>Swiggy Instamart</li>
            <li>Swiggy Dineout</li>
            <li>Minis</li>
            <li>Pyng</li>
          </ul>
        </div>

        
        <div className="footer-column">
          <h4>Contact us</h4>
          <ul>
            <li>Help & Support</li>
            <li>Partner With Us</li>
            <li>Ride With Us</li>
          </ul>

          <h4 className="mt">Legal</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        
        <div className="footer-column">
          <h4>Available in:</h4>
          <ul>
            <li>Bangalore</li>
            <li>Gurgaon</li>
            <li>Hyderabad</li>
            <li>Delhi</li>
            <li>Mumbai</li>
            <li>Pune</li>
          </ul>

          <button className="cities-btn">685 cities ▾</button>
        </div>

       
        <div className="footer-column">
          <h4>Life at Swiggy</h4>
          <ul>
            <li>Explore With Swiggy</li>
            <li>Swiggy News</li>
            <li>Snackables</li>
          </ul>

          <h4 className="mt">Social Links</h4>
         

        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <h2>For better experience, download the Swiggy app now</h2>
        <div className="store-buttons">
          <img src={appStore} alt="App Store" />
          <img src={playStore} alt="Google Play" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
