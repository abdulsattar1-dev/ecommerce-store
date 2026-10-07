import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          setError("Product not found. 😕");
          return;
        }
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]);
      } catch (err) {
        setError("Could not load the product. Please check your internet.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (loading) return <p className="status">Loading product... ⏳</p>;
  if (error) return <p className="status error">{error}</p>;

  // Price before the discount
  const oldPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div>
      <Link to="/products" className="back-link">
        ← Back to products
      </Link>

      <div className="details">
        <div className="gallery">
          <img src={mainImage} alt={product.title} className="main-image" />
          <div className="thumbnails">
            {product.images.map((img) => (
              <img
                key={img}
                src={img}
                alt={product.title}
                className={img === mainImage ? "thumb active" : "thumb"}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="info">
          <p className="category">{product.category}</p>
          <h1>{product.title}</h1>
          {product.brand && <p className="brand">Brand: {product.brand}</p>}
          <p className="rating">⭐ {product.rating} / 5</p>

          <div className="price-box">
            <span className="price big">${product.price}</span>
            <span className="old-price">${oldPrice}</span>
            <span className="discount">-{Math.round(product.discountPercentage)}%</span>
          </div>

          <p className="description">{product.description}</p>

          <p className={product.stock > 0 ? "stock in" : "stock out"}>
            {product.stock > 0 ? `✅ In stock (${product.stock} left)` : "❌ Out of stock"}
          </p>

          <button className="add-btn" onClick={handleAdd} disabled={product.stock === 0}>
            {added ? "✅ Added to cart!" : "🛒 Add to Cart"}
          </button>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="reviews">
          <h2>Customer Reviews</h2>
          {product.reviews.map((review, index) => (
            <div key={index} className="review">
              <p className="review-top">
                <strong>{review.reviewerName}</strong> · ⭐ {review.rating}
              </p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;