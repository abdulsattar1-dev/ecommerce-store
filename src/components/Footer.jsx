import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>🛍️ Abdul Sattar Store</h3>
          <p>Quality products, fair prices, fast delivery.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
      <p className="copyright">© {year} Abdul Sattar Store. All rights reserved.</p>
    </footer>
  );
}

export default Footer;