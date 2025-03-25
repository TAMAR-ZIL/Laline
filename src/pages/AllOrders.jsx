import { useState, useEffect } from "react";
import { getAllOrders } from "../api/orderService"
import { useSelector } from "react-redux"
import "../styles/orderHistory.css"
const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.currentUser)
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(localStorage.getItem("token"));
        setOrders(data);
      } catch (err) {
        setError("לא ניתן לטעון את היסטוריית ההזמנות.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <p>upload...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">your history orders</h2>
      {orders.length === 0 ? (
        <p className="order-history-empty">no orders yet</p>
      ) : (
        <div className="order-history-list">
          {orders.map((order) => (
            <div key={order._id} className="order-history-item">
              <p><strong className="font-semibold">date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong className="font-semibold">destination date:</strong> {new Date(order.destinationDate).toLocaleDateString()}</p>
              <p><strong className="font-semibold">address</strong> {order.address}</p>
              <p><strong className="font-semibold">price:</strong> {order.Price} ₪</p>
              <p><strong className="font-semibold">status:</strong> {order.onWay ? "onway" : "waiting"}</p>
              <p><strong className="font-semibold">delivery:</strong> {order.Delivery ? "✔" : "✖"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;