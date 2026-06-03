import React, { useState } from 'react';
import {CategoryForm , CategoryList} from '../Components/index.js';

const CategoryPage = () => {

    const [show, setShow] = useState(false);

    return (
        <div className="p-6">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-white-800">
                        Category Management
                    </h1>

                    <p className="text-white-500 mt-2">
                        Create and manage product categories
                    </p>
                </div>

                {/* Add Category Button */}
                <button
                    onClick={() => setShow(!show)}
                    className="
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        transition
                    "
                >
                    {show ? 'Close Form' : 'Add Category'}
                </button>

            </div>

            {/* Show Form Conditionally */}
            {show && (
                <div className="mb-10">
                    <CategoryForm />
                </div>
            )}

            {/* Category List */}
            <CategoryList />

        </div>
    );
};

export default CategoryPage;