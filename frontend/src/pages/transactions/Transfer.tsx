import { useState } from "react";
import toast from "react-hot-toast";

import TransactionService from "../../services/TransactionService";

export default function Transfer() {

    const [fromAccountId, setFromAccountId] = useState("");

    const [toAccountId, setToAccountId] = useState("");

    const [amount, setAmount] = useState("");

    const [description, setDescription] = useState("");

    async function transfer(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            await TransactionService.transfer({

                fromAccountId: Number(fromAccountId),

                toAccountId: Number(toAccountId),

                amount: Number(amount),

                description

            });

            toast.success(
                "Transfer completed"
            );

        } catch (err: any) {

            toast.error(
                err.response?.data || "Transfer failed"
            );

        }

    }

    return (

        <form
            onSubmit={transfer}
            className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow space-y-4"
        >

            <input
                className="w-full border p-3 rounded"
                placeholder="From Account ID"
                value={fromAccountId}
                onChange={(e) =>
                    setFromAccountId(e.target.value)
                }
            />

            <input
                className="w-full border p-3 rounded"
                placeholder="To Account ID"
                value={toAccountId}
                onChange={(e) =>
                    setToAccountId(e.target.value)
                }
            />

            <input
                className="w-full border p-3 rounded"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                    setAmount(e.target.value)
                }
            />

            <textarea
                className="w-full border p-3 rounded"
                placeholder="Description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <button
                className="bg-blue-600 text-white px-5 py-3 rounded"
            >
                Transfer
            </button>

        </form>

    );

}