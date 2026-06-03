import { useState, useEffect } from "react";
import {
    fetchInventory,
    addStock,
    reduceStock
} from "../../features/inventory/InventorySlice";

import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../../toast/Toast";

const InventoryLists = () => {

    const dispatch = useDispatch();

    const { inventory, error, isLoading } = useSelector(
        (state) => state.inventory
    );

    const [editId, setEditId] = useState(null);
    const [actionType, setActionType] = useState('')
    const [stockValue, setStockValue] = useState('');

    useEffect(() => {
        dispatch(fetchInventory());
    }, [dispatch]);


    const handleEdit = (item) => {
        setEditId(item.id);
        setActionType('');
        setStockValue('');
    };

    
    const handleAction = (type) => {
        setActionType(type);
        setStockValue('');
    }
    const handleCancel = () => {
        setEditId(null);
        setActionType('');
        setStockValue('');
    };

    const handleAddStock = async (id) => {

        if (!stockValue || Number(stockValue) <= 0) {
            errorToast("Enter valid quantity");
            return;
        }

        const res = await dispatch(
            addStock({
                id,
                inventoryData: { quantity: Number(stockValue) }
            })
        );

        if (res.meta.requestStatus === "fulfilled") {
            successToast("Stock added");
            handleCancel();
        } else {
            errorToast(res.payload || "Failed to add stock");
        }
    };

    
    const handleReduceStock = async (id) => {

        if (!stockValue || Number(stockValue) <= 0) {
            errorToast("Enter valid quantity");
            return;
        }

        const res = await dispatch(
            reduceStock({
                id,
                inventoryData: { quantity: Number(stockValue) }
            })
        );

        if (res.meta.requestStatus === "fulfilled") {
            successToast("Stock reduced");
            handleCancel();
        } else {
            errorToast(res.payload || "Failed to reduce stock");
        }
    };

    return (
        <div className="bg-[#1e293b] rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Inventory
            </h2>

            {isLoading ? (
                <p className="text-gray-400">Loading...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : (
                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-slate-700">

                                <th className="py-3 px-4 text-gray-300">Product</th>
                                <th className="py-3 px-4 text-gray-300">SKU</th>
                                <th className="py-3 px-4 text-gray-300">Stock</th>
                                <th className="py-3 px-4 text-gray-300">Reorder</th>
                                <th className="py-3 px-4 text-center text-gray-300">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {inventory.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b border-slate-800 hover:bg-[#273449]"
                                >

                                    <td className="py-3 px-4 text-gray-200">
                                        {item.productName}
                                    </td>

                                    <td className="py-3 px-4 text-gray-200">
                                        {item.sku}
                                    </td>

                                    <td className="py-3 px-4 text-gray-200">

                                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${item.quantity <= item.reorderLevel
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-green-500/20 text-green-400'
                                            }`}>

                                            {item.quantity}

                                        </span>

                                    </td>

                                
                                    <td className="py-3 px-4 text-gray-200">
                                        {item.reorderLevel}
                                    </td>

                                    <td className="py-3 px-4">

                                        <div className="flex justify-center gap-2 flex-wrap">

                                            {editId !== item.id && (
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white text-sm"
                                                >
                                                    Update Stock
                                                </button>
                                            )}

                                           
                                            {editId === item.id && !actionType && (
                                                <>
                                                    <button
                                                        onClick={() => handleAction('add')}
                                                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Add
                                                    </button>

                                                    <button
                                                        onClick={() => handleAction('reduce')}
                                                        className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Reduce
                                                    </button>

                                                    <button
                                                        onClick={handleCancel}
                                                        className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}

                                     
                                            {editId === item.id && actionType && (
                                                <>
                                                    <input
                                                        type="number"
                                                        value={stockValue}
                                                        onChange={(e) =>
                                                            setStockValue(e.target.value)
                                                        }
                                                        placeholder="Qty"
                                                        className="bg-[#0f172a] border border-slate-600 text-white px-3 py-1 rounded-lg w-24"
                                                    />

                                                    <button
                                                        onClick={() =>
                                                            actionType === "add"
                                                                ? handleAddStock(item.id)
                                                                : handleReduceStock(item.id)
                                                        }
                                                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        onClick={handleCancel}
                                                        className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
};

export default InventoryLists;