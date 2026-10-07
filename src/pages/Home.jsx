import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const categories = [
  { slug: "smartphones", name: "Smartphones", icon: "📱" },
  { slug: "laptops", name: "Laptops", icon: "💻" },
  { slug: "fragrances", name: "Fragrances", icon: "🌸" },
  { slug: "beauty", name: "Beauty", icon: "💄" },
  { slug: "groceries", name: "Groceries", icon: "🛒" },
  { slug: "furniture", name: "Furniture", icon: "🛋️" },
  { slug: "mens-shirts", name: "Men's Shirts", icon: "👔" },
  { slug: "womens-dresses", name: "Women's Dresses", icon: "👗" },
];

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?sortBy=rating&order=desc&limit=8"
        );
        const data = await response.json();
        setFeatured(data.products);
      } catch (err) {
        console.log("Could not load featured products");
      } finally {
        setLoading(false);
      }
    }

    loadFeatured();
  }, []);

  return (
    <div>
      {/* Banner */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Abdul Sattar Store 🛍️</h1>
          <p>Find the best products at the best prices. Fast delivery all over Pakistan!</p>
          <Link to="/products" className="hero-btn">
            Shop Now →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature">
          <span>🚚</span>
          <h3>Free Shipping</h3>
          <p>On all orders</p>
        </div>
        <div className="feature">
          <span>💵</span>
          <h3>Cash on Delivery</h3>
          <p>Pay when you receive</p>
        </div>
        <div className="feature">
          <span>🔄</span>
          <h3>Easy Returns</h3>
          <p>7-day return policy</p>
        </div>
        <div className="feature">
          <span>🔒</span>
          <h3>Secure Shopping</h3>
          <p>Your data is safe</p>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat.slug} to={`/products?category=${cat.slug}`} className="category-card">
              <span className="category-icon">{cat.icon}</span>
              <p>{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Top rated products */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">⭐ Top Rated Products</h2>
          <Link to="/products" className="see-all">
            See all →
          </Link>
        </div>
        {loading ? (
          <p className="status">Loading... ⏳</p>
        ) : (
          <div className="products-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;