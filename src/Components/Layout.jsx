// src/Components/Layout/Layout.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/AuthSlice";
import { Menu, X, LogOut, LayoutDashboard, Layers, Box, ClipboardList, ShoppingBag, Truck, DollarSign } from "lucide-react";
import { signOutToast } from "../toast/Toast";

const Layout = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const isAdmin = user?.role === "ROLE_ADMIN";

    const handleSignOut = () => {
        signOutToast("Are you sure you want to sign out?", () => {
            dispatch(logout());
            navigate("/login");
        });
    };

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">

            <div className="flex justify-between items-center bg-[#1e293b] p-4 shadow-md border-b border-slate-800">
                <div className="flex items-center gap-4">
                    <button onClick={() => setOpen(true)} className="p-1 hover:bg-slate-700 rounded transition">
                        <Menu size={26} />
                    </button>
                    <h1 className="font-bold text-xl tracking-wide bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        Grocery Control Panel
                    </h1>
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded border ${isAdmin ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                    }`}>
                    {isAdmin ? "Admin Authority" : "User Level View"}
                </span>
            </div>


            {open && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setOpen(false)} />
                    <div className="fixed top-0 left-0 w-64 h-full bg-[#1e293b] p-5 z-50 flex flex-col justify-between shadow-2xl border-r border-slate-800">
                        <div>
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
                                <div className="truncate max-w-45">
                                    <h2 className="text-sm font-semibold text-slate-200">Active Workspace</h2>
                                    <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email}</p>
                                </div>
                                <button onClick={() => setOpen(false)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"><X size={20} /></button>
                            </div>

                            {/* NAVIGATION MANAGEMENT LINKS */}
                            <div className="flex flex-col gap-1.5">
                                <Link to="/" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition text-sm">
                                    <LayoutDashboard size={18} className="text-blue-400" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link to="/inventory" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition text-sm">
                                    <ClipboardList size={18} className="text-blue-400" />
                                    <span>Inventory</span>
                                </Link>
                                <Link to="/sale" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition text-sm">
                                    <ShoppingBag size={18} className="text-blue-400" />
                                    <span>Sales Tracker</span>
                                </Link>


                                {isAdmin && (
                                    <>
                                        <div className="border-t border-slate-800 my-3 pt-3 text-[10px] uppercase text-slate-500 font-bold tracking-wider px-2.5">
                                            Administrative Operations
                                        </div>
                                        <Link to="/categories" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition text-sm">
                                            <Layers size={18} className="text-emerald-400" />
                                            <span>Manage Categories</span>
                                        </Link>
                                        <Link to="/products" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition text-sm">
                                            <Box size={18} className="text-blue-400" />
                                            <span>Products</span>
                                        </Link>
                                        <Link to="/supplier" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition text-sm">
                                            <Truck size={18} className="text-emerald-400" />
                                            <span>Supplier Records</span>
                                        </Link>
                                        <Link to="/purchase" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition text-sm">
                                            <DollarSign size={18} className="text-emerald-400" />
                                            <span>Supply Purchases</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>


                        <button
                            onClick={handleSignOut}
                            className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition duration-200 text-sm font-medium border border-red-500/20 hover:border-transparent"
                        >
                            <LogOut size={16} />
                            <span>Sign Out Workspace</span>
                        </button>
                    </div>
                </>
            )}


            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;