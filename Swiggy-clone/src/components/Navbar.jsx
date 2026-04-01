
import "./Navbar.css";
import logo from "../assets/SwiggynavLogo.png";
import { Link } from "react-router-dom";
function Navbar() {

   return (
      <header className="navbar1">
         <div className="nav-inner">
            <div className="left">
               <div className="logo">
                  <img src={logo} alt="swiggy" height="48" width="160" ></img>
               </div>
            </div>
            <div className="right">
               <a href="#">Swiggy Corporate</a>
               <a href="#">Partner with us</a>
               <a href="#" className="getapp">Get the App</a>
               <button className="signin" as={Link} to="/signin">
                 Sign in
               </button>
            </div>
         </div>
      </header>);
}

export default Navbar;
