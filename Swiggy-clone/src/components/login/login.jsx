import { useState } from "react";
import axios from "axios";
import "./Login.css";
import Myimage from "../../assets/swiggyLog.png";

function Login() {

    const API = process.env.API ;   
    const [formData, setFormData] = useState({
        phone: "",
        name: "",
        email: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API}/api/auth/signup`,
                formData
            );

            setMessage(response.data.message);


            setFormData({
                phone: "",
                name: "",
                email: ""
            });

        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Server error");
            }
        }
    };

    return (
        <>
            <div className="main" style={{ backgroundColor: "white" }}>
                <div className="sign">
                    <div className="div1">
                        <h1>Sign up</h1>
                        or{" "}
                        <a
                            className="lg1"
                            href="#"
                            style={{ textDecoration: "none" }}
                        >
                            login to your account
                        </a>
                    </div>

                    <div className="div2">
                        <img
                            className="image"
                            src={Myimage}
                            alt="Swiggy Logo"
                            width="100"
                            height="105"
                        />
                    </div>
                </div>

                <div id="formdiv">
                    <form id="form" onSubmit={handleSubmit}>
                        <div className="form">
                            <div className="input phone">
                                <label htmlFor="phone">Phone number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input name">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input email">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <a
                            href="#"
                            style={{
                                color: "#5d8ed5",
                                textDecoration: "none"
                            }}
                        >
                            Have a referral code?
                        </a>

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
                            Continue
                        </button>

                        <p id="para">
                            By clicking on Continue, you agree to the
                            Terms of Service and Privacy Policy.
                        </p>

                        {message && (
                            <p style={{ color: "green", marginTop: "10px" }}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
