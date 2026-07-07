import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TransactionService from "../../services/transactionService";
import AccountService from "../../services/accountService";
import { useAuthContext } from "../../context/AuthContext";
import type { Transaction } from "../../types/Transaction";

export default function Transactions() {

    const { user } = useAuthContext();

    const navigate = useNavigate();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTransactions();
    }, []);

    async function loadTransactions() {

        if (!user) return;

        try {
            setLoading(true);

            // Step 1: get the user's accounts
            const accounts = await AccountService.getByUser(user.id);

            // Step 2: fetch transactions for each account
            const allResults = await Promise.all(
                accounts.map(account =>
                    TransactionService.getByAccount(account.id)
                )
            );

            // Step 3: flatten + sort by date descending
            const merged = allResults
                .flat()
                .sort((a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );

            setTransactions(merged);

        } catch {
            toast.error("Failed to load transactions");
        } finally {
            setLoading(false);
        }

    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-gray-500">Loading transactions...</p>
            </div>
        );
    }

    return (

        <div>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Transactions
                </h1>

                <button
                    onClick={() => navigate("/transactions/transfer")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Transfer Money
                </button>

            </div>

            {transactions.length === 0 ? (

                <p className="text-gray-500">No transactions found.</p>

            ) : (

                <div className="space-y-4">

                    {transactions.map(transaction => (

                        <div
                            key={transaction.id}
                            className="bg-white rounded-lg shadow p-5"
                        >

                            <h2 className="font-bold">
                                {transaction.transactionType}
                            </h2>

                            <p>{transaction.accountNumber}</p>

                            <p>Rs. {transaction.amount}</p>

                            <p>{transaction.description}</p>

                            <p>
                                {new Date(
                                    transaction.createdAt
                                ).toLocaleString()}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}