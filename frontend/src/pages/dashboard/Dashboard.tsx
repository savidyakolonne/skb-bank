import { Link } from "react-router-dom";
import { ArrowRightLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

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
          Rs. 125,000.00
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

            <div className="border rounded-xl p-5">

              <p className="font-semibold">
                Savings Account
              </p>

              <p className="text-sm text-gray-500 mt-1">
                SKB337829413
              </p>

              <h3 className="text-2xl font-bold mt-4">
                Rs. 75,000.00
              </h3>

            </div>

            <div className="border rounded-xl p-5">

              <p className="font-semibold">
                Current Account
              </p>

              <p className="text-sm text-gray-500 mt-1">
                SKB238921834
              </p>

              <h3 className="text-2xl font-bold mt-4">
                Rs. 50,000.00
              </h3>

            </div>

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

            <div className="flex justify-between border-b pb-4">

              <div>

                <p className="font-medium">
                  Transfer to John Doe
                </p>

                <p className="text-sm text-gray-500">
                  Today
                </p>

              </div>

              <p className="text-red-600 font-semibold">
                - Rs. 2,000
              </p>

            </div>

            <div className="flex justify-between border-b pb-4">

              <div>

                <p className="font-medium">
                  Salary Credit
                </p>

                <p className="text-sm text-gray-500">
                  Yesterday
                </p>

              </div>

              <p className="text-green-600 font-semibold">
                + Rs. 45,000
              </p>

            </div>

            <div className="flex justify-between">

              <div>

                <p className="font-medium">
                  Card Payment
                </p>

                <p className="text-sm text-gray-500">
                  2 Days Ago
                </p>

              </div>

              <p className="text-red-600 font-semibold">
                - Rs. 4,500
              </p>

            </div>

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