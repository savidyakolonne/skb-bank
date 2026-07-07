import { useEffect, useState } from "react";

import TransactionService from "../../services/TransactionService";
import type { Transaction } from "../../types/Transaction";

export default function Transactions() {

    const [transactions, setTransactions] =
        useState<Transaction[]>([]);

    useEffect(() => {

        loadTransactions();

    }, []);

    async function loadTransactions() {

        // change this to logged user's account id
        const data =
            await TransactionService.getByAccount(1);

        setTransactions(data);

    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Transactions
            </h1>

            <div className="space-y-4">

                {transactions.map(transaction => (

                    <div
                        key={transaction.id}
                        className="bg-white rounded-lg shadow p-5"
                    >

                        <h2 className="font-bold">

                            {transaction.transactionType}

                        </h2>

                        <p>

                            {transaction.accountNumber}

                        </p>

                        <p>

                            Rs. {transaction.amount}

                        </p>

                        <p>

                            {transaction.description}

                        </p>

                        <p>

                            {new Date(
                                transaction.createdAt
                            ).toLocaleString()}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}