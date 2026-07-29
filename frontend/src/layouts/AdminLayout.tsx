import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/Sidebar";
import AdminNavbar from "../pages/admin/AdminNavbar";

export default function AdminLayout() {

  return (
    <div className="flex min-h-screen">

      <AdminSidebar />

      <div className="flex-1">

        <AdminNavbar/>

        <main className="p-8 bg-slate-100 min-h-screen">
          <Outlet />
        </main>

      </div>

    </div>
  );
}