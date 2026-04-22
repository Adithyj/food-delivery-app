import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const API = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const getCartKey = () => {
    if (!user?._id) return "cart_guest";
    return `cart_${user._id}`;
  };

  const [cart, setCart] = useState([]);

 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(getCartKey())) || [];
    setCart(data);
  }, []);

  const deleteItem = (id) => {
  const updated = cart.filter((item) => item._id !== id);
  setCart(updated);
  localStorage.setItem(getCartKey(), JSON.stringify(updated));

  
  window.dispatchEvent(new Event("cartUpdated"));
};

  return (
    <div>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>Your Cart</h1>

        {!user ? (
          <p>Please login to view your cart</p>
        ) : cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {/* BUY ALL */}
            <button
              className="buy-all-btn"
              onClick={() =>
                navigate("/checkout", { state: { items: cart } })
              }
            >
              BUY ALL
            </button>

            {cart.map((item) => (
              <div className="Item-box" key={item._id}>
                <div className="item-box1">
                  <img src={`${API}/${item.image}`} alt="" />
                </div>

                <div className="item-box2">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>

                <div className="item-box3">
                  <button
                    className="buy-btn"
                    onClick={() =>
                      navigate("/checkout", {
                        state: { items: [item] }
                      })
                    }
                  >
                    BUY
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;