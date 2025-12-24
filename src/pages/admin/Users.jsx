import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchUsers } from "../../api/userApi";
import { FaUserShield, FaUser, FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <FaUsers />
            <span>{users.length}</span>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* NAME */}
                    <td className="p-4 font-medium">{user.name}</td>

                    {/* EMAIL */}
                    <td className="p-4 text-gray-600">{user.email}</td>

                    {/* ROLE */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            user.role === "admin"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {user.role === "admin" ? <FaUserShield /> : <FaUser />}
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-6 text-center text-gray-500">
                      No users found
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

export default Users;
