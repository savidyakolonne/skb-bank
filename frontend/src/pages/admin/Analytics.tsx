import { Link } from "react-router-dom";

export default function Analytics() {

    return (

        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        Analytics
                    </h1>

                    <p className="text-gray-500">
                        Business insights and performance statistics.
                    </p>

                </div>

                <Link
                    to="/admin/dashboard"
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                    ← Back to Dashboard
                </Link>

            </div>

            {/* Account Status */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Account Status
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="rounded-xl border p-5 text-center">

                        <h3 className="text-green-600 font-semibold">
                            Active
                        </h3>

                        <p className="text-4xl font-bold mt-3">
                            125
                        </p>

                    </div>

                    <div className="rounded-xl border p-5 text-center">

                        <h3 className="text-yellow-600 font-semibold">
                            Frozen
                        </h3>

                        <p className="text-4xl font-bold mt-3">
                            8
                        </p>

                    </div>

                    <div className="rounded-xl border p-5 text-center">

                        <h3 className="text-red-600 font-semibold">
                            Closed
                        </h3>

                        <p className="text-4xl font-bold mt-3">
                            3
                        </p>

                    </div>

                </div>

            </div>

            {/* Pie Chart */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Account Status Distribution
                </h2>

                <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">

                    Pie Chart

                </div>

            </div>

            {/* Line Chart */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Monthly Transactions
                </h2>

                <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">

                    Line Chart

                </div>

            </div>

            {/* Bar Chart */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Deposits vs Withdrawals
                </h2>

                <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">

                    Bar Chart

                </div>

            </div>

            {/* Top Customers */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Top Customers
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">
                                Customer
                            </th>

                            <th className="text-left">
                                Account
                            </th>

                            <th className="text-left">
                                Balance
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr className="border-b">

                            <td className="py-4">
                                Coming Soon
                            </td>

                            <td>-</td>

                            <td>-</td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}