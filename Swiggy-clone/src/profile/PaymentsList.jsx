function PaymentsList({ orders, user }) {
  return (
    <div className="payments-container">

      <h3>Payment History</h3>

      {orders.map((order) => {

        const subtotal = order.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        const gst = subtotal * 0.18;

        return (
          <div className="payment-card" key={order._id}>

            
            <div className="payment-header">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Order ID:</strong> #{order._id.slice(-6)}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
            </div>

            <hr />

           
            <div className="payment-items">
              <div className="payment-row header">
                <span>Item</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>
              </div>

              {order.items.map((item, i) => (
                <div className="payment-row" key={i}>
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                  <span>{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <hr />

            
            <div className="payment-summary">
              <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
              <p>GST (18%): ₹{gst.toFixed(2)}</p>
              <p className="total">
                Total Amount: ₹{order.totalAmount.toFixed(2)}
              </p>
            </div>

          </div>
        );
      })}

    </div>
  );
}

export default PaymentsList;