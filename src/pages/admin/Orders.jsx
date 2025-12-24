import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchAllOrders, updateOrderStatus } from "../../api/orderApi";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    minAmount: "",
    maxAmount: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchAllOrders();
      setOrders(data);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (
      filters.search &&
      !order.user?.email?.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    if (filters.status && order.status !== filters.status) {
      return false;
    }

    if (filters.minAmount && order.totalAmount < filters.minAmount) {
      return false;
    }

    if (filters.maxAmount && order.totalAmount > filters.maxAmount) {
      return false;
    }

    return true;
  });

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      toast.success("Order status updated");
      loadOrders();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        {/* FILTERS */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            placeholder="Search user email"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input
            type="number"
            placeholder="Min Amount"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFilters({ ...filters, minAmount: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Max Amount"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFilters({ ...filters, maxAmount: e.target.value })
            }
          />
        </div>

        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Products</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <div className="font-medium">
                        {order.user?.name || "User"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.user?.email}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        {order.products.map((p) => (
                          <div key={p._id} className="text-gray-700 text-sm">
                            {p.product?.name} × {p.quantity}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 font-semibold">₹{order.totalAmount}</td>

                    <td className="p-4">
                      <div className="flex flex-col gap-2 w-40">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full w-fit
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
                          {order.status}
                        </span>

                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;
