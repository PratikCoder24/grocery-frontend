import React from "react";

const PurchaseReceipt = ({ purchase, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">

            <div className="bg-[#1e293b] text-white w-112.5 rounded-lg p-6">

                {/* HEADER */}
                <h2 className="text-xl font-bold text-center mb-2">
                    📦 PURCHASE RECEIPT
                </h2>

                <div className="text-sm text-gray-300 space-y-1 mb-4">

                    <p>Purchase No: #{purchase.purchaseId}</p>
                    <p>Date: {new Date(purchase.purchaseDate).toLocaleString()}</p>
                    <p>Supplier: {purchase.supplierName}</p>
                    <p>Status: {purchase.status}</p>

                </div>

                <hr className="border-gray-600 mb-3" />

                {/* ITEMS */}
                <div className="space-y-2 max-h-64 overflow-y-auto">

                    {purchase.items?.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">

                            <div>
                                <p className="font-medium">
                                    {item.productName}
                                </p>
                                <p className="text-gray-400 text-xs">
                                    {item.quantity} × ₹{item.unitCost}
                                </p>
                            </div>

                            <div className="font-semibold">
                                ₹{item.subtotal}
                            </div>

                        </div>
                    ))}

                </div>

                <hr className="border-gray-600 my-3" />

                {/* TOTAL */}
                <div className="flex justify-between text-lg font-bold text-green-400">

                    <span>Total</span>
                    <span>₹{purchase.totalAmount}</span>

                </div>

                {/* BUTTON */}
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                >
                    Close
                </button>

            </div>

        </div>
    );
};

export default PurchaseReceipt;