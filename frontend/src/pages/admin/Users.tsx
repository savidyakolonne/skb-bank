import { useEffect, useMemo, useState } from "react";
import UserService from "../../services/userService";
import type { User } from "../../types/auth";
import { Link } from "react-router-dom";

export default function Users() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

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

    const filteredUsers = useMemo(() => {

        return users.filter(user =>

            user.name.toLowerCase().includes(search.toLowerCase()) ||

            user.email.toLowerCase().includes(search.toLowerCase()) ||

            user.username.toLowerCase().includes(search.toLowerCase())

        );

    }, [users, search]);

    if (loading) {

        return (
            <div className="p-8">
                Loading users...
            </div>
        );

    }

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        User Management
                    </h1>

                    <p className="text-gray-500">
                        Total Users: {users.length}
                    </p>

                </div>

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-72"
                />

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-4">Name</th>

                            <th className="text-left p-4">Username</th>

                            <th className="text-left p-4">Email</th>

                            <th className="text-left p-4">Role</th>

                            <th className="text-left p-4">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="text-center py-10"
                                >
                                    No users found.
                                </td>

                            </tr>

                        ) : (

                            filteredUsers.map(user => (

                                <tr
                                    key={user.id}
                                    className="border-t hover:bg-gray-50"
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
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                user.role === "ADMIN"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {user.role}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <Link
                                            to={`/admin/users/${user.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}