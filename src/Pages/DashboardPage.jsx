import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import {
    ShoppingCart,
    Package,
    AlertTriangle,
    TrendingUp,
} from "lucide-react";

const DashboardPage = () => {
    const [monthlySales, setMonthlySales] = useState([]);

    const [stats, setStats] = useState({
        purchase: 0,
        sale: 0,
        lowStock: 0,
        revenue: 0,
    });

    useEffect(() => {
        fetchMonthlySales();

        // Temporary values until you create dashboard APIs
        setStats({
            purchase: 125000,
            sale: 250000,
            lowStock: 8,
            revenue: 125000,
        });
    }, []);

    const fetchMonthlySales = async () => {
        try {
            const response = await axios.get(
                "http://localhost:9000/api/v1/sale/monthly-sales"
            );

            const formattedData = response.data.map((item) => ({
                month: item.month.substring(0, 3),
                sales: item.totalSales,
            }));

            setMonthlySales(formattedData);
        } catch (error) {
            console.error("Error fetching monthly sales:", error);
        }
    };

    return (
        <div className="space-y-6">

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                {/* Purchase */}
                <Link to="/purchase">
                    <div className="bg-[#1e293b] p-5 rounded-xl hover:bg-slate-700 transition duration-300">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Pratik Purchases
                                </p>
                                <h2 className="text-2xl font-bold mt-2">
                                    ₹{stats.purchase.toLocaleString()}
                                </h2>
                            </div>

                            <Package
                                size={40}
                                className="text-green-400"
                            />
                        </div>
                    </div>
                </Link>

                {/* Sales */}
                <Link to="/sale">
                    <div className="bg-[#1e293b] p-5 rounded-xl hover:bg-slate-700 transition duration-300">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Sales
                                </p>
                                <h2 className="text-2xl font-bold mt-2">
                                    ₹{stats.sale.toLocaleString()}
                                </h2>
                            </div>

                            <ShoppingCart
                                size={40}
                                className="text-blue-400"
                            />
                        </div>
                    </div>
                </Link>

                {/* Low Stock */}
                <Link to="/inventory">
                    <div className="bg-[#1e293b] p-5 rounded-xl hover:bg-slate-700 transition duration-300">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Low Stock
                                </p>
                                <h2 className="text-2xl font-bold mt-2">
                                    {stats.lowStock}
                                </h2>
                            </div>

                            <AlertTriangle
                                size={40}
                                className="text-red-400"
                            />
                        </div>
                    </div>
                </Link>

                {/* Revenue */}
                <div className="bg-[#1e293b] p-5 rounded-xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-sm">
                                Revenue
                            </p>

                            <h2 className="text-2xl font-bold mt-2">
                                ₹{stats.revenue.toLocaleString()}
                            </h2>
                        </div>

                        <TrendingUp
                            size={40}
                            className="text-yellow-400"
                        />
                    </div>
                </div>
            </div>

            {/* SALES CHART */}
            <div className="bg-[#1e293b] rounded-xl p-6">

                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold">
                        Monthly Sales
                    </h2>
                </div>

                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={monthlySales}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#334155"
                        />

                        <XAxis
                            dataKey="month"
                            stroke="#cbd5e1"
                        />

                        <YAxis
                            stroke="#cbd5e1"
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "none",
                                borderRadius: "10px",
                                color: "#fff",
                            }}
                        />

                        <Bar
                            dataKey="sales"
                            fill="#3b82f6"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-[#1e293b] p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <Link
                        to="/purchase"
                        className="bg-green-600 hover:bg-green-700 text-center py-3 rounded-lg"
                    >
                        Add Purchase
                    </Link>

                    <Link
                        to="/sale"
                        className="bg-blue-600 hover:bg-blue-700 text-center py-3 rounded-lg"
                    >
                        Create Sale
                    </Link>

                    <Link
                        to="/inventory"
                        className="bg-orange-600 hover:bg-orange-700 text-center py-3 rounded-lg"
                    >
                        Manage Inventory
                    </Link>

                </div>
            </div>

        </div>
    );
};

export default DashboardPage;