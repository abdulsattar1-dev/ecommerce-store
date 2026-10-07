import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <div className="product-info">
        <p className="category">{product.category}</p>
        <h3 className="title">{product.title}</h3>
        <div className="price-row">
          <span className="price">${product.price}</span>
          <span className="rating">⭐ {product.rating}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;