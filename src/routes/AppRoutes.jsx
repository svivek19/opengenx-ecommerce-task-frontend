import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AdminOrders from "../pages/admin/Orders";
import AdminUsers from "../pages/admin/Users";

import ProductList from "../pages/user/ProductList";
import Cart from "../pages/user/Cart";
import MyOrders from "../pages/user/MyOrders";

import ProtectedRoute from "../auth/ProtectedRoute";
import RoleRoute from "../auth/RoleRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* user routes */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="user">
              <ProductList />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="user">
              <Cart />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="user">
              <MyOrders />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="admin">
              <Dashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="admin">
              <AdminProducts />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="admin">
              <AdminOrders />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="admin">
              <AdminUsers />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
