import React from "react";

const Receipt = ({ sale, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">

            <div className="bg-[#1e293b] text-white w-100 rounded-lg p-6">

                {/* HEADER */}
                <h2 className="text-xl font-bold text-center mb-2">
                    🧾 SALE RECEIPT
                </h2>

                <div className="text-sm text-gray-300 space-y-1 mb-4">

                    <p>Bill No: #{sale.id}</p>
                    <p>Date: {sale.saleDate}</p>

                </div>

                <hr className="border-gray-600 mb-3" />

                {/* ITEMS */}
                <div className="space-y-2 max-h-64 overflow-y-auto">

                    {sale.items?.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between text-sm"
                        >

                            <div>
                                <p className="font-medium">
                                    {item.productName}
                                </p>
                                <p className="text-gray-400 text-xs">
                                    {item.quantity} × ₹{item.unitPrice}
                                </p>
                            </div>

                            <div className="font-semibold">
                                ₹{item.quantity * item.unitPrice}
                            </div>

                        </div>
                    ))}

                </div>

                <hr className="border-gray-600 my-3" />

                {/* TOTAL */}
                <div className="flex justify-between text-lg font-bold text-green-400">

                    <span>Total</span>
                    <span>₹{sale.totalAmount}</span>

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

export default Receipt;