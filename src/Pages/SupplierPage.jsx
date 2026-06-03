import React, { useState } from 'react';
import { SupplierForm , SupplierList } from '../Components/index.js';

const SupplierPage = () => {

    const [show, setShow] = useState(false);

    return (
        <div className="p-6">

            
            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-white-800">
                        Suppliers
                    </h1>
                </div>

           
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
                    {show ? 'Close Form' : 'Add Supplier'}
                </button>

            </div>

      
            {show && (
                <div className="mb-10">
                    <SupplierForm />
                </div>
            )}

            <SupplierList />

        </div>
    );
};

export default SupplierPage;