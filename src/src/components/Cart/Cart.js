import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import "./Cart.css";

function Cart() {
  const { items, increment, decrement, removeItem, total } = useContext(CartContext);

  if (items.length === 0) {
    return <div className="center-msg">Your cart is empty.</div>;
  }

  return (
    <div className="cart">
      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} className="cart-img" />
          <div className="cart-info">
            <h4>{item.title}</h4>
            <p>${item.price.toFixed(2)}</p>
            <div className="cart-qty">
              <button onClick={() => decrement(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.id)}>+</button>
            </div>
          </div>
          <button className="cart-remove" onClick={() => removeItem(item.id)}>
            ✕
          </button>
        </div>
      ))}
      <div className="cart-summary">
        <div>Total: ${total.toFixed(2)}</div>
        <Link to="/checkout" className="btn-primary">
          Go to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
