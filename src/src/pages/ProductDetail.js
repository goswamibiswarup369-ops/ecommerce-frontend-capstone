import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { CartContext } from "../contexts/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="center-msg">Loading…</div>;
  if (!product) return <div className="center-msg">Product not found.</div>;

  return (
    <div className="page product-detail">
      <img
        src={product.thumbnail || product.image}
        alt={product.title}
        className="detail-img"
      />

      <div className="detail-info">
        <h2>{product.title}</h2>

        <p className="detail-category">
          {product.brand ? `${product.brand} · ${product.category}` : product.category}
        </p>

        {product.variantInfo && (
  <p className="detail-variant">
    Color: {product.variantInfo.color} | Size: {product.variantInfo.size} | Storage:{" "}
    {product.variantInfo.storage} | Condition: {product.variantInfo.condition}
  </p>
)}

        <p className="detail-desc">{product.description}</p>

        <div className="detail-price">${product.price.toFixed(2)}</div>

        <button
          className="btn-primary"
          onClick={() =>
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.thumbnail || product.image,
              quantity: 1
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
