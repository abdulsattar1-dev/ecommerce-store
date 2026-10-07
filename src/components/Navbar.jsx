import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🛍️ Abdul Sattar Store
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;