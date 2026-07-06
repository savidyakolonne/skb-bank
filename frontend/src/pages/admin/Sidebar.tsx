import { NavLink } from "react-router-dom";

const menu = [
    {
        name: "Dashboard",
        path: "/dashboard"
    },
    {
        name: "Accounts",
        path: "/accounts"
    },
    {
        name: "Transactions",
        path: "/transactions"
    },
    {
        name: "Users",
        path: "/users"
    }
];

export default function Sidebar(){
    return(
        <aside className=" w-64 min-h-[calc(100vh-64px)] bg-white shadow">
            <nav className=" flex flex-col p-5 gap-3">
                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({isActive}) => 
                            `rounded-lg px-4 py-3 transition ${
                                isActive
                                ? "bg-blue-600 text-white"
                                : " hover:bg-slate-100"
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