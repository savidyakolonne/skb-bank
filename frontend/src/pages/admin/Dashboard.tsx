import { useEffect, useState } from "react";
import AdminService from "../../services/adminService";
import type { AdminDashboard } from "../../types/AdminDashboard";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const [dashboard, setDashboard] =
        useState<AdminDashboard | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const data =
                await AdminService.getDashboard();

            setDashboard(data);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );

    }

    return (

        <div className="space-y-8">

            <h1 className="text-3xl font-bold">
                Admin Dashboard
            </h1>

            {/* Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500">
                        Total Users
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {dashboard?.totalUsers}
                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500">
                        Total Accounts
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {dashboard?.totalAccounts}
                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500">
                        Total Transactions
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {dashboard?.totalTransactions}
                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500">
                        Total Bank Balance
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        Rs. {dashboard?.totalBankBalance.toLocaleString()}
                    </h2>

                </div>

                <div className="flex justify-end">
                    <Link
                        to="/admin/analytics"
                        className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                    >
                        View Analytics →
                    </Link>
                </div>

            </div>

            {/* Recent Users */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Recent Users
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="text-left border-b">

                            <th>Name</th>

                            <th>Email</th>

                            <th>Username</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dashboard?.recentUsers.map(user => (

                            <tr
                                key={user.id}
                                className="border-b"
                            >

                                <td className="py-3">
                                    {user.name}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    {user.username}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Recent Transactions */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Recent Transactions
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left">
                                Customer
                            </th>

                            <th className="text-left">
                                Type
                            </th>

                            <th className="text-left">
                                Amount
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {dashboard?.recentTransactions.map(transaction => (

                            <tr
                                key={transaction.id}
                                className="border-b"
                            >

                                <td className="py-3">
                                    {transaction.ownerName}
                                </td>

                                <td>
                                    {transaction.transactionType}
                                </td>

                                <td>
                                    Rs. {Number(transaction.amount).toLocaleString()}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}