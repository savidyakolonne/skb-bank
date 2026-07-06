import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function CustomerSidebar() {

  const { user } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Accounts",
      path: "/accounts",
    },
    {
      name: "Transactions",
      path: "/transactions",
    },
    {
      name: "Profile",
      path: `/acc/${user?.username}`,
    },
  ];

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
                  ? "bg-blue-600 text-white"
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