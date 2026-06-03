import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '../../features/category/CategorySlice';
import { successToast, errorToast } from '../../toast/Toast';

const CategoryForm = () => {

    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.category);

    const [name, setName] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (name.trim() === '') {
            errorToast('Category name is required');
            return;
        }

        try {

            const categoryData = { categoryName : name};

            const result = await dispatch(addCategory(categoryData));

            if (addCategory.fulfilled.match(result)) {

                successToast('Category added successfully');
                setName('');

            } else {

                errorToast(result.payload);
            }

        } catch (err) {

            errorToast('Failed to add category');
        }
    };

    return (

        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-xl p-8">

            <h2 className="text-2xl font-bold text-white mb-6">
                Add Category
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div>

                    <label className="block mb-2 text-sm text-gray-300">
                        Category Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="
                            w-full
                            bg-[#0f172a]
                            border
                            border-slate-600
                            text-white
                            px-4
                            py-3
                            rounded-xl
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            placeholder:text-gray-500
                        "
                    />

                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="
                        w-full
                        bg-indigo-600
                        hover:bg-indigo-700
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                        disabled:opacity-60
                    "
                >
                    {isLoading ? 'Adding...' : 'Add Category'}
                </button>

            </form>

        </div>
    );
};

export default CategoryForm;