import React, { useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

function ProductList() {
  const {
    products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sort,
    setSort,
    categories
  } = useProducts();

  const [page, setPage] = useState(1);
  const pageSize = 24;

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleProducts = products.slice(startIndex, startIndex + pageSize);

  if (loading) return <div className="center-msg">Loading products…</div>;
  if (error) return <div className="center-msg error">Failed to load products.</div>;

  const handleFilterChange = (type, value) => {
    if (type === "search") setSearchTerm(value);
    if (type === "category") setCategory(value);
    if (type === "sort") setSort(value);
    setPage(1); // reset to first page whenever filters change
  };

  return (
    <div>
      {/* Controls: search + category + sort */}
      <div className="product-controls">
        <input
          type="text"
          className="product-search-input"
          placeholder="Search (e.g. mobile, shirt, ring)…"
          value={searchTerm}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />

        <select
          className="product-select"
          value={category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All categories" : c}
            </option>
          ))}
        </select>

        <select
          className="product-select"
          value={sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
        >
          <option value="none">Sort by</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Products grid */}
      <div className="product-list">
        {visibleProducts.length === 0 ? (
          <div className="center-msg">
            No products found{searchTerm && ` for “${searchTerm}”`}.
          </div>
        ) : (
          visibleProducts.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="product-link">
              <ProductCard product={p} />
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {products.length > pageSize && (
        <div className="product-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
