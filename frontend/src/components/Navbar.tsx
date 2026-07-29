import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";

export default function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className=" h-24 bg-white shadow flex items-center justify-between px-8">

            <img
                src={logo}
                alt="logo"
                width={190}
            />

            <button
                onClick={handleLogout}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition"
            >
                Logout
            </button>
        </header>
    );
}