import Sidebar from "../components/admin/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-4 md:p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
