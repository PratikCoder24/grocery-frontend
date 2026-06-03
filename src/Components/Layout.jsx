import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Layout = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // ✅ AUTO CLOSE SIDEBAR ON ROUTE CHANGE
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">

            {/* TOP BAR */}
            <div className="flex items-center gap-4 bg-[#1e293b] p-4 shadow-md">

                <button onClick={() => setOpen(true)}>
                    <Menu size={28} />
                </button>

                <h1 className="font-bold text-xl">
                    Grocery System
                </h1>
            </div>

            {/* SIDEBAR OVERLAY */}
            {open && (
                <>
                    {/* BACKDROP */}
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setOpen(false)}
                    />

                    {/* SIDEBAR */}
                    <div className="fixed top-0 left-0 w-64 h-full bg-[#1e293b] p-5 z-50">

                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">
                                Menu
                            </h2>

                            <button onClick={() => setOpen(false)}>
                                <X />
                            </button>
                        </div>

                        {/* NAV LINKS */}
                        <div className="flex flex-col gap-3">

                            <Link to="/" className="p-2 rounded bg-slate-700 hover:bg-slate-600">
                                Dashboard
                            </Link>

                            <Link to="/categories" className="p-2 rounded bg-slate-700 hover:bg-slate-600">
                                Categories
                            </Link>

                            <Link to="/products" className="p-2 rounded bg-slate-700 hover:bg-slate-600">
                                Products
                            </Link>

                            <Link to="/inventory" className="p-2 rounded bg-slate-700 hover:bg-slate-600">
                                Inventory
                            </Link>

                            <Link to="/sale" className="p-2 rounded bg-slate-700 hover:bg-slate-600">
                                Sales
                            </Link>

                            <Link to="/supplier" className="p-2 rounded bg-slate-700 hover:bg-slate-600">
                                Supplier
                            </Link>

                            <Link to="/purchase" className="p-2 rounded bg-slate-700 hover:bg-slate-600">
                                Purchase
                            </Link>

                        </div>
                    </div>
                </>
            )}

            {/* PAGE CONTENT */}
            <div className="p-6">
                <Outlet />
            </div>

        </div>
    );
};

export default Layout;