
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import logo from "../../assets/swiggyLog.png";

function OtpVerify() {
  const location = useLocation();
  const navigate = useNavigate();

  const phone = location.state.phone;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const API = import.meta.env.VITE_API;
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    console.log(phone, otp);
    if (otp.length !== 6) {
      setError("Enter valid 6 digit OTP");
      return;
    }

    try {
      const res = await axios.post(`${API}/api/auth/verify-otp`, {
        phone,
        otp,
      });
      console.log(res.data);
      if (res.data.success) {

 
  localStorage.setItem("user", JSON.stringify(res.data.user));

  
  window.location.href = "/";
}else {
        setError("Invalid OTP");
      }
    } catch (err) {
      setError("Verification failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="sign">
          <div className="div1">
            <h1>Enter OTP</h1>
            <p>We've sent an OTP to your phone number.</p>
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


          <form onSubmit={handleVerify}>
            <input type="text" value={phone} disabled />

            <input
              type="text"
              placeholder="One time password"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="primary-btn">
              VERIFY OTP
            </button>
          </form>
        </div>

       
      </div>
      );
}

      export default OtpVerify;