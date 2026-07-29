import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TransactionService from "../../services/transactionService";
import AccountService from "../../services/accountService";

import type { Account } from "../../types/Account";
import BANKS from "../../constants/bank";
import { useNavigate } from "react-router-dom";

import type { Transaction } from "../../types/Transaction";
import TransferSuccessModal from "../../components/transaction/TransferSuccessModal";

export default function Transfer() {

    const navigate = useNavigate();

    const [accounts, setAccounts] = useState<Account[]>([]);

    const [fromAccountId, setFromAccountId] = useState("");

    const [toAccountNumber, setToAccountNumber] = useState("");

    const [amount, setAmount] = useState("");

    const [remarks, setRemarks] = useState("");

    const [destinationBank, setDestinationBank] = useState("");

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [transaction, setTransaction] =
        useState<Transaction | null>(null);

    useEffect(() => {
        loadAccounts();
    }, []);

    async function loadAccounts() {

        try {

            // Temporary
            // Later replace 1 with auth.user.id
            const data = await AccountService.getMyAccounts();

            setAccounts(data);

        } catch {

            toast.error("Failed to load accounts");

        }

    }

    async function transfer(e: React.FormEvent) {

        e.preventDefault();

        try {

            const result = await TransactionService.transfer({

                fromAccountId: Number(fromAccountId),

                toAccountNumber,

                destinationBank,

                amount: Number(amount),

                remarks,

            });

            toast.success("Transfer completed");

            setTransaction(result);

            setShowSuccessModal(true);

            setFromAccountId("");
            setToAccountNumber("");
            setDestinationBank("");
            setAmount("");
            setRemarks("");


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
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />

                </div>

                {/* bank select */}
                <div>

                    <label className="block mb-2 font-medium">
                        Receiver Bank
                    </label>

                    <select
                        value={destinationBank}
                        onChange={(e) =>
                            setDestinationBank(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >

                        <option value="">
                            Select a bank
                        </option>

                        {BANKS.map((bank) => (

                            <option
                                key={bank}
                                value={bank}
                            >
                                {bank}
                            </option>

                        ))}

                    </select>

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
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Beneficiary Remarks
                    </label>

                    <textarea
                        placeholder="Enter remarks..."
                        value={remarks}
                        onChange={(e) =>
                            setRemarks(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-600 text-white rounded-lg py-3 hover:bg-orange-700 transition-all duration-300 font-semibold"
                >
                    Transfer Money
                </button>

            </form>

            <TransferSuccessModal
                open={showSuccessModal}
                transaction={transaction}
                onClose={() => {
                    setShowSuccessModal(false);
                    navigate("/dashboard");
                }}
            />

        </div>

    );

}