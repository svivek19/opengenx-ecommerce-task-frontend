import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaTrash,
  FaShoppingBag,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import Navbar from "../../components/user/Navbar";
import { useCart } from "../../context/CartContext";
import { placeOrder } from "../../api/orderApi";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    totalAmount,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("user"))._id;
  console.log(id);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        user: id,
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount,
      };

      await placeOrder(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/my-orders");
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-blue-600 mb-6 hover:underline"
        >
          <FaArrowLeft /> Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty 🛒</p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow divide-y">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-500 text-sm">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <FaMinus />
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <FaPlus />
                    </button>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 ml-3"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl transition
    ${
      cartItems.length === 0
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-green-600 text-white hover:bg-green-700"
    }`}
              >
                <FaShoppingBag /> Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
