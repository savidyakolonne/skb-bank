import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminAccountService from "../../services/adminAccountService";
import type { AdminAccount } from "../../types/AdminAccount";

export default function Accounts() {

    const [accounts, setAccounts] = useState<AdminAccount[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadAccounts();
    }, []);

    async function loadAccounts() {

        try {

            const data = await AdminAccountService.getAllAccounts();
            setAccounts(data);

        } catch (error) {

            console.error("Failed to load accounts", error);

        } finally {

            setLoading(false);

        }

    }

    const filteredAccounts = useMemo(() => {

        return accounts.filter(account =>

            account.accountNumber
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            account.ownerName
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [accounts, search]);

    async function freeze(id: number) {

        await AdminAccountService.freezeAccount(id);
        loadAccounts();

    }

    async function activate(id: number) {

        await AdminAccountService.activateAccount(id);
        loadAccounts();

    }

    async function close(id: number) {

        if (!window.confirm("Close this account?")) {
            return;
        }

        await AdminAccountService.closeAccount(id);
        loadAccounts();

    }

    if (loading) {

        return <div className="p-8">Loading accounts...</div>;

    }

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        Account Management
                    </h1>

                    <p className="text-gray-500">
                        Total Accounts: {accounts.length}
                    </p>

                </div>

                <input
                    type="text"
                    placeholder="Search account..."
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
                                Account No
                            </th>

                            <th className="p-4 text-left">
                                Owner
                            </th>

                            <th className="p-4 text-left">
                                Type
                            </th>

                            <th className="p-4 text-left">
                                Balance
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredAccounts.map(account => (

                            <tr
                                key={account.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="p-4">
                                    {account.accountNumber}
                                </td>

                                <td className="p-4">
                                    {account.ownerName}
                                </td>

                                <td className="p-4">
                                    {account.accountType}
                                </td>

                                <td className="p-4">
                                    Rs.{account.balance.toLocaleString()}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${
                                            account.status === "ACTIVE"
                                                ? "bg-green-100 text-green-700"
                                                : account.status === "FROZEN"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {account.status}
                                    </span>

                                </td>

                                <td className="p-4">

                                    <div className="flex gap-2 justify-center">

                                        <Link
                                            to={`/admin/accounts/${account.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>

                                        {account.status !== "FROZEN" && (

                                            <button
                                                onClick={() => freeze(account.id)}
                                                className="text-yellow-600 hover:underline"
                                            >
                                                Freeze
                                            </button>

                                        )}

                                        {account.status === "FROZEN" && (

                                            <button
                                                onClick={() => activate(account.id)}
                                                className="text-green-600 hover:underline"
                                            >
                                                Activate
                                            </button>

                                        )}

                                        {account.status !== "CLOSED" && (

                                            <button
                                                onClick={() => close(account.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Close
                                            </button>

                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}