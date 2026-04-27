import React, { useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault(); // so Link doesn't navigate
    setIsAdding(true);
    await addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail || product.image, // DummyJSON uses thumbnail
      quantity: 1
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.thumbnail || product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        <p className="product-category">
          {product.brand ? `${product.brand} · ${product.category}` : product.category}
        </p>

        {product.rating && (
          <div className="product-rating">
            {"★".repeat(Math.round(product.rating))}
          </div>
        )}

        {product.variantInfo && (
          <p className="product-variant">
            Color: {product.variantInfo.color} | Size: {product.variantInfo.size} | Storage:{" "}
            {product.variantInfo.storage} | Condition: {product.variantInfo.condition}
          </p>
        )}

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className={`add-to-cart-btn ${isAdding ? "adding" : ""}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
