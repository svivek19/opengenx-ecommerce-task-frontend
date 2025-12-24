import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBoxOpen,
  FaCalendarAlt,
  FaArrowLeft,
  FaChevronDown,
  FaRupeeSign,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

import Navbar from "../../components/user/Navbar";
import { getUserOrders } from "../../api/orderApi";

const MyOrders = () => {
  const id = JSON.parse(localStorage.getItem("user"))._id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getUserOrders(id);
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-blue-600 mb-8 hover:underline"
        >
          <FaArrowLeft /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {loading && <p className="text-gray-500">Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-10 text-center">
                <p className="text-gray-500 text-lg">No orders found 📦</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <details
                    key={order._id}
                    className="group bg-white rounded-xl border border-gray-200 transition hover:shadow-md"
                  >
                    {/* SUMMARY */}
                    <summary className="list-none cursor-pointer p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <FaBoxOpen className="text-blue-600 mt-1" />

                        <div>
                          <p className="text-sm text-gray-500">
                            Order #{order._id.slice(-6)}
                          </p>
                          <p className="font-semibold flex items-center gap-1">
                            <FaRupeeSign size={12} />
                            {order.totalAmount}
                            <span className="text-gray-400 font-normal">
                              · {order.products.length} items
                            </span>
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <FaCalendarAlt size={12} />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* STATUS */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
            ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-700"
                : order.status === "Cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
                        >
                          {order.status === "Delivered" && <FaCheckCircle />}
                          {order.status === "Shipped" && <FaTruck />}
                          {order.status === "Cancelled" && <FaTimesCircle />}
                          {order.status === "Pending" && <FaClock />}
                          {order.status}
                        </span>

                        <FaChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" />
                      </div>
                    </summary>

                    {/* DETAILS */}
                    <div className="border-t bg-gray-50 px-4">
                      {order.products.map((p) => (
                        <div
                          key={p._id}
                          className="flex items-center gap-3 py-4 border-b last:border-b-0"
                        >
                          <img
                            src={p.product?.image}
                            alt={p.product?.name}
                            className="w-14 h-14 rounded-lg object-cover border"
                          />

                          <div className="flex-1">
                            <p className="font-medium">{p.product?.name}</p>
                            <p className="text-sm text-gray-500">
                              ₹{p.product?.price} × {p.quantity}
                            </p>
                          </div>

                          <div className="font-semibold text-gray-700">
                            ₹{p.product?.price * p.quantity}
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-between items-center py-4 font-semibold">
                        <span className="text-gray-600">Total</span>
                        <span className="text-lg text-blue-600">
                          ₹{order.totalAmount}
                        </span>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyOrders;
