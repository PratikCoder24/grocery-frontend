import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPurchase } from "../../features/purchase/PurchaseSlice";
import { fetchProducts } from "../../features/product/ProductSlice";
import { fetchAllSuppliers } from "../../features/supplier/SupplierSlice";
import { errorToast, successToast } from "../../toast/Toast";

const PurchaseForm = () => {

    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.purchase);
    const { products } = useSelector((state) => state.products);
    const { supplier } = useSelector((state) => state.supplier);

    const [supplierId, setSupplierId] = useState("");

    const [items, setItems] = useState([
        {
            id: "",
            quantity: 1,
            unitCost: 0
        }
    ]);

    const [searchMap, setSearchMap] = useState({});
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchAllSuppliers());
    }, [dispatch]);

    // ADD ITEM
    const handleAddItem = () => {
        setItems([
            ...items,
            { id: "", quantity: 1, unitCost: 0 }
        ]);
    };

    // REMOVE ITEM
    const handleRemoveItem = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
    };

    // CHANGE ITEM
    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    // SEARCH INPUT
    const handleSearchChange = (index, value) => {
        setSearchMap({
            ...searchMap,
            [index]: value
        });
    };

    // TOTAL
    const totalAmount = items.reduce((acc, item) => {
        return acc + Number(item.quantity || 0) * Number(item.unitCost || 0);
    }, 0);

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        try {
            const purchaseData = {
                supplierId: Number(supplierId),
                items: items.map((item) => ({
                    productId: Number(item.id),
                    quantity: Number(item.quantity),
                    unitCost: Number(item.unitCost)
                }))
            };

            const response = await dispatch(createPurchase(purchaseData));

            if (response.meta.requestStatus === "fulfilled") {
                successToast("Purchase Created Successfully!");

                setSupplierId("");
                setItems([{ id: "", quantity: 1, unitCost: 0 }]);
                setSearchMap({});
            } else {
                errorToast("Failed to create purchase!");
            }

        } catch (error) {
            errorToast("Something went wrong!");
        }
    };

    return (
        <div className="bg-[#1e293b] rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Create Purchase
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* SUPPLIER */}
                <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-3 rounded-lg"
                >
                    <option value="">Select Supplier</option>
                    {supplier.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>

                {/* ITEMS */}
                <div className="space-y-4">

                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4 relative"
                        >

                            {/* PRODUCT SEARCH */}
                            <div className="relative">

                                <input
                                    type="text"
                                    value={searchMap[index] || ""}
                                    onChange={(e) => {
                                        setActiveIndex(index);
                                        handleSearchChange(index, e.target.value);
                                    }}
                                    onFocus={() => setActiveIndex(index)}
                                    placeholder="Search product..."
                                    className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-3 rounded-lg"
                                />

                                {/* DROPDOWN */}
                                {activeIndex === index && searchMap[index] && (
                                    <div className="absolute z-20 w-full bg-[#0f172a] border border-slate-600 mt-1 rounded-lg max-h-40 overflow-y-auto">

                                        {products
                                            .filter((p) =>
                                                p.name
                                                    .toLowerCase()
                                                    .includes(
                                                        searchMap[index].toLowerCase()
                                                    )
                                            )
                                            .map((p) => (
                                                <div
                                                    key={p.id}
                                                    onClick={() => {
                                                        handleChange(index, "id", p.id);

                                                        setSearchMap({
                                                            ...searchMap,
                                                            [index]: p.name
                                                        });

                                                        setActiveIndex(null);
                                                    }}
                                                    className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-white"
                                                >
                                                    {p.name}
                                                </div>
                                            ))}
                                    </div>
                                )}

                            </div>

                            {/* QUANTITY */}
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    handleChange(index, "quantity", e.target.value)
                                }
                                className="bg-[#0f172a] border border-slate-600 text-white px-4 py-3 rounded-lg"
                            />

                            {/* UNIT COST */}
                            <input
                                type="number"
                                value={item.unitCost}
                                onChange={(e) =>
                                    handleChange(index, "unitCost", e.target.value)
                                }
                                className="bg-[#0f172a] border border-slate-600 text-white px-4 py-3 rounded-lg"
                                placeholder="Unit Cost"
                            />

                            {/* SUBTOTAL */}
                            <div className="flex items-center text-white font-semibold">
                                ₹{Number(item.quantity || 0) * Number(item.unitCost || 0)}
                            </div>

                            {/* REMOVE */}
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                            >
                                Remove
                            </button>

                        </div>
                    ))}
                </div>

                {/* ADD ITEM */}
                <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    + Add Product
                </button>

                {/* TOTAL */}
                <div className="text-right text-2xl font-bold text-green-400">
                    Total: ₹{totalAmount}
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                >
                    {isLoading ? "Creating Purchase..." : "Create Purchase"}
                </button>

            </form>

        </div>
    );
};

export default PurchaseForm;