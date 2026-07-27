import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminAccountService from "../../services/adminAccountService";
import type { AccountDetails } from "../../types/AccountDetails";

export default function AccountDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");
    const [remarks, setRemarks] = useState("");

    const [details, setDetails] = useState<AccountDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAccount();
    }, []);

    async function loadAccount() {

        try {

            if (!id) return;

            const data = await AdminAccountService.getAccountDetails(Number(id));

            setDetails(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    // deposit
    async function deposit(){
        if(!id) return;

        if(!amount || Number(amount) <= 0){
            alert("Enter a valid amount");
            return;
        }

        try{
            await AdminAccountService.deposit(

                Number(id),
                Number(amount),
                remarks
            );

            setAmount("");
            setRemarks("");
            
            loadAccount();

            alert("Cash deposited successfully");

        }catch (error){
            console.error(error);
            alert("Deposit failed");
        }
    }

    // withdraw
    async function withdraw() {

        if (!id) return;

        if (!amount || Number(amount) <= 0) {
            alert("Enter a valid amount.");
            return;
        }

        try {

            await AdminAccountService.withdraw(
                Number(id),
                Number(amount),
                remarks
            );

            setAmount("");
            setRemarks("");

            loadAccount();

            alert("Cash withdrawn successfully.");

        } catch (error) {

            console.error(error);
            alert("Withdrawal failed.");

        }

    }

    async function freeze() {

        if (!id) return;

        await AdminAccountService.freezeAccount(Number(id));

        loadAccount();

    }

    async function activate() {

        if (!id) return;

        await AdminAccountService.activateAccount(Number(id));

        loadAccount();

    }

    async function closeAccount() {

        if (!id) return;

        if (!window.confirm("Close this account?")) {
            return;
        }

        await AdminAccountService.closeAccount(Number(id));

        loadAccount();

    }

    if (loading) {

        return <div className="p-8">Loading...</div>;

    }

    if (!details) {

        return <div className="p-8">Account not found.</div>;

    }

    return (

        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Account Details
                </h1>

                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                    Back
                </button>

            </div>

            {/* Account Information */}

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
                        <strong>Type</strong>
                        <p>{details.account.accountType}</p>
                    </div>

                    <div>
                        <strong>Balance</strong>
                        <p>£{details.account.balance.toLocaleString()}</p>
                    </div>

                    <div>
                        <strong>Status</strong>
                        <p>{details.account.status}</p>
                    </div>

                </div>

            </div>

            {/* Owner */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Account Owner
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <strong>Name</strong>
                        <p>{details.owner.name}</p>
                    </div>

                    <div>
                        <strong>Username</strong>
                        <p>{details.owner.username}</p>
                    </div>

                    <div>
                        <strong>Email</strong>
                        <p>{details.owner.email}</p>
                    </div>

                    <div>
                        <strong>Role</strong>
                        <p>{details.owner.role}</p>
                    </div>

                </div>

            </div>

            {/* Cash Operations */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Cash Operations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>

                        <label className="block mb-2 font-medium">
                            Amount
                        </label>

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full border rounded-lg px-4 py-2"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Remarks
                        </label>

                        <input
                            type="text"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Cash Deposit / Cash Withdrawal"
                            className="w-full border rounded-lg px-4 py-2"
                        />

                    </div>

                </div>

                <div className="flex gap-4 mt-6">

                    <button
                        onClick={deposit}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                    >
                        Cash Deposit
                    </button>

                    <button
                        onClick={withdraw}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                    >
                        Cash Withdrawal
                    </button>

                </div>

            </div>

            {/* Actions */}

            <div className="flex gap-4">

                {details.account.status !== "FROZEN" && (

                    <button
                        onClick={freeze}
                        className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
                    >
                        Freeze Account
                    </button>

                )}

                {details.account.status === "FROZEN" && (

                    <button
                        onClick={activate}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        Activate Account
                    </button>

                )}

                {details.account.status !== "CLOSED" && (

                    <button
                        onClick={closeAccount}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                        Close Account
                    </button>

                )}

            </div>

            {/* Transactions */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="p-6 border-b">

                    <h2 className="text-xl font-semibold">
                        Recent Transactions
                    </h2>

                </div>

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-4">Type</th>

                            <th className="text-left p-4">Amount</th>

                            <th className="text-left p-4">Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {details.recentTransactions.map(transaction => (

                            <tr
                                key={transaction.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    {transaction.transactionType}
                                </td>

                                <td className="p-4">
                                    £{transaction.amount.toLocaleString()}
                                </td>

                                <td className="p-4">
                                    {new Date(transaction.createdAt)
                                        .toLocaleString()}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}