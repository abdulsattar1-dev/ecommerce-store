import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, increase, decrease, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your cart is empty 🛒</h1>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="add-btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Your Cart ({totalItems} items)</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} />
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <p className="cart-item-price">${item.price}</p>
              </div>
              <div className="qty">
                <button onClick={() => decrease(item.id)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(item.id)}>+</button>
              </div>
              <p className="line-total">${(item.price * item.quantity).toFixed(2)}</p>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                🗑️
              </button>
            </div>
          ))}
          <button className="clear-btn" onClick={clearCart}>
            Clear cart
          </button>
        </div>

        <div className="summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="add-btn full">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;