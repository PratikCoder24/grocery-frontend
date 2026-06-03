import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchCategories,
    deleteCategory,
    updateCategory
} from '../../features/category/CategorySlice';

import { deleteToast, successToast } from '../../toast/Toast';

const CategoryList = () => {
    
    const dispatch = useDispatch();
    
    const { categories, isLoading, error } = useSelector(
        (state) => state.category
    );
    

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    const handleDelete = (id) => {
        deleteToast('Delete this category?', () => {
            dispatch(deleteCategory(id));
            successToast('Category deleted');
        });
    };


    const handleEdit = (category) => {
        setEditId(category.id);
        setEditName(category.categoryName);
    };

    const handleCancel = () => {
        setEditId(null);
        setEditName('');
    };


    const handleSave = (id) => {

        if (editName.trim() === '') return;

        dispatch(
            updateCategory({
                id,
                categoryData: { categoryName: editName }
            })
        ).then((res) => {

            if (res.meta.requestStatus === 'fulfilled') {
                successToast('Category updated');
                setEditId(null);
                setEditName('');
            }
        });
    };

    return (
        <div className="bg-[#1e293b] rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Categories
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
                                <th className="py-3 px-4 text-center text-gray-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {categories.map((cat) => (

                                <tr
                                    key={cat.id}
                                    className="border-b border-slate-800 hover:bg-[#273449]"
                                >


                                    <td className="py-3 px-4 text-gray-200">

                                        {editId === cat.id ? (

                                            <input
                                                value={editName}
                                                onChange={(e) =>
                                                    setEditName(e.target.value)
                                                }
                                                className="
                                                    bg-[#0f172a]
                                                    border border-slate-600
                                                    text-white
                                                    px-3 py-2
                                                    rounded-lg
                                                    w-full
                                                "
                                            />

                                        ) : (

                                            cat.categoryName
                                        )}

                                    </td>


                                    <td className="py-3 px-4">

                                        <div className="flex justify-center gap-2">

                                            {editId === cat.id ? (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleSave(cat.id)
                                                        }
                                                        className="
                                                            bg-green-600
                                                            hover:bg-green-700
                                                            px-3 py-1
                                                            rounded-lg
                                                            text-white
                                                            text-sm
                                                        "
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        onClick={handleCancel}
                                                        className="
                                                            bg-gray-600
                                                            hover:bg-gray-700
                                                            px-3 py-1
                                                            rounded-lg
                                                            text-white
                                                            text-sm
                                                        "
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(cat)
                                                        }
                                                        className="
                                                            bg-yellow-500
                                                            hover:bg-yellow-600
                                                            px-3 py-1
                                                            rounded-lg
                                                            text-white
                                                            text-sm
                                                        "
                                                    >
                                                        Update
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(cat.id)
                                                        }
                                                        className="
                                                            bg-red-600
                                                            hover:bg-red-700
                                                            px-3 py-1
                                                            rounded-lg
                                                            text-white
                                                            text-sm
                                                        "
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
};

export default CategoryList;