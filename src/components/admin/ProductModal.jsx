import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const initialState = {
  name: "",
  category: "",
  price: "",
  stock: "",
  image: "",
};

const ProductModal = ({
  open,
  onClose,
  onSubmit,
  product,
  categories = [],
}) => {
  const [form, setForm] = useState(initialState);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (open && product) {
      setForm({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || "",
      });
      setIsNewCategory(false);
      setNewCategory("");
    }

    if (open && !product) {
      setForm(initialState);
      setIsNewCategory(false);
      setNewCategory("");
    }
  }, [product, open]);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCategoryChange = (e) => {
    if (e.target.value === "__new__") {
      setIsNewCategory(true);
      setForm({ ...form, category: "" });
    } else {
      setIsNewCategory(false);
      setForm({ ...form, category: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      category: isNewCategory ? newCategory : form.category,
    };

    onSubmit(payload);
    setForm(initialState);
    setIsNewCategory(false);
    setNewCategory("");
  };

  const handleClose = () => {
    setForm(initialState);
    setIsNewCategory(false);
    setNewCategory("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          {/* CATEGORY SELECT */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={isNewCategory ? "__new__" : form.category}
              onChange={handleCategoryChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="__new__">+ Add new category</option>
            </select>
          </div>

          {/* NEW CATEGORY INPUT */}
          {isNewCategory && (
            <Input
              label="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          )}

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="w-1/2 border rounded-lg py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      required
      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);

export default ProductModal;
