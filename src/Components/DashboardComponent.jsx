import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../axios/axiosInstance";
import { SaleLists } from "../Components/index.js";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { ShieldAlert, UserCheck } from "lucide-react";

const DashboardComponent = () => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = useMemo(() => user?.role === "ROLE_ADMIN", [user]);

    const [monthlySales, setMonthlySales] = useState([]);

    useEffect(() => {
        if (!user || !isAdmin) return;

        const fetchMonthlySales = async () => {
            try {
                const response = await axiosInstance.get("sale/monthly-sales");
                if (response.data && Array.isArray(response.data)) {
                    setMonthlySales(
                        response.data.map((item) => ({
                            month: item.month.substring(0, 3),
                            sales: item.totalSales,
                        }))
                    );
                }
            } catch (error) {
                console.error("Error fetching monthly sales:", error);
            }
        };

        fetchMonthlySales();
    }, [user, isAdmin]);

    return (
        <div className="space-y-6 text-white p-4">

            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 flex justify-between items-center shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Welcome back, {user?.email || "Team Member"}
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Here is what's happening across your inventory workspace today.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-[#0f172a] px-4 py-2 rounded-lg border border-slate-700">
                    {isAdmin ? (
                        <>
                            <ShieldAlert className="text-emerald-400" size={18} />
                            <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Admin Control</span>
                        </>
                    ) : (
                        <>
                            <UserCheck className="text-blue-400" size={18} />
                            <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase">User Account</span>
                        </>
                    )}
                </div>
            </div>

            {isAdmin && (
                <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 shadow-lg">
                    <h2 className="text-lg font-semibold mb-4 text-slate-200">Monthly Sales</h2>
                    {monthlySales.length > 0 ? (
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={monthlySales}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#cbd5e1" />
                                <YAxis stroke="#cbd5e1" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0f172a",
                                        border: "none",
                                        borderRadius: "10px",
                                        color: "#fff",
                                    }}
                                />
                                <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center py-12 text-sm text-slate-500">
                            No sales data available.
                        </div>
                    )}
                </div>
            )}

            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-slate-200">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isAdmin && (
                        <Link
                            to="/purchase"
                            className="bg-green-600 hover:bg-green-700 text-center py-3 rounded-lg font-medium transition duration-200"
                        >
                            Add Purchase
                        </Link>
                    )}
                    <Link
                        to="/sale"
                        className="bg-blue-600 hover:bg-blue-700 text-center py-3 rounded-lg font-medium transition duration-200"
                    >
                        {isAdmin ? "Create Sale" : "Create Sale"}
                    </Link>
                    <Link
                        to="/inventory"
                        className="bg-orange-600 hover:bg-orange-700 text-center py-3 rounded-lg font-medium transition duration-200"
                    >
                        Manage Inventory
                    </Link>
                </div>
            </div>

            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-200">Recent Sales</h2>
                    <Link to="/sale" className="text-sm text-blue-400 hover:text-blue-300 transition">
                        View all →
                    </Link>
                </div>
                <SaleLists />
            </div>

        </div>
    );
};

export default DashboardComponent;