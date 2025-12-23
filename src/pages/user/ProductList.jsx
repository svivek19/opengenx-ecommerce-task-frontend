import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "../../components/user/Navbar";

const ProductList = () => {
  const [products] = useState([
    {
      _id: "p1",
      name: "Vitamin C Serum",
      category: "Beauty",
      price: 899,
      image: "https://picsum.photos/300?1",
    },
    {
      _id: "p2",
      name: "React Handbook",
      category: "Books",
      price: 699,
      image: "https://picsum.photos/300?2",
    },
    {
      _id: "p3",
      name: "Wireless Headphones",
      category: "Electronics",
      price: 2499,
      image: "https://picsum.photos/300?3",
    },
  ]);

  const handleAddToCart = (product) => {
    // later connect cart context
    console.log("Added to cart:", product);
    alert(`${product.name} added to cart`);
  };

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Products</h1>

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
            <p className="text-gray-500">No products available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
