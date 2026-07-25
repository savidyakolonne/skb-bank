import { useEffect, useState } from "react";
import UserService from "../../services/userService";
import type { User } from "../../types/auth";

export default function Users() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {

        try {

            const data = await UserService.getAll();

            setUsers(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Users
            </h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">Name</th>

                            <th className="p-4 text-left">Username</th>

                            <th className="p-4 text-left">Email</th>

                            <th className="p-4 text-left">Role</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4">
                                    {user.name}
                                </td>

                                <td className="p-4">
                                    {user.username}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            user.role === "ADMIN"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {user.role}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}