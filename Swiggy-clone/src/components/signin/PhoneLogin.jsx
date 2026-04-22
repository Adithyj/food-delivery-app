
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import logo from "../../assets/swiggyLog.png";

function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API =import.meta.env.VITE_API;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (phone.length !== 10) {
      setError("Enter valid 10 digit phone number");
      return;
    }

    try {
      const res = await axios.post(`${API}/api/auth/check-user`, {
        phone
      });

      if (res.data.exists) {
        
        await axios.post(`${API}/api/auth/send-otp`, { phone });

        navigate("/verify-otp", { state: { phone } });
      } else {
        navigate("/signup", { state: { phone } });
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box1">
       <div className="sign">
                           <div className="div1">
                               <h1>Login</h1>
                               or{" "}
                               <a
                                   className="lg1"
                                   href="/signup"
                                   style={{ textDecoration: "none" }}
                               >
                                   SignUp to your account
                               </a>
                           </div>
       
                           <div className="div2">
                               <img
                                   className="image"
                                   src={logo}
                                   alt="Swiggy Logo"
                                   width="100"
                                   height="105"
                               />
                           </div>
                       </div>
       

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="primary-btn">
            LOGIN
          </button>
        </form>

        <p className="terms">
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy
        </p>
      </div>

      
    </div>
  );
}

export default PhoneLogin;