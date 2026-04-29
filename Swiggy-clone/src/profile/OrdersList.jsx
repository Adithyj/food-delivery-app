import "./OrdersList.css";

function OrdersList({ orders, handleOrderClick, cancelOrder }) {
  return (
    <div className="orders-container">

      <h3 className="orders-title">My Orders</h3>

      <div >
        {orders.map((order) => (
          <div
            className="order-card"
            key={order._id}
            onClick={() => handleOrderClick(order)}
          >
            <h4>Order #{order._id}</h4>

            <p>
              Status:
              <span className={`status ${order.status.toLowerCase().replace(/ /g, "-")}`}>
                {order.status}
              </span>
            </p>

            <p>Total: ₹{order.totalAmount}</p>

            {order.status === "Placed" && (
              <button
                className="cancel-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  cancelOrder(order._id);
                }}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default OrdersList;