import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "Users",
    path: "/admin/users",
  },
  {
    name: "Accounts",
    path: "/admin/accounts",
  },
  {
    name: "Transactions",
    path: "/admin/transactions",
  },
  {
    name: "Reports",
    path: "/admin/reports",
  },
];

export default function AdminSidebar() {

  return (
    <aside className="w-64 min-h-screen bg-white shadow">

      <nav className="flex flex-col gap-3 p-5">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-slate-100"
              }`
            }
          >
            {item.name}
          </NavLink>

        ))}

      </nav>

    </aside>
  );
}