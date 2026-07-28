import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TransactionService from "../../services/transactionService";

import type { Transaction } from "../../types/Transaction";

export default function Receipt() {

    const { id } = useParams();

    const [transaction, setTransaction] =
        useState<Transaction | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadTransaction();

    }, []);

    async function loadTransaction() {

        try {

            if (!id) return;

            const data =
                await TransactionService.getById(Number(id));

            setTransaction(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="p-8">

                Loading receipt...

            </div>

        );

    }

    if (!transaction) {

        return (

            <div className="p-8">

                Receipt not found.

            </div>

        );

    }

    async function handleDownloadReceipt() {

        try {

            if (!transaction) return;

            const pdf =
                await TransactionService.downloadReceipt(transaction.id);

            const url = window.URL.createObjectURL(pdf);

            const link = document.createElement("a");

            link.href = url;
            link.download = `receipt-${transaction.id}.pdf`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(error);

            alert("Failed to download receipt.");

        }

    }

    return (

        <div className="max-w-2xl mx-auto">

            <div className="bg-white rounded-xl shadow-lg p-8">

                <div className="text-center border-b pb-6">

                    <h1 className="text-3xl font-bold">

                        SKB BANK

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Online Transfer Receipt

                    </p>

                </div>

                <div className="mt-8 space-y-5">

                    <div className="flex justify-between">

                        <span>Status</span>

                        <span className="font-semibold text-green-600">

                            SUCCESS

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span>Transaction ID</span>

                        <span>{transaction.id}</span>

                    </div>

                    <div className="flex justify-between">

                        <span>Date & Time</span>

                        <span>

                            {new Date(
                                transaction.createdAt
                            ).toLocaleString()}

                        </span>

                    </div>

                    <hr />

                    <div className="flex justify-between">

                        <span>From Account</span>

                        <span>

                            {transaction.accountNumber}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span>Destination Bank</span>

                        <span>

                            {transaction.destinationBank}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span>Amount</span>

                        <span className="font-bold">

                            Rs. {Number(transaction.amount).toLocaleString("en-LK", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span>Remarks</span>

                        <span>

                            {transaction.remarks || "-"}

                        </span>

                    </div>

                </div>

                <div className="mt-10 flex justify-between">

                    <Link
                        to="/customer/dashboard"
                        className="px-5 py-3 bg-gray-200 rounded-lg"
                    >

                        Back

                    </Link>

                    <button
                        onClick={handleDownloadReceipt}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 font-semibold"
                    >

                        Download Receipt

                    </button>

                </div>

            </div>

        </div>

    );

}