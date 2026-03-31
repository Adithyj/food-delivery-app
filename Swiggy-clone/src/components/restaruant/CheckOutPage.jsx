import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./CheckoutPage.css";

function CheckOutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const items = location.state?.items || [];

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No items selected</h2>
        <button onClick={() => navigate("/cart")}>
          Go Back to Cart
        </button>
      </div>
    );
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1️⃣ Create Payment Intent
      const res = await axios.post(
        "http://localhost:8080/payment-intent",
        { amount: totalAmount * 100 }
      );

      const clientSecret = res.data.client_secret;

      // 2️⃣ Confirm Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        alert(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // 3️⃣ Place Order AFTER payment
        await axios.post("http://localhost:8080/api/order", {
          userId: "699837b624ec359780bc62ea",
          restaurantId: items[0].restaurantId,
          items: items
        });

        // ✅ FIX: remove ONLY purchased items
        const existingCart =
          JSON.parse(localStorage.getItem("cart")) || [];

        const updatedCart = existingCart.filter(
          (cartItem) =>
            !items.some(
              (boughtItem) => boughtItem._id === cartItem._id
            )
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        alert("Payment successful & Order placed!");

        navigate("/cart");
      }
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* ORDER SUMMARY */}
      <div className="order-summary">
        {items.map((item) => (
          <div key={item._id} className="summary-item">
            <div>
              <p className="item-name">{item.name}</p>
              <p className="item-qty">
                ₹{item.price} × {item.quantity}
              </p>
            </div>

            <div className="item-total">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}

        <hr />

        <h3 className="total">Total: ₹{totalAmount}</h3>
      </div>

      {/* PAYMENT */}
      <div className="payment-box">
        <h3>Card Details</h3>

        <div className="card-element">
          <CardElement />
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="pay-btn"
        >
          {loading ? "Processing..." : `Pay ₹${totalAmount}`}
        </button>
      </div>
    </div>
  );
}

export default CheckOutPage;