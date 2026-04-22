import "./MyAccount.css";
import { useEffect, useState } from "react";
import axios from "axios";

;
function MyAccount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const API = import.meta.env.VITE_API;
    const [showModal, setShowModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || ""
    });
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("orders");
    useEffect(() => {
        if (!user?._id) return;

        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${API}/api/orders/${user._id}`);
                setOrders(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchOrders();
    }, [user]);

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`${API}/api/admin/users/${user._id}`, formData);


            localStorage.setItem("user", JSON.stringify(res.data));

            alert("Profile updated");

            setShowModal(false);
            window.location.reload();

        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        }
    };
    const cancelOrder = async (orderId) => {
        try {
            await axios.put(`${API}/api/orders/${orderId}/cancel`);

            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId
                        ? { ...order, status: "Cancelled" }
                        : order
                )
            );

        } catch (err) {
            alert(err.response?.data?.message || "Cancel failed");
        }
    };

    return (
        <div className="account-wrapper">


            <div className="account-top">
                <div className="account-info">
                    <h2>{user?.name || "User Name"}</h2>
                    <p>{user?.phone}</p>
                </div>

                <button className="edit-btn" onClick={() => setShowModal(true)}>
                    EDIT PROFILE
                </button>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h3>Edit Profile</h3>

                        <input
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />

                        <input
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />

                        <input
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                        />

                        <div className="modal-buttons">
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>

                    </div>
                </div>
            )}


            <div className="account-main">


                <div className="sidebar">
                    <div
                        className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
                        onClick={() => setActiveTab("orders")}
                    >
                        Orders
                    </div>

                    <div
                        className={`menu-item ${activeTab === "swiggy" ? "active" : ""}`}
                        onClick={() => setActiveTab("swiggy")}
                    >
                        Swiggy One
                    </div>

                    <div
                        className={`menu-item ${activeTab === "favourites" ? "active" : ""}`}
                        onClick={() => setActiveTab("favourites")}
                    >
                        Favourites
                    </div>

                    <div
                        className={`menu-item ${activeTab === "payments" ? "active" : ""}`}
                        onClick={() => setActiveTab("payments")}
                    >
                        Payments
                    </div>

                    <div
                        className={`menu-item ${activeTab === "addresses" ? "active" : ""}`}
                        onClick={() => setActiveTab("addresses")}
                    >
                        Addresses
                    </div>

                    <div
                        className={`menu-item ${activeTab === "settings" ? "active" : ""}`}
                        onClick={() => setActiveTab("settings")}
                    >
                        Settings
                    </div>
                </div>


                <div className="content">


                    {activeTab === "orders" && (
                        <>
                            {orders.length === 0 ? (
                                <>
                                    <p className="empty-text">
                                        Your orders with Swiggy will be listed here.
                                    </p>

                                    <div className="empty-box">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                                            alt="no orders"
                                        />
                                        <h3>No Orders</h3>
                                        <p>You haven't placed any order yet.</p>
                                    </div>
                                </>
                            ) : (
                                <div className="orders-list">
                                    <h3>My Orders</h3>
                                    {orders.map((order) => (
                                        <div className="order-card" key={order._id} onClick={() => setShowOrderModal(true)}>
                                            <h4>Order #{order._id.slice(-6)}</h4>
                                            <p>
                                                Status:
                                                <span className={`status ${order.status.toLowerCase().replace(/ /g, "-")}`}>
                                                    {order.status}
                                                </span>
                                            </p>
                                            <p>Total: ₹{order.totalAmount}</p>

                                            <div className="items">
                                                {order.status === "Placed" && (
                                                    <button
                                                        className="cancel-btn"
                                                        onClick={() => cancelOrder(order._id)}
                                                    >
                                                        Cancel Order
                                                    </button>
                                                )}
                                                {order.items.map((item, index) => (
                                                    <p key={index}>
                                                        name:  {item.name}
                                                        x {item.quantity} = ₹{item.price * item.quantity}
                                                    </p>

                                                ))}
                                                {showOrderModal && (
                                                    <div className="modal-overlay">
                                                        <div className="modal">
                                                            <h3>Order #{order._id.slice(-6)}</h3>

                                                            <p><order className="name">{order.name}</order></p>

                                                            <div className="modal-buttons">
                                                                <button onClick={handleUpdate}>Save</button>
                                                                <button onClick={() => setShowModal(false)}>Cancel</button>
                                                            </div>

                                                        </div>
                                                    </div>)}
                                            </div>
                                        </div>

                                    ))}
                                </div>


                            )}
                        </>
                    )}


                    {activeTab === "swiggy" && (

                        <div className="swiggy-one">
                            <div className="swiggy-one-container">
                                <div className="swiggy-info">
                                    <h2>Swiggy One</h2>
                                    <p>
                                        Get free delivery and extra discounts all across Swiggy.
                                        <br />
                                        Your Swiggy One benefits can be availed only on the Swiggy App.
                                    </p>
                                </div>


                                <div className="app-buttons">
                                    <a href="https://apps.apple.com/in/app/swiggy-food-instamart-dineout/id989540920"><img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv" /></a>
                                    <a href="https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheaderhttps://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader"> <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" /></a>
                                </div>
                            </div>
                            <div className="swiggy-one-image">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_720,h_660/swiggy_one/my_account_super" alt="" />
                            </div>

                        </div>
                    )}


                    {activeTab === "payments" && (
                        <div>
                            <h2>Payments</h2>
                        </div>
                    )}


                    {activeTab === "addresses" && (
                        <div>
                            <h2>Manage Addresses</h2>

                            <div className="address-card">
                                <h4>Home</h4>
                                <p>Sayadri College Of Engineering, Karnataka</p>
                                <div className="address-actions">
                                    <span>Edit</span>
                                    <span>Delete</span>
                                </div>
                            </div>
                        </div>
                    )}


                    {activeTab === "settings" && (
                        <div>
                            <h2>SMS Preferences</h2>

                            <div className="settings-box">
                                <p>
                                    Order related SMS cannot be disabled as they are critical to provide service
                                </p>

                                <div className="toggle-row">
                                    <span>Recommendations & Reminders</span>
                                    <input type="checkbox" defaultChecked />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default MyAccount;