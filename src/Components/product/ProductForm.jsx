import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "../../toast/Toast";
import { addProducts } from "../../features/product/ProductSlice";
import { fetchCategories } from "../../features/category/CategorySlice";

const ProductForm = () => {
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);

    const { isLoading } = useSelector((state) => state.products);
    const { categories = [] } = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [costPrice, setCostPrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [reorderLevel, setReorderLevel] = useState("");

    const [categorySearch, setCategorySearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        if (
            !name.trim() ||
            !sku.trim() ||
            !categoryId ||
            costPrice === "" ||
            sellPrice === "" ||
            quantity === "" ||
            reorderLevel === ""
        ) {
            errorToast("All fields are required!");
            return;
        }

        if (
            Number(costPrice) < 0 ||
            Number(sellPrice) < 0 ||
            Number(quantity) < 0 ||
            Number(reorderLevel) < 0
        ) {
            errorToast("Values cannot be negative!");
            return;
        }

        try {
            const productData = {
                productName: name.trim(),
                sku: sku.trim(),
                costPrice: parseFloat(costPrice),
                sellPrice: parseFloat(sellPrice),
                categoryId: Number(categoryId),
                quantity: Number(quantity),
                reorderLevel: Number(reorderLevel),
            };

            const result = await dispatch(addProducts(productData));

            if (addProducts.fulfilled.match(result)) {
                successToast("Product added successfully!");

                setName("");
                setSku("");
                setCostPrice("");
                setSellPrice("");
                setCategoryId("");
                setQuantity("");
                setReorderLevel("");
                setCategorySearch("");
                setShowDropdown(false);
            } else {
                errorToast(result.payload || "Failed to add product!");
            }
        } catch (error) {
            errorToast("Something went wrong!");
        }
    };

    const filteredCategories =
        categorySearch.trim() === ""
            ? categories
            : categories.filter((category) =>
                  (category.categoryName || "")
                      .toLowerCase()
                      .includes(categorySearch.toLowerCase())
              );

    return (
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
                Add Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* PRODUCT NAME */}
                <div>
                    <label className="block mb-2 text-sm text-gray-300">
                        Product Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* SKU */}
                <div>
                    <label className="block mb-2 text-sm text-gray-300">
                        SKU
                    </label>

                    <input
                        type="text"
                        placeholder="Enter SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* COST PRICE */}
                <div>
                    <label className="block mb-2 text-sm text-gray-300">
                        Cost Price
                    </label>

                    <input
                        type="number"
                        placeholder="Enter cost price"
                        value={costPrice}
                        onChange={(e) => setCostPrice(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* SELL PRICE */}
                <div>
                    <label className="block mb-2 text-sm text-gray-300">
                        Selling Price
                    </label>

                    <input
                        type="number"
                        placeholder="Enter selling price"
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* QUANTITY */}
                <div>
                    <label className="block mb-2 text-sm text-gray-300">
                        Quantity
                    </label>

                    <input
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* REORDER LEVEL */}
                <div>
                    <label className="block mb-2 text-sm text-gray-300">
                        Reorder Level
                    </label>

                    <input
                        type="number"
                        placeholder="Enter reorder level"
                        value={reorderLevel}
                        onChange={(e) => setReorderLevel(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* CATEGORY SEARCHABLE DROPDOWN */}
                <div className="relative" ref={dropdownRef}>
                    <label className="block mb-2 text-sm text-gray-300">
                        Category
                    </label>

                    <input
                        type="text"
                        placeholder="Search or select category..."
                        value={categorySearch}
                        onChange={(e) => {
                            setCategorySearch(e.target.value);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {showDropdown && (
                        <div className="absolute z-50 w-full mt-1 bg-[#0f172a] border border-slate-600 rounded-xl shadow-lg max-h-52 overflow-y-auto">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <div
                                        key={category.id}
                                        onClick={() => {
                                            setCategoryId(category.id);
                                            setCategorySearch(
                                                category.categoryName
                                            );
                                            setShowDropdown(false);
                                        }}
                                        className="px-4 py-3 text-white hover:bg-slate-700 cursor-pointer transition"
                                    >
                                        {category.categoryName}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-gray-400">
                                    No category found
                                </div>
                            )}
                        </div>
                    )}

                    {categoryId && (
                        <p className="mt-2 text-green-400 text-sm">
                            Selected Category ID: {categoryId}
                        </p>
                    )}
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-semibold text-white disabled:opacity-60"
                >
                    {isLoading ? "Adding..." : "Add Product"}
                </button>

            </form>
        </div>
    );
};

export default ProductForm;