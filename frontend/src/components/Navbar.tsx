import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar(){
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return(
        <header className=" h-16 bg-white shadow flex items-center justify-between px-8">
            <h1 className="text-2xl font-bold text-blue-600"> 
                SKB Bank
            </h1>

            <button
                onClick={handleLogout}
                className=" bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
                Logout
            </button>
        </header>
    );
}