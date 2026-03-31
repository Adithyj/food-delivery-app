import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import Myimage from "../../assets/swiggyLog.png";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    
    const ADMIN_EMAIL = "Adithya-admin@gmail.com";
    const ADMIN_PASSWORD = "Admin@123";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setMessage("Login Successful!");
            
           
            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 1000);

        } else {
            setMessage("Invalid Admin Credentials");
        }
    };

    return (
        <>
            <div className="main" style={{ backgroundColor: "white" }}>
                <div className="sign">
                    <div className="div1">
                        <h1>Admin Login</h1>
                    </div>

                    <div className="div2">
                        <img
                            className="image"
                            src={Myimage}
                            alt="Swiggy Logo"
                            width="49px"
                            height="49px"
                        />
                    </div>
                </div>

                <div id="formdiv">
                    <form id="form" onSubmit={handleSubmit}>
                        <div className="form">

                            <div className="input">
                                <label htmlFor="email">Admin Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className="gap"></div>

                        <button
                            type="submit"
                            className="btn"
                            style={{
                                backgroundColor: "red",
                                width: "390px",
                                height: "40px",
                                color: "white"
                            }}
                        >
                            Login
                        </button>

                        {message && (
                            <p
                                style={{
                                    marginTop: "10px",
                                    color:
                                        message === "Login Successful!"
                                            ? "green"
                                            : "red"
                                }}
                            >
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;