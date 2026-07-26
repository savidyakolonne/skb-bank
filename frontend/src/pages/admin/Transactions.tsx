import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminTransactionService from "../../services/adminTransactionService";
import type { AdminTransaction } from "../../types/AdminTransaction";

export default function Transactions() {

    const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadTransactions();
    }, []);

    async function loadTransactions() {

        try {

            const data =
                await AdminTransactionService.getAllTransactions();

            setTransactions(data);

        } catch (error) {

            console.error("Failed to load transactions", error);

        } finally {

            setLoading(false);

        }

    }

    const filteredTransactions = useMemo(() => {

        return transactions.filter(transaction =>

            transaction.customerName
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            transaction.accountNumber
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            transaction.transactionType
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [transactions, search]);

    if (loading) {

        return (
            <div className="p-8">
                Loading transactions...
            </div>
        );

    }

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        Transaction Management
                    </h1>

                    <p className="text-gray-500">
                        Total Transactions: {transactions.length}
                    </p>

                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-72"
                />

            </div>

            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Type
                            </th>

                            <th className="p-4 text-left">
                                Customer
                            </th>

                            <th className="p-4 text-left">
                                Account
                            </th>

                            <th className="p-4 text-left">
                                Amount
                            </th>

                            <th className="p-4 text-left">
                                Date
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredTransactions.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center py-10"
                                >
                                    No transactions found.
                                </td>

                            </tr>

                        ) : (

                            filteredTransactions.map(transaction => (

                                <tr
                                    key={transaction.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {transaction.transactionType}
                                    </td>

                                    <td className="p-4">
                                        {transaction.customerName}
                                    </td>

                                    <td className="p-4">
                                        {transaction.accountNumber}
                                    </td>

                                    <td className="p-4">
                                        £{transaction.amount.toLocaleString()}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            transaction.createdAt
                                        ).toLocaleString()}
                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center">

                                            <Link
                                                to={`/admin/transactions/${transaction.id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </Link>

                                        </div>

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