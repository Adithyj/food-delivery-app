import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const API = process.env.API ;
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const deleteItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
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
                  <img
                    src={`${API}/${item.image}`}
                    alt=""
                  />
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