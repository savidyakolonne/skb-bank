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
import Analytics from "../pages/admin/Analytics";
import AdminUsers from "../pages/admin/Users";
import AdminAccounts from "../pages/admin/Accounts";
import AdminTransactions from "../pages/admin/Transactions";
import TransactionDetails from "../pages/admin/TransactionDetails";
import Reports from "../pages/admin/Reports";
import UserDetails from "../pages/admin/UserDetails";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import AccountDetails from "../pages/admin/AccountDetails";
import Receipt from "../pages/customer/Receipt";

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />}/>
        <Route path="/accounts/create" element={<CreateAccount />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/transfer" element={<Transfer />} />
        <Route path="receipt/:id" element={<Receipt/>}/>
        <Route path="/acc/:username" element={<Profile />} />
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
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<Analytics/>}/>
        <Route path="users" element={<AdminUsers />} />
        <Route path="accounts" element={<AdminAccounts />} />
        <Route path="accounts/:id" element={<AccountDetails/>}/>
        <Route path="transactions" element={<AdminTransactions />} />
        <Route path="transactions/:id" element={<TransactionDetails/>} />
        <Route path="reports" element={<Reports />} />
        <Route path="users/:id" element={<UserDetails/>}/>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}