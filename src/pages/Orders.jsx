import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersByUserId } from "../api/orderService";
import "../styles/OrderHistory.css"

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!user) return;
    console.log(user._id);
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUserId(user._id, token);
        console.log("thr", user);

        if (!data)
          alert("אין לך שום הזמנה")
        const userOrders = data.filter(order => order.codeUser === user._id);
        setOrders(userOrders);
      } catch (err) {
        setError("לא ניתן לטעון את היסטוריית ההזמנות.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p>upload orders....</p>;
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

              <p> {order._id}<strong className="font-semibold">order code:</strong></p>

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
      <button className="order-history-refresh-botton" onClick={() => window.location.reload()}>רענן</button>
    </div>
  );
};

export default Orders;
