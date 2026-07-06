import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Customer Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Accounts from "../pages/accounts/Accounts";
import CreateAccount from "../pages/accounts/CreateAccount";
import Transactions from "../pages/transactions/Transactions";
import Transfer from "../pages/transactions/Transfer";
import Profile from "../pages/profile/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminAccounts from "../pages/admin/Accounts";
import AdminTransactions from "../pages/admin/Transactions";
import Reports from "../pages/admin/Reports";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Customer */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/accounts"
          element={<Accounts />}
        />

        <Route
          path="/accounts/create"
          element={<CreateAccount />}
        />

        <Route
          path="/transactions"
          element={<Transactions />}
        />

        <Route
          path="/transactions/transfer"
          element={<Transfer />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>

      {/* Admin */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="users"
          element={<AdminUsers />}
        />

        <Route
          path="accounts"
          element={<AdminAccounts />}
        />

        <Route
          path="transactions"
          element={<AdminTransactions />}
        />

        <Route
          path="reports"
          element={<Reports />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}