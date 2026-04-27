import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/api";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    getProducts()
      .then((data) => {
        // data: ~100 base products from DummyJSON
        const generated = [];

        // You can change this number if you want more or less
        const targetCount = 5000;

        // some variant options we will randomly mix
        const colors = ["Black", "White", "Blue", "Red", "Green", "Silver", "Gold"];
        const sizes = ["XS", "S", "M", "L", "XL"];
        const storageOptions = ["64GB", "128GB", "256GB", "512GB"];
        const conditions = ["New", "Refurbished", "Open Box"];

        let counter = 1;
        while (generated.length < targetCount) {
          for (const p of data) {
            if (generated.length >= targetCount) break;

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const storage =
              storageOptions[Math.floor(Math.random() * storageOptions.length)];
            const condition =
              conditions[Math.floor(Math.random() * conditions.length)];

            // small random price variation: -10% to +10%
            const variationFactor = 0.9 + Math.random() * 0.2;
            const newPrice = Math.round(p.price * variationFactor);

            generated.push({
              ...p,
              id: `${p.id}-v${counter}`, // unique id
              title: `${p.title} (${color}, ${storage})`,
              price: newPrice,
              variantInfo: {
                color,
                size,
                storage,
                condition,
                baseId: p.id
              }
            });

            counter++;
          }
        }

        setProducts(generated);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => {
        const v = p.variantInfo || {};
        return (
          p.title.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term)) ||
          (v.color && v.color.toLowerCase().includes(term)) ||
          (v.size && v.size.toLowerCase().includes(term)) ||
          (v.storage && v.storage.toLowerCase().includes(term)) ||
          (v.condition && v.condition.toLowerCase().includes(term))
        );
      });
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, category, sort]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  return {
    products: filteredProducts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sort,
    setSort,
    categories
  };
}

export default useProducts;
