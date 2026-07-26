import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Analytics } from "../../types/Analytics";
import analyticsService from "../../services/analyticsService";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Analytics() {

    const [analytics, setAnalytics] = useState<Analytics | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    async function loadAnalytics(){

        try{
            const data = 
            await analyticsService.getDashboardAnalytics();

            setAnalytics(data);
        }finally{

            setLoading(false);
        }
    }

    if(loading){

        return <div className=" p-8">

            Loading analytics...

        </div>
    }

    if(!analytics){

        return <div className=" p-8">

            No analytics available.
            
        </div>
    }

    // pie chart data
    const accountStatus = [

        {
            name: "Active",
            value: analytics.activeAccounts
        }, 

        {
            name: "Frozen",
            value: analytics.frozenAccounts
        },
        {
            name: "Closed", 
            value: analytics.closedAccounts
        }
    ];

    const COLORS = [
        "#22C55E",
        "#FACC15",
        "#EF4444"
    ]

    return (

        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        Analytics
                    </h1>

                    <p className="text-gray-500">
                        Business insights and performance statistics.
                    </p>

                </div>

                <Link
                    to="/admin/dashboard"
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                    ← Back to Dashboard
                </Link>

            </div>

            {/* Account Status */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Account Status
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="rounded-xl border p-5 text-center">

                        <h3 className="text-green-600 font-semibold">
                            Active
                        </h3>

                        <p className="text-4xl font-bold mt-3">
                            {analytics.activeAccounts}
                        </p>

                    </div>

                    <div className="rounded-xl border p-5 text-center">

                        <h3 className="text-yellow-600 font-semibold">
                            Frozen
                        </h3>

                        <p className="text-4xl font-bold mt-3">
                            {analytics.frozenAccounts}
                        </p>

                    </div>

                    <div className="rounded-xl border p-5 text-center">

                        <h3 className="text-red-600 font-semibold">
                            Closed
                        </h3>

                        <p className="text-4xl font-bold mt-3">
                            {analytics.closedAccounts}
                        </p>

                    </div>

                </div>

            </div>

            {/* Pie Chart */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Account Status Distribution
                </h2>

                <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">

                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={accountStatus}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={120}
                                label
                            >

                                {
                                    accountStatus.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index]}
                                        />
                                    ))
                                }
                            </Pie>
                            <Tooltip/>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>

                </div>

            </div>

            {/* Line Chart */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Monthly Transactions
                </h2>

                <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">

                    <ResponsiveContainer width="100%" height={350}>

                        <LineChart
                            data={analytics.monthlyTransactions}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="month"
                            />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="totalTransactions"
                                stroke="#2563EB"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>                   

                </div>

            </div>

        </div>

    );

}