import { Link } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaShoppingBag } from "react-icons/fa";
import Navbar from "../../components/user/Navbar";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, totalAmount } = useCart();

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-blue-600 mb-4"
        >
          <FaArrowLeft /> Back to Products
        </Link>

        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4 font-semibold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              <FaShoppingBag /> Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
