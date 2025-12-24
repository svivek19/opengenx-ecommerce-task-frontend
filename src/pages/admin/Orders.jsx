import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { FaCheckCircle } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      _id: "o1",
      user: "vivek@test.com",
      products: [
        { name: "Vitamin C Serum", quantity: 2 },
        { name: "React Handbook", quantity: 1 },
      ],
      totalAmount: 2497,
      status: "Pending",
    },
    {
      _id: "o2",
      user: "user@test.com",
      products: [{ name: "Aloe Vera Gel", quantity: 1 }],
      totalAmount: 499,
      status: "Delivered",
    },
  ]);

  const handleStatusChange = (id) => {
    setOrders(
      orders.map((order) =>
        order._id === id ? { ...order, status: "Delivered" } : order
      )
    );
  };

  return (
    <AdminLayout>
      <div className="flex">
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-semibold mb-6">Orders</h1>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Products</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{order.user}</td>

                    <td className="p-3">
                      {order.products.map((p, i) => (
                        <div key={i}>
                          {p.name} × {p.quantity}
                        </div>
                      ))}
                    </td>

                    <td className="p-3 font-semibold">₹{order.totalAmount}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {order.status === "Pending" && (
                        <button
                          onClick={() => handleStatusChange(order._id)}
                          className="flex items-center gap-2 text-green-600 hover:text-green-800"
                        >
                          <FaCheckCircle /> Mark Delivered
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
