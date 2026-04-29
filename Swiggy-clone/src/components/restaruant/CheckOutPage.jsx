import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./CheckOutPage.css";

function CheckOutPage() {
  const API = import.meta.env.VITE_API;
  const location = useLocation();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
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


  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.18;
  const totalAmount = subtotal + gst;


  const getCartKey = () => {
    if (!user?._id) return "cart_guest";
    return `cart_${user._id}`;
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    if (!user?._id) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {

      const res = await axios.post(
        `${API}/payment-intent`,
        { amount: Math.round(totalAmount * 100) }
      );

      const clientSecret = res.data.client_secret;

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

        await axios.post(`${API}/api/order`, {
          userId: user._id,
          restaurantId: items[0].restaurantId,
          items: items.map(item => ({
            itemId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        });


        const existingCart =
          JSON.parse(localStorage.getItem(getCartKey())) || [];

        const updatedCart = existingCart.filter(
          (cartItem) =>
            !items.some(
              (boughtItem) => boughtItem._id === cartItem._id
            )
        );

        localStorage.setItem(getCartKey(), JSON.stringify(updatedCart));

        window.dispatchEvent(new Event("cartUpdated"));

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


        <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>
        <h3>GST (18%): ₹{gst.toFixed(2)}</h3>
        <h3 className="total">Total: ₹{totalAmount.toFixed(2)}</h3>
      </div>


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
          {loading
            ? "Processing..."
            : `Pay ₹${totalAmount.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}

export default CheckOutPage;