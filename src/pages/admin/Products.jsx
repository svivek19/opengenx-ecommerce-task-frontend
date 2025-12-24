import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaTags,
} from "react-icons/fa";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";
import ProductModal from "../../components/admin/ProductModal";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
    setFiltered(data);
  };

  const applyFilters = () => {
    let data = [...products];

    if (filters.search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      data = data.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice) {
      data = data.filter((p) => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      data = data.filter((p) => p.price <= filters.maxPrice);
    }

    setFiltered(data);
    setPage(1);
  };

  const handleSubmit = async (form) => {
    try {
      if (editing) {
        await updateProduct(editing._id, form);
        toast.success("Product updated");
      } else {
        await createProduct(form);
        toast.success("Product added");
      }
      setOpen(false);
      setEditing(null);
      loadProducts();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    toast.success("Product deleted");
    loadProducts();
  };

  const categories = [...new Set(products.map((p) => p.category))];

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Stat
          title="Products"
          value={products.length}
          icon={<FaBoxOpen />}
          color="bg-blue-600"
        />
        <Stat
          title="In Stock"
          value={products.filter((p) => p.stock > 0).length}
          icon={<FaCheckCircle />}
          color="bg-green-600"
        />
        <Stat
          title="Out of Stock"
          value={products.filter((p) => p.stock <= 10).length}
          icon={<FaTimesCircle />}
          color="bg-red-600"
        />
        <Stat
          title="Categories"
          value={categories.length}
          icon={<FaTags />}
          color="bg-purple-600"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Search product"
            className="pl-9 border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <select
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-md object-cover border"
                  />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">₹{p.price}</td>
                <td className="p-3">
                  {p.stock < 10 ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                      Low ({p.stock})
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      {p.stock}
                    </span>
                  )}
                </td>
                <td className="p-3 flex gap-4">
                  <FaEdit
                    onClick={() => {
                      setEditing(p);
                      setOpen(true);
                    }}
                    className="cursor-pointer text-blue-600"
                  />
                  <FaTrash
                    onClick={() => handleDelete(p._id)}
                    className="cursor-pointer text-red-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-2 rounded-md border text-sm
      ${
        page === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-2 rounded-md text-sm font-medium border
          ${
            page === pageNum
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100"
          }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-2 rounded-md border text-sm
      ${
        page === totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
        >
          Next
        </button>
      </div>

      <ProductModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        product={editing}
        categories={categories}
      />
    </AdminLayout>
  );
};

const Stat = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-xl p-4 text-white flex items-center gap-4`}>
    <div className="text-3xl opacity-80">{icon}</div>
    <div>
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default Products;
