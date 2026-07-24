import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TransactionService from "../../services/transactionService";
import type { Transaction } from "../../types/Transaction";

export default function Transactions() {

    const navigate = useNavigate();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTransactions();
    }, []);

    async function loadTransactions() {

        try {

            setLoading(true);

            const data = await TransactionService.getMyTransactions();

            setTransactions(data);

        } catch {

            toast.error("Failed to load transactions");

        } finally {

            setLoading(false);

        }

    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-gray-500 text-lg">
                    Loading transactions...
                </p>
            </div>
        );
    }

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    My Transactions
                </h1>

                <button
                    onClick={() => navigate("/transactions/transfer")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                    + Transfer Money
                </button>

            </div>

            {/* Empty State */}

            {transactions.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-8 text-center">

                    <p className="text-gray-500">
                        No transactions found.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {transactions.map((transaction) => (

                        <div
                            key={transaction.id}
                            className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
                        >

                            <div>

                                <h2 className="font-semibold text-lg">
                                    {transaction.transactionType.replace("_", " ")}
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    {transaction.accountNumber}
                                </p>

                                <p className="text-gray-500 text-sm">
                                    {transaction.description || "No description"}
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    {new Date(transaction.createdAt).toLocaleString()}
                                </p>

                            </div>

                            <div
                                className={`text-xl font-bold ${
                                    transaction.transactionType.includes("IN")
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                Rs. {Number(transaction.amount).toLocaleString()}
                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}