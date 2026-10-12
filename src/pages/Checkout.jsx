import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, totalItems, totalPrice, shipping, grandTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    payment: "cod",
  });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  // One function for all inputs
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Check the form and return the errors
  function validate() {
    const newErrors = {};
    if (form.name.trim() === "") newErrors.name = "Please enter your name.";
    if (!form.email.includes("@")) newErrors.email = "Please enter a valid email.";
    if (form.phone.trim().length < 10) newErrors.phone = "Phone number must be at least 10 digits.";
    if (form.address.trim() === "") newErrors.address = "Please enter your address.";
    if (form.city.trim() === "") newErrors.city = "Please enter your city.";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // Stop if there are errors

    setOrderId(Math.floor(100000 + Math.random() * 900000));
    clearCart();
  }

  // Success screen
  if (orderId) {
    return (
      <div className="success">
        <div className="success-icon">✅</div>
        <h1>Thank you for your order!</h1>
        <p>
          Your order number is <strong>#{orderId}</strong>
        </p>
        <p>We will contact you at {form.email} soon.</p>
        <Link to="/products" className="add-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your cart is empty 🛒</h1>
        <p>Add some products before checkout.</p>
        <Link to="/products" className="add-btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Checkout</h1>

      <div className="cart-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Details</h2>

          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Abdul Sattar" />
          {errors.name && <p className="field-error">{errors.name}</p>}

          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          {errors.email && <p className="field-error">{errors.email}</p>}

          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="03001234567" />
          {errors.phone && <p className="field-error">{errors.phone}</p>}

          <label>Address</label>
          <input name="address" value={form.address} onChange={handleChange} placeholder="House #, Street" />
          {errors.address && <p className="field-error">{errors.address}</p>}

          <label>City</label>
          <input name="city" value={form.city} onChange={handleChange} placeholder="Lahore" />
          {errors.city && <p className="field-error">{errors.city}</p>}

          <label>Payment Method</label>
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option value="cod">💵 Cash on Delivery</option>
            <option value="card">💳 Credit / Debit Card</option>
          </select>

          <button type="submit" className="add-btn full">
            Place Order (${grandTotal.toFixed(2)})
          </button>
        </form>

        <div className="summary">
          <h2>Your Order</h2>
          {cart.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;