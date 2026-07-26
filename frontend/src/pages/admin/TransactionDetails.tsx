import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminTransactionService from "../../services/adminTransactionService";
import type { TransactionDetails } from "../../types/TransactionDetails";

export default function TransactionDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [details, setDetails] = useState<TransactionDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTransaction();
    }, []);

    async function loadTransaction() {

        try {

            if (!id) return;

            const data = await AdminTransactionService.getTransactionDetails(
                Number(id)
            );

            setDetails(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (
            <div className="p-8">
                Loading transaction...
            </div>
        );

    }

    if (!details) {

        return (
            <div className="p-8">
                Transaction not found.
            </div>
        );

    }

    return (

        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Transaction Details
                </h1>

                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                    Back
                </button>

            </div>

            {/* Transaction */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Transaction Information
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <strong>ID</strong>
                        <p>{details.transaction.id}</p>
                    </div>

                    <div>
                        <strong>Type</strong>
                        <p>{details.transaction.transactionType}</p>
                    </div>

                    <div>
                        <strong>Amount</strong>
                        <p>£{details.transaction.amount.toLocaleString()}</p>
                    </div>

                    <div>
                        <strong>Date</strong>
                        <p>
                            {new Date(
                                details.transaction.createdAt
                            ).toLocaleString()}
                        </p>
                    </div>

                </div>

            </div>

            {/* Customer */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Customer Information
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <strong>Name</strong>
                        <p>{details.customer.name}</p>
                    </div>

                    <div>
                        <strong>Username</strong>
                        <p>{details.customer.username}</p>
                    </div>

                    <div>
                        <strong>Email</strong>
                        <p>{details.customer.email}</p>
                    </div>

                    <div>
                        <strong>Role</strong>
                        <p>{details.customer.role}</p>
                    </div>

                </div>

            </div>

            {/* Account */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Account Information
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <strong>Account Number</strong>
                        <p>{details.account.accountNumber}</p>
                    </div>

                    <div>
                        <strong>Owner</strong>
                        <p>{details.account.ownerName}</p>
                    </div>

                    <div>
                        <strong>Type</strong>
                        <p>{details.account.accountType}</p>
                    </div>

                    <div>
                        <strong>Status</strong>
                        <p>{details.account.status}</p>
                    </div>

                    <div>
                        <strong>Balance</strong>
                        <p>£{details.account.balance.toLocaleString()}</p>
                    </div>

                </div>

            </div>

        </div>

    );

}