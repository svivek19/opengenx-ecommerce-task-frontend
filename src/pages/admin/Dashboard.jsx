import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchDashboardStats } from "../../api/dashboardApi";

const COLORS = {
  Pending: "#facc15",
  Shipped: "#3b82f6",
  Delivered: "#22c55e",
  Cancelled: "#ef4444",
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await fetchDashboardStats();
    setStats(data);
  };

  if (!stats) {
    return (
      <AdminLayout>
        <div className="p-6 text-gray-500">Loading dashboard...</div>
      </AdminLayout>
    );
  }

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: FaBoxOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: FaShoppingCart,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: FaUsers,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: FaRupeeSign,
      color: "from-orange-500 to-orange-600",
    },
  ];

  // TEMP chart data (can be replaced with API later)
  const orderStatusData = [
    { name: "Pending", value: stats.pending || 5 },
    { name: "Shipped", value: stats.shipped || 4 },
    { name: "Delivered", value: stats.delivered || 8 },
    { name: "Cancelled", value: stats.cancelled || 1 },
  ];

  const revenueData = [
    { name: "Mon", amount: 1200 },
    { name: "Tue", amount: 1800 },
    { name: "Wed", amount: 900 },
    { name: "Thu", amount: 2200 },
    { name: "Fri", amount: 1700 },
  ];

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{c.label}</p>
                    <p className="text-2xl font-bold mt-1">{c.value}</p>
                  </div>
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-r ${c.color} text-white`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PIE CHART */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold mb-4">Orders by Status</h2>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={100}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* BAR CHART */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold mb-4">Revenue Overview</h2>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
