    import { useEffect, useState } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { fetchAllPurchases, updateStatus } from "../../features/purchase/PurchaseSlice";
    import PurchaseReceipt from "./PurchaseReceipt";

    const PurchaseLists = () => {

        const dispatch = useDispatch();

        const { purchase, isLoading, error } = useSelector(
            (state) => state.purchase
        );

        const [selectedPurchase, setSelectedPurchase] = useState(null);
        const [openDropdown, setOpenDropdown] = useState(null)

        useEffect(() => {
            dispatch(fetchAllPurchases());
        }, [dispatch]);

        // STATUS UPDATE
        const handleStatus = (id, status) => {
            dispatch(updateStatus({ id, status }));
        };

        return (
            <div className="bg-[#1e293b] rounded-2xl shadow-lg p-6 mt-8">

                <h2 className="text-2xl font-semibold text-white mb-6">
                    Purchase History
                </h2>

                {isLoading ? (
                    <p className="text-gray-400">Loading purchases...</p>
                ) : error ? (
                    <p className="text-red-400">{error}</p>
                ) : purchase.length === 0 ? (
                    <p className="text-gray-400">No purchases found</p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>

                                <tr className="border-b border-slate-700">

                                    <th className="py-3 px-4 text-gray-300">
                                        Invoice
                                    </th>

                                    <th className="py-3 px-4 text-gray-300">
                                        Supplier
                                    </th>

                                    <th className="py-3 px-4 text-gray-300">
                                        Date
                                    </th>

                                    <th className="py-3 px-4 text-gray-300">
                                        Items
                                    </th>

                                    <th className="py-3 px-4 text-gray-300">
                                        Total
                                    </th>

                                    <th className="py-3 px-4 text-gray-300">
                                        Status
                                    </th>

                                    <th className="py-3 px-4 text-gray-300">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {purchase?.map((p) => (

                                    <tr
                                        key={p.purchaseId}
                                        className="border-b border-slate-800 hover:bg-[#273449]"
                                    >

                                        {/* INVOICE */}
                                        <td className="py-3 px-4 text-white">
                                            PUR-{p.purchaseId}
                                        </td>

                                        {/* SUPPLIER */}
                                        <td className="py-3 px-4 text-gray-300">
                                            {p.supplierName}
                                        </td>

                                        {/* DATE */}
                                        <td className="py-3 px-4 text-gray-300">
                                            {new Date(p.purchaseDate).toLocaleString()}
                                        </td>

                                        {/* ITEMS */}
                                        <td className="py-3 px-4 text-gray-300">
                                            {p.items?.length || 0}
                                        </td>

                                        {/* TOTAL */}
                                        <td className="py-3 px-4 text-green-400 font-semibold">
                                            ₹{p.totalAmount}
                                        </td>


                                        {/* STATUS */}
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold ${p.status === "COMPLETED"
                                                    ? "bg-green-600 text-white"
                                                    : p.status === "CANCELLED"
                                                        ? "bg-red-600 text-white"
                                                        : "bg-yellow-600 text-white"
                                                    }`}
                                            >
                                                {p.status}
                                            </span>
                                        </td>

                                        {/* ACTION */}
                                        <td className="py-3 px-4 flex gap-2">

                                            <button
                                                onClick={() =>
                                                    setSelectedPurchase(p)
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                                            >
                                                View
                                            </button>

                                            {p.status === "PENDING" && (
                                                <button
                                                    onClick={() => handleStatus(p.purchaseId, "COMPLETED")}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm cursor-pointer"
                                                >
                                                    Complete
                                                </button>
                                            )}

                                            {/* CANCEL DROPDOWN */}
                                            {p.status === "PENDING" && (
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setOpenDropdown(
                                                            openDropdown === p.purchaseId ? null : p.purchaseId
                                                        )}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm cursor-pointer"
                                                    >
                                                        Cancel ▾
                                                    </button>

                                                    {openDropdown === p.purchaseId && (
                                                        <div className="absolute z-30 right-0 mt-1 bg-[#0f172a] border border-slate-600 rounded-lg shadow-lg w-40">
                                                            <p className="text-gray-400 text-xs px-3 pt-2 pb-1">
                                                                Update Status
                                                            </p>
                                                            {["PENDING", "CANCELLED"].map((s) => (
                                                                <div
                                                                    key={s}
                                                                    onClick={() => {
                                                                        handleStatus(p.purchaseId, s);
                                                                        setOpenDropdown(null);
                                                                    }}
                                                                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-700
                                                                    ${p.status === s
                                                                            ? "text-yellow-400 font-semibold"
                                                                            : "text-white"
                                                                        }`}
                                                                >
                                                                    {s}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        {/* OPTIONAL: DETAILS MODAL */}
                        {selectedPurchase && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-[#0f172a] p-6 rounded-lg w-125">

                                    <h2 className="text-white text-xl mb-4">
                                        Purchase Details
                                    </h2>

                                    <p className="text-gray-300">
                                        Supplier: {selectedPurchase.supplierName}
                                    </p>

                                    <p className="text-gray-300">
                                        Total: ₹{selectedPurchase.totalAmount}
                                    </p>

                                    <p className="text-gray-300 mt-2">
                                        Items:
                                    </p>

                                    {selectedPurchase.items?.map((i, idx) => (
                                        <div key={idx} className="text-gray-400 text-sm">
                                            {i.productName} - {i.quantity} x ₹{i.unitCost}
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => setSelectedPurchase(null)}
                                        className="mt-4 bg-red-600 px-3 py-1 text-white rounded"
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        )}

                    </div>

                )}
                {selectedPurchase && (
                    <PurchaseReceipt
                        purchase={selectedPurchase}
                        onClose={() => setSelectedPurchase(null)}
                    />
                )}
            </div>
        );
    };

    export default PurchaseLists;