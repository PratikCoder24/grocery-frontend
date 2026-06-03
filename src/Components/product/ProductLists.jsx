import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchProducts,
    updateProducts,
    deleteProducts
} from "../../features/product/ProductSlice";
import { fetchCategories } from '../../features/category/CategorySlice';

import { deleteToast, errorToast, successToast } from '../../toast/Toast';

const ProductLists = () => {

    const dispatch = useDispatch();

    const { products, isLoading, error } = useSelector(
        (state) => state.products
    );
    const { categories } = useSelector((state) => state.category);

    const [editId, setEditId] = useState(null);

    const [editData, setEditData] = useState({
        name: '',
        sku: '',
        costPrice: '',
        sellingPrice: '',
        quantity: '',
        reorderLevel: '',
        categoryName: '',
        categoryId: '',
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = (id) => {

        deleteToast('Delete this product?', () => {

            dispatch(deleteProducts(id));
            successToast('Product deleted');

        });
    };

    const handleEdit = (product) => {

        setEditId(product.id);

        setEditData({
            name: product.name || '',
            sku: product.sku || '',
            costPrice: product.costPrice || '',
            sellingPrice: product.sellingPrice || '',
            quantity: product.quantity || '',
            reorderLevel: product.reorderLevel || '',
            categoryId: product.categoryId || '',
            categoryName: product.categoryName || ''

        });
    };

    const handleCancel = () => {

        setEditId(null);

        setEditData({
            name: '',
            sku: '',
            costPrice: '',
            sellingPrice: '',
            quantity: '',
            reorderLevel: '',
            categoryName: '',
            categoryId: '',

        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditData((prev) => ({
            ...prev,
            [name]: value
        }));
    }


  const handleSave = async (id) => {
    try {
        const res = await dispatch(
            updateProducts({
                id,
                productData: {
                    productName: editData.name,
                    sku: editData.sku,
                    costPrice: Number(editData.costPrice),
                    sellPrice: Number(editData.sellingPrice),
                    quantity: Number(editData.quantity),
                    reorderLevel: Number(editData.reorderLevel),
                    categoryId: Number(editData.categoryId),
                }
            })
        );

        if (res.meta.requestStatus === 'fulfilled') {
            successToast('Product updated');
            setEditId(null);
            setEditData({
                name: '',
                sku: '',
                costPrice: '',
                sellingPrice: '',
                quantity: '',
                reorderLevel: '',
                categoryName: '',
                categoryId: '',
            });
        } else {
            errorToast('Failed to update product!');
        }

    } catch (error) {
        errorToast('Something Went Wrong!!');
    }
};

    return (

        <div className="bg-[#1e293b] rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Products
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

                                <th className="py-3 px-4 text-gray-300">
                                    Name
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    SKU
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    Cost Price
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    Selling Price
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    Quantity
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    Reorder Level
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    Category
                                </th>

                                <th className="py-3 px-4 text-center text-gray-300">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {products.map((p) => (

                                <tr
                                    key={p.id}
                                    className="border-b border-slate-800 hover:bg-[#273449]"
                                >

                                    {/* NAME */}
                                    <td className="py-3 px-4 text-gray-200">

                                        {editId === p.id ? (

                                            <input
                                                type="text"
                                                name="name"
                                                value={editData.name}
                                                onChange={handleChange}
                                                className="bg-[#0f172a] border border-slate-600 text-white px-3 py-2 rounded-lg w-full"
                                            />

                                        ) : (
                                            p.name
                                        )}

                                    </td>

                                    {/* SKU */}
                                    <td className="py-3 px-4 text-gray-200">

                                        {editId === p.id ? (

                                            <input
                                                type="text"
                                                name="sku"
                                                value={editData.sku}
                                                onChange={handleChange}
                                                className="bg-[#0f172a] border border-slate-600 text-white px-3 py-2 rounded-lg w-full"
                                            />

                                        ) : (
                                            p.sku
                                        )}

                                    </td>

                                    {/* COST PRICE */}
                                    <td className="py-3 px-4 text-gray-200">

                                        {editId === p.id ? (

                                            <input
                                                type="number"
                                                name="costPrice"
                                                value={editData.costPrice}
                                                onChange={handleChange}
                                                className="bg-[#0f172a] border border-slate-600 text-white px-3 py-2 rounded-lg w-full"
                                            />

                                        ) : (
                                            p.costPrice
                                        )}

                                    </td>

                                    {/* SELLING PRICE */}
                                    <td className="py-3 px-4 text-gray-200">

                                        {editId === p.id ? (

                                            <input
                                                type="number"
                                                name="sellingPrice"
                                                value={editData.sellingPrice}
                                                onChange={handleChange}
                                                className="bg-[#0f172a] border border-slate-600 text-white px-3 py-2 rounded-lg w-full"
                                            />

                                        ) : (
                                            p.sellingPrice
                                        )}

                                    </td>

                                    {/* QUANTITY */}
                                    <td className="py-3 px-4 text-gray-200">

                                            {p.quantity}
                                    </td>

                                    {/* REORDER LEVEL */}
                                    <td className="py-3 px-4 text-gray-200">

                                            {p.reorderLevel}
                                        

                                    </td>

                                    {/* CATEGORY */}
                                    <td className="py-3 px-4 text-gray-200">

                                        {p.categoryName}

                                    </td>

                                    {/* ACTIONS */}
                                    <td className="py-3 px-4">

                                        <div className="flex justify-center gap-2">

                                            {editId === p.id ? (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleSave(p.id)
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
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(p)
                                                        }
                                                        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Update
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(p.id)
                                                        }
                                                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Delete
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
}

export default ProductLists;