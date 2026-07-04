import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {

  const { logout } = useAuth();

  return (

    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-5xl font-bold mb-4">
        SKB Bank
      </h1>

      <p className="text-gray-500 mb-8">
        Dashboard
      </p>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        Logout
      </button>

    </div>

  );

}