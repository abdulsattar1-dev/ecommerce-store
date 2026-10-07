import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=0");
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError("Could not load products. Please check your internet.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Make a list of all categories (without repeats)
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Show only the products that match the search AND the category
  const filteredProducts = products.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) return <p className="status">Loading products... ⏳</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div>
      <h1 className="page-title">All Products</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All categories" : cat}
            </option>
          ))}
        </select>
      </div>

      <p className="result-count">Showing {filteredProducts.length} products</p>

      {filteredProducts.length === 0 ? (
        <p className="status">No products found. Try another search. 😕</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;