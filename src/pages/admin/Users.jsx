import Sidebar from "../../components/admin/Sidebar";
import { FaUserShield, FaUser } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";

const Users = () => {
  // TEMP data (replace with API later)
  const users = [
    {
      _id: "u1",
      name: "Admin User",
      email: "admin@test.com",
      role: "admin",
    },
    {
      _id: "u2",
      name: "Vivek",
      email: "vivek@test.com",
      role: "user",
    },
    {
      _id: "u3",
      name: "Ravi",
      email: "ravi@test.com",
      role: "user",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex">
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-semibold mb-6">Users</h1>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 flex items-center gap-2">
                      {user.role === "admin" ? (
                        <>
                          <FaUserShield className="text-blue-600" />
                          <span className="text-blue-600 font-medium">
                            Admin
                          </span>
                        </>
                      ) : (
                        <>
                          <FaUser className="text-gray-600" />
                          <span>User</span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No users found
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

export default Users;
