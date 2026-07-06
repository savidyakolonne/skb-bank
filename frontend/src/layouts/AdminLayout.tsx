import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {

  return (
    <div className="flex min-h-screen">

      <AdminSidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}