import { Outlet } from "react-router-dom";
import Navbar from "../pages/admin/Navbar";
import Sidebar from "../pages/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Outlet />
    </div>
  );
}