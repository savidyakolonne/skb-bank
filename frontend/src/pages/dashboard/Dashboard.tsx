import { Link } from "react-router-dom";
import { ArrowRightLeft } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import DashboardService from "../../services/DashboardService";
import type { Dashboard as DashboardType } from "../../types/Dashboard";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const { user } = useAuth();

  const [dashboard, setDashboard] = useState<DashboardType | null>(null);

  useEffect(() => {

    const loadDashboard = async () => {
      try {

        const data = await DashboardService.getDashboard();
        setDashboard(data);

      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();

  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Greeting */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Ayubowan, {user?.name}
        </h1>
      </div>

      {/* Total Balance */}

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl text-white p-8 shadow-lg mb-8">

        <p className="text-blue-100">
          Total Balance
        </p>

        <h2 className="text-5xl font-bold mt-2">
          Rs.{dashboard?.totalBalance?.toLocaleString() ?? "0.00"}
        </h2>

      </div>

      {/* Accounts + Transactions */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Accounts */}

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-semibold">
              My Accounts
            </h2>

            <Link
              to="/accounts"
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </Link>

          </div>

          <div className="space-y-4">

            {dashboard?.accounts.map((account) => (

              <div
                key={account.id}
                className="border rounded-xl p-5"
              >

                <p className="font-semibold">
                  {account.accountType} Account
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {account.accountNumber}
                </p>

                <h3 className="text-2xl font-bold mt-4">
                  Rs. {Number(account.balance).toLocaleString()}
                </h3>

              </div>

            ))}

          </div>

        </div>

        {/* Transactions */}

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-semibold">
              Recent Transactions
            </h2>

            <Link
              to="/transactions"
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </Link>

          </div>

          <div className="space-y-5">

            {dashboard?.recentTransactions.map((transaction) => (

              <div
                key={transaction.id}
                className="flex justify-between border-b pb-4"
              >

                <div>

                  <p className="font-medium">
                    {transaction.transactionType.replace("_", " ")}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <p
                  className={`font-semibold ${
                    transaction.transactionType.includes("IN")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Rs. {Number(transaction.amount).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Quick Action */}

      <div className="mt-8 bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">
          Quick Action
        </h2>

        <Link
          to="/transactions/transfer"
          className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition rounded-2xl text-white py-5 font-semibold text-lg"
        >
          <ArrowRightLeft size={22} />
          Transfer Money
        </Link>

      </div>

    </div>
  );
}