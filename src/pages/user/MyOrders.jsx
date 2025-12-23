import { Link } from "react-router-dom";
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import Navbar from "../../components/user/Navbar";

const MyOrders = () => {
  // TEMP data (replace with API later)
  const orders = [
    {
      _id: "o1",
      products: [
        { name: "Vitamin C Serum", quantity: 2 },
        { name: "React Handbook", quantity: 1 },
      ],
      totalAmount: 2497,
      status: "Pending",
    },
    {
      _id: "o2",
      products: [{ name: "Aloe Vera Gel", quantity: 1 }],
      totalAmount: 499,
      status: "Delivered",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-blue-600 mb-4"
        >
          <FaArrowLeft /> Back to Products
        </Link>

        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-medium flex items-center gap-2">
                    <FaBoxOpen /> Order #{order._id}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-sm text-gray-700">
                  {order.products.map((p, i) => (
                    <div key={i}>
                      {p.name} × {p.quantity}
                    </div>
                  ))}
                </div>

                <div className="mt-3 font-semibold">
                  Total: ₹{order.totalAmount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrders;
