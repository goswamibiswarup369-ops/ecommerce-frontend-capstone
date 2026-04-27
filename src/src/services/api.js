// src/services/api.js

const BASE_URL = "https://dummyjson.com";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products?limit=100`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  // DummyJSON returns { products: [...] }
  return data.products;
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
