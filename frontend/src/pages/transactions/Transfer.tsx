import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TransactionService from "../../services/transactionService";
import AccountService from "../../services/accountService";

import type { Account } from "../../types/Account";

export default function Transfer() {

    const [accounts, setAccounts] = useState<Account[]>([]);

    const [fromAccountId, setFromAccountId] = useState("");

    const [toAccountNumber, setToAccountNumber] = useState("");

    const [amount, setAmount] = useState("");

    const [description, setDescription] = useState("");

    useEffect(() => {
        loadAccounts();
    }, []);

    async function loadAccounts() {

        try {

            // Temporary
            // Later replace 1 with auth.user.id
            const data = await AccountService.getByUser(1);

            setAccounts(data);

        } catch {

            toast.error("Failed to load accounts");

        }

    }

    async function transfer(e: React.FormEvent) {

        e.preventDefault();

        try {

            await TransactionService.transfer({

                fromAccountId: Number(fromAccountId),

                toAccountNumber,

                amount: Number(amount),

                description,

            });

            toast.success("Transfer completed");

            setFromAccountId("");
            setToAccountNumber("");
            setAmount("");
            setDescription("");

        } catch (err: any) {

            toast.error(
                err.response?.data?.message ||
                err.response?.data ||
                "Transfer failed"
            );

        }

    }

    return (

        <div className="max-w-xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Transfer Money
            </h1>

            <form
                onSubmit={transfer}
                className="bg-white p-6 rounded-xl shadow space-y-5"
            >

                <div>

                    <label className="block mb-2 font-medium">
                        From Account
                    </label>

                    <select
                        value={fromAccountId}
                        onChange={(e) =>
                            setFromAccountId(e.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                    >

                        <option value="">
                            Select an account
                        </option>

                        {accounts.map(account => (

                            <option
                                key={account.id}
                                value={account.id}
                            >

                                {account.accountType}
                                {" - "}
                                {account.accountNumber}
                                {" (Rs. "}
                                {account.balance}
                                {")"}

                            </option>

                        ))}

                    </select>

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Receiver Account Number
                    </label>

                    <input
                        type="text"
                        placeholder="SKB123456789"
                        value={toAccountNumber}
                        onChange={(e) =>
                            setToAccountNumber(e.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Amount
                    </label>

                    <input
                        type="number"
                        placeholder="1000"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        placeholder="Payment description..."
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
                >
                    Transfer Money
                </button>

            </form>

        </div>

    );

}