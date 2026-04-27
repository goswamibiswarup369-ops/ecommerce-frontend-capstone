import React, { useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./Checkout.css";

function Checkout({ onSuccess }) {
  const { items, total, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name required";
    if (!form.email.includes("@")) errs.email = "Valid email required";
    if (!form.address.trim()) errs.address = "Address required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    clearCart();
    onSuccess && onSuccess();
  };

  if (items.length === 0) {
    return <div className="center-msg">Cart is empty. Add items first.</div>;
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>
          <label>
            Email
            <input name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>
          <label>
            Address
            <textarea name="address" value={form.address} onChange={handleChange} />
            {errors.address && (
              <span className="field-error">{errors.address}</span>
            )}
          </label>
          <button type="submit" className="btn-primary">
            Place Order
          </button>
        </form>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {items.map((i) => (
              <li key={i.id}>
                {i.title} × {i.quantity}
              </li>
            ))}
          </ul>
          <div className="checkout-total">Total: ${total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
