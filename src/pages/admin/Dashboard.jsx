import { FaBoxOpen, FaShoppingCart, FaUsers } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";

const Dashboard = () => {
  const stats = [
    { label: "Total Products", value: 24, icon: <FaBoxOpen size={30} /> },
    { label: "Total Orders", value: 18, icon: <FaShoppingCart size={30} /> },
    { label: "Total Users", value: 10, icon: <FaUsers size={30} /> },
  ];

  return (
    <AdminLayout>
      <div className="flex">
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow flex items-center justify-between"
              >
                <div>
                  <p className="text-gray-500">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <div className="text-blue-600">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
