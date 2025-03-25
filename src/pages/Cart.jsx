import useCart from "../hooks/useCart";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/cart.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
  const { cart, totalSum, cnt, addToCart: Add, removeFromCart: Remove } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isExpanded = location.pathname === "/cart";

  //   return (
  //     <div className={`cart-window ${isExpanded ? "cart-window-expanded" : "cart-window-small"}`}>
  //       <h2>Cart</h2>
  //       {cart.length === 0 ? (
  //         <p>no items yet</p>
  //       ) : (
  //         <div className="contain-items">
  //           {cart.map((item) => (
  //             <div
  //               key={item._id}
  //             >
  //               <span>{item.nameProduct}</span>
  //               <img src={item.description} className="cart-item-image" alt={item.nameProduct} />
  //               <p>מחיר: ₪{item.price}</p>
  //               <p>כמות: {item.qty}</p>
  //               <p>סה"כ: ₪{item.price * item.qty}</p>
  //               <div className="plusminus">
  //                 <button className="plus" onClick={() => Add(item)}>➕</button>
  //                 <button className="minus" onClick={() => Remove(item._id)}>➖</button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //       <div className="total-summary">
  //         <h3>סכום כולל: ₪{totalSum}</h3>
  //         <h3>מספר המוצרים: {cnt}</h3>
  //       </div>
  //       <input className="btn"
  //         type="button"
  //         onClick={() => navigate("/CheckOut")}
  //         value={"לסיום ההזמנה"}
  //       />
  //     </div>
  //   );
  // };
  return (
    <div className={`cart-window ${isExpanded ? "cart-window-expanded" : "cart-window-small"}`}>
      <h2 className="cart-title">Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty-message">No items yet</p>
      ) : (
        <div className="cart-items-container">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <span className="item-name">{item.nameProduct}</span>
              <img src={item.description} className="cart-item-image" alt={item.nameProduct} />
              <p className="item-price">Price: ₪{item.price}</p>
              <p className="item-quantity">Quantity: {item.qty}</p>
              <p className="item-total">Total: ₪{item.price * item.qty}</p>
              <div className="quantity-controls">
                <AddIcon onClick={() => Add(item)}></AddIcon>
                <RemoveIcon onClick={() => Remove(item._id)}></RemoveIcon>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <h3 className="total-sum">Total: ₪{totalSum}</h3>
        <h3 className="total-items">Items: {cnt}</h3>
      </div>
      <input
        className="btn"
        type="button"
        onClick={() => navigate("/checkOut")}
        value={"checkOut"}
      />
    </div>
  );
}

export default Cart;

