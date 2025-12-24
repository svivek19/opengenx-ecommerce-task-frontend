import { useEffect, useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import Navbar from "../../components/user/Navbar";
import { fetchProducts } from "../../api/productApi";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";

const ProductList = () => {
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
        setProducts(data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  }, [search, category, sort, allProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const categories = ["all", ...new Set(allProducts.map((p) => p.category))];

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Products</h1>

        <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-300 rounded-md px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-md px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
              setSort("");
            }}
            className="bg-gray-200 rounded px-3 py-2 hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />

                <div className="p-4">
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-gray-500 text-sm">{product.category}</p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold">₹{product.price}</span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                    >
                      <FaShoppingCart /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <p className="text-gray-500">No products match your filters</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
